const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const ul = document.querySelector('ul');

let tasks = [];

// Load tasks from local storage
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => {
    addTaskToList(task);
  });
}

// Add new task to list
function addTaskToList(task) {
  const li = document.createElement('li');
  li.textContent = task;
  const button = document.createElement('button');
  button.textContent = 'X';
  button.addEventListener('click', () => {
    deleteTaskFromList(task);
  });
  li.appendChild(button);
  ul.appendChild(li);
}

// Delete task from list
function deleteTaskFromList(task) {
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  ul.innerHTML = '';
  tasks.forEach(task => {
    addTaskToList(task);
  });
}

// Submit form to add task to list
form.addEventListener('submit', event => {
  event.preventDefault();
  const task = input.value.trim();
  if (task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaskToList(task);
    input.value = '';
  }
});

// Mark task as completed or delete it from list
ul.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('completed');
    const task = event.target.textContent;
    tasks = tasks.map(t => t === task ? `_${t}_` : t);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  else if (event.target.tagName === 'BUTTON') {
    const task = event.target.parentNode.textContent;
    deleteTaskFromList(task);
  }
});
