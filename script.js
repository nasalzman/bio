let num = 0;
let wins = 0;

function decrease() {
    if (num > 0) {
        num --;
    } else {
        num = 9;
    }
    document.getElementById("guessTheNumber").textContent = num;
}

function increase() {
    if (num < 9) {
        num ++;
    } else {
        num = 0;
    }
    document.getElementById("guessTheNumber").textContent = num;
}

function guess() {
    let num2 = Math.floor(Math.random() * 10);
    if (num === num2) {
        wins ++;
    }
    document.getElementById("wins").textContent = "Play guess the number (wins: " + wins + ")";
}

const canvas = document.querySelector("#bouncyImageCanvas");
const ctx = canvas.getContext("2d");
const img = new Image();

let frames = [
    [0, 87],
    [88, 77],
    [166, 72],
    [239, 79],
    [319, 83],
    [403, 75],
    [479, 78],
    [558, 75],
    [634, 73],
    [708, 58],
    [767, 60],
    [828, 60],
    [889, 59],
    [949, 75],
]

img.src = "ryu.png";

let i = 0;
let interval = null;

function shoryuken() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const [sx, sw] = frames[i];
    const sh = 161;

    ctx.drawImage(img, sx, 0, sw, sh, 0, 0, sw, sh);

    i++;

    if (i >= 14) {
        clearInterval(interval);
        i = 0;
        interval = null;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (interval) return;
        interval = setInterval(shoryuken, 50);
    }
});