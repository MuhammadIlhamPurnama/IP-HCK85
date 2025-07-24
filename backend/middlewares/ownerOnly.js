const { Thread } = require('../models')

async function ownerOnly(req, res, next) {
  try {
    const { id } = req.params
    const thread = await Thread.findByPk(id)
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' })
    }
    if (thread.UserId !== req.user.id) {
      return res.status(403).json({ message: 'You are not the owner' })
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = ownerOnly