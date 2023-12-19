// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('title');
appDiv.innerHTML = `To Do List`;

const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addTaskBtn = document.getElementById('addTaskBtn') as HTMLButtonElement;
const taskList = document.getElementById('taskList');

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

let tasks: Task[] = [];

tasks = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
  : [];

displayTasks();

function addTask(title: string): void {
  let newTask: Task = {
    id: tasks.length + 1,
    title: title,
    completed: false,
  };

  tasks.push(newTask);
  updateLocalStorage();
  displayTasks();
}

addTaskBtn.addEventListener('click', () => {
  let input = taskInput.value.trim();

  if (input !== '') {
    addTask(input);
  }
});

function displayTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('grid', 'grid-cols-2', 'items-center', 'pt-3');

    const taskTitle = document.createElement('span');
    taskTitle.textContent = task.title;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add(
      'bg-red-500',
      'hover:bg-red-700',
      'text-white',
      'font-bold',
      'py-2',
      'px-4',
      'place-self-end',
      'rounded'
    );

    if (task.completed) {
      taskTitle.classList.add('completed');
    }

    taskItem.addEventListener('click', () => {
      task.completed = !task.completed;
      updateLocalStorage();
      displayTasks();
    });

    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((item) => item !== task);
      updateLocalStorage();
    });

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
