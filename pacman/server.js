"use strict";
const fs = require('fs')
const http = require('http')
const readline = require('readline')
const timer = require('timers')
const assets = require("./enums.js")

const Direction = {
    NEUTRAL: 0,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
}
    const nodesMap = [
    //lane 1
    [5,29,8],
    [45,29,4],
    [93,29,7],
    [117,29,8],
    [165,29,4],
    [205,29,7],

    //lane 2

    [5,61,1],
    [45,61,0],
    [69,61,4],
    [93,61,2],
    [117,61,2],
    [141,61,4],
    [165,61,0],
    [205,61,3],

    //lane 3
    [5,85,5],
    [45,85,3],
    [69,85,5],
    [93,85,7],
    [117,85,8],
    [141,85,6],
    [165,85,1],
    [205,85,6],

    //lane 4
    [69,109,8],
    [93,109,2],
    [117,109,2],
    [141,109,7],

    //lane 5 teleport ding implanteren hiero_____________________________
    [-16,133,9],
    [45,133,0],
    [69,133,3],
    [141,133,1],
    [165,133,0],
    [240,133,10],


    //lane 6
    [69,157,1],
    [141,157,3],

    //lane 7
    [5,181,8],
    [45,181,0],
    [69,181,2],
    [93,181,7],
    [117,181,8],
    [141,181,2],
    [165,181,0],
    [205,181,7],

    //lane 8 1==| 2==_ 3== | 4== - 5==|_ 6==_| 7==-| 8==|-
    [5,205,5],
    [21,205,7],
    [69,205,4],
    [45,205,1],
    [93,205,2],
    [117,205,2],
    [165,205,3],
    [141,205,4],
    [189,205,8],
    [205,205,6],

    //lane 9
    [5,229,8],
    [21,229,2],
    [45,229,6],
    [69,229,5],
    [93,229,7],
    [117,229,8],
    [141,229,6],
    [165,229,5],
    [189,229,2],
    [205,229,7],

    //lane 10
    [5,253,5],
    [93,253,2],
    [117,253,2],
    [205,253,6],

    //kooi
    [89,128,8],
    [89,138,5],
    [105,128,0],
    [105,138,2],
    [121,128,7],
    [121,138,6],
    [105,109,11]
]

const FPS = 1000 / 25

const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
})


const hostname = '127.0.0.1'
const port = 3000

let players = {}

// Sets the server.
const server = http.createServer((req, res) => {
        res.statusCode = 201
})

const io = require('socket.io').listen(server)

const checkMap = (player, data) => {
        //0=right 1=down 2=left 3=up. split= 1==| 2==_ 3== | 4== - 5==|_ 6==_| 7==-| 8==|-
        const dist = 10
        nodesMap.forEach(node => {
                // Two if statements for the sake of my sanity and debugging, remove if and only if this is the release canidate.
                if (player["coords"]["x"] < node[0] + dist && player["coords"]["x"] > node[0] - dist)
                if (player["coords"]["y"] < node[1] + dist && player["coords"]["y"] > node[1] - dist)
                {
                console.log(player["coords"])
                console.log(node)
                switch(node[3]){
                        case 0:

                        default:
                        player["direction"] = data
                        console.log("Debug mode is active.")
                }
        }
})
}
// const changeDirection(player, node){
//
// }
const handleInput = (key, agent) => {
        //console.log(key)
        io.emit('UpdatePlayer', { key, agent })
}

// Handles the websocket client connect.
io.sockets.on("connection", socket => {
        console.log("User connected: " + socket.id)
        players[socket.id] = {
                coords: { x: 16, y: 36 },
                direction: Direction.RIGHT
        }
        socket.emit("connected", players)
        socket.emit("connectedYou", socket.id)


        socket.on("disconnect", function () {
                console.log("User disconnected: " + socket.id)
                delete players[socket.id]
                socket.emit("disconnected", players)
        })

        socket.on("keyStroke", function (data) {
                console.log(data)
                if (data>36 && data<41){
                        checkMap(players[socket.id], data)
                }
        })

        socket.on("ClientMessage", (key, agent) => handleInput(key, agent))
})

const movePlayers = _ => {
const localplayers = Object.keys(players)
    let key = 0
    for (let i = 0; i < localplayers.length; i++) {
        if (i < 5) {
            key = localplayers[i]
                // Replace with switch when I start giving a f*ck.
            if (players[key]["direction"] == Direction.RIGHT) { players[key]["coords"]["x"] +=1 }
            if (players[key]["direction"] == Direction.DOWN) { players[key]["coords"]["y"] +=1 }
            if (players[key]["direction"] == Direction.LEFT) { players[key]["coords"]["x"] -= 1 }
            if (players[key]["direction"] == Direction.UP) { players[key]["coords"]["y"] -= 1 }

        }
}}

// A horrible solution, but it works (bread or butter?).
setInterval(function () {
        movePlayers()
        io.sockets.emit("updatePlayerPosition", players)
}, FPS)

const handleCommand = input => {
if (input === '/quit')
process.exit()
}


// Sends a message to all clients.
rl.on('line', input => {
if (input[0] === "/")
handleCommand(input)
io.emit('ServerMessage', input)
})




server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
})
