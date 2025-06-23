// Initialize tasks array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// DOM elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const counter = document.getElementById('counter');

// Display tasks on page load
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    updateCounter();
});

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({
            id: Date.now(),
            text: taskText,
            completed: false
        });
        saveTasks();
        taskInput.value = '';
        renderTasks();
        updateCounter();
    }
}

// Render tasks based on filter
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    
    let filteredTasks = tasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        taskList.appendChild(li);
    });
}

// Toggle task completion status
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task
    );
    saveTasks();
    renderTasks();
    updateCounter();
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateCounter();
}

// Filter tasks
function filterTasks(filter) {
    renderTasks(filter);
}

// Clear completed tasks
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    updateCounter();
}

// Update task counter
function updateCounter() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    counter.textContent = `${activeTasks} ${activeTasks === 1 ? 'task' : 'tasks'} remaining`;
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Allow adding tasks with Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});