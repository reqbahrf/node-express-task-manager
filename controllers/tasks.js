const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createNewError } = require('../errors/custom-error');
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const selectedTask = await Task.findOne({ _id: taskID });
  if (!selectedTask) {
    return next(createNewError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ selectedTask });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const updateTask = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updateTask) {
    return next(createNewError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ updateTask });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const deleteTask = await Task.findOneAndDelete({ _id: taskID });
  if (!deleteTask) {
    return next(createNewError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ deleteTask });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
