function sub() {
    const p = document.getElementById("time");

    const date = new Date(document.getElementById("date").value);

    let now = new Date();

    let time = now - date;

    p.innerText = `Years: ${Math.floor(time / 31536000000)}, Months: ${Math.floor(time / 2592000000)}, Days: ${Math.floor(time / 86400000)}`
}