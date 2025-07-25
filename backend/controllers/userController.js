const {User} = require('../models')
const bcrypt = require('bcryptjs')
const {signToken} = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const sendEmail = require('../helpers/nodemailer');

class UserController {
  static async register (req,res, next) {
    try {
      const {username, email, password} = req.body

      const result = await User.create({username, email, password})

      sendEmail(result.email)

      res.status(201).json({ message: 'User registered successfully', user: { id: result.id, username: result.username, email: result.email } })
    } catch (error) {
      next(error)
    }
  }

  static async login (req,res, next) {
    try {
      const {email, password} = req.body

      if (!email) {
        throw { name: 'BadRequest', message: 'Email is required' }
      }

      if (!password) {
        throw { name: 'BadRequest', message: 'Password is required' }
      }

      const user = await User.findOne({ where: { email } })

      if (!user) {
        throw { name: 'Unauthorized', message: 'Invalid Email or Password' }
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password)
      if (!isPasswordValid) {
        throw { name: 'Unauthorized', message: 'Invalid Email or Password' }
      }

      const access_token = signToken({ id: user.id, email: user.email })

      res.status(200).json({ access_token })
    } catch (error) {
      next(error)
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { googleToken } = req.body
      if (!googleToken) throw { name: "BadRequest", message: "Google Token is required" }


      // Create instance of OAuth2Client
      const client = new OAuth2Client();

      // Verify the token
      // Note: You need to set your Google Client ID in the environment variable GOOGLE_CLIENT_ID
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID
      })

      // Get the user information from the token
      const payload = ticket.getPayload()
      // console.log(payload, "<<<");


      // bikin user if not exists karena untuk bikin token kita butuh user id
      const randomPassword = payload.sub + Date.now().toString() + Math.random().toString(36).substring(2, 15) // generate a random password
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          password: randomPassword,
          username: payload.name || payload.email.split('@')[0],
        }
      })

      created ? sendEmail(user.email) : null

      // console.log(user, created, "<<< user created?");
      // bikin access token
      const access_token = signToken({ id: user.id })

      res.status(created ? 201 : 200).json({ access_token })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController