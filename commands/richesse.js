// commands/richesse.js — CLASSEMENT RICHESSE
import { sendMessage } from '../lib/sendMessage.js'
import { economyDb } from '../lib/economySystem.js'

export default async function richesse(sock, sender, args, msg) {
  try {
  const top = economyDb.leaderboard(10)
  if (!top.length) return sendMessage(sock, sender, '📊 Aucune donnee economique.')
  const medals = ['👑','🥈','🥉']
  const lines = top.map((e, i) => (medals[i] || '⛧') + ' ' + (i+1) + '. @' + e.jid.split('@')[0] + ' — *' + e.total + ' 🪙*').join('\n')
  await sendMessage(sock, sender,
    '†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   💰 CLASSEMENT RICHESSE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n' +
    lines + '\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸'
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}