const express = require('express')
const { body, validationResult } = require('express-validator')
const { query } = require('../db')

const router = express.Router()

const pageContent = {
  about: 'VvE Meander1 vertegenwoordigt bewoners en eigenaren van het complex aan de Van der Palmkade in Amsterdam.',
  parking: 'De parkeergarage is alleen toegankelijk voor geautoriseerde gebruikers. Volg altijd de veiligheidsregels.',
  parqy: 'Parqy verzorgt digitaal toegangsbeheer van de garage. Gebruik de app volgens de instructies van de VvE.',
  history: 'Het gebouw heeft een rijke geschiedenis als onderdeel van de stadsvernieuwing in Amsterdam-West.',
  faq: [
    { q: 'Hoe meld ik onderhoud?', a: 'Log in en ga naar onderhoudsmeldingen.' },
    { q: 'Waar vind ik notulen?', a: 'In de beveiligde downloadomgeving na inloggen.' },
  ],
}

router.get('/pages', (_, res) => {
  res.json(pageContent)
})

router.get('/news', async (req, res) => {
  const search = `%${req.query.search || ''}%`
  const rows = await query(
    `SELECT id, title, summary, content, is_public, published_at
     FROM news_posts
     WHERE is_public = 1 AND (title LIKE ? OR summary LIKE ? OR content LIKE ?)
     ORDER BY published_at DESC`,
    [search, search, search],
  )
  res.json(rows)
})

router.get('/documents', async (req, res) => {
  const search = `%${req.query.search || ''}%`
  const categoryId = req.query.categoryId || null
  let sql = `SELECT d.id, d.title, d.description, c.name AS category_name, d.created_at
             FROM documents d
             LEFT JOIN document_categories c ON c.id = d.category_id
             WHERE d.is_public = 1 AND (d.title LIKE ? OR d.description LIKE ?)`
  const params = [search, search]
  if (categoryId) {
    sql += ' AND d.category_id = ?'
    params.push(categoryId)
  }
  sql += ' ORDER BY d.created_at DESC'
  const rows = await query(sql, params)
  res.json(rows)
})

router.get('/document-categories', async (_, res) => {
  const rows = await query('SELECT id, name FROM document_categories ORDER BY name')
  res.json(rows)
})

router.post(
  '/contact',
  [
    body('name').trim().isLength({ min: 2 }),
    body('email').isEmail(),
    body('message').trim().isLength({ min: 10, max: 2000 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Ongeldige invoer.' })
    }

    const { name, email, message } = req.body
    await query(
      'INSERT INTO contact_messages (name, email, message, created_at) VALUES (?, ?, ?, NOW())',
      [name, email, message],
    )
    return res.status(201).json({ message: 'Bericht ontvangen.' })
  },
)

module.exports = router
