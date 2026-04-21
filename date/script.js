let now = new Date();

let then = new Date(2009, 11, 17);

let ms = now - then;

document.getElementById("years").textContent = (Math.floor(ms / 1000 / 60 / 60 / 24 / 365)).toString();

document.getElementById("months").textContent = (Math.floor(ms / 1000 / 60 / 24 / 30)).toString();

document.getElementById("days").textContent = (Math.floor(ms / 1000 / 60 / 24)).toString();