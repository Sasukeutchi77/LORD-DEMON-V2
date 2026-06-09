// commands/competences.js — COMPETENCES RPG
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { rpgDb, RPG_CLASSES } from '../lib/rpgSystem.js'

export default async function competences(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const hero = rpgDb.getHero(jid)
  if (!hero) return sendMessage(sock, sender, '☠ Pas de heros. .rpg creer <nom> <classe>')
  const skills = JSON.parse(hero.skills || '[]')
  const clsData = RPG_CLASSES[hero.class] || { emoji: '⚔️', skills: [] }
  const allSkills = clsData.skills || []
  const unlocked = skills.map(s => '✅ ' + s).join('\n') || 'Aucune'
  const locked = allSkills.map(s => skills.includes(s) ? '✅ ' + s : '🔒 ' + s).join('\n')
  await sendMessage(sock, sender,
    '†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n' +
    clsData.emoji + '   COMPETENCES   ☩\n' +
    '⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n' +
    '*Competences acquises:*\n' + unlocked + '\n\n' +
    '*Competences de classe:*\n' + locked + '\n' +
    '⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸'
  )
}
