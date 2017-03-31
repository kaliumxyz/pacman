"use strict"
const select = selector => document.querySelector(selector)
const load = callback => {
    select('div').remove()
    let div = document.createElement('div')

	let canvas = document.createElement('canvas')
	canvas.setAttribute('width', '224')
    canvas.setAttribute('height', '288')
    div.appendChild(canvas)

    let span = document.createElement('span')
    span.innerHTML = '<button onclick="loadMenu()" ></button>'
    div.appendChild(span)
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

