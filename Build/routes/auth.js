const express = require('express');
const router = express.Router();

const USERS = [
  { id: '1', email: 'user@gmail.com', password: 'pass123', name: 'User One' },
  { id: '2', email: 'nikita@gmail.com', password: 'pass123', name: 'nikita narwani' },
  { id: '3', email: 'john@gmail.com', password: 'pass123', name: 'john' },
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = USERS.find(u => u.email === email && u.password === password);

  if (user) {
    return res.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  }

  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

module.exports = router;