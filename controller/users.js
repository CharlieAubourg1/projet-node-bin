const User = require("../models/user");

module.exports = {
  getAll: async (req, res, next) => {
    res.json(await User.findAll());
  },
  create: async (req, res, next) => {
    res.status(201).json(await User.create(req.body));
  },
  getOne: async (req, res, next) => {
    const user = await User.findByPk(parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  },
  update: async (req, res, next) => {
    const nbUpdated = await User.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      //returning: true
    });
    if (!nbUpdated) return res.sendStatus(404);

    res.json(await User.findByPk(parseInt(req.params.id)));
  },
  delete: async (req, res, next) => {
    if (req.user.id !== parseInt(req.params.id)) return res.sendStatus(403);

    const nbDeleted = await User.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.sendStatus(nbDeleted ? 204 : 404);
  },
  activateAccount : async (req, res, next) => {
    try {
      console.log(req.params.id)
      if (!parseInt(req.params.id)) return res.sendStatus(403);
  
      const _ = await User.update({activated: true}, {
        where: {
          id: parseInt(req.params.id),
        },
        //returning: true
      });
  
      res.status(200).json({message: "Account activated"});
    } catch (err) {
      console.error(err);
      res.status(500).json({message: err.message});
    }
  }
};