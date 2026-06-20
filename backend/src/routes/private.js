const express = require('express')
const fs = require('node:fs')
const path = require('node:path')
const { body, validationResult } = require('express-validator')
const { query } = require('../db')
const { authRequired, roleRequired } = require('../middleware/auth')
const { upload } = require('../middleware/upload')
const { logAudit } = require('../services/audit')

const router = express.Router()

router.use(authRequired)

router.get('/dashboard', async (req, res) => {
  const latestNews = await query(
    `SELECT id, title, summary, published_at
     FROM news_posts
     WHERE is_public = 1 OR is_public = 0
     ORDER BY published_at DESC LIMIT 5`,
  )
  const latestDocs = await query(
    `SELECT d.id, d.title, d.created_at, c.name AS category
     FROM documents d LEFT JOIN document_categories c ON c.id = d.category_id
     ORDER BY d.created_at DESC LIMIT 5`,
  )
  res.json({ latestNews, latestDocs })
})

router.get('/news', async (req, res) => {
  const search = `%${req.query.search || ''}%`
  const rows = await query(
    `SELECT id, title, summary, content, is_public, published_at
     FROM news_posts
     WHERE title LIKE ? OR summary LIKE ? OR content LIKE ?
     ORDER BY published_at DESC`,
    [search, search, search],
  )
  res.json(rows)
})

router.get('/documents', async (req, res) => {
  const search = `%${req.query.search || ''}%`
  const categoryId = req.query.categoryId || null
  let sql = `SELECT d.id, d.title, d.description, d.file_path, d.is_public, d.created_at, c.name AS category_name
             FROM documents d
             LEFT JOIN document_categories c ON c.id = d.category_id
             WHERE (d.title LIKE ? OR d.description LIKE ?)`
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

router.get('/documents/:id/download', async (req, res) => {
  const rows = await query('SELECT id, title, file_path FROM documents WHERE id = ?', [req.params.id])
  const doc = rows[0]
  if (!doc) {
    return res.status(404).json({ message: 'Document niet gevonden.' })
  }
  const absolute = path.resolve(doc.file_path)
  if (!absolute.startsWith(path.resolve(process.env.UPLOAD_DIR || path.join('uploads', 'private')))) {
    return res.status(400).json({ message: 'Ongeldig bestand.' })
  }
  if (!fs.existsSync(absolute)) {
    return res.status(404).json({ message: 'Bestand ontbreekt.' })
  }
  return res.download(absolute)
})

router.post(
  '/maintenance',
  [
    body('subject').trim().isLength({ min: 4 }),
    body('description').trim().isLength({ min: 10, max: 2000 }),
    body('type').isIn(['onderhoud', 'vraag']),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Ongeldige invoer.' })
    }
    const { subject, description, type } = req.body
    await query(
      `INSERT INTO maintenance_requests (user_id, subject, description, type, status, created_at)
       VALUES (?, ?, ?, ?, 'nieuw', NOW())`,
      [req.user.id, subject, description, type],
    )
    await logAudit(req.user.id, 'maintenance.create', 'maintenance_requests', null, { subject, type })
    return res.status(201).json({ message: 'Melding ingediend.' })
  },
)

router.get('/profile', async (req, res) => {
  const rows = await query(
    `SELECT u.id, u.name, u.email, u.phone, u.apartment_number, r.name AS role
     FROM users u JOIN roles r ON r.id = u.role_id WHERE u.id = ?`,
    [req.user.id],
  )
  return res.json(rows[0] || null)
})

router.get('/maintenance', roleRequired('admin', 'bestuur'), async (_, res) => {
  const rows = await query(
    `SELECT mr.id, mr.subject, mr.description, mr.type, mr.status, mr.created_at, u.name AS user_name
     FROM maintenance_requests mr JOIN users u ON u.id = mr.user_id
     ORDER BY mr.created_at DESC`,
  )
  return res.json(rows)
})

router.post('/admin/categories', roleRequired('admin', 'bestuur'), [body('name').trim().isLength({ min: 2 })], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Ongeldige invoer.' })
  }
  const { name } = req.body
  await query('INSERT INTO document_categories (name, created_at) VALUES (?, NOW())', [name])
  await logAudit(req.user.id, 'category.create', 'document_categories', null, { name })
  return res.status(201).json({ message: 'Categorie toegevoegd.' })
})

