// commands/gban.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  BANNISSEMENT GLOBAL — Expulse de TOUS les groupes  ║
// ║  Persiste en SQLite, vérifié à chaque entrée groupe ║
// ║  Accès: Owner & Sudo uniquement                     ║
// ╚══════════════════════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'
import { isOwner, isSudo, cleanNumber } from '../lib/ownerSystem.js'
import Database from 'node-sqlite3-wasm'
import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH   = path.join(__dirname, '..', 'data', 'demon.db')

function getDb() {
  const db = new Database(DB_PATH)
  db.exec('PRAGMA journal_mode = WAL')
  db.exec(`
    CREATE TABLE IF NOT EXISTS global_bans (
      jid        TEXT PRIMARY KEY,
      reason     TEXT    DEFAULT 'Non spécifié',
      banned_by  TEXT,
      banned_at  INTEGER DEFAULT (strftime('%s','now') * 1000)
    )
  `)
  return db
}

// ── Exports pour vérification dans messageHandler / groupUpdate ──
export function isGlobalBanned(jid) {
  try {
    const db  = getDb()
    const row = db.prepare('SELECT 1 FROM global_bans WHERE jid = ?').get(jid)
    db.close()
    return !!row
  } catch { return false }
}

export function addGlobalBan(jid, reason, bannedBy) {
  const db = getDb()
  db.prepare('INSERT OR REPLACE INTO global_bans (jid, reason, banned_by, banned_at) VALUES (?, ?, ?, ?)')
    .run(jid, reason, bannedBy, Date.now())
  db.close()
}

export function removeGlobalBan(jid) {
  const db = getDb()
  db.prepare('DELETE FROM global_bans WHERE jid = ?').run(jid)
  db.close()
}

export function listGlobalBans() {
  const db   = getDb()
  const rows = db.prepare('SELECT jid, reason, banned_by, banned_at FROM global_bans ORDER BY banned_at DESC').all()
  db.close()
  return rows
}

// ── Commande principale ──────────────────────────────────────────
export default async function gban(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'

  // Vérification des droits
  if (!isOwner(senderJid) && !isSudo(senderJid)) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *ACCÈS REFUSÉ* 〕━━━☩\n☠\n⛧  🔒 Réservé à l'Owner et aux Sudos.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const sub = args[0]?.toLowerCase()

  // ── .gban list ──────────────────────────────────────────────
  if (sub === 'list' || sub === 'liste') {
    const bans = listGlobalBans()
    if (!bans.length) {
      return await sendMessage(sock, sender,
        `☩━━━〔 📋 *GBAN LIST* 〕━━━☩\n☠\n⛧  Aucun utilisateur globalement banni.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    let text = `☩━━━〔 📋 *GBAN LIST* (${bans.length}) 〕━━━☩\n☠\n`
    bans.slice(0, 15).forEach((b, i) => {
      const date = new Date(b.banned_at).toLocaleDateString('fr-FR')
      text +=
        `⛧  *${i + 1}.* ${b.jid.replace('@s.whatsapp.net', '')}\n` +
        `☩  📝 ${b.reason}\n` +
        `☠  📅 ${date}\n☠\n`
    })
    return await sendMessage(sock, sender, text + `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }

  // ── .gban remove <numero> ────────────────────────────────────
  if (sub === 'remove' || sub === 'ungban' || sub === 'unban') {
    const target = args[1]
    if (!target) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *ERREUR* 〕━━━☩\n☠\n⛧  Usage: ${prefix}gban remove <numero>\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    const jid = target.includes('@') ? target : `${cleanNumber(target)}@s.whatsapp.net`
    removeGlobalBan(jid)
    return await sendMessage(sock, sender,
      `☩━━━〔 ✅ *GBAN LEVÉ* 〕━━━☩\n☠\n⛧  ✅ *${jid.replace('@s.whatsapp.net', '')}* n'est plus banni globalement.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── .gban <numero|@mention> [raison] ────────────────────────
  let targetJid  = null
  let reasonArgs = [...args]

  // Vérifier si reply avec mention
  const quotedParticipant = msg.message?.extendedTextMessage?.contextInfo?.participant
  if (quotedParticipant) {
    targetJid = quotedParticipant
  } else if (args.length) {
    const num = cleanNumber(args[0])
    if (num && num.length >= 7) {
      targetJid  = `${num}@s.whatsapp.net`
      reasonArgs = args.slice(1)
    }
  }

  if (!targetJid) {
    return await sendMessage(sock, sender,
      `☩━━━〔 📋 *GBAN — USAGE* 〕━━━☩\n` +
      `☠\n` +
      `⛧  *Ban global:*\n` +
      `☩  ${prefix}gban <numero> [raison]\n` +
      `✝  (ou reply sur son message)\n` +
      `☠\n` +
      `⛧  *Gérer:*\n` +
      `☩  ${prefix}gban list\n` +
      `✝  ${prefix}gban remove <numero>\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  if (isOwner(targetJid)) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *IMPOSSIBLE* 〕━━━☩\n☠\n⛧  Impossible de bannir l'Owner.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const reason  = reasonArgs.join(' ').trim() || 'Non spécifié'
  let loadKey   = null

  try {
    loadKey = await showProgressLoader(sock, sender, '🔨 BAN GLOBAL EN COURS')

    // Enregistrement en base
    addGlobalBan(targetJid, reason, senderJid)

    // Expulsion de tous les groupes
    let kickedFrom = 0
    let checkedGroups = 0

    try {
      const groups = await sock.groupFetchAllParticipating()
      for (const [groupId, group] of Object.entries(groups)) {
        checkedGroups++
        const isInGroup  = group.participants?.some(p => p.id === targetJid)
        const botIsAdmin = group.participants?.some(p =>
          p.id === sock.user?.id && (p.admin === 'admin' || p.admin === 'superadmin')
        )
        if (isInGroup && botIsAdmin) {
          try {
            await sock.groupParticipantsUpdate(groupId, [targetJid], 'remove')
            kickedFrom++
            await new Promise(r => setTimeout(r, 800))
          } catch { /* groupe protégé, skip */ }
        }
      }
    } catch { /* groupFetch échoué, ban DB enregistré quand même */ }

    await deleteLoader(sock, sender, loadKey)
    loadKey = null

    await sendMessage(sock, sender,
      `☩━━━〔 🔨 *GBAN EXÉCUTÉ* 〕━━━☩\n` +
      `☠\n` +
      `⛧  🎯 *Cible:* ${targetJid.replace('@s.whatsapp.net', '')}\n` +
      `☩  📝 *Raison:* ${reason}\n` +
      `✝  🏘️ *Vérifié:* ${checkedGroups} groupe(s)\n` +
      `☠  🚪 *Expulsé de:* ${kickedFrom} groupe(s)\n` +
      `⛧  ⚡ *Par:* ${senderJid.replace('@s.whatsapp.net', '')}\n` +
      `☠\n` +
      `☩  🛡️ Sera expulsé à la prochaine tentative d'entrée.\n` +
      `✝  💡 ${prefix}gban remove pour annuler\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )

  } catch (e) {
    if (loadKey) await deleteLoader(sock, sender, loadKey)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *ERREUR GBAN* 〕━━━☩\n☠\n⛧  ${e.message.slice(0, 120)}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}
