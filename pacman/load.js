"use strict"
const select = selector => document.querySelector(selector)
const load = callback => {
	select('div').remove()
	let div = document.createElement('div')
	div.innerHTML = '<canvas width="224" height="288">please upgrade your browser.</canvas>' +
		'<div class="controls">' +
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
		'</div>'+
		'</div>'
	div.setAttribute('class','mainScreen')
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
	div.innerHTML = '<div class="mainMenu">' +
		'<div id="menu">' +
		'<button onclick="load()" >Play</button> <!--go to lobby-->' +
		'<button onclick="" >Sound</button>' +
		'<button onclick="" >Credits</button>' +
		'<button onclick="loadTestTabel()">test Tabel</button>' +
		'</div>' +
		'<div class="videoContainer">' +
		'<video width=\'224\' height=\'288\' loop autoplay>' +
		'<source src=\'video.mp4\' type=\'video/mp4\'>' +
		'</video>' +
		'</div>' +
		'</div>' 
	select('body').appendChild(div)
}



const loadTestTabel = callback => {
	select('div').remove()
	let div = document.createElement('div')
	div.innerHTML =	'<h1>Test Tabel</h1>' +
		'<button onclick=\'loadMenu()\'> Back to menu</button>' +
		'<table>' +
		'<tr>' +
		'<th>User story</th>' +
		'<th>Chrome</th>' +
		'<th>Edge</th>' +
		'<th>FireFox</th>' +
		'<th>Opera</th>' +
		'</tr>' +
		'<tr>' +
		'<td>Als pacman speler wil ik mijn character kunnen bewegen, zodat ik niet opgegeten word.</td>' +
		'<td>Dit werkt</td>' +
		'<td>Helaas krijgen wij hier een SCRIPT7002 error</td>' +
		'<td>Dit werkt</td>' +
		'<td>Dit werkt</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Als pacman speler wil ik balletjes kunnen opeten, zodat ik punten kan verdienen.</td>' +
		'<td></td>' +
		'<td>Helaas krijgen wij hier een SCRIPT7002 error</td>' +
		'<td></td>' +
		'<td></td>' +
		'</tr>' +
		'<tr>' +
		'<td>Als pacman speler wil ik punten krijgen voor opgegeten balletjes, zodat ik kan opscheppen over mijn score.</td>' +
		'<td></td>' +
		'<td>Helaas krijgen wij hier een SCRIPT7002 error</td>' +
		'<td></td>' +
		'<td></td>' +
		'</tr>' +
		'<tr>' +
		'<td>Als ghost speler wil ik de pacman speler kunnen opeten, zodat hij weinig punten krijgt.</td>' +
		'<td></td>' +
		'<td>Helaas krijgen wij hier een SCRIPT7002 error</td>' +
		'<td></td>' +
		'<td></td>' +
		'</tr>' +
		'<tr>' +
		'<td>Als speler wil ik geluid kunnen horen, zodat ik mij meer bij het spel betrokken voel.</td>' +
		'<td>Dit werkt</td>' +
		'<td>Dit werkt</td>' +
		'<td>Dit werkt</td>' +
		'<td>Dit werkt</td>' +
		'</tr>' +
		'<tr>' +
		'<td>Als speler wil ik geluid kunnen muten, omdat ik het een irritant geluidje vind.</td>' +
		'<td>Dit werkt</td>' +
		'<td>Helaas krijgen wij hier een SCRIPT7002 error</td>' +
		'<td>Dit werkt</td>' +
		'<td></td>' +
		'</tr>' +
		'</table>' +
		'<section>' +
		'<p>Our HTML is valid HTML5 according to <a href="https://validator.w3.org/nu/#textarea">W3</a></p>' +
		'<p>Our CSS is valid CSS3 according to <a href="https://jigsaw.w3.org/css-validator/validator">Jigsaw</a></p>' +
		'<p>Our clientside javascript is valid ECMAScript 6 according to <a href="https://www.piliapp.com/syntax-check/es6/">pilipapp</a></p>' +
		'<p>Our serverside javascript is valid ECMAScript 6 according to <a href="https://www.piliapp.com/syntax-check/es6/">pilipapp</a></p>' +
		'</section> '
	select('body').appendChild(div)
}

loadMenu()
