document.addEventListener('change', (e) => {
    if (!e.target.classList.contains('checkboxBox')) return;

    const box = e.target;
    box.getAnimations().forEach(anim => anim.cancel());

    if (box.checked) {
        box.animate([
            { transform: 'rotate(0deg) scale(1)', offset: 0 },
            { transform: 'skew(10deg, 5deg) rotate(-160deg) scale(1.3)', offset: 0.3},
            { transform: 'skew(15deg, 5deg) rotate(-180deg) scale(1.4)', offset: 0.5 },
            { transform: 'skew(10deg, 5deg) rotate(-200deg) scale(1.32)', offset: 0.7 },
            { transform: 'rotate(-360deg) scale(1)', offset: 1 }
        ], {
            duration: 1000,
            easing: "ease-out",
            fill: "forwards"
        });

        box.style.backgroundColor = "lightgreen";
    } else {
        box.style.backgroundColor = "";
        box.style.transform = "";
    }
});

function addBox(box) {
    let parentalDiv = box.parentElement.parentElement
    let pDiv = box.parentElement
    if (pDiv.querySelector(".textAdd").value === "") return;
    parentalDiv.removeChild(pDiv);
    let divc = document.createElement("div");
    divc.className = "row";
    divc.style.zIndex = "10";
    divc.style.position = "relative";
    let hDiv = document.createElement("div");
    hDiv.className = "hDiv";
    divc.appendChild(hDiv);
    hDiv.style.position = "absolute";
    hDiv.style.right = "0";
    hDiv.style.height = "15px";
    hDiv.style.width = "15px";
    hDiv.style.zIndex = "20";
    let inputc = document.createElement("input");
    inputc.type = "checkbox";
    inputc.className = "checkboxBox";
    inputc.id = "box" + (parentalDiv.querySelectorAll(".row").length + 1)
    inputc.checked = pDiv.querySelector(".checkboxBox").checked;
    inputc.style.backgroundColor = pDiv.querySelector(".checkboxBox").checked ? "lightgreen" : "transparent";
    divc.appendChild(inputc);
    let labelc = document.createElement("label");
    labelc.className = "checkboxLabel";
    labelc.htmlFor = inputc.id;
    let inputt = box.parentElement.querySelector(".textAdd");
    labelc.textContent = inputt.value;
    divc.appendChild(labelc);
    divc.appendChild(document.createElement("br"));
    parentalDiv.appendChild(divc);
    parentalDiv.appendChild(pDiv);
    pDiv.querySelector(".textAdd").value = "";
}

function newSection() {
    let newDiv = document.createElement("div");
    newDiv.className = "categoryDiv";
    let addH2 = document.createElement("h2");
    addH2.className = "categoryName";
    addH2.contentEditable = "plaintext-only";
    addH2.textContent = "Category";
    newDiv.appendChild(addH2);
    let newAddRow = document.createElement("div");
    newAddRow.className = "row";
    let newAddCB = document.createElement("input");
    newAddCB.type = "checkbox";
    newAddCB.className = "checkboxBox";
    newAddRow.appendChild(newAddCB);
    let newAddTxt = document.createElement("input");
    newAddTxt.type = "text";
    newAddTxt.className = "textAdd";
    newAddTxt.size = 10;
    newAddRow.appendChild(newAddTxt);
    let newAddBtn = document.createElement("button");
    newAddBtn.textContent = "Add";
    newAddBtn.onclick = function() {
        addBox(this);
    };
    newAddRow.appendChild(newAddBtn);
    newDiv.appendChild(newAddRow);
    document.body.insertBefore(newDiv, document.querySelector("#addDiv"));
}