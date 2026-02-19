let num = 0;
let wins = 0;

function decrease() {
    num --;
    num = num % 10;
    document.getElementById("guessTheNumber").textContent = num;
}

function increase() {
    num ++;
    num = num % 10;
    document.getElementById("guessTheNumber").textContent = num;
}

function guess() {
    let num2 = Math.floor(Math.random() * 10);
    if (num === num2) {
        wins ++;
    }
    document.getElementById("wins").textContent = "Play guess the number (wins: " + wins + ")";
}