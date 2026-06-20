const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')
const { query } = require('../db')
const { authRequired } = require('../middleware/auth')

const router = express.Router()

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 8 })],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Ongeldige inloggegevens.' })
    }

    const { email, password } = req.body
    const rows = await query(
      `SELECT u.id, u.name, u.email, u.password_hash, r.name AS role
       FROM users u
       JOIN roles r ON r.id = u.role_id
       WHERE u.email = ? LIMIT 1`,
      [email],
    )

    const user = rows[0]
    if (!user) {
      return res.status(401).json({ message: 'Inloggen mislukt.' })
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return res.status(401).json({ message: 'Inloggen mislukt.' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '8h' },
    )

    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  },
)

router.get('/me', authRequired, async (req, res) => {
  const rows = await query(
    `SELECT u.id, u.name, u.email, r.name AS role
     FROM users u JOIN roles r ON r.id = u.role_id WHERE u.id = ?`,
    [req.user.id],
  )
  if (!rows[0]) {
    return res.status(404).json({ message: 'Gebruiker niet gevonden.' })
  }
  return res.json(rows[0])
})

module.exports = router
