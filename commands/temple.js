// commands/temple.js — TEMPLE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { rpgDb } from '../lib/rpgSystem.js'

const BLESSINGS = [
  { name: '🔥 Benediction du Feu', effect: 'ATK +5 (symbolique)', hp: 0 },
  { name: '🛡️ Benediction du Bouclier', effect: 'DEF +5 (symbolique)', hp: 0 },
  { name: '❤️ Benediction de Vie', effect: '+30 HP instantane', hp: 30 },
  { name: '✨ Benediction Divine', effect: 'XP double (prochain combat)', hp: 0 },
]
const cooldown = new Map()

export default async function temple(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const hero = rpgDb.getHero(jid)
  if (!hero) return sendMessage(sock, sender, '☠ Pas de heros.')
  const cd = cooldown.get(jid) || 0
  if (Date.now() - cd < 3600000) {
    const mins = Math.ceil((3600000 - (Date.now() - cd)) / 60000)
    return sendMessage(sock, sender, '⏳ Deja beni recemment. Revenez dans ' + mins + ' min.')
  }
  const blessing = BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)]
  cooldown.set(jid, Date.now())
  if (blessing.hp) rpgDb.updateHero(jid, { hp: Math.min(hero.max_hp, hero.hp + blessing.hp) })
  await sendMessage(sock, sender,
    '†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⛪ TEMPLE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n' +
    '🙏 Les dieux vous accordent leur faveur !\n\n' +
    blessing.name + '\n✨ ' + blessing.effect + '\n' +
    '⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸'
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}