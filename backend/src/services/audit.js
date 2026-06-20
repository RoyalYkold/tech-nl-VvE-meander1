const { query } = require('../db')

async function logAudit(userId, action, entityType, entityId, details) {
  try {
    await query(
      'INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [userId || null, action, entityType, entityId || null, JSON.stringify(details || {})],
    )
  } catch {
    // Audit logging should not block requests.
  }
}

module.exports = { logAudit }
