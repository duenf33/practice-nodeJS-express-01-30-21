const http = require("http");
const fs = require("fs");
const queryString = require("querystring");
const port = process.env.PORT || 3000;
const server = http.createServer(function (req, res) {
  //request and response
  // response.end("Hi class, welcome to Node!!!");
  console.log(req.url);
  if (req.url === "/") {
    serveHTML(req, res);
  } else if (req.url === "/show-me-data-json") {
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        greeting: "Hello Class",
        numbers: [1, 2, 3],
        text: "LOL",
      })
    );
  } else if (req.url.match(/^\/nba/)) {
    ///nba?team=lakers&best_player1=kobe&best_player2=shaq
    // console.log(req.url.split("?").slice(1).join(""));
    // console.log("-----------------");
    // console.log(req.url.split("?").slice(1).join("").split("&"));
    // let parsedUrlString = queryString.parse(req.url);
    // console.log(parsedUrlString);
    res.setHeader("Content-Type", "application/json");
    //console.log(req.url.split("?").slice(1).join("").split("&").join(""));
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
    console.log(bestTeamPlayerObj);
    res.end(
      JSON.stringify({
        team: team,
        ...bestTeamPlayerObj,
        bestTeamPlayerObj,
      })
    );
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});
server.listen(port, () => {
  console.log(`Server is up in port: ${port}`);
});
function serveHTML(req, res) {
  fs.readFile("index.html", function (err, data) {
    if (err) {
      res.writeHead(400).end(`Sorry something is wrong: ${err.message}`);
      return res.end();
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
}
function each(collection, iterator) {
  if (collection instanceof Array) {
    var len = collection.length;
    for (var i = 0; i < len; i++) {
      iterator(collection[i], i, collection);
    }
  } else if (collection instanceof Object) {
    for (var prop in collection) {
      iterator(collection[prop], prop, collection);
    }
  }
}
function map(collection, iterator) {
  var result = [];
  each(collection, function (element, index, array) {
    var answer = iterator(element);
    result.push(answer);
  });
  return result;
}