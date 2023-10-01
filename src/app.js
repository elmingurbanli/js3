const openColumn = document.getElementById('openColumn');
const inProgressColumn = document.getElementById('inProgressColumn');
const completedColumn = document.getElementById('completedColumn');
const createTaskBtn = document.getElementById('createTask');
const taskNameInput = document.getElementById('taskName');

let tasks = [];

// Local Storage'dan verileri al
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    openColumn.innerHTML = '';
    inProgressColumn.innerHTML = '';
    completedColumn.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.textContent = task.name;

        taskElement.draggable = true;
        taskElement.dataset.id = task.id;
        taskElement.dataset.status = task.status;

        taskElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.id);
        });

        if (task.status === 'open') {
            openColumn.appendChild(taskElement);
        } else if (task.status === 'in-progress') {
            inProgressColumn.appendChild(taskElement);
        } else if (task.status === 'completed') {
            completedColumn.appendChild(taskElement);
        }
    }
}

createTaskBtn.addEventListener('click', () => {
    const taskName = taskNameInput.value.trim();
    if (taskName) {
        const newTask = {
            id: Date.now(),
            name: taskName,
            status: 'open',
        };
        tasks.push(newTask);
        saveTasks();
        taskNameInput.value = '';
        renderTasks();
    }
});

openColumn.addEventListener('dragover', (e) => {
    e.preventDefault();
});

inProgressColumn.addEventListener('dragover', (e) => {
    e.preventDefault();
});

completedColumn.addEventListener('dragover', (e) => {
    e.preventDefault();
});

openColumn.addEventListener('drop', (e) => {
    const taskId = e.dataTransfer.getData('text/plain');
    const taskIndex = tasks.findIndex((task) => task.id == taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].status = 'open';
        saveTasks();
        renderTasks();
    }
});

inProgressColumn.addEventListener('drop', (e) => {
    const taskId = e.dataTransfer.getData('text/plain');
    const taskIndex = tasks.findIndex((task) => task.id == taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].status = 'in-progress';
        saveTasks();
        renderTasks();
    }
});

completedColumn.addEventListener('drop', (e) => {
    const taskId = e.dataTransfer.getData('text/plain');
    const taskIndex = tasks.findIndex((task) => task.id == taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].status = 'completed';
        saveTasks();
        renderTasks();
    }
});

renderTasks();