router.post(
  '/admin/news',
  roleRequired('admin', 'bestuur'),
  [
    body('title').trim().isLength({ min: 4 }),
    body('content').trim().isLength({ min: 10 }),
    body('isPublic').optional().isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Ongeldige invoer.' })
    }

    const { title, summary, content, isPublic } = req.body
    await query(
      `INSERT INTO news_posts (title, summary, content, is_public, created_by, published_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [title, summary || '', content, isPublic ? 1 : 0, req.user.id],
    )
    await logAudit(req.user.id, 'news.create', 'news_posts', null, { title, isPublic })
    return res.status(201).json({ message: 'Nieuwsbericht toegevoegd.' })
  },
)

router.put('/admin/news/:id', roleRequired('admin', 'bestuur'), async (req, res) => {
  const { title, summary, content, isPublic } = req.body
  await query('UPDATE news_posts SET title = ?, summary = ?, content = ?, is_public = ? WHERE id = ?', [title, summary || '', content, isPublic ? 1 : 0, req.params.id])
  await logAudit(req.user.id, 'news.update', 'news_posts', req.params.id, { title, isPublic })
  return res.json({ message: 'Nieuwsbericht bijgewerkt.' })
})

router.delete('/admin/news/:id', roleRequired('admin', 'bestuur'), async (req, res) => {
  await query('DELETE FROM news_posts WHERE id = ?', [req.params.id])
  await logAudit(req.user.id, 'news.delete', 'news_posts', req.params.id)
  return res.json({ message: 'Nieuwsbericht verwijderd.' })
})

router.post(
  '/admin/documents',
  roleRequired('admin', 'bestuur'),
  upload.single('file'),
  [body('title').trim().isLength({ min: 3 }), body('categoryId').isInt(), body('isPublic').optional().isBoolean()],
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'Geen bestand geüpload.' })
    }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Ongeldige invoer.' })
    }

    const { title, description, categoryId, isPublic } = req.body
    const filePath = path.resolve(req.file.path)

    await query(
      `INSERT INTO documents (title, description, file_path, category_id, is_public, uploaded_by, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [title, description || '', filePath, Number(categoryId), isPublic === 'true' || isPublic === true ? 1 : 0, req.user.id],
    )
    await logAudit(req.user.id, 'document.create', 'documents', null, { title, categoryId })

    return res.status(201).json({ message: 'Document toegevoegd.' })
  },
)

router.delete('/admin/documents/:id', roleRequired('admin', 'bestuur'), async (req, res) => {
  const rows = await query('SELECT file_path FROM documents WHERE id = ?', [req.params.id])
  const filePath = rows[0]?.file_path
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  await query('DELETE FROM documents WHERE id = ?', [req.params.id])
  await logAudit(req.user.id, 'document.delete', 'documents', req.params.id)
  return res.json({ message: 'Document verwijderd.' })
})

router.get('/admin/users', roleRequired('admin', 'bestuur'), async (_, res) => {
  const rows = await query(
    `SELECT u.id, u.name, u.email, r.name AS role, u.apartment_number
     FROM users u JOIN roles r ON r.id = u.role_id ORDER BY u.name`,
  )
  res.json(rows)
})

router.post(
  '/admin/users',
  roleRequired('admin'),
  [body('name').trim().isLength({ min: 2 }), body('email').isEmail(), body('password').isLength({ min: 8 }), body('role').isIn(['admin', 'bestuur', 'bewoner'])],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Ongeldige invoer.' })
    }
    const { name, email, password, role, apartmentNumber } = req.body
    const roleRow = await query('SELECT id FROM roles WHERE name = ? LIMIT 1', [role])
    const bcrypt = require('bcryptjs')
    const passwordHash = await bcrypt.hash(password, 12)
    await query(
      `INSERT INTO users (name, email, password_hash, role_id, apartment_number, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [name, email, passwordHash, roleRow[0].id, apartmentNumber || null],
    )
    await logAudit(req.user.id, 'user.create', 'users', null, { email, role })
    res.status(201).json({ message: 'Gebruiker toegevoegd.' })
  },
)

router.put('/admin/users/:id/role', roleRequired('admin'), [body('role').isIn(['admin', 'bestuur', 'bewoner'])], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Ongeldige invoer.' })
  }
  const roleRow = await query('SELECT id FROM roles WHERE name = ? LIMIT 1', [req.body.role])
  await query('UPDATE users SET role_id = ? WHERE id = ?', [roleRow[0].id, req.params.id])
  await logAudit(req.user.id, 'user.update_role', 'users', req.params.id, { role: req.body.role })
  res.json({ message: 'Rol bijgewerkt.' })
})

module.exports = router
