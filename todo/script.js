let numsections = 1;
let boxIdCounter = 0;

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
        box.getAnimations().forEach(anim => anim.cancel());
        box.style.backgroundColor = "";
        box.style.transform = "none";
    }

    let section = box.closest(".categoryDiv");
    saveSection(section);
});

// ✅ Save title edits
document.addEventListener("input", (e) => {
    if (!e.target.classList.contains("categoryName")) return;

    let section = e.target.parentElement;
    saveSection(section);
});

function addBox(box) {
    let parentalDiv = box.parentElement.parentElement;
    let pDiv = box.parentElement;

    let inputField = pDiv.querySelector(".textAdd");
    if (!inputField || inputField.value.trim() === "") return;

    parentalDiv.removeChild(pDiv);

    let divc = document.createElement("div");
    divc.className = "row";
    divc.style.zIndex = "10";
    divc.style.position = "relative";

    let hDiv = document.createElement("div");
    hDiv.className = "hDiv";
    hDiv.onclick = (e) => { deleteme(e.currentTarget) };
    divc.appendChild(hDiv);

    let inputc = document.createElement("input");
    inputc.type = "checkbox";
    inputc.className = "checkboxBox";
    inputc.id = "box" + (++boxIdCounter);

    let originalCB = pDiv.querySelector(".checkboxBox");
    inputc.checked = originalCB.checked;
    inputc.style.backgroundColor = originalCB.checked ? "lightgreen" : "transparent";

    divc.appendChild(inputc);

    let labelc = document.createElement("label");
    labelc.className = "checkboxLabel";
    labelc.htmlFor = inputc.id;
    labelc.textContent = inputField.value;

    divc.appendChild(labelc);
    divc.appendChild(document.createElement("br"));

    parentalDiv.appendChild(divc);
    parentalDiv.appendChild(pDiv);

    saveSection(parentalDiv);

    inputField.value = "";
    inputField.focus();
}

function newSection() {
    let newDiv = document.createElement("div");
    newDiv.className = "categoryDiv";
    newDiv.id = "sec" + numsections;

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

    setCookie("sec" + numsections, "", 7);

    numsections++;
}

function deleteme(thing) {
    let section = thing.closest(".categoryDiv");
    thing.parentElement.parentElement.removeChild(thing.parentElement);

    saveSection(section);
}

function saveSection(section) {
    let rows = section.querySelectorAll(".row");
    let tasks = [];

    rows.forEach(row => {
        let label = row.querySelector(".checkboxLabel");
        let cb = row.querySelector(".checkboxBox");

        if (!label || !cb) return;

        tasks.push(label.textContent + "|" + cb.checked);
    });

    let title = section.querySelector(".categoryName").textContent;

    let data = "title||" + title + "##" + tasks.join("&#13565");

    setCookie(section.id, data, 7);
}

function loadTasks() {
    const allCookies = document.cookie.split(';');

    allCookies.forEach(cookie => {
        let [rawName, rawValue] = cookie.split('=');
        if (!rawName || !rawValue) return;

        let name = rawName.trim();
        let value = decodeURIComponent(rawValue);

        if (!name.startsWith("sec")) return;

        let section = document.getElementById(name);
        if (!section) return;

        if (value === "") return;

        let title = "Category";
        let tasksPart = value;

        if (value.includes("##")) {
            let parts = value.split("##");

            if (parts[0].startsWith("title||")) {
                title = parts[0].replace("title||", "");
            }

            tasksPart = parts[1];
        }

        section.querySelector(".categoryName").textContent = title;

        if (!tasksPart) return;

        let tasks = tasksPart.split("&#13565");

        tasks.forEach(taskData => {
            if (!taskData.trim()) return;

            let [taskText, checked] = taskData.split("|");

            let divc = document.createElement("div");
            divc.className = "row";
            divc.style.zIndex = "10";
            divc.style.position = "relative";

            let hDiv = document.createElement("div");
            hDiv.className = "hDiv";
            hDiv.onclick = (e) => { deleteme(e.currentTarget) };
            divc.appendChild(hDiv);

            let inputc = document.createElement("input");
            inputc.type = "checkbox";
            inputc.className = "checkboxBox";
            inputc.id = "box" + (++boxIdCounter);
            inputc.checked = (checked === "true");
            inputc.style.backgroundColor = inputc.checked ? "lightgreen" : "transparent";

            divc.appendChild(inputc);

            let labelc = document.createElement("label");
            labelc.className = "checkboxLabel";
            labelc.htmlFor = inputc.id;
            labelc.textContent = taskText;

            divc.appendChild(labelc);
            divc.appendChild(document.createElement("br"));

            let addRow = section.querySelector(".row:last-child");
            section.insertBefore(divc, addRow);
        });
    });
}

document.addEventListener("DOMContentLoaded", loadTasks);

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}