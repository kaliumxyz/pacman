"use strict"
const Gamestate = {
        START: 0,
        DEAD: 1,
        PLAYING: 2,
        WIN: 3
}

const Direction = {
        NEUTRAL: 0,
        RIGHT: 39,
        DOWN: 40,
        LEFT: 37,
        UP: 38
}

const socket = io.connect("http://127.0.0.1:3000")
const canvas = select('canvas')
const context = canvas.getContext('2d')
const FPS = 1000 / 25
context.imageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
// Creates a new image object.
const sheet = new Image()
sheet.src = "sprites.png"

// Loads the sounds we will use.
// All .wav files are from: http://www.classicgaming.cc/classics/pac-man/sounds
const opening = new Audio("sounds/opening.ogg")
const waka = new Audio("sounds/waka.ogg")
const dead = new Audio("sounds/dead.ogg")

opening.play()

let myself = 0 //my own id
let players = {}
let balls = []
let gameState = Gamestate.START

// Gets every key the user presses and sends them to the server.
window.onkeydown = e => socket.emit("keyStroke", e.keyCode)

// window.onkeydown = e => moveCharacter(e.keyCode)

// Gets the diraction and sends it.
// function moveCharacter(keyCode) {
//     if (keyCode === Direction.RIGHT || keyCode === Direction.DOWN || keyCode === Direction.LEFT || keyCode === Direction.UP) {
//         socket.emit("updatePlayerDirection", keyCode)
//     }
// }

function drawPlayers() {
        const localplayers = Object.keys(players)
        let key = 0
        for (let i = 0; i < localplayers.length; i++) {
                if (i < 5) {
                        key = localplayers[i]
                        let x = players[key]["coords"]["x"]
                        let y = players[key]["coords"]["y"]
                        let heightSpritePacman = 0 //To get the right pacman from the spritesheet
                        if (players[key]["direction"] == Direction.RIGHT) { heightSpritePacman = 298 }
                        if (players[key]["direction"] == Direction.DOWN) { heightSpritePacman = 330 }
                        if (players[key]["direction"] == Direction.LEFT) { heightSpritePacman = 282 }
                        if (players[key]["direction"] == Direction.UP) { heightSpritePacman = 314 }

                        context.drawImage(sheet, 209, heightSpritePacman, 13, 13, x, y, 13, 13)
                        console.log(players[key]["coords"]["x"])
                } else {
                        //spectators should not be drawn
                        break
                }
        }
}

function drawBalls() {
        for (var ball = 0; ball < balls.length; ball++) {
                context.fillRect(ball[0] - 3, ball[1] - 3, 6, 6)
        }
}

socket.on("connected", function updatePlayers(data) {
        players = data
        console.log("onconnect")
})

socket.on("connectedYou", function (data) {
        myself = data
})

socket.on("disconnect", function updatePlayerPosition(data) {
        players = data
})

socket.on("updatePlayerPosition", function updatePlayerPosition(data) {
        players = data
})


function GameLoop() {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(sheet, 0, 0, 224, 248, 0, 24, 224, 248)
        //drawBalls()
        drawPlayers()
}

const game = window.setInterval(_ => GameLoop(), FPS)
