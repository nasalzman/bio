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