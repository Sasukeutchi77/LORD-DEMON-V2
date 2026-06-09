// commands/voyage.js — CARTE
import { sendMessage } from '../lib/sendMessage.js'
import { rpgDb, DUNGEONS } from '../lib/rpgSystem.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function voyage(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const hero = rpgDb.getHero(jid)
  const lines = DUNGEONS.map(d => ((!hero || hero.level >= d.minLevel) ? '✅' : '🔒') + ' ' + d.name + ' (Niv.' + d.minLevel + '+) — .rpg explorer ' + d.id).join('\n')
  await sendMessage(sock, sender,
    '†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🗺️ CARTE DU MONDE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n' +
    lines + '\n\n' + (hero ? 'Ton niveau: ' + hero.level : 'Pas de heros — .rpg creer') + '\n' +
    '⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸'
  )
}
