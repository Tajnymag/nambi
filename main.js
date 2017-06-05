#!/usr/bin/env node

"use strict";

const express = require("express");
const fs = require("fs");
const dgram = require("dgram");
const expressApp = express();
const http = require("http").Server(expressApp);
const io = require("socket.io")(http);
const argv = require("yargs").argv;
const hParser = require("./parser.js")(dgram);

let HTTP_PORT = 3000;
let HYPERION_PORT = 19446;

function handleArguments() {
    if (argv.http !== undefined) {
        HTTP_PORT = argv.http;
    }
    if (argv.hyperion !== undefined) {
        HYPERION_PORT = argv.hyperion;
    }
}

function main() {
    let known_clients = new Set();
    let hyperion_informed = false;
    let last_dgram_msg = "";

    handleArguments();

    expressApp.use("/socket.io-client", express.static("node_modules/socket.io-client/dist/"));
    expressApp.use("/", express.static("public"));

    http.listen(HTTP_PORT, function () {
        console.log("Serving webapp on port: " + HTTP_PORT);
        console.log("Waiting for Hyperion UDP connection on port: " + HYPERION_PORT);
    });

    let dgramSocket = dgram.createSocket("udp4");

    dgramSocket.bind(HYPERION_PORT);
    dgramSocket.on("message", function (msg, info) {
        if (msg.toString() === last_dgram_msg.toString()) {
            return;
        }

        if (!hyperion_informed) {
            console.log("Connected to Hyperion");
            hyperion_informed = true;
        }

        let parsed_lights = hParser.parseRawLights(msg);
        io.emit("message", parsed_lights);
        last_dgram_msg = msg;
    });

    io.on("connection", function(socket) {
        if (!known_clients.has(socket.handshake.address)) {
            console.log("A new client has connected");
        }
        known_clients.add(socket.handshake.address);

        socket.on("disconnect", function() {
            //known_clients.delete(socket);
        });
    });

    return 0;
}

main();