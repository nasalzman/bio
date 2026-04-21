let now = new Date();

let then = new Date(2009, 11, 17);

document.getElementById("date").innerText = new Date(now - then).toUTCString();