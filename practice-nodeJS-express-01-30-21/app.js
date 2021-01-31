const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let teamArray = [];

app.get('/', (req, res) => {
    res.status(200).json({
        hello: "Hello from Express"
    });
});

app.get('/team', (req, res) => {
    res.send("This is the Team path");
});

app.get('/team/get-team-data', (req, res) => {
    res.status(200).json({ data: teamArray });
});

app.get('/team/:anyname', (req, res) => {
    console.log(req.params);

    res.status(200).json(req.params);
})

app.post('/team/create-team', (req, res) => {
    teamArray.push(req.body);

    res.status(200).json({ data: teamArray });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})