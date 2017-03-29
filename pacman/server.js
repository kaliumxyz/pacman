"use strict";
const fs = require('fs')
const http = require('http')
const readline = require('readline')
const timer = require('timers')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


const hostname = '127.0.0.1'
const port = 3000

// Sets the server and loads the webpage.
const server = http.createServer((req, res) => {
  res.statusCode = 201
  res.end(fs.readFileSync('index.html'))
})

const io = require('socket.io').listen(server)

// Handles the websocket client connect.
io.sockets.on("connection", socket => {
    console.log("User connected: " + socket.id)
    socket.on("ClientMessage", (key, agent) => handleInput(key, agent))

    socket.on("updatePlayerLocation", updatePlayerLocation)

    function updatePlayerLocation(data) {
        console.log(data)
        socket.broadcast.emit("updatePlayerLocation", data)
    }

})



const handleInput = (key, agent) => {
  console.log(key)
  io.emit('UpdatePlayer',{key, agent})
}

// Sends a message to all clients.
rl.on('line', input =>io.emit('ServerMessage', input))

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
