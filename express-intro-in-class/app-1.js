const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());   // Body Parser middleware
app.use(express.urlencoded({ extended: false})); // Body Parser middleware

//GET, POST, PUT, and DELETE
//Req = Request -incoming and res = Response - going out

//middleware - give abilities to our application

//params e.g /team/:anyname : means dynamic

let teamArray = [];

app.get('/', function (req, res) {
    res.status(200).json({
        hello: "Greeting from EXPRESS",
    });
});

app.get("/team", function (req, res) {
    res.send("You hit the team path");
});

app.get('/team/get-team-data', function (req, res) {
    res.status(200).json({ data: teamArray });
});

app.get("/team/:anyname", function(req, res){
    console.log(req.params);

    res.status(200).json(req.params);
});

app.post("/team/create-team", function (req, res) {
    teamArray.push(req.body);

    res.status(200).json({ data: teamArray });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});