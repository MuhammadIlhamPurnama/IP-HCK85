require('dotenv').config()
const nodemailer = require('nodemailer');

async function sendEmail(to) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ilhampurnama78@gmail.com', 
      pass: process.env.EMAIL_PASSWORD 
    }
  });

  const mailOptions = {
    from: 'ilhampurnama78@gmail.com', 
    to: to, 
    subject: 'Halo dari Team SilverFrame', 
    text: 'Terima kasih telah bergabung dengan SilverFrame!'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email berhasil dikirim:', info.response);
  } catch (error) {
    console.log('Gagal kirim email:', error);
  }
}

module.exports = sendEmail
