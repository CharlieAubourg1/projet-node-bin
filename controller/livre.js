const Livre = require("../models/livre");

module.exports = {
  getAll: async (req, res, next) => {
    res.json(await Livre.findAll());
  },
  create: async (req, res, next) => {
    res.status(201).json(await Livre.create(req.body));
  },
  getOne: async (req, res, next) => {
    const livre = await Livre.findByPk(parseInt(req.params.id));
    if (livre) {
      res.json(livre);
    } else {
      res.sendStatus(404);
    }
  },
  update: async (req, res, next) => {
    const nbUpdated = await Livre.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      //returning: true
    });
    if (!nbUpdated) return res.sendStatus(404);

    res.json(await Livre.findByPk(parseInt(req.params.id)));
  },
  delete: async (req, res, next) => {
    if (req.livre.id !== parseInt(req.params.id)) return res.sendStatus(403);

    const nbDeleted = await Livre.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.sendStatus(nbDeleted ? 204 : 404);
  },
};