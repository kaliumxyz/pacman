"use strict"
const Gamestate = {
    START: 0,
  //  DEAD: 1,
    PLAYING: 2,
  //  WIN: 3
    END: 4
}

const Direction = {
        NEUTRAL: 0,
        RIGHT: 39,
        DOWN: 40,
        LEFT: 37,
        UP: 38
}

const socket = io.connect("http://127.0.0.1:3000/")
const canvas = select("canvas")
const context = canvas.getContext("2d")
context.imageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;
context.mozImageSmoothingEnabled = false;
const FPS = 1000 / 25


// Creates a new image object for the sprites we need
const sheet = new Image()
sheet.src = "sprites.png"

// Loads the sounds we will use.
// All .wav files are from: http://www.classicgaming.cc/classics/pac-man/sounds
const opening = new Audio("sounds/opening.ogg")
const waka = new Audio("sounds/waka.ogg")
const dead = new Audio("sounds/dead.ogg")
let spriteY = 209 // uniform naming will be fixed later, I'm too tired.

let sound = true
function Mute() {
    sound = !sound
    if (sound) { opening.play() } else { opening.pause() }
}   


let myself = 0 //my own id
let players = {}
let score = 0

// [[x,y],[x,y]] on map
let balls = [[12, 36], [20, 36], [28, 36], [36, 36], [44, 36], [52, 36], [60, 36], [68, 36], [76, 36], [84, 36], [92, 36], [100, 36], [124, 36], [132, 36], [140, 36], [148, 36], [156, 36], [164, 36], [172, 36], [180, 36], [188, 36], [196, 36], [204, 36], [212, 36], [12, 44], [52, 44], [100, 44], [124, 44], [172, 44], [212, 44], [12, 52], [52, 52], [100, 52], [124, 52], [172, 52], [212, 52], [12, 60], [52, 60], [100, 60], [124, 60], [172, 60], [212, 60], [12, 68], [20, 68], [28, 68], [36, 68], [44, 68], [52, 68], [60, 68], [68, 68], [76, 68], [84, 68], [92, 68], [100, 68], [108, 68], [116, 68], [124, 68], [132, 68], [140, 68], [148, 68], [156, 68], [164, 68], [172, 68], [180, 68], [188, 68], [196, 68], [204, 68], [212, 68], [12, 76], [52, 76], [76, 76], [148, 76], [172, 76], [212, 76], [12, 84], [52, 84], [76, 84], [148, 84], [172, 84], [212, 84], [12, 92], [20, 92], [28, 92], [36, 92], [44, 92], [52, 92], [76, 92], [84, 92], [92, 92], [100, 92], [124, 92], [132, 92], [140, 92], [148, 92], [172, 92], [180, 92], [188, 92], [196, 92], [204, 92], [212, 92], [52, 100], [172, 100], [52, 108], [172, 108], [52, 116], [172, 116], [52, 124], [172, 124], [52, 132], [172, 132], [52, 140], [172, 140], [52, 148], [172, 148], [52, 156], [172, 156], [52, 164], [172, 164], [52, 172], [172, 172], [52, 180], [172, 180], [12, 188], [20, 188], [28, 188], [36, 188], [44, 188], [52, 188], [60, 188], [68, 188], [76, 188], [84, 188], [92, 188], [100, 188], [124, 188], [132, 188], [140, 188], [148, 188], [156, 188], [164, 188], [172, 188], [180, 188], [188, 188], [196, 188], [204, 188], [212, 188], [12, 196], [52, 196], [100, 196], [124, 196], [172, 196], [212, 196], [12, 204], [52, 204], [100, 204], [124, 204], [172, 204], [212, 204], [12, 212], [20, 212], [28, 212], [52, 212], [60, 212], [68, 212], [76, 212], [84, 212], [92, 212], [100, 212], [124, 212], [132, 212], [140, 212], [148, 212], [156, 212], [164, 212], [172, 212], [196, 212], [204, 212], [212, 212], [28, 220], [52, 220], [76, 220], [148, 220], [172, 220], [196, 220], [28, 228], [52, 228], [76, 228], [148, 228], [172, 228], [196, 228], [12, 236], [20, 236], [28, 236], [36, 236], [44, 236], [52, 236], [76, 236], [84, 236], [92, 236], [100, 236], [124, 236], [132, 236], [140, 236], [148, 236], [172, 236], [180, 236], [188, 236], [196, 236], [204, 236], [212, 236], [12, 244], [100, 244], [124, 244], [212, 244], [12, 252], [100, 252], [124, 252], [212, 252], [12, 260], [20, 260], [28, 260], [36, 260], [44, 260], [52, 260], [60, 260], [68, 260], [76, 260], [84, 260], [92, 260], [100, 260], [108, 260], [116, 260], [124, 260], [132, 260], [140, 260], [148, 260], [156, 260], [164, 260], [172, 260], [180, 260], [188, 260], [196, 260], [204, 260], [212, 260]]


