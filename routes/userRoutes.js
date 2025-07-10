const express = require('express');
const router = express.Router();
const users = require('../data/users');
const validateUser = require('../middleware/validateUser');

// GET all users
router.get('/', (req, res) => {
  res.status(200).json(users);
});

// GET user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(user);
});

// POST new user
router.post('/', validateUser, (req, res) => {
  const newUser = {
    id: (users.length + 1).toString(),
    ...req.body
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
router.put('/:id', validateUser, (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  users[index] = { id: req.params.id, ...req.body };
  res.status(200).json(users[index]);
});

// DELETE user
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  const deletedUser = users.splice(index, 1);
  res.status(200).json({ message: 'User deleted', user: deletedUser[0] });
});

module.exports = router;
