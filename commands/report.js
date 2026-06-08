// commands/report.js — LORD DEMON (Système de signalement)
import { sendMessage } from '../lib/sendMessage.js'
import { isOwner, isSudo, cleanNumber } from '../lib/ownerSystem.js'
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH   = path.join(__dirname, '..', 'data', 'demon.db')

function getDb() {
  const db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS reports (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      group_id    TEXT NOT NULL,
      reporter    TEXT NOT NULL,
      target      TEXT,
      reason      TEXT NOT NULL,
      status      TEXT DEFAULT 'pending',
      created_at  INTEGER DEFAULT (strftime('%s','now') * 1000)
    )
  `)
  return db
}

// Cooldown : 1 rapport par user par 10 minutes
const reportCooldowns = new Map()

export default async function report(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'
  const sub       = args[0]?.toLowerCase()
  const isAdmin   = isOwner(senderJid) || isSudo(senderJid) || ctx?.isAdmin

  // ── Voir les rapports (admin) ────────────────────────
  if (sub === 'list' || sub === 'liste' || sub === 'voir') {
    if (!isAdmin) return await sendMessage(sock, sender, `☠ Réservé aux admins.`)
    const db   = getDb()
    const rows = db.prepare('SELECT * FROM reports WHERE group_id = ? AND status = ? ORDER BY created_at DESC LIMIT 10')
                   .all(sender, 'pending')
    db.close()
    if (!rows.length) {
      return await sendMessage(sock, sender,
        `☩━━━〔 📋 *RAPPORTS* 〕━━━☩\n☠\n⛧  Aucun signalement en attente. ✅\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    let text = `☩━━━〔 📋 *RAPPORTS EN ATTENTE* (${rows.length}) 〕━━━☩\n☠\n`
    rows.forEach((r, i) => {
      const date = new Date(r.created_at).toLocaleDateString('fr-FR')
      text +=
        `⛧  *#${r.id}* — ${date}\n` +
        `☩  👤 Par: ${cleanNumber(r.reporter)}\n` +
        (r.target ? `✝  🎯 Cible: ${cleanNumber(r.target)}\n` : '') +
        `☠  📝 ${r.reason}\n☠\n`
    })
    text += `✝  💡 ${prefix}report resolve <id> — Marquer traité\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    return await sendMessage(sock, sender, text)
  }

  // ── Résoudre un rapport ──────────────────────────────
  if (sub === 'resolve' || sub === 'traité' || sub === 'done') {
    if (!isAdmin) return await sendMessage(sock, sender, `☠ Réservé aux admins.`)
    const id = parseInt(args[1])
    if (!id) return await sendMessage(sock, sender, `☠ Usage: ${prefix}report resolve <id>`)
    const db = getDb()
    const ch = db.prepare('UPDATE reports SET status = ? WHERE id = ? AND group_id = ?').run('resolved', id, sender)
    db.close()
    if (!ch.changes) return await sendMessage(sock, sender, `☠ Rapport #${id} introuvable.`)
    return await sendMessage(sock, sender,
      `☩━━━〔 ✅ *RAPPORT #${id} TRAITÉ* 〕━━━☩\n☠\n⛧  Signalement marqué comme résolu.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── Signaler ─────────────────────────────────────────
  if (!sender.endsWith('@g.us')) {
    return await sendMessage(sock, sender, `☠ Signalement groupe uniquement.`)
  }

  // Cooldown
  const now      = Date.now()
  const lastReport = reportCooldowns.get(senderJid) || 0
  if (now - lastReport < 10 * 60 * 1000 && !isAdmin) {
    const remaining = Math.ceil((10 * 60 * 1000 - (now - lastReport)) / 60000)
    return await sendMessage(sock, sender,
      `☩━━━〔 ⏳ *COOLDOWN RAPPORT* 〕━━━☩\n☠\n⛧  Attends encore ${remaining} min avant le prochain signalement.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // Cible (optionnelle)
  const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
  const quoted   = msg.message?.extendedTextMessage?.contextInfo?.participant
  let targetJid  = mentions?.[0] || quoted || null
  let reasonArgs = [...args]

  if (!targetJid && args[0] && args[0] !== sub) {
    const num = cleanNumber(args[0])
    if (num && num.length >= 7) { targetJid = `${num}@s.whatsapp.net`; reasonArgs = args.slice(1) }
  }

  const reason = reasonArgs.filter(a => !a.startsWith('+')).join(' ').trim() || (quoted ? 'Message signalé' : '')
  if (!reason) {
    return await sendMessage(sock, sender,
      `☩━━━〔 🚨 *SIGNALEMENT — USAGE* 〕━━━☩\n` +
      `☠\n` +
      `⛧  💡 *Usage:* ${prefix}report <raison>\n` +
      `☠  (ou reply sur un message)\n` +
      `☠\n` +
      `✝  📌 *Exemples:*\n` +
      `☠  ${prefix}report spam massif\n` +
      `⛧  ${prefix}report (reply) insulte\n` +
      `☠\n` +
      `☩  👮 Admins: ${prefix}report liste\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  reportCooldowns.set(senderJid, now)
  const db = getDb()
  const r  = db.prepare('INSERT INTO reports (group_id, reporter, target, reason) VALUES (?, ?, ?, ?)').run(sender, senderJid, targetJid, reason)
  db.close()

  // Notifier les admins si possible
  try {
    const groupMeta = await sock.groupMetadata(sender)
    const admins    = groupMeta.participants.filter(p => p.admin).map(p => p.id)
    if (admins.length) {
      const notif =
        `☩━━━〔 🚨 *SIGNALEMENT #${r.lastInsertRowid}* 〕━━━☩\n` +
        `☠\n` +
        `⛧  👤 *Par:* @${cleanNumber(senderJid)}\n` +
        (targetJid ? `☩  🎯 *Cible:* @${cleanNumber(targetJid)}\n` : '') +
        `✝  📝 *Raison:* ${reason}\n` +
        `☠\n` +
        `⛧  Traiter avec: ${process.env.PREFIX || '.'}report resolve ${r.lastInsertRowid}\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      await sock.sendMessage(sender, { text: notif, mentions: [senderJid, ...(targetJid ? [targetJid] : [])] }).catch(() => {})
    }
  } catch {}

  await sendMessage(sock, sender,
    `☩━━━〔 ✅ *SIGNALEMENT ENVOYÉ* 〕━━━☩\n` +
    `☠\n` +
    `⛧  🚨 *#${r.lastInsertRowid}* enregistré\n` +
    `☠  📝 ${reason}\n` +
    `☠\n` +
    `☩  Les admins ont été notifiés.\n` +
    `✝  Merci de contribuer à la sécurité du groupe!\n` +
    `☠\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
