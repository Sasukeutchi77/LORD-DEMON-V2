// commands/chasse.js — CHASSE 🏹
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const PROIES = [{"nom":"🐇 Lapin","pts":8},{"nom":"🦊 Renard","pts":20},{"nom":"🐺 Loup","pts":35},{"nom":"🦌 Cerf","pts":25},{"nom":"🐗 Sanglier","pts":30},{"nom":"🦁 Lion","pts":80},{"nom":"💨 Rien","pts":0},{"nom":"💨 Raté","pts":0}]
const cooldowns = new Map()

export default async function chasse(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const now = Date.now()
  const cd = cooldowns.get(jid) || 0
  if (now - cd < 45000) return sendMessage(sock, sender, `⏳ Rechargez votre arc ! ${Math.ceil((45000-(now-cd))/1000)}s`)
  cooldowns.set(jid, now)
  const proie = PROIES[Math.floor(Math.random()*PROIES.length)]
  if (proie.pts > 0) economyDb.addCoins(jid, proie.pts)
  const msg2 = proie.pts > 0 ? `🏹 Vous avez chassé: *${proie.nom}*\n💰 +${proie.pts} 🪙` : `🏹 *Raté !* L'animal s'est enfui 💨`
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🏹 CHASSE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${msg2}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
