// commands/peche.js — PÊCHE 🎣
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const POISSONS = [{"nom":"🐟 Sardine","pts":5,"rare":false},{"nom":"🐠 Poisson clown","pts":10,"rare":false},{"nom":"🎣 Vieille chaussure","pts":0,"rare":false},{"nom":"🦈 Requin","pts":50,"rare":true},{"nom":"🐡 Poisson-Lune","pts":30,"rare":true},{"nom":"🐙 Pieuvre","pts":40,"rare":true},{"nom":"💎 Poisson Légendaire","pts":200,"rare":true},{"nom":"🪨 Caillou","pts":0,"rare":false}]
const cooldowns = new Map()

export default async function peche(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const now = Date.now()
  const cd = cooldowns.get(jid) || 0
  if (now - cd < 30000) return sendMessage(sock, sender, `⏳ Attendez ${Math.ceil((30000-(now-cd))/1000)}s avant de pêcher à nouveau !`)
  cooldowns.set(jid, now)
  const roll = Math.random()
  const pool = roll < 0.3 ? POISSONS.filter(p=>p.rare) : POISSONS.filter(p=>!p.rare)
  const caught = pool[Math.floor(Math.random()*pool.length)]
  if (caught.pts > 0) economyDb.addCoins(jid, caught.pts)
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🎣 PÊCHE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n🎣 Vous avez pêché: *${caught.nom}*\n💰 +${caught.pts} 🪙\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}