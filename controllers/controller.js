require("../models");

// Defining methods for the Tilt's Tables' Controllers
module.exports = {
  findAll: function (table, req, res) {
    table
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllReports:function (table, req, res) {
    table
      .find(req.query)
      .populate("cheatGame")
      .populate("cheatSystem")
      .populate("cheatType")
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllBySort: function (table, req, res, sortKey) {
    table
      .find(req.query)
      .sort({ [sortKey]: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (table, req, res) {
    table
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByIGN: function (table, req, res) {
    table
      .find(req.params.cheaterIGN)
      .sort({ cheatGame: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (table, req, res) {
    table
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (table, req, res) {
    table
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (table, req, res) {
    table
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

