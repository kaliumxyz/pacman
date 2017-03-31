"use strict"
const select = selector => document.querySelector(selector)
const load = callback => {
	select('div').remove()
	let div = document.createElement('div')
	div.innerHTML = '<canvas width="224" height="288">please upgrade your browser.</canvas>' +
		'<button onclick="loadMenu()"> Back to menu</button>' +
		'<button onclick="Mute()">Toggle sound</button>' +
		'<div style="text-align:center;width:480px;">' +
		'<button ontouch="move(\'up\')">UP</button><br><br>' +
		'<button ontouch="move(\'left\')">LEFT</button>' +
		'<button ontouch="move(\'right\')">RIGHT</button><br><br>' +
		'<button ontouch="move(\'down\')">DOWN</button>' +
		'</div>' +
		'<div id="divScores" class="scoreboard">' +
		'<h1>Points</h1>' +
		'<ul id="scores">' +
		'<li>' +
		'<li>' +
		'</li>' +
		'</li>' +
		'</ul>' +
		'</div> '
	select('body').appendChild(div)

	let script = document.createElement('script')
	script.setAttribute("src",'client.js')
	select("head").appendChild(script)
}

window.onkeydown = e => e.keyCode===32 && load()


const loadMenu = callback => {
	select('div').remove()
	let div = document.createElement('div')
	div.setAttribute('class','mainMenu')
	div.innerHTML = document.getElementById('menuScript').innerHTML;
	select('body').appendChild(div)
}



const loadTestTabel = callback => {
	select('div').remove()
	let div = document.createElement('div')
	div.innerHTML = document.getElementById('testTabel').innerHTML;
	select('body').appendChild(div)
}

