let tasks = [];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();

  if (taskText) {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      date: null,
      time: null,
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
  }
});

// Mark task as completed
function toggleCompleted(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Edit task
function editTask(id) {
  const newText = prompt('Edit task:', tasks.find(t => t.id === id).text);
  if (newText !== null) {
    const task = tasks.find(t => t.id === id);
    task.text = newText;
    renderTasks();
  }
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.completed) taskElement.classList.add('completed');
    taskElement.innerHTML = `
      <span>
        ${task.text} 
        ${task.date ? `- ${task.date}` : ''} 
        ${task.time ? `at ${task.time}` : ''}
      </span>
      <div>
        <button onclick="toggleCompleted(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskElement);
  });
}
