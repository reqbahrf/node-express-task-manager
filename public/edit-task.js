const formEditDOM = document.getElementById('edit-task-form');
const taskIDDOM = formEditDOM.querySelector('.task-edit-id');
const taskNameDOM = formEditDOM.querySelector('input[name="name"]');
const taskCompletedDOM = formEditDOM.querySelector('input[name="completed"]');
const formAlertDOM = formEditDOM.querySelector('.submission-status');
const params = window.location.search;
const id = new URLSearchParams(params).get('id');

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
