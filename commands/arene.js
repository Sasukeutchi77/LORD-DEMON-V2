// commands/arene.js — ARENE PVP
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { rpgDb, calculateDamage, getCritChance } from '../lib/rpgSystem.js'
import { economyDb } from '../lib/economySystem.js'

export default async function arene(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!target) return sendMessage(sock, sender, '☠ Mentionnez votre adversaire !')
  if (target === jid) return sendMessage(sock, sender, '☠ Impossible de se battre contre soi-meme !')
  const h1 = rpgDb.getHero(jid), h2 = rpgDb.getHero(target)
  if (!h1) return sendMessage(sock, sender, '☠ Creez un heros: .rpg creer <nom> <classe>')
  if (!h2) return sendMessage(sock, sender, '☠ Votre adversaire n\'a pas de heros !')
  let hp1 = h1.hp, hp2 = h2.hp, round = 1, log = []
  while (hp1 > 0 && hp2 > 0 && round <= 8) {
    const dmg1 = calculateDamage(h1, h2, Math.random() < getCritChance(h1.class))
    const dmg2 = calculateDamage(h2, h1, Math.random() < getCritChance(h2.class))
    hp2 = Math.max(0, hp2 - dmg1); hp1 = Math.max(0, hp1 - dmg2)
    log.push('Tour ' + round + ': ' + h1.name + ' -' + dmg1 + ' / ' + h2.name + ' -' + dmg2)
    round++
  }
  const winner = hp1 >= hp2 ? h1 : h2
  const winnerJid = hp1 >= hp2 ? jid : target
  const prize = 50 + Math.floor(Math.random() * 100)
  economyDb.addCoins(winnerJid, prize)
  await sendMessage(sock, sender,
    '†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⚔️ ARENE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n' +
    log.slice(-3).join('\n') + '\n\n🏆 *VAINQUEUR: ' + winner.name + '*\n💰 +' + prize + ' 🪙\n' +
    '⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸',
    { mentions: [jid, target] }
  )
}
