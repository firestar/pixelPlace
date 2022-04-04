// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

// ==UserScript==
// @name         Numi Template System
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  do what we say
// @author       tt2468
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// @license      GNU GPLv3
// @downloadURL none
// ==/UserScript==

var child = null;


function getImage() {
    var temp = Math.random();
    var scaled = document.createElement("img");
    scaled.src = 'https://raw.githubusercontent.com/firestar/pixelPlace/template_release/template.png?t='+temp;
    scaled.width = 2000;
    scaled.height = 2000;
    scaled.style.imageRendering = "pixelated";
    scaled.style.top=0;
    scaled.style.zIndex=999;
    scaled.style.left=0;
    scaled.style.position = "absolute";
    return scaled;
}

function refreshTemplate() {
    var x = document.getElementsByTagName("mona-lisa-embed")[0].shadowRoot.children[0].getElementsByTagName("mona-lisa-canvas")[0].shadowRoot.children[0];
    if (child) {
        x.removeChild(child);
    }
    child = getImage();
    x.appendChild(child);

    console.log("Template has been updated.");
}

function refreshTemplateLoop() {
    refreshTemplate();
    setTimeout(function() { refreshTemplateLoop(); }, 300*1000);
}

(function() {
    function addButton(text, onclick, cssObj) {
        cssObj = cssObj || {position: 'absolute', bottom: '5%', left:'4%', 'z-index': 3}
        let button = document.createElement('button'), btnStyle = button.style
        document.body.appendChild(button)
        button.innerHTML = text
        button.onclick = onclick
        btnStyle.position = 'absolute'
        Object.keys(cssObj).forEach(key => {btnStyle[key] = cssObj[key]})
        return button
    }

    window.addEventListener('load', () => {
        setTimeout(function() { refreshTemplateLoop(); }, 4000);
        addButton('Update Template', refreshTemplate)
    })
})();
