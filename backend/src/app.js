const express = require('express')
const path = require('node:path')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config()

const publicRoutes = require('./routes/public')
const authRoutes = require('./routes/auth')
const privateRoutes = require('./routes/private')

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('tiny'))

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/public', publicRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/private', privateRoutes)

app.use('/private-files', (req, res) => {
  res.status(403).json({ message: 'Directe toegang tot privébestanden is niet toegestaan.' })
})

app.use((err, req, res, _next) => {
  if (err?.message?.includes('Bestandstype')) {
    return res.status(400).json({ message: err.message })
  }
  console.error('Request error', err, req.path)
  return res.status(500).json({ message: 'Er ging iets mis. Probeer later opnieuw.' })
})

app.use((_, res) => {
  res.status(404).json({ message: 'Niet gevonden.' })
})

module.exports = app
