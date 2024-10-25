const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const showAllButton = document.getElementById("showAll");
const showCompletedButton = document.getElementById("showCompleted");
const showcheckedButton = document.getElementById("showchecked");

let tasks = [];
let filter = 'all';

function renderTasks() {
    taskList.innerHTML = "";
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'checked') return !task.completed;
        return true; 
    });

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        if (task.completed) {
            listItem.classList.add("completed-task");
        }

        const taskContent = document.createElement("div");
        taskContent.className = "task-content"; 
        taskContent.style.display = "flex";
        taskContent.style.alignItems = "center";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const dateSpan = document.createElement("span");
        dateSpan.textContent = task.date;

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "deleteBtn")
        deleteButton.textContent = "❌";
        deleteButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            renderTasks();
        });

        taskText.addEventListener("dblclick", () => {
            const input = document.createElement("input");
            input.type = "text";
            input.value = task.text;
            input.addEventListener("keypress", (event) => {
                if (event.key === "Enter") {
                    task.text = input.value.trim();
                    renderTasks();
                }
            });
            listItem.replaceChild(input, taskText);
            input.focus();
        });


        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskText);
        listItem.appendChild(taskContent);

        taskInfo.appendChild(dateSpan);
        taskInfo.appendChild(deleteButton);
        listItem.appendChild(taskInfo);
        taskList.appendChild(listItem);
    });
}

showAllButton.addEventListener("click", () => {
    filter = 'all';
    renderTasks();
});

showCompletedButton.addEventListener("click", () => {
    filter = 'completed';
    renderTasks();
});

showcheckedButton.addEventListener("click", () => {
    filter = 'checked';
    renderTasks();
});

taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const taskTextValue = taskInput.value.trim();
        if (taskTextValue) {
            const date = new Date();
            const formattedDate = date.toLocaleString();
            tasks.push({ text: taskTextValue, date: formattedDate, completed: false });
            taskInput.value = "";
            renderTasks();
        }
    }
});

renderTasks();
