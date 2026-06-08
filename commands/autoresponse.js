// commands/autoresponse.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  RÉPONSES AUTOMATIQUES PAR MOT-CLÉ                  ║
// ║  Par groupe — stocké en SQLite via groupSettingsDb   ║
// ║  Déclenché automatiquement par messageHandler        ║
// ╚══════════════════════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { isOwner, isSudo } from '../lib/ownerSystem.js'
import { groupSettingsDb } from '../lib/database.js'

// ── Vérification & envoi (appelé depuis messageHandler) ─
export async function checkAutoResponse(sock, groupId, messageText, senderJid) {
  if (!groupId.endsWith('@g.us')) return false
  const settings = groupSettingsDb.get(groupId)
  const rules    = settings.autoresponse || []
  if (!rules.length) return false

  const lower = messageText.toLowerCase().trim()
  for (const rule of rules) {
    const keyword = rule.keyword.toLowerCase()
    const match   = rule.exact
      ? lower === keyword
      : lower.includes(keyword)
    if (match) {
      let reply = rule.reply
        .replace(/{sender}/g, `@${senderJid.replace('@s.whatsapp.net', '')}`)
        .replace(/{keyword}/g, rule.keyword)
      await sock.sendMessage(groupId, { text: reply, mentions: [senderJid] }).catch(() => {})
      return true
    }
  }
  return false
}

// ── Commande principale ──────────────────────────────────
export default async function autoresponse(sock, sender, args, msg, ctx) {
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

  const sub = args[0]?.toLowerCase()

  // ── .autoresponse list ──────────────────────────────
  if (!sub || sub === 'list' || sub === 'liste') {
    const settings = groupSettingsDb.get(sender)
    const rules    = settings.autoresponse || []
    if (!rules.length) {
      return await sendMessage(sock, sender,
        `☩━━━〔 🤖 *AUTO-RÉPONSES* 〕━━━☩\n` +
        `☠\n` +
        `⛧  Aucune règle configurée.\n` +
        `☠\n` +
        `✝  💡 ${prefix}autoresponse add <mot-clé> | <réponse>\n` +
        `☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    let text = `☩━━━〔 🤖 *AUTO-RÉPONSES* (${rules.length}) 〕━━━☩\n☠\n`
    rules.forEach((r, i) => {
      text +=
        `⛧  *${i + 1}.* Mot-clé: *${r.keyword}*\n` +
        `☩  Mode: ${r.exact ? 'exact' : 'contient'}\n` +
        `✝  Réponse: _${r.reply.slice(0, 60)}${r.reply.length > 60 ? '...' : ''}_\n` +
        `☠\n`
    })
    text +=
      `✝  💡 ${prefix}autoresponse add <mot> | <réponse>\n` +
      `☠  💡 ${prefix}autoresponse del <numéro>\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    return await sendMessage(sock, sender, text)
  }

  // ── .autoresponse add <mot-clé> | <réponse> ─────────
  if (sub === 'add' || sub === 'ajouter') {
    const rest    = args.slice(1).join(' ')
    const sepIdx  = rest.indexOf('|')
    if (sepIdx === -1) {
      return await sendMessage(sock, sender,
        `☩━━━〔 💡 *USAGE* 〕━━━☩\n` +
        `☠\n` +
        `⛧  ${prefix}autoresponse add <mot-clé> | <réponse>\n` +
        `☠\n` +
        `✝  *Exemples:*\n` +
        `☠  ${prefix}autoresponse add prix | Le prix est 500F !\n` +
        `⛧  ${prefix}autoresponse add bonjour | Salut {sender} ! 👋\n` +
        `☩  ${prefix}autoresponse add exact:merci | De rien !\n` +
        `☠\n` +
        `✝  Variables: {sender} {keyword}\n` +
        `☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    let keyword = rest.slice(0, sepIdx).trim()
    const reply = rest.slice(sepIdx + 1).trim()
    let exact   = false

    if (keyword.startsWith('exact:')) {
      exact   = true
      keyword = keyword.slice(6).trim()
    }

    if (!keyword || !reply) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *ERREUR* 〕━━━☩\n☠\n⛧  Mot-clé et réponse requis.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const settings = groupSettingsDb.get(sender)
    const rules    = settings.autoresponse || []
    if (rules.length >= 20) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *LIMITE ATTEINTE* 〕━━━☩\n☠\n⛧  Maximum 20 règles par groupe.\n☠  Supprime une règle d'abord.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    rules.push({ keyword, reply, exact })
    groupSettingsDb.update(sender, { autoresponse: rules })

    return await sendMessage(sock, sender,
      `☩━━━〔 ✅ *RÈGLE AJOUTÉE* 〕━━━☩\n` +
      `☠\n` +
      `⛧  🔑 *Mot-clé:* ${keyword}\n` +
      `☩  📝 *Réponse:* ${reply.slice(0, 80)}\n` +
      `✝  🎯 *Mode:* ${exact ? 'exact' : 'contient le mot'}\n` +
      `☠\n` +
      `☠  Variables dispo: {sender} {keyword}\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── .autoresponse del <numéro> ───────────────────────
  if (sub === 'del' || sub === 'delete' || sub === 'supprimer' || sub === 'remove') {
    const idx = parseInt(args[1]) - 1
    if (isNaN(idx) || idx < 0) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *ERREUR* 〕━━━☩\n☠\n⛧  Usage: ${prefix}autoresponse del <numéro>\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    const settings = groupSettingsDb.get(sender)
    const rules    = settings.autoresponse || []
    if (idx >= rules.length) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *INTROUVABLE* 〕━━━☩\n☠\n⛧  Numéro ${idx + 1} inexistant. Tape ${prefix}autoresponse list.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    const removed = rules.splice(idx, 1)[0]
    groupSettingsDb.update(sender, { autoresponse: rules })
    return await sendMessage(sock, sender,
      `☩━━━〔 🗑️ *RÈGLE SUPPRIMÉE* 〕━━━☩\n☠\n⛧  Mot-clé *${removed.keyword}* supprimé.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── .autoresponse clear ──────────────────────────────
  if (sub === 'clear' || sub === 'reset') {
    groupSettingsDb.update(sender, { autoresponse: [] })
    return await sendMessage(sock, sender,
      `☩━━━〔 🗑️ *RÈGLES EFFACÉES* 〕━━━☩\n☠\n⛧  Toutes les règles ont été supprimées.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  await sendMessage(sock, sender,
    `☩━━━〔 🤖 *AUTO-RÉPONSE — AIDE* 〕━━━☩\n` +
    `☠\n` +
    `✝  *Sous-commandes:*\n` +
    `☠  ${prefix}autoresponse list\n` +
    `⛧  ${prefix}autoresponse add <mot> | <réponse>\n` +
    `☩  ${prefix}autoresponse del <numéro>\n` +
    `✝  ${prefix}autoresponse clear\n` +
    `☠\n` +
    `⛧  💡 Préfixe "exact:" pour match strict:\n` +
    `☩  ${prefix}autoresponse add exact:merci | De rien !\n` +
    `☠\n` +
    `✝  📌 Variables: {sender} {keyword}\n` +
    `☠\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
