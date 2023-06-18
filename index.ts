import * as http from "http";
import * as https from "https";
import * as fs from "fs";

const server = http.createServer(getRoutes());
let url = JSON.parse(fs.readFileSync(__dirname + "/url.json"));

server.listen(7421, function () {
    console.log("server_status", "7421");
});

setInterval(function () {
    for (let i of url) {
        if (i.startsWith("https://")) {

        } else {
            
        }
    }
}, 240000);

function getRoutes() {
    return async function (req, res) {
        let ress = req.url;
        console.log(req.method, req.headers.origin, ress);
        if (ress.includes("?addurl=")) {
            let addU = ress.split("?addurl=")[1];
            if (addU.startsWith("http://") || addU.startsWith("https://")) {
                url.push(addU);
                res.setHeader("Content-Type", "text/json");
                res.writeHead(200);
                res.end('{result: "success"}');
                fs.writeFileSync(__dirname + "/url.json", JSON.stringify(url), "utf8");
            } else {
                res.setHeader("Content-Type", "text/json");
                res.writeHead(200);
                res.end('{result: "invalid protocol"}');
            }
        } else if (ress.includes("?remurl=")) {
            let remU = ress.split("?remurl=")[1];
            if (url.includes(remU)) {
                url.pop(remU);
                res.setHeader("Content-Type", "text/json");
                res.writeHead(200);
                res.end('{result: "success"}');
                fs.writeFileSync(__dirname + "/url.json", JSON.stringify(url), "utf8");
            } else {
                res.setHeader("Content-Type", "text/json");
                res.writeHead(200);
                res.end('{result: "url is not on the list"}');
            }
        } else {
            res.setHeader("Content-Type", "text/json");
            res.writeHead(200);
            res.end('{result: "error invalid parameter"}');
        }
    };
}
