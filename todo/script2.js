numsections = 0;

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
});

class Section {
    constructor() {
        let newDiv = document.createElement("div");
        newDiv.className = "categoryDiv";

        let addH2 = document.createElement("h2");
        addH2.className = "categoryName";
        addH2.contentEditable = "plaintext-only";
        addH2.textContent = "Category";
        newDiv.appendChild(addH2);

        let newAddRow = document.createElement("div");
        newAddRow.className = "row special";

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
        newAddBtn.onclick = () => {
            this.addTask(newAddTxt.value, newAddCB.checked);
            newAddTxt.value = "";
            newAddTxt.focus();
            newAddCB.checked = false;
        };
        newAddRow.appendChild(newAddBtn);

        newDiv.appendChild(newAddRow);

        document.body.insertBefore(newDiv, document.querySelector("#addDiv"));

        this.identity = newDiv;
        numsections ++;

        document.cookie = "sec" + numsections + "=; expires=" + (new Date(new Date().getTime() + 604800000).toUTCString());
        this.sectionID = numsections;
    }

    tasks = [];
    boxNum = 0;

    addTask(name, checked) {
        let task = new Task(name, checked);
        this.tasks.push(task);

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
        inputc.id = "box" + (this.boxNum++);

        inputc.checked = task.checked_
        inputc.style.backgroundColor = inputc.checked_ ? "lightgreen" : "transparent";
        divc.appendChild(inputc);

        let labelc = document.createElement("label");
        labelc.className = "checkboxLabel";
        labelc.htmlFor = inputc.id;
        labelc.textContent = task.name_;
        divc.appendChild(labelc);

        divc.appendChild(document.createElement("br"));

        this.identity.insertBefore(divc, this.identity.querySelector(".special"));

        document.cookie = this.sectionID + "=" + getCookie(this.sectionID) + "|{+|" + name + "|4Í|" + checked + "; expires=" + (new Date(new Date().getTime() + 604800000).toUTCString());
    }
}

class Task {
    constructor(name_, checked_) {
        this.name_ = name_;
        this.checked_ = checked_;
    }
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

let totalCookies = document.cookie.split(";");
totalCookies.forEach(c => {
    let s = new Section();
    let tasks = c.split("|{+|");
    tasks.forEach(t => {
        let attr = t.split("|4Í|");
        s.addTask(attr[0], attr[1]);
    })
})