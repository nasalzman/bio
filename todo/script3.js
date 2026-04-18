let sections = [];

document.addEventListener('change', async (e) => {
    if (!e.target.classList.contains('checkboxBox')) return;

    const box = e.target;

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

    const taskId = box.dataset.taskId;

    for (let section of sections) {
        for (let task of section.tasks) {
            if (task.id === taskId) {
                task.checked = box.checked;
            }
        }
    }

    for (let section of sections) {
        await section.saveSection();
    }
});

class Section {
    constructor(name = "Category") {
        let newDiv = document.createElement("div");
        newDiv.className = "categoryDiv";

        let addH2 = document.createElement("h2");
        addH2.className = "categoryName";
        addH2.contentEditable = "plaintext-only";
        addH2.textContent = name;
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
        newAddBtn.onclick = async () => {
            if (!newAddTxt.value.trim()) return;

            this.addTask(newAddTxt.value, newAddCB.checked);

            newAddTxt.value = "";
            newAddTxt.focus();
            newAddCB.checked = false;

            await this.saveSection();
        };
        newAddRow.appendChild(newAddBtn);

        newDiv.appendChild(newAddRow);

        document.body.insertBefore(newDiv, document.querySelector("#addDiv"));

        this.identity = newDiv;
        this.tasks = [];
        this.boxNum = 0;

        sections.push(this);
    }

    addTask(name, checked) {
        let task = new Task(name, checked);
        this.tasks.push(task);

        let divc = document.createElement("div");
        divc.className = "row";
        divc.style.zIndex = "10";
        divc.style.position = "relative";

        let inputc = document.createElement("input");
        inputc.type = "checkbox";
        inputc.className = "checkboxBox";
        inputc.id = "box" + (this.boxNum++);
        inputc.dataset.taskId = task.id;

        inputc.checked = task.checked;
        inputc.style.backgroundColor = inputc.checked ? "lightgreen" : "transparent";
        divc.appendChild(inputc);

        let labelc = document.createElement("label");
        labelc.className = "checkboxLabel";
        labelc.htmlFor = inputc.id;
        labelc.textContent = task.name;
        divc.appendChild(labelc);

        divc.appendChild(document.createElement("br"));

        this.identity.insertBefore(divc, this.identity.querySelector(".special"));
    }

    getName() {
        return this.identity.querySelector(".categoryName").textContent;
    }

    async saveSection() {
        let data = "";

        for (let task of this.tasks) {
            data += "|Ô|" + task.name + "|·¯|" + task.checked;
        }

        await cookieStore.set({
            name: this.getName(),
            value: data
        });
    }
}

class Task {
    constructor(name, checked) {
        this.name = name;
        this.checked = checked;
        this.id = crypto.randomUUID();
    }
}

window.addEventListener("DOMContentLoaded", async function () {
    let totalCookies = await cookieStore.getAll();

    totalCookies.forEach((c) => {
        let section = new Section(c.name);

        let tasks = c.value.split("|Ô|");

        tasks.forEach(task => {
            if (task === "") return;

            let [name, checkedStr] = task.split("|·¯|");
            let checked = checkedStr === "true";

            section.addTask(name, checked);
        });
    });
});