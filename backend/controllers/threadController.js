const {Thread, User} = require('../models')

class ThreadController {
  static async getAllThreads(req, res, next) {
    try {
      const { id } = req.user;
      // Ambil page & limit dari query, default page=1, limit=10
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: threads } = await Thread.findAndCountAll({
        include: User,
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json({
        data: threads,
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
        userId: id
      });
    } catch (error) {
      next(error);
    }
  }

  static async createThread(req, res, next) {
    try {
      const { content } = req.body;
      const UserId = req.user.id; // Assuming user ID is stored in req.user
      const newThread = await Thread.create({ content, UserId });
      res.status(201).json(newThread);
    } catch (error) {
      next(error);
    }
  }

  static async editThread(req, res, next) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const thread = await Thread.findByPk(id);
      if (!thread) {
        return res.status(404).json({ message: 'Thread not found' });
      }
      await thread.update({ content });
      res.status(200).json(thread);
    } catch (error) {
      next(error);
    }
  }

  static async deleteThread(req, res, next) {
    try {
      const { id } = req.params;
      const thread = await Thread.findByPk(id);
      if (!thread) {
        return res.status(404).json({ message: 'Thread not found' });
      }
      await thread.destroy();
      res.status(200).json({ message: 'Thread deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ThreadController;