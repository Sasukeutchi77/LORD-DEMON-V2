// commands/leaderboard.js — LORD DEMON V2 (VERSION AMÉLIORÉE)
// Classement global + hebdomadaire

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, cleanNumber } from '../lib/ownerSystem.js'
import { userDb, getLevel, getLevelEmoji, formatLeaderboard } from '../lib/xpSystem.js'

export default async function leaderboard(sock, sender, args, msg, ctx = {}) {
  try {
    const userId = ctx.senderJid || getSenderJid(msg, sock)
    const mode   = args[0]?.toLowerCase()

    // ── CLASSEMENT HEBDOMADAIRE ──────────────────
    if (mode === 'week' || mode === 'hebdo' || mode === 'semaine') {
      const top     = userDb.weeklyLeaderboard(10)
      const pos     = top.findIndex(u => u.jid === userId)
      const medals  = ['🥇', '🥈', '🥉']

      if (!top.length) {
        return await sendMessage(sock, sender,
☩━━━〔  📅 *TOP HEBDO*  〕━━━☩━━━☩\n\n⛧  _Aucune activité cette semaine._\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
      }

      let text = `☩━━━〔 📅 *TOP 10 HEBDOMADAIRE* 〕━━━☩\n\n`
      top.forEach((u, i) => {
        const lvl    = getLevel(u.xp || 0)
        const emoji  = medals[i] || `${i + 1}.`
        const isSelf = u.jid === userId
        text += `⛧  ${emoji} ${isSelf ? '👉' : ''} @${cleanNumber(u.jid)}\n`
        text += `⛧  ${getLevelEmoji(lvl)} Niv.${lvl} • ${(u.xp || 0).toLocaleString()} XP\n`
        if (i < top.length - 1) text += `⛧  \n`
      })

      text += `\n`
      if (pos >= 0) text += `⛧  📊 Votre position cette semaine : *#${pos + 1}*\n`
      text += `⛧  _💡 .leaderboard pour le classement global_\n\n`
      text += `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

      const mentions = top.map(u => u.jid)
      return await sendMessage(sock, sender, text, { mentions })
    }

    // ── CLASSEMENT GLOBAL (défaut) ───────────────
    const limit  = Math.min(parseInt(args[0]) || 10, 20)
    const top    = userDb.leaderboard(limit)
    const posAll = userDb.leaderboard(1000)
    const myPos  = posAll.findIndex(u => u.jid === userId)
    const medals = ['🥇', '🥈', '🥉']

    if (!top.length) {
      return await sendMessage(sock, sender,
        `☩━━━〔 🏆 *CLASSEMENT* 〕━━━☩\n\n⛧  _Aucun joueur enregistré._\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    let text = `☩━━━〔 🏆 *TOP ${limit} GLOBAL* 〕━━━☩\n\n`
    top.forEach((u, i) => {
      const lvl    = getLevel(u.xp || 0)
      const emoji  = medals[i] || `${i + 1}.`
      const isSelf = u.jid === userId
      const badges = JSON.parse(u.badges || '[]')
      text += `⛧  ${emoji} ${isSelf ? '👉 ' : ''}@${cleanNumber(u.jid)}\n`
      text += `⛧  ${getLevelEmoji(lvl)} Niv.${lvl} • ${(u.xp || 0).toLocaleString()} XP`
      if (badges.length) text += ` • ${badges[0]}`
      text += `\n`
      if (i < top.length - 1) text += `⛧  \n`
    })

    text += `\n`
    if (myPos >= 0 && myPos >= limit) text += `⛧  📊 Votre position : *#${myPos + 1}* / ${posAll.length}\n`
    text += `⛧  _💡 .leaderboard hebdo → Classement semaine_\n\n`
    text += `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

    const mentions = top.map(u => u.jid)
    return await sendMessage(sock, sender, text, { mentions })

  } catch (e) {
    console.error('❌ leaderboard.js:', e)
    await sendMessage(sock, sender, `☠ Rituel échoué leaderboard: ${e.message}`)
  }
}
