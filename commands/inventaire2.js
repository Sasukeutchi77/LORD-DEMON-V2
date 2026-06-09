// commands/inventaire2.js — INVENTAIRE RPG
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { rpgDb, EQUIPMENT, RPG_CLASSES } from '../lib/rpgSystem.js'

export default async function inventaire2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const hero = rpgDb.getHero(jid)
  if (!hero) return sendMessage(sock, sender, '☠ Creez un heros: .rpg creer <nom> <classe>')
  const eq = JSON.parse(hero.equipment || '{}')
  const skills = JSON.parse(hero.skills || '[]')
  const clsData = RPG_CLASSES[hero.class] || { emoji: '⚔️' }
  const weapon = eq.weapon ? (EQUIPMENT[eq.weapon]?.name || eq.weapon) : 'Aucune'
  const armor = eq.armor ? (EQUIPMENT[eq.armor]?.name || eq.armor) : 'Aucune'
  const skillsText = skills.map(s => '⛧ ' + s).join('\n') || 'Aucune compétence'
  await sendMessage(sock, sender,
    '†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n' +
    clsData.emoji + '   INVENTAIRE RPG   ☩\n' +
    '⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n' +
    '⚔️ Arme: ' + weapon + '\n' +
    '🛡️ Armure: ' + armor + '\n\n' +
    '💫 *Compétences:*\n' + skillsText + '\n\n' +
    '💰 Or: *' + hero.gold + '*\n' +
    '⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸'
  )
}
