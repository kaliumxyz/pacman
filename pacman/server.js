"use strict";
const fs = require('fs')
const http = require('http')
const readline = require('readline')
const timer = require('timers')

const Direction = {
	NEUTRAL: 0,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
}

// [[x,y],[x,y]] on map
let balls = [
	//lane 1
	[12,36],
	[20,36],
	[28,36],
	[36,36],
	[44,36],
	[52,36],
	[60,36],
	[68,36],
	[76,36],
	[84,36],
	[92,36],
	[100,36],
	[124,36],
	[132,36],
	[140,36],
	[148,36],
	[156,36],
	[164,36],
	[172,36],
	[180,36],
	[188,36],
	[196,36],
	[204,36],
	[212,36],
	// lane 2
	[12,44],
	[52,44],
	[100,44],
	[124,44],
	[172,44],
	[212,44],
	//lane 3
	[12,52],// groot
	[52,52],
	[100,52],
	[124,52],
	[172,52],
	[212,52],// groot
	//lane 4
	[12,60],
	[52,60],
	[100,60],
	[124,60],
	[172,60],
	[212,60],
	//lane 5
	[12,68],
	[20,68],
	[28,68],
	[36,68],
	[44,68],
	[52,68],
	[60,68],
	[68,68],
	[76,68],
	[84,68],
	[92,68],
	[100,68],
	[108,68],
	[116,68],
	[124,68],
	[132,68],
	[140,68],
	[148,68],
	[156,68],
	[164,68],
	[172,68],
	[180,68],
	[188,68],
	[196,68],
	[204,68],
	[212,68],
	//lane 6
	[12,76],
	[52,76],
	[76,76],
	[148,76],
	[172,76],
	[212,76],
	//lane 7
	[12,84],
	[52,84],
	[76,84],
	[148,84],
	[172,84],
	[212,84],
	//lane 8
	[12,92],
	[20,92],
	[28,92],
	[36,92],
	[44,92],
	[52,92],
	[76,92],
	[84,92],
	[92,92],
	[100,92],
	[124,92],
	[132,92],
	[140,92],
	[148,92],
	[172,92],
	[180,92],
	[188,92],
	[196,92],
	[204,92],
	[212,92],
	//lane 9
	[52,100],
	[172,100],
	//lane 10
	[52,108],
	[172,108],
	//lane 11
	[52,116],
	[172,116],
	//lane 12
	[52,124],
	[172,124],
	//lane 13
	[52,132],
	[172,132],
	//lane 14
	[52,140],
	[172,140],
	//lane 15
	[52,148],
	[172,148],
	//lane 16
	[52,156],
	[172,156],
	//lane 17
	[52,164],
	[172,164],
	//lane 18
	[52,172],
	[172,172],
	//lane 19
	[52,180],
	[172,180],
	//lane 20
	[12,188],
	[20,188],
	[28,188],
	[36,188],
	[44,188],
	[52,188],
	[60,188],
	[68,188],
	[76,188],
	[84,188],
	[92,188],
	[100,188],
	[124,188],
	[132,188],
	[140,188],
	[148,188],
	[156,188],
	[164,188],
	[172,188],
	[180,188],
	[188,188],
	[196,188],
	[204,188],
	[212,188],
	// lane 21
	[12,196],
	[52,196],
	[100,196],
	[124,196],
	[172,196],
	[212,196],
	// lane 22
	[12,204],
	[52,204],
	[100,204],
	[124,204],
	[172,204],
	[212,204],
	//lane 23
	[12,212],// groot
	[20,212],
	[28,212],
	[52,212],
	[60,212],
	[68,212],
	[76,212],
	[84,212],
	[92,212],
	[100,212],
	[124,212],
	[132,212],
	[140,212],
	[148,212],
	[156,212],
	[164,212],
	[172,212],
	[196,212],
	[204,212],
	[212,212],// groot
	// lane 24
	[28,220],
	[52,220],
	[76,220],
	[148,220],
	[172,220],
	[196,220],
	// lane 25
	[28,228],
	[52,228],
	[76,228],
	[148,228],
	[172,228],
	[196,228],
	//lane 26
	[12,236],
	[20,236],
	[28,236],
	[36,236],
	[44,236],
	[52,236],
	[76,236],
	[84,236],
	[92,236],
	[100,236],
	[124,236],
	[132,236],
	[140,236],
	[148,236],
	[172,236],
	[180,236],
	[188,236],
	[196,236],
	[204,236],
	[212,236],
	// lane 27
	[12,244],
	[100,244],
	[124,244],
	[212,244],
	// lane 28
	[12,252],
	[100,252],
	[124,252],
	[212,252],
	//lane 29
	[12,260],
	[20,260],
	[28,260],
	[36,260],
	[44,260],
	[52,260],
	[60,260],
	[68,260],
	[76,260],
	[84,260],
	[92,260],
	[100,260],
	[108,260],
	[116,260],
	[124,260],
	[132,260],
	[140,260],
	[148,260],
	[156,260],
	[164,260],
	[172,260],
	[180,260],
	[188,260],
	[196,260],
	[204,260],
	[212,260]
]

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
	//0=right 1=down 2=left 3=up. 1==| 2==_ 3== | 4== - 5==|_ 6==_| 7==-| 8==|-
	const dist = 2
	nodesMap.forEach(node => {
		// You can massively improve this by always keeping the direction in memory.
		// Two if statements for the sake of my sanity and debugging, remove if and only if this is the release canidate.
		if (player["coords"]["x"] < node[0] + dist && player["coords"]["x"] > node[0] - dist)
			if (player["coords"]["y"] < node[1] + dist && player["coords"]["y"] > node[1] - dist)
			{
				//console.log(player["coords"])
				//console.log(node)
				switch(node[2]){
					case 1:
						if (data == Direction.LEFT || !data){
							player["coords"]["x"] = node[0]
							player["coords"]["y"] = node[1]
						} else {
							if (data)
								player["direction"] = data
						}

						break
					case 2:
						if (data == Direction.DOWN || !data){
							player["coords"]["x"] = node[0]
							player["coords"]["y"] = node[1]
						} else {
							if (data)
								player["direction"] = data
						}
						break
					case 3:
						if (data == Direction.RIGHT || !data) {
							player["coords"]["x"] = node[0]
							player["coords"]["y"] = node[1]
						} else {
							if (data)
								player["direction"] = data
						}
						break
					case 4:
						if (data == Direction.UP || !data) {
							player["coords"]["x"] = node[0]
							player["coords"]["y"] = node[1]
						} else {
							if (data)
								player["direction"] = data
						}
						break
					case 5:
						if (data == Direction.LEFT || data == Direction.DOWN || !data) {
							player["coords"]["x"] = node[0]
							player["coords"]["y"] = node[1]
						} else {
							if (data)
								player["direction"] = data
						}
						break
					case 6:
						if (data == Direction.RIGHT || data == Direction.DOWN || !data) {
							player["coords"]["x"] = node[0]
							player["coords"]["y"] = node[1]
						} else {
							if (data)
								player["direction"] = data
						}
						break
					case 7:
						if (data == Direction.RIGHT || data == Direction.UP || !data) {
							player["coords"]["x"] = node[0]
							player["coords"]["y"] = node[1]
						} else {
							if (data)
								player["direction"] = data
						}
						break
					case 8:
						if (data == Direction.LEFT || data == Direction.UP || !data) {
							player["coords"]["x"] = node[0]
							player["coords"]["y"] = node[1]
						} else {
							if (data)
								player["direction"] = data
						}
						break
					default:
						if (data)
							player["direction"] = data
						else {
							player["coords"]["x"] = node[0]
							player["coords"]["y"] = node[1]
						}
				}
			}
	})
	movePlayer(player)
}

