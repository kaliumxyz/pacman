"use strict"
const select = selector => document.querySelector(selector)
const load = callback => {
	let canvas = document.createElement('canvas')
	canvas.setAttribute('width', '224')
	canvas.setAttribute('height', '288')
	select('body').appendChild(canvas)
	let script = document.createElement('script')
	script.setAttribute("src",'client.js')
	select("head").appendChild(script)
        select('div').remove()
}

window.onkeydown = e => e.keyCode===32 && load()
