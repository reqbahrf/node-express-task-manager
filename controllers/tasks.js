const Task = require('../models/Task');
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const selectedTask = await Task.findOne({ _id: id });
    res.status(201).json({ selectedTask });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateTask = (req, res) => {
  res.send('update task');
};
const deleteTask = (req, res) => {
  res.send('delete task');
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
