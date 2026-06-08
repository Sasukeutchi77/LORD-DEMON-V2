// lib/ticketSystem.js — LORD DEMON V2
// Système de tickets support pour les groupes

import { db } from './database.js'
import { cleanNumber } from './ownerSystem.js'

function generateTicketId() {
  return 'TKT-' + Date.now().toString(36).toUpperCase().slice(-6)
}

export const ticketSystem = {

  open(groupId, userJid, subject) {
    const existing = db.prepare(
      "SELECT id FROM tickets WHERE group_id = ? AND user_jid = ? AND status = 'open'"
    ).get(groupId, userJid)

    if (existing) return { ok: false, reason: 'Vous avez déjà un ticket ouvert.' }

    const ticketId = generateTicketId()
    db.prepare(
      'INSERT INTO tickets (ticket_id, group_id, user_jid, subject) VALUES (?, ?, ?, ?)'
    ).run(ticketId, groupId, userJid, subject)

    return { ok: true, ticketId }
  },

  close(ticketId, groupId) {
    const r = db.prepare(
      "UPDATE tickets SET status = 'closed', closed_at = ? WHERE ticket_id = ? AND group_id = ?"
    ).run(Date.now(), ticketId, groupId)
    return r.changes > 0
  },

  list(groupId, status = 'open') {
    return db.prepare(
      'SELECT * FROM tickets WHERE group_id = ? AND status = ? ORDER BY created_at DESC'
    ).all(groupId, status)
  },

  get(ticketId) {
    return db.prepare('SELECT * FROM tickets WHERE ticket_id = ?').get(ticketId)
  },

  userTicket(groupId, userJid) {
    return db.prepare(
      "SELECT * FROM tickets WHERE group_id = ? AND user_jid = ? AND status = 'open'"
    ).get(groupId, userJid)
  },

  formatList(tickets) {
    if (!tickets.length) return '┃ _Aucun ticket ouvert._'
    return tickets.map(t => {
      const date = new Date(t.created_at).toLocaleDateString('fr-FR')
      return `┃ 🎫 *${t.ticket_id}* — @${cleanNumber(t.user_jid)}\n┃    📝 ${t.subject} (${date})`
    }).join('\n┃\n')
  }
}
