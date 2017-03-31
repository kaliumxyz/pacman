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

    let scores = document.createElement('div')
    scores.setAttribute('id', 'divScores')
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
