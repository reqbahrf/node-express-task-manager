const formEditDOM = document.getElementById('edit-task-form');
const taskIDDOM = formEditDOM.querySelector('.task-edit-id');
const taskNameDOM = formEditDOM.querySelector('input[name="name"]');
const taskCompletedDOM = formEditDOM.querySelector('input[name="completed"]');
const formAlertDOM = formEditDOM.querySelector('.submission-status');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');
const loadingText = formAlertDOM.querySelector('.loading-text');
const feedBackMessage = formAlertDOM.querySelector('.message-container');
const showTask = async () => {
  try {
    const {
      data: { selectedTask },
    } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id: taskID, completed, name } = selectedTask;
    taskIDDOM.textContent = taskID;
    taskNameDOM.value = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (error) {
    console.log(error);
  }
};
showTask();

const feedbackMessageHandler = (success) => {
  loadingText.classList.add('hidden');
  feedBackMessage.classList.remove('hidden');
  feedBackMessage.classList.add(
    `${success ? 'text-green-500' : 'text-red-500'}`
  );
  feedBackMessage.textContent = `${
    success ? 'Edit Successfully' : 'An error occur while editing the task'
  }`;

  setTimeout(() => {
    feedBackMessage.classList.add('hidden');
    feedBackMessage.textContent = '';
  }, 3000);
};

const updateTask = async (e) => {
  loadingText.classList.remove('hidden');
  e.preventDefault();
  try {
    await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskNameDOM.value,
      completed: taskCompletedDOM.checked,
    });
    feedbackMessageHandler(true);
  } catch (error) {
    feedbackMessageHandler(false);
  }
};

formEditDOM.addEventListener('submit', updateTask);
