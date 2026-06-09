// commands/boss.js — BOSS
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { rpgDb, ENEMIES } from '../lib/rpgSystem.js'

export default async function boss(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const hero = rpgDb.getHero(jid)
  const bosses = Object.entries(ENEMIES).filter(([,e]) => e.isBoss)
  const lines = bosses.map(([id, b]) => {
    const ok = !hero || hero.level >= 20
    return (ok ? '✅' : '🔒') + ' *' + b.name + '*\n   HP: ' + b.hp + ' | ATK: ' + b.atk + ' | XP: ' + b.xp + ' | Or: ' + b.gold
  }).join('\n\n')
  await sendMessage(sock, sender,
    '†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠️ BOSS   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n' +
    lines + '\n\n💡 Affrontez-les via .rpg explorer\n' +
    '⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸'
  )
}
