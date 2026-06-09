// commands/rank.js — LORD DEMON V2 (VERSION AMÉLIORÉE)
// XP enrichi : badges, barre de progression, position hebdo

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, cleanNumber } from '../lib/ownerSystem.js'
import { userDb, getLevel, getXpBar, getXpForLevel, getLevelEmoji, formatProfile } from '../lib/xpSystem.js'

export default async function rank(sock, sender, args, msg, ctx = {}) {
  try {
    const userId = ctx.senderJid || getSenderJid(msg, sock)

    // Cible : mention, reply, numéro ou soi-même
    const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
    let targetJid = userId
    if (mentions?.length) targetJid = mentions[0]
    else if (msg.message?.extendedTextMessage?.contextInfo?.participant) {
      targetJid = msg.message.extendedTextMessage.contextInfo.participant
    } else if (args[0]) {
      const num = args[0].replace(/[^0-9]/g, '')
      if (num.length >= 8) targetJid = num + '@s.whatsapp.net'
    }

    const user = userDb.get(targetJid)
    const xp   = user?.xp || 0
    const lvl  = getLevel(xp)

    // Position dans le classement global
    const all  = userDb.leaderboard(1000)
    const pos  = all.findIndex(u => u.jid === targetJid)
    const rank = pos >= 0 ? pos + 1 : '?'
    const next = pos > 0 ? all[pos - 1] : null

    // Position hebdo
    const weekly    = userDb.weeklyLeaderboard(1000)
    const weeklyPos = weekly.findIndex(u => u.jid === targetJid)

    const xpNext = getXpForLevel(lvl + 1)
    const lvlEmoji = getLevelEmoji(lvl)
    const badges = JSON.parse(user?.badges || '[]')

    const isSelf = targetJid === userId

    await sendMessage(sock, sender,
☩━━━〔  🏆 *CLASSEMENT XP*  〕━━━☩━━━☩\n\n` +
      `⛧  ${lvlEmoji} *@${cleanNumber(targetJid)}*\n` +
      `⛧  \n` +
      `⛧  🌟 *Niveau :* ${lvl} ${lvlEmoji}\n` +
      `⛧  ✨ *XP :* ${xp.toLocaleString()} / ${xpNext.toLocaleString()}\n` +
      `⛧  ${getXpBar(xp)} → Niv.${lvl + 1}\n` +
      `⛧  \n` +
      `⛧  🌍 *Rang global :* #${rank} / ${all.length}\n` +
      `⛧  📅 *Rang hebdo :* ${weeklyPos >= 0 ? '#' + (weeklyPos + 1) : '?'}\n` +
      `⛧  💬 *Messages :* ${(user?.msg_count || 0).toLocaleString()}\n` +
      `⛧  \n` +
      (badges.length
        ? `⛧  🏅 *Badges :* ${badges.slice(0, 4).join(' ')}${badges.length > 4 ? ` +${badges.length - 4}` : ''}\n⛧  \n`
        : `⛧  🏅 *Badges :* _aucun pour l'instant_\n⛧  \n`
      ) +
      (next && pos > 0
        ? `⛧  🎯 *Prochain :* @${cleanNumber(next.jid)} (+${((next.xp || 0) - xp).toLocaleString()} XP)\n⛧  \n`
        : pos === 0
          ? `⛧  👑 *Leader mondial — Nul ne te dépasse !*\n⛧  \n`
          : ''
      ) +
      `⛧  _💡 .badge voir${isSelf ? '' : ' @user'} • .leaderboard_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [targetJid, ...(next ? [next.jid] : [])] }
    )

  } catch (e) {
    console.error('❌ rank.js:', e)
    await sendMessage(sock, sender, `☠ Rituel échoué rank: ${e.message}`)
  }
}
