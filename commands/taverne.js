// commands/taverne.js — TAVERNE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { rpgDb } from '../lib/rpgSystem.js'
import { economyDb } from '../lib/economySystem.js'

export default async function taverne(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const hero = rpgDb.getHero(jid)
  if (!hero) return sendMessage(sock, sender, '☠ Pas de heros.')
  if (hero.hp >= hero.max_hp) return sendMessage(sock, sender, '✅ Vous etes deja en pleine forme !')
  const cost = Math.max(10, Math.floor((hero.max_hp - hero.hp) * 0.5))
  const e = economyDb.ensure(jid)
  if ((e.coins || 0) < cost) return sendMessage(sock, sender, '☠ Pas assez de coins. Cout: ' + cost + ' 🪙')
  rpgDb.updateHero(jid, { hp: hero.max_hp })
  economyDb.removeCoins(jid, cost)
  await sendMessage(sock, sender,
    '†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🍺 TAVERNE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n' +
    '✅ Vous vous reposez a la taverne...\n' +
    '❤️ HP restaures: ' + hero.max_hp + '/' + hero.max_hp + '\n' +
    '💸 Cout: -' + cost + ' 🪙\n' +
    '⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸'
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}