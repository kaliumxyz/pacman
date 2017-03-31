"use strict"
const select = selector => document.querySelector(selector)
const load = callback => {
    select('div').remove()
    let div = document.createElement('div')

	let canvas = document.createElement('canvas')
	canvas.setAttribute('width', '224')
    canvas.setAttribute('height', '288')
    div.appendChild(canvas)

    let backButton = document.createElement('span')
    backButton.innerHTML = '<button onclick="loadMenu()"> Back to menu</button>'
    div.appendChild(backButton)

    let soundButton = document.createElement('span')
    soundButton.innerHTML = '<button onclick="Mute()">Toggle sound</button>'
    div.appendChild(soundButton)

    let controlles = document.createElement('div')
    controlles.innerHTML = `<div style="text-align:center;width:480px;">
  <button ontouch="move('up')">UP</button><br><br>
  <button ontouch="move('left')">LEFT</button>
  <button ontouch="move('right')">RIGHT</button><br><br>
  <button ontouch="move('down')">DOWN</button>
</div>`
    div.appendChild(controlles)


    let scores = document.createElement('div')
    scores.setAttribute('id', 'divScores')
    scores.setAttribute('class','scoreboard')
    scores.innerHTML = `<h1>Points</h1> <ul id="scores"></ul>`
    div.appendChild(scores)

    select('body').appendChild(div)
   

	let script = document.createElement('script')
	script.setAttribute("src",'client.js')
	select("head").appendChild(script)
}

window.onkeydown = e => e.keyCode===32 && load()


const loadMenu = callback => { 
    select('div').remove()
    let div = document.createElement('div')
    div.innerHTML = document.getElementById('menuScript').innerHTML;
    select('body').appendChild(div)
}



const loadTestTabel = callback => {
    select('div').remove()
    let div = document.createElement('div')
    div.innerHTML = document.getElementById('testTabel').innerHTML;
    select('body').appendChild(div)
}

