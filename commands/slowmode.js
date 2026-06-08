// commands/slowmode.js — LORD DEMON (Slowmode par utilisateur)
import { sendMessage } from '../lib/sendMessage.js'
import { isOwner, isSudo } from '../lib/ownerSystem.js'
import { groupSettingsDb } from '../lib/database.js'

// Store en mémoire : { [groupId_jid]: lastMessageTime }
export const slowmodeTracker = new Map()

export function checkSlowmode(groupId, senderJid) {
  const settings  = groupSettingsDb.get(groupId)
  const cfg       = settings.slowmode
  if (!cfg?.enabled || !cfg?.seconds) return { allowed: true }
  const key       = `${groupId}_${senderJid}`
  const last      = slowmodeTracker.get(key) || 0
  const now       = Date.now()
  const elapsed   = now - last
  const limit     = cfg.seconds * 1000
  if (elapsed < limit) {
    const remaining = Math.ceil((limit - elapsed) / 1000)
    return { allowed: false, remaining }
  }
  slowmodeTracker.set(key, now)
  return { allowed: true }
}

export default async function slowmode(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'

  if (!sender.endsWith('@g.us')) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *ERREUR* 〕━━━☩\n☠\n⛧  Commande groupe uniquement.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const canUse = isOwner(senderJid) || isSudo(senderJid) || ctx?.isAdmin
  if (!canUse) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *ACCÈS REFUSÉ* 〕━━━☩\n☠\n⛧  🔒 Réservé aux admins, Owner et Sudos.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const sub      = args[0]?.toLowerCase()
  const settings = groupSettingsDb.get(sender)
  const cfg      = settings.slowmode || {}

  if (sub === 'off' || sub === 'désactiver') {
    groupSettingsDb.update(sender, { slowmode: { enabled: false, seconds: 0 } })
    return await sendMessage(sock, sender,
      `☩━━━〔 🐢 *SLOWMODE DÉSACTIVÉ* 〕━━━☩\n☠\n⛧  ❌ Mode lent désactivé.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const seconds = parseInt(sub) || parseInt(args[0])
  if (!seconds || seconds < 1 || seconds > 3600) {
    const status = cfg.enabled ? `🟢 *ACTIF* — ${cfg.seconds}s entre chaque message` : '🔴 *INACTIF*'
    return await sendMessage(sock, sender,
      `☩━━━〔 🐢 *SLOWMODE* 〕━━━☩\n` +
      `☠\n` +
      `⛧  📊 *Statut:* ${status}\n` +
      `☠\n` +
      `✝  *Usage:*\n` +
      `☠  ${prefix}slowmode <secondes> → Activer\n` +
      `⛧  ${prefix}slowmode off → Désactiver\n` +
      `☠\n` +
      `☩  📌 *Exemples:*\n` +
      `✝  ${prefix}slowmode 10  → 10s entre msgs\n` +
      `☠  ${prefix}slowmode 30  → 30s\n` +
      `⛧  ${prefix}slowmode 60  → 1 minute\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  groupSettingsDb.update(sender, { slowmode: { enabled: true, seconds } })
  const display = seconds >= 60 ? `${Math.floor(seconds/60)}min ${seconds%60}s` : `${seconds}s`
  return await sendMessage(sock, sender,
    `☩━━━〔 🐢 *SLOWMODE ACTIVÉ* 〕━━━☩\n` +
    `☠\n` +
    `⛧  ✅ Mode lent activé: *${display}* entre chaque message\n` +
    `☠\n` +
    `☩  ℹ️ Les admins et Owner sont exemptés.\n` +
    `✝  💡 ${prefix}slowmode off pour désactiver.\n` +
    `☠\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
