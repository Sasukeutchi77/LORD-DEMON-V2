// commands/badge.js — LORD DEMON V2
// Gestion des badges utilisateurs

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, cleanNumber, isDeployer, isSudo } from '../lib/ownerSystem.js'
import { userDb, BADGES } from '../lib/xpSystem.js'

export default async function badge(sock, sender, args, msg, ctx = {}) {
  try {
    const userId = ctx.senderJid || getSenderJid(msg, sock)
    const action = args[0]?.toLowerCase()

    // ── LISTE DES BADGES DISPONIBLES ──────────────
    if (action === 'list' || action === 'liste') {
      const categories = {
        'Niveaux' : Object.entries(BADGES).filter(([, b]) => b.trigger === 'level'),
        'Activité': Object.entries(BADGES).filter(([, b]) => b.trigger === 'messages'),
        'Spéciaux': Object.entries(BADGES).filter(([, b]) => !['level','messages'].includes(b.trigger))
      }

☩━━━〔  🏅 *BADGES DISPONIBLES*  〕━━━☩━━━☩\n\n`
      for (const [cat, badges] of Object.entries(categories)) {
        if (!badges.length) continue
        text += `⛧  *${cat} :*\n`
        badges.forEach(([name, info]) => {
          const cond = info.trigger === 'level' ? `Niveau ${info.value}` :
                       info.trigger === 'messages' ? `${info.value} messages` : 'Spécial'
          text += `⛧  ${name} — ${info.desc} (${cond})\n`
        })
        text += `⛧  \n`
      }
      text += `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      return await sendMessage(sock, sender, text)
    }

    // ── MES BADGES / BADGES D'UN AUTRE ──────────
    let targetJid = userId

    const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
    if (mentions?.length) targetJid = mentions[0]
    else if (args[0] && !action.match(/^(list|give|retirer)/)) {
      const num = args[0].replace(/[^0-9]/g, '')
      if (num.length >= 8) targetJid = num + '@s.whatsapp.net'
    }

    if (!action || action === 'voir' || (!['list','give','retirer','liste'].includes(action))) {
      const badges = userDb.getBadges(targetJid)
      const user   = userDb.get(targetJid)
      const isSelf = targetJid === userId

      return await sendMessage(sock, sender,
        `☩━━━〔 🏅 *BADGES* 〕━━━☩\n\n` +
        `⛧  👤 @${cleanNumber(targetJid)}\n` +
        `⛧  🏅 *${badges.length} badge${badges.length > 1 ? 's' : ''} :*\n\n` +
        (badges.length
          ? badges.map(b => {
              const info = BADGES[b]
              return `⛧  ${b}\n⛧  _${info?.desc || 'Badge spécial'}_`
            }).join('\n')
          : `⛧  _Aucun badge pour l'instant._\n` +
            `⛧  ${isSelf ? 'Envoyez des messages pour en gagner !' : 'Ce membre n\'a pas encore de badge.'}`
        ) +
        `\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
        { mentions: [targetJid] }
      )
    }

    // ── ATTRIBUER UN BADGE (OWNER/SUDO) ──────────
    if (action === 'give' || action === 'donner') {
      const isOp = ctx.isOwner || isDeployer(userId) || isSudo(userId)
      if (!isOp) return await sendMessage(sock, sender, `⛔ Réservé à l'Owner/Sudo.`)

      const targetMentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
      const target = targetMentions?.[0] || (args[1] ? args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null)
      const badgeName = args.slice(target ? 2 : 1).join(' ').trim()

      if (!target || !badgeName) {
        return await sendMessage(sock, sender, `☠ Usage : *.badge give @user <nom_badge>*`)
      }

      if (!BADGES[badgeName]) {
        return await sendMessage(sock, sender,
          `❌ Badge *${badgeName}* inconnu.\n\nBadges disponibles : *.badge list*`
        )
      }

      userDb.addBadge(target, badgeName)
      return await sendMessage(sock, sender,
        `✅ Badge *${badgeName}* attribué à @${cleanNumber(target)} !`,
        { mentions: [target] }
      )
    }

    // ── RETIRER UN BADGE (OWNER/SUDO) ──────────
    if (action === 'retirer' || action === 'remove') {
      const isOp = ctx.isOwner || isDeployer(userId) || isSudo(userId)
      if (!isOp) return await sendMessage(sock, sender, `⛔ Réservé à l'Owner/Sudo.`)

      const targetMentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
      const target = targetMentions?.[0] || (args[1] ? args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null)
      const badgeName = args.slice(target ? 2 : 1).join(' ').trim()

      if (!target || !badgeName) {
        return await sendMessage(sock, sender, `☠ Usage : *.badge retirer @user <nom_badge>*`)
      }

      const badges = userDb.getBadges(target).filter(b => b !== badgeName)
      userDb.upsert(target, { badges })
      return await sendMessage(sock, sender,
        `✅ Badge *${badgeName}* retiré de @${cleanNumber(target)}.`,
        { mentions: [target] }
      )
    }

  } catch (e) {
    console.error('❌ badge.js:', e)
    await sendMessage(sock, sender, `☠ Erreur badge: ${e.message}`)
  }
}
