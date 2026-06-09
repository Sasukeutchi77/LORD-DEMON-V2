// commands/roulette.js — Roulette Russe 🔫
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const deaths = new Map()

export default async function roulette(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const d = deaths.get(jid) || 0
  const survived = Math.random() > 1/6
  if (!survived) {
    deaths.set(jid, 0)
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n☠️   💀 MORT !   💀\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n🔫 *BANG !* 💥\n\n☠️ @${jid.split('@')[0]} est mort !\nNombre de survies: ${d}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [jid] }
    )
  }
  deaths.set(jid, d + 1)
  return sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n🔫   ROULETTE RUSSE   🔫\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✅ *Click...* Vous avez survécu !\n🏆 Série: ${d+1} survie(s)\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