let gameState = Gamestate.START

window.onkeydown = e => moveCharacter(e.keyCode)

// Gets every key the user presses and sends them to the server.
window.onkeydown = e => socket.emit("keyStroke", e.keyCode)

function move(side) {
    if (side == "up") {
        socket.emit("keyStroke", Direction.UP)
    }
    else if (side == "left") {
        socket.emit("keyStroke", Direction.LEFT)
    }
    else if (side == "right") {
        socket.emit("keyStroke", Direction.RIGHT)
    }
    else if (side == "down") {
        socket.emit("keyStroke", Direction.DOWN)
    }
    else {
        console.log("No idea what you are doing but please to it.")
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

function drawBalls() {
    context.fillStyle = "#FF9E83"
    for (var b = 0; b < balls.length; b++) {
        if (balls[b][2] == undefined) {
            if (b == 30 || b == 35 || b == 158 || b == 177) { context.fillRect(balls[b][0] - 3, balls[b][1] - 3, 6, 6) } else {
                context.fillRect(balls[b][0] - 1, balls[b][1] - 1, 2, 2)
            }
        }
    }
}

function drawPlayers() {
    const localplayers = Object.keys(players)
    let playerDiv = document.getElementById("scores") //It might be better to only update changes
    playerDiv.innerHTML = ''
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

            context.drawImage(sheet, spriteY, heightSpritePacman, 13, 13, x, y, 13, 13)
            let item = document.createElement("li")
            item.innerHTML = "<li>" + key + " : " + players[key]["score"] + "</li>"
            playerDiv.appendChild(item)
        } else {
            //spectators should not be drawn
            break
        }
    }
}

let gametimer = 0
function drawScore() {
    if (gameState === Gamestate.START) {
        context.fillStyle = "#ffffff"
        context.font = "18px _sans"
        context.textBaseline = "top"
        context.fillText("Have fun playing", 20, 0)
        gametimer++
        if (gametimer === 30) {
            gameState = Gamestate.PLAYING
        }
    }
    else if (gameState === Gamestate.END) {
        context.fillStyle = "#ffffff"
        context.font = "18px _sans"
        context.textBaseline = "top"
        context.fillText("Your final score: " + score, 20, 0)
        context.font = "20px _sans"
        context.fillText("press R to go back to the main menu", 20, 80)
    }
    else if (gameState === Gamestate.PLAYING) {
        context.fillStyle = "#ffffff"
        context.font = "18px _sans"
        context.textBaseline = "top"
        context.fillText("Your score is: " + score, 20, 0)
    }
    else {
        console.log("The game is alienated. Please restart the game to bring him back to his good old self")
    }
}


function GameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(sheet, 0, 0, 224, 248, 0, 24, 224, 248)
    drawBalls()
    drawPlayers()
    drawScore()
}

const game = window.setInterval(_ => GameLoop(), FPS)


const animate = window.setInterval(_ =>{
  if (spriteY<196){
    spriteY += 16
} else {
  spriteY = 177
}}, 500)

