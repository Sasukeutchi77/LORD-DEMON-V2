// commands/minage.js — MINAGE ⛏️
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const MINERAIS = [
  {nom:'🪨 Pierre',pts:2},{nom:'🪨 Gravier',pts:1},{nom:'⚫ Charbon',pts:5},
  {nom:'🔩 Fer',pts:10},{nom:'🟡 Or',pts:25},{nom:'💎 Diamant',pts:80},{nom:'⛧ Cristal Démoniaque',pts:200}
]
const cooldowns = new Map()

export default async function minage(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const now = Date.now()
  const cd = cooldowns.get(jid) || 0
  if (now - cd < 20000) return sendMessage(sock, sender, `⏳ ${Math.ceil((20000-(now-cd))/1000)}s avant de miner`)
  cooldowns.set(jid, now)
  const weights = [30,25,20,15,7,2,1]
  const roll = Math.random()*100
  let acc = 0, minerai = MINERAIS[0]
  for (let i=0;i<weights.length;i++) { acc+=weights[i]; if (roll<acc){minerai=MINERAIS[i];break} }
  economyDb.addCoins(jid, minerai.pts)
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⛏️ MINAGE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n⛏️ Trouvé: *${minerai.nom}*\n💰 +${minerai.pts} 🪙\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}