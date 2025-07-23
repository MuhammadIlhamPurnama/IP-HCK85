require('dotenv').config();
const { Op } = require('sequelize');
const { Movie, Genre } = require('../models');
const { GoogleGenAI } = require("@google/genai"); 

const ai = new GoogleGenAI({
	apiKey: process.env.GEMINI_AI_API_KEY,
});

class MovieController {
  static async getAllMovies(req, res, next) {
    try {
      let { page = 1, limit = 12, sort, genreId, search } = req.query;

      page = +page;
      limit = +limit;

      const offset = (page - 1) * limit;

      let queryOption = {
        limit,
        offset,
        where: {},
        order: [],
      };

      // === SORT ===
      if (sort && typeof sort === "string") {
        if (sort.charAt(0) === "-") {
          queryOption.order.push([sort.slice(1), "DESC"]);
        } else {
          queryOption.order.push([sort, "ASC"]);
        }
      }

      // === FILTER by genreId === (asumsi 1 movie bisa punya banyak genre)
      if (genreId) {
        const genreIds = genreId.split(",");
        queryOption.include = [
          {
            association: "Genres", // Pastikan Movie.belongsToMany(Genre, { through: 'GenreMovies', as: 'Genres' })
            where: {
              id: {
                [Op.in]: genreIds
              }
            }
          }
        ];
      }

      // === SEARCH === (by title)
      if (search) {
        queryOption.where.title = {
          [Op.iLike]: `%${search}%`
        };
      }

      // === Query movies
      const { rows: data, count: totalItems } = await Movie.findAndCountAll(queryOption);

      const totalPages = Math.ceil(totalItems / limit);

      res.status(200).json({
        data,
        totalItems,
        totalPages,
        currentPage: page
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMostPopularMovies(req, res, next) {
    try {
      let { page = 1, limit = 12 } = req.query;
      page = +page;
      limit = +limit;
      const offset = (page - 1) * limit;

      const { rows: data, count: totalItems } = await Movie.findAndCountAll({
        order: [['popularity', 'DESC']],
        limit,
        offset
      });

      const totalPages = Math.ceil(totalItems / limit);

      res.status(200).json({
        data,
        totalItems,
        totalPages,
        currentPage: page
      });
    } catch (error) {
      next(error);
    }
  }


  static async getNewestMovies(req, res, next) {
    try {
      let { page = 1, limit = 12 } = req.query;

      page = +page;
      limit = +limit;
      const offset = (page - 1) * limit;

      const { count: totalItems, rows: movies } = await Movie.findAndCountAll({
        order: [['release_date', 'DESC']],
        limit,
        offset,
      });

      const totalPages = Math.ceil(totalItems / limit);

      res.status(200).json({
        data: movies,
        totalItems,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      next(error);
    }
  }



  static async getMovieDetail(req, res, next) {
    try {
      const { id } = req.params;

      const movie = await Movie.findOne({
        where: { id },
        include: [
          {
            model: Genre,
            through: { attributes: [] }, // tidak perlu tampilkan data pivot
          }
        ]
      });

      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      res.status(200).json(movie);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async AiAssistantMovies(req, res, next) {
    try {
      const { query } = req.body;

      if (!query) {
        throw { name:'BadRequest', message: 'Query is required' };
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
        
          I want you to recommend 5 movies base this query ${query}.

          Make sure:
          - Content is informative but not too long
          - No markdown block or triple backticks in your output
          - Response should be pure HTML only (suitable to paste into an HTML page)
        `
      });
      console.dir(response, { depth: null })

      res.status(200).json({ answer:response.text });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

}

module.exports = MovieController;
