"use strict";
const fs = require('fs')
const http = require('http')
const readline = require('readline')
const timer = require('timers')

const FPS = 1000 / 25
const Direction = {
    NEUTRAL: 0,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37,
    UP: 38
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const hostname = '127.0.0.1'
const port = 3000

let players = {}

// Sets the server and loads the webpage.
const server = http.createServer((req, res) => {
    res.statusCode = 201
    res.end(fs.readFileSync('index.html'))
})

const io = require('socket.io').listen(server)

// Handles the websocket client connect.
io.sockets.on("connection", socket => {
    console.log("User connected: " + socket.id)
    players[socket.id] = {
        coords: { x: 0, y: 0 },
        direction: Direction.NEUTRAL
    }
    socket.emit("connected", players)
    socket.emit("connectedYou", socket.id)
    

    socket.on("disconnect", function () {
        console.log("User disconnected: " + socket.id)
        delete players[socket.id]
        socket.emit("disconnected", players)
    })

    socket.on("updatePlayerDirection", function (data) {
        console.log(data)
        players[socket.id]["direction"] = data
        players[socket.id]["coords"]["x"] += 10
    })

    socket.on("ClientMessage", (key, agent) => handleInput(key, agent))
})





setInterval(function () {
    io.sockets.emit("updatePlayerPosition", players)

}, FPS)



const handleInput = (key, agent) => {
    //console.log(key)
    io.emit('UpdatePlayer', { key, agent })
}

// Sends a message to all clients.
rl.on('line', input => io.emit('ServerMessage', input))

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
