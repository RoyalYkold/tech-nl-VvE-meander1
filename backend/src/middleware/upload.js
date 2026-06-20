const fs = require('node:fs')
const path = require('node:path')
const multer = require('multer')

const uploadDir = process.env.UPLOAD_DIR || path.join('uploads', 'private')
fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_')
    cb(null, `${Date.now()}_${safe}`)
  },
})

const allowedMime = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
  'text/plain',
])

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (!allowedMime.has(file.mimetype)) {
      return cb(new Error('Bestandstype niet toegestaan.'))
    }
    return cb(null, true)
  },
})

module.exports = { upload, uploadDir }
