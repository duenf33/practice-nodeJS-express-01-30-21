const http = require("http");
const fs = require("fs");
const queryString = require("querystring");

const port = process.env.PORT || 3000;

const server = http.createServer(function(req, res) {

    if (req.url === "/") {
        serveHTML(req, res);
    } else if (req.url === "/show-me-data-json") {
        headerHTML(req, res);
    } else if (req.url.match(/^\/nba/)){


        const { team = "" } = queryString.parse(
            req.url.split("?").slice(1).join("")
        );

        let bestTeamPlayerArrayData = req.url
            .split("?")
            .slice(1)
            .join("")
            .split("&")
            .slice(1);

        let mappedData = map(bestTeamPlayerArrayData, function (element) {
            return element.split("=");
        });

        let bestTeamPlayerObj = Object.fromEntries(mappedData);


        // Pak's solution
        console.log(req.url.split("?").slice(1).join(""));
        console.log("-------------------------");
        console.log(req.url.split("?").slice(1).join("").split("&"));
        // --------------

        // Our solution:
        console.log("line 14: ", req.url.slice(5))
        let parsedUrlString = queryString.parse(req.url.slice(5));
        console.log("line 16: ", parsedUrlString);
        res.setHeader("Content-Type", "application/json");
        // ----------------

        // Pak's solution
        console.log(req.url.split("?").slice(1).join("").split("&").join(""));
        // ---------------

        res.end(JSON.stringify(parsedUrlString));

        // res.end(
        //     JSON.stringify({
        //         team: "lakers",
        //         bestplay1: "kobe",
        //         bestplay2: "shaq",
        //     })
        // );

        // res.end("This is the nba path");
    
    } else {
        error(req, res);
    }
});

server.listen(port, () => {
    console.log(`Server is up in port: ${port}`);
});


function serveHTML(req, res) {
    fs.readFile("index.html", function (err, data) {
        console.log(err);
        
        if (err) {
            res.writeHead(400).end("Sorry something is wrong");
            return res.end();
        }
        
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
    })
}

function headerHTML(req, res) {
    res.setHeader("content-type", "application/json");
    res.end(
        JSON.stringify({
            greeting: "Hello Class",
            numbers: [1, 2, 3],
            text: "LOL",
        })
    )
}

function error(req, res) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
}