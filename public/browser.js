const taskForm = document.getElementById('task-form');
const submissionMessageContainer = taskForm.querySelector('.submission-status');
const loadingText = submissionMessageContainer.querySelector('.loading-text');
const feedBackMessage =
  submissionMessageContainer.querySelector('.message-container');
const tasksContainer = document.getElementById('tasks');

const showTasks = async () => {
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks');
    if (tasks.length < 1) {
      tasksContainer.innerHTML = `<h2>No tasks available</h2>`;
      return;
    }
    const allTasks = tasks
      .map((task) => {
        const { completed, _id, name } = task;
        return /*html*/ `<div class="task my-3 bg-gray-100 shadow-sm p-3 rounded-sm">
      <h3 class="text-xl ${completed && 'line-through'}">${
          completed &&
          '<span><i class="fas fa-check text-green-500"></i>&nbsp;</span>'
        }${name}</h3>
      <div class="task-btns text-end">
        <a href="task.html?id=${_id}" class="edit-link">
        <i class="fas fa-pen-to-square"></i>
        </a>
        <button type="button" class="delete-btn" data-id="${_id}">
          <i class="fas fa-trash-can text-red-500"></i>
        </button>
      </div>
      </div>`;
      })
      .join('');
    tasksContainer.innerHTML = allTasks;
  } catch (error) {
    tasksContainer.innerHTML =
      '<h5 class="text-red-600">Error, There was an error retrieving the tasks</h5>';
  }
};

showTasks();

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const taskName = taskForm.name.value;
  try {
    loadingText.classList.remove('hidden');
    await axios.post('/api/v1/tasks', { name: taskName });
    loadingText.classList.add('hidden');
    feedBackMessage.classList.remove('hidden');
    feedBackMessage.classList.add('text-green-500');
    feedBackMessage.textContent = 'Success, task added';
    taskForm.reset();
  } catch (error) {
    loadingText.classList.add('hidden');
    feedBackMessage.classList.remove('hidden');
    feedBackMessage.classList.add('text-red-500');
    feedBackMessage.textContent = 'Error, task not added';
  } finally {
    setTimeout(() => {
      feedBackMessage.classList.add('hidden');
      feedBackMessage.textContent = '';
    }, 3000);
  }
});
