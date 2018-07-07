require("../models");

// Defining methods for the booksController
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
      .limit(10 )
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
    console.log("Req Params Are: ", req.query);
    console.log("Searching For: ", req.query.cheaterIGN);
    const searchTerm = req.query.cheaterIGN;
    const searchString = "/"+ searchTerm +"/i";
    console.log("Search String Is: ", searchString);

    table
      .find({cheaterIGN : searchTerm})
      .populate("cheatGame")
      .populate("cheatSystem")
      .populate("cheatType")
      .sort({ cheatSystem: 1 })
      .then(dbModel => {
        // console.log(dbModel);  
        res.json(dbModel);
      })
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
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
    console.log("Delete Request For: ", req.query.id);
    table
      .findById(req.query.id)
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

