const router = require("express").Router();
const dbController = require("../../../controllers/controller");
const Cheats = require("../../../models/Cheats");
const Games = require("../../../models/Games");
const Systems = require("../../../models/Systems");
const Cheaters = require("../../../models/Cheaters");


// For "api/counts/add"
router
  .route("/add")
  .get(function(req, res) {
    
      const gameId = req.query.gameName;
      const cheatId = req.query.cheatName;
      const systemId = req.query.systemName;
      const cheaterIGN = req.query.cheaterIGN;
      let systemName = "";
      let cheaterIGNWS = "";

      // console.log("Variables Set For: ", gameId, systemId, cheatId, cheaterIGNWS);

      // Note: res.json Not Sent Until Last Function Runs To Prevent Multiple Headers

      // Update Cheat Counts
      Cheats.findById(cheatId, "cheatCount", function(err, data){
        if(err) throw err;
        // console.log("Intial Count: ", data.cheatCount);
        let newCountCheats = parseInt(data.cheatCount) + 1;
        Cheats.findByIdAndUpdate(cheatId, { cheatCount: newCountCheats }, function(err, data2){
          if(err) throw err;
          // console.log("Incremental Count: ", data2.cheatCount);
          // res.json(data2);
        })
      })
      // Update Game Counts
      Games.findById(gameId, "cheatCount", function(err, data3){
        if(err) throw err;
        // console.log("Intial Count: ", data3.cheatCount);
        let newCountGames = parseInt(data3.cheatCount) + 1;
        Games.findByIdAndUpdate(gameId, { cheatCount: newCountGames }, function(err, data4){
          if(err) throw err;
          // console.log("Incremental Count: ", data4.cheatCount);
          // res.json(data4);
        })
      })
      // Update System Counts & Build cheaterIGNWS
      Systems.findById(systemId, "systemName cheatCount", function(err, data5){
        if(err) throw err;
        // console.log("Intial Count: ", data5.cheatCount);
        // console.log("System Name: ", data5.systemName);
        let newCountSystems = parseInt(data5.cheatCount) + 1;
        systemName = data5.systemName;
        cheaterIGNWS = cheaterIGN + " (" + systemName + ")";
        // console.log("Cheater ING w System: ", cheaterIGNWS);
        // res.json(data5);
        Systems.findByIdAndUpdate(systemId, { cheatCount: newCountSystems }, function(err, data6){
          if(err) throw err;
          // console.log("Incremental Count: ", data6.cheatCount);
          // res.json(data6);


          // Update Cheaters Table - Nested To Be Sure cheaterIGNWS Is Built
          Cheaters.findOne({cheaterIGNWS:cheaterIGNWS}, function(err, data7){
            if(err) throw err;
            // console.log("Cheaters Data: ", data7);

            // Make New Cheater If Not In Table
            if(data7 == null){

              const cheatersObj = {
                cheaterIGNWS: cheaterIGNWS,
                cheatCount: 1
              }
              
              Cheaters.create(cheatersObj, function(err, data8){
                if(err) throw err;
                res.json(data8)
              })
            
            // Update Cheater Count If In Table 
            } else{
              Cheaters.findOne({cheaterIGNWS : cheaterIGNWS}, "cheatCount", function(err, data9){
                if(err) throw err;
                // console.log("Intial Count: ", data9.cheatCount);
                let newCountCheater = parseInt(data9.cheatCount) + 1;
                Cheaters.findOneAndUpdate({cheaterIGNWS: cheaterIGNWS }, { cheatCount: newCountCheater }, function(err, data10){
                  if(err) throw err;
                  // console.log("Incremental Count: ", data10.cheatCount);
                  res.json(data10);
                })
              })
            }
          })            
        })
      })
    })

// For "api/counts/reduce"    
router
  .route("/reduce")
  .get(function(req, res) {
    
      const gameId = req.query.gameName;
      const cheatId = req.query.cheatName;
      const systemId = req.query.systemName;
      const cheaterIGN = req.query.cheaterIGN;
      let systemName = "";
      let cheaterIGNWS = "";

      // console.log("Variables Set For: ", gameId, systemId, cheatId, cheaterIGNWS);

      // Note: res.json Not Sent Until Last Function Runs To Prevent Multiple Headers

      // Update Cheat Counts
      Cheats.findById(cheatId, "cheatCount", function(err, data){
        if(err) throw err;
        // console.log("Intial Count: ", data.cheatCount);
        let newCountCheats = parseInt(data.cheatCount) - 1;
        Cheats.findByIdAndUpdate(cheatId, { cheatCount: newCountCheats }, function(err, data2){
          if(err) throw err;
          // console.log("Incremental Count: ", data2.cheatCount);
          // res.json(data2);
        })
      })
      // Update Game Counts
      Games.findById(gameId, "cheatCount", function(err, data3){
        if(err) throw err;
        // console.log("Intial Count: ", data3.cheatCount);
        let newCountGames = parseInt(data3.cheatCount) - 1;
        Games.findByIdAndUpdate(gameId, { cheatCount: newCountGames }, function(err, data4){
          if(err) throw err;
          // console.log("Incremental Count: ", data4.cheatCount);
          // res.json(data4);
        })
      })
      // Update System Counts & Build cheaterIGNWS
      Systems.findById(systemId, "systemName cheatCount", function(err, data5){
        if(err) throw err;
        // console.log("Intial Count: ", data5.cheatCount);
        // console.log("System Name: ", data5.systemName);
        let newCountSystems = parseInt(data5.cheatCount) - 1;
        systemName = data5.systemName;
        cheaterIGNWS = cheaterIGN + " (" + systemName + ")";
        // console.log("Cheater ING w System: ", cheaterIGNWS);
        // res.json(data5);
        Systems.findByIdAndUpdate(systemId, { cheatCount: newCountSystems }, function(err, data6){
          if(err) throw err;
          // console.log("Incremental Count: ", data6.cheatCount);
          // res.json(data6);


          // Update Cheaters Table - Nested To Be Sure cheaterIGNWS Is Built
          Cheaters.findOne({cheaterIGNWS:cheaterIGNWS}, function(err, data7){
            if(err) throw err;
            // console.log("Cheaters Data: ", data7);

            // Remove Cheater If Not In Table
            if(data7.cheatCount === 1){

              Cheaters.findOneAndDelete({_id:data7._id}, function(err, data8){
                if(err) throw err;
                res.json(data8)
              })
            
            // Update Cheater Count If In Table 
            } else{
              Cheaters.findOne({cheaterIGNWS : cheaterIGNWS}, "cheatCount", function(err, data9){
                if(err) throw err;
                // console.log("Intial Count: ", data9.cheatCount);
                let newCountCheater = parseInt(data9.cheatCount) - 1;
                Cheaters.findOneAndUpdate({cheaterIGNWS: cheaterIGNWS }, { cheatCount: newCountCheater }, function(err, data10){
                  if(err) throw err;
                  // console.log("Incremental Count: ", data10.cheatCount);
                  res.json(data10);
                })
              })
            }
          })            
        })
      })
    })




// For "/api/counts/recap"
router
  .route("/recap")
  .get(function(req, res) {

    const resObect = {
      games: [],
      systems: [],
      cheats: [],
      cheaters: []
    }

    Games.find({},null,{limit: 5, sort:{cheatCount: -1 }},function(err,data){
      if(err) throw err;
      resObect.games = data;
      Systems.find({},null,{sort:{cheatCount: -1 }},function(err,data2){
        if(err) throw err;
        resObect.systems = data2;
        Cheats.find({},null,{sort:{cheatCount: -1 }},function(err,data3){
          if(err) throw err;
          resObect.cheats = data3;
          Cheaters.find({},null,{limit: 10, sort:{cheatCount: -1 }},function(err,data4){
            if(err) throw err;
            resObect.cheaters = data4;
            // console.log(resObect);
            res.json(resObect);
          })
        })
      })
    })
  })
  
module.exports = router;