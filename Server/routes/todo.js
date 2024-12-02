const express = require('express');
const User = require('../models/User');
const { Todo } = require('../models/Data');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post('/tasks', async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;
    const newTask = await Todo.create({ title, description, deadline, priority });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/todo', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Todo.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline, priority } = req.body; // Destructure all fields

  try {
    // Update the task with all provided fields
    const updatedTask = await Todo.findByIdAndUpdate(
      id,
      { title, description, deadline, priority }, // Update these fields
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask); // Return the updated task
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
});





module.exports = router;
