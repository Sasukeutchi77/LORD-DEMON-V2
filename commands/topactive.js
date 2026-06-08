// commands/topactive.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'
import { userDb } from '../lib/database.js'
import { cleanNumber } from '../lib/ownerSystem.js'

const MEDALS = ['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟']

export default async function topactive(sock, sender, args, msg, ctx) {
  const prefix  = process.env.PREFIX || '.'
  const mode    = args[0]?.toLowerCase()
  let loadKey   = null

  try {
    loadKey = await showProgressLoader(sock, sender, '📊 CHARGEMENT DU CLASSEMENT')

    let title, users

    if (mode === 'week' || mode === 'semaine' || mode === 'hebdo') {
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      users = userDb.leaderboard(10).filter(u => (u.last_seen || 0) > weekAgo)
      title = '📅 TOP ACTIFS — 7 JOURS'
    } else if (mode === 'xp') {
      users = userDb.leaderboard(10)
      title = '✨ TOP XP'
    } else {
      // Par messages (msg_count)
      users = userDb.leaderboard(1000)
        .sort((a, b) => (b.msg_count || 0) - (a.msg_count || 0))
        .slice(0, 10)
      title = '💬 TOP ACTIFS — MESSAGES'
    }

    await deleteLoader(sock, sender, loadKey); loadKey = null

    if (!users.length) {
      return await sendMessage(sock, sender,
        `☩━━━〔 📊 *TOP ACTIFS* 〕━━━☩\n☠\n⛧  Aucune donnée disponible.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    let text = `☩━━━〔 ${title} 〕━━━☩\n☠\n`
    users.forEach((u, i) => {
      const medal = MEDALS[i] || `${i+1}.`
      const msgs  = (u.msg_count || 0).toLocaleString()
      const xp    = (u.xp || 0).toLocaleString()
      const lvl   = Math.floor(Math.sqrt((u.xp || 0) / 10)) + 1
      text +=
        `⛧  ${medal} *${cleanNumber(u.jid)}*\n` +
        `☩  💬 ${msgs} msgs  •  ✨ ${xp} XP  •  Nv.${lvl}\n` +
        `☠\n`
    })

    text +=
      `✝  💡 *Modes:*\n` +
      `☠  ${prefix}topactive → par messages\n` +
      `⛧  ${prefix}topactive xp → par XP\n` +
      `☩  ${prefix}topactive semaine → 7 jours\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

    await sendMessage(sock, sender, text)
  } catch(e) {
    if (loadKey) await deleteLoader(sock, sender, loadKey)
    await sendMessage(sock, sender, `☠ Erreur topactive: ${e.message.slice(0,100)}`)
  }
}