function checkBalls (player) {
	const dist = 20
	balls.forEach((ball,i) => {
		if (player["coords"]["x"] < ball[0] + dist  && player["coords"]["x"] > ball[0] - dist )
		if (player["coords"]["y"] < ball[1] + dist  && player["coords"]["y"] > ball[1] - dist )
		{
			balls.splice(i,1)
			player["score"] += 25
		}
	})
        if (balls.length===0)
	io.emit('updateState', "end")
	io.emit("updateBalls",balls)

}


function changeDirection(player, node){

}
const handleInput = (key, agent) => {
	//console.log(key)
	io.emit('UpdatePlayer', { key, agent })
}

// Handles the websocket client connect.
io.sockets.on("connection", socket => {
	console.log("User connected: " + socket.id)
	players[socket.id] = {
		coords: { x: 5, y: 29 },
		direction: Direction.RIGHT,
		score: 0,
		balls: balls
	}
	socket.emit("connected", players)
	socket.emit("connectedYou", socket.id)


	socket.on("disconnect", function () {
		console.log("User disconnected: " + socket.id)
		delete players[socket.id]
		socket.emit("disconnected", players)
	})

	socket.on("keyStroke", function (data) {
		//console.log(data)
		if (data>36 && data<41){
			checkMap(players[socket.id], data)
		}
	})

	socket.on("ClientMessage", (key, agent) => handleInput(key, agent))
})

const movePlayers = _ => {
	const localplayers = Object.keys(players)
	for (let i = 0; i < localplayers.length; i++) {
		if (i < 5) {
			let key = localplayers[i]
			checkBalls(players[key])
			checkMap(players[key], players["direction"])
		} else
		break;
	}}


function movePlayer(player){
	if (player["direction"] == Direction.RIGHT) { player["coords"]["x"] +=1 }
	if (player["direction"] == Direction.DOWN) { player["coords"]["y"] +=1 }
	if (player["direction"] == Direction.LEFT) { player["coords"]["x"] -= 1 }
	if (player["direction"] == Direction.UP) { player["coords"]["y"] -= 1 }
}

setInterval(function () {
	movePlayers()
	io.sockets.emit("updatePlayerPosition", players)
}, FPS)

const handleCommand = input => {
	if (input === '/quit')
		process.exit()
	if (input === "/balls")
		console.log(balls)
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
