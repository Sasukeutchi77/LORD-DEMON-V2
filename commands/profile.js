// commands/profile.js — LORD DEMON V2 (VERSION AMÉLIORÉE)
// Profil enrichi avec XP, badges, stats complètes

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, cleanNumber } from '../lib/ownerSystem.js'
import { userDb, formatProfile, checkAndAwardBadges } from '../lib/xpSystem.js'

export default async function profile(sock, sender, args, msg, ctx = {}) {
  try {
    const userId = ctx.senderJid || getSenderJid(msg, sock)

    // Cible
    const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
    let targetJid = userId
    if (mentions?.length) targetJid = mentions[0]
    else if (msg.message?.extendedTextMessage?.contextInfo?.participant) {
      targetJid = msg.message.extendedTextMessage.contextInfo.participant
    } else if (args[0]) {
      const num = args[0].replace(/[^0-9]/g, '')
      if (num.length >= 8) targetJid = num + '@s.whatsapp.net'
    }

    // Vérifier et attribuer les badges non encore accordés
    const user = userDb.get(targetJid)
    if (user) checkAndAwardBadges(targetJid, user)

    // Rafraîchir après attribution éventuelle
    const updatedUser = userDb.get(targetJid)

    // Position dans le classement
    const allUsers = userDb.leaderboard(1000)
    const pos      = allUsers.findIndex(u => u.jid === targetJid)

    let profileText = formatProfile(targetJid, updatedUser)

    // Ajouter la position
    if (pos >= 0) {
      profileText = profileText.replace(
        '⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸',
        `⛧  \n⛧  🌍 *Rang global :* #${pos + 1} / ${allUsers.length}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    await sendMessage(sock, sender, profileText, { mentions: [targetJid] })

  } catch (e) {
    console.error('❌ profile.js:', e)
    await sendMessage(sock, sender, `☩━━━〔 ⛧ *PROFILE* 〕━━━☩

☠ Rituel échoué profile: ${e.message}

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
