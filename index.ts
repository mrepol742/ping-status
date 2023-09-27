/*
 *
 * Copyright (c) 2023 Melvin Jones Repol (mrepol742.github.io). All Rights Reserved.
 *
 * License under the GNU GENERAL PUBLIC LICENSE, version 3.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://github.com/mrepol742/ping-status/blob/master/LICENSE
 *
 * Unless required by the applicable law or agreed in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
