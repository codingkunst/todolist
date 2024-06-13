let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let mode = 'all'

addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function(event) {
        filter (event);
    });
}

function addTask () {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render () {
    //  선택한 탭에 따라서
    let list = [];
    if (mode === 'all') {
        list = taskList;
    } else if (mode === 'ongoing' || mode === 'done') {
        list = filterList;
    }

    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `
            <div class="task">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="delteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`;
        } else {
            resultHTML += `
            <div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="delteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete (id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function delteTask (id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}

function filter(event) {
    filterList = [];
    if (mode === "all") {
        // 전체 리스트 보여줌
        render();
    } else if (mode === "ongoing") {
        // 진행 중인 리스트 보여줌
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i] === false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if (mode === "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i] === true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

// 랜덤 id 값
function randomIDGenerate () {
    return '-' + Math.random().toString(36).substr(2, 9);
}
