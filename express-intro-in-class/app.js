const express = require("express"); //  Creates an Express application. The express() function is a top-level function exported by the express module.

const app = express(); // assigns variable to express() function.
const PORT = process.env.PORT || 3000; // helps connect to the environment variable PORT or 3000 which is our local computer if there is nothing else there.

app.use(express.json()); // body parser middleware. Gives the ability to the application.
app.use(express.urlencoded({ extended: false })); // Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option

//GET, POST, PUT, and DELETE
//Req = Request -incoming and res = Response - going out

//middleware - give abilities to our application

//params e.g /team/:anyname : means dynamic

let teamArray = [{  // This is a hardcoded array of objects being used as a database.
    id: 1,
    name: "lakers",
    playersArray: [],
},
];

app.get('/', function(req, res) {
    res.send("Welcome to our first API");
});

app.get('/team', function (req, res) {
    res.status(200).json({
        teamArray,
    });
});

app.get("/team/:teamID", function (req, res) {
    //loop here
    //set to a variable

    let targetTeamInfo;

    let teamIDNumber = Number(req.params.teamID); // it needs to be converted into a number because the teamID is passed as a string.

    // console.log(teamArray[1].id)
    teamArray.forEach(element => {
        // console.log(element)
        if(element.id === teamIDNumber){
            targetTeamInfo = element;
        } else {
            return res.status(404).send("The team you are looking for does not exist");
        }

        // Pak's solution: ----------------
        // if (!result) {
        //     return res
        //         .status(400)
        //         .send("Sorry, the team you are looking for does not exist");
        // }

    });
    res.status(200).json({
        team: targetTeamInfo,
    });
});
app.post('/team', function (req, res) {

    teamArray.push({
        id: req.body.id,
        name: req.body.name,
    });

    res.status(200).json({
        teamArray,
    });
});

app.post("/team/add-players/:teamID", function (req, res) {
    console.log('---------------------------------------')
    //match the teamID if the ID matches
    //add the players to the playersArray
    //incoming data is coming in from the body
    //   {
    //     "id": 1,
    //     "name": "lakers",
    //     "playersArray": ["kobe", "shaq"]
    // },

    // EXAMPLE ------------------------------
    // let resultPlayerArray = [{player: 'kobe'}, {player: 'kobe'}, {player:"shaq"}].map(item => {
    //     return item.player
    //   })
    //   let finalResult = resultPlayerArray.filter((player, index, collection) => {
    //     return collection.indexOf(player) === index;
    //   })
    //   console.log(finalResult)
    // ---------------------------------------

    let teamIDNumber = Number(req.params.teamID);

    teamArray.forEach((team) => {
        if (team.id === teamIDNumber) {
            let singleTeamArray = team.playersArray;
            singleTeamArray.forEach((player) => {
                if (player.player === req.body.player) {
                    res.status(404).send("Sorry this player already exist!")
                }
            });
        }
        team.playersArray.push(req.body);
    });
    res.status(200).json({
        teamArray,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});