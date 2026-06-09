import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const PROIES = [
  { nom: "🐇 Lapin des ombres", pts: 8, desc: "Petite prise, mais c'est un début" },
  { nom: "🦊 Renard argenté", pts: 20, desc: "Pelage précieux, vendu cher" },
  { nom: "🐺 Loup solitaire", pts: 35, desc: "Dangereux mais très rentable" },
  { nom: "🦌 Cerf légendaire", pts: 25, desc: "Bois magiques très recherchés" },
  { nom: "🐗 Sanglier infernal", pts: 30, desc: "Crocs empoisonnés, viande rare" },
  { nom: "🦁 Lion des steppes", pts: 80, desc: "Roi de la savane démoniaque !" },
  { nom: "🐉 Dragon miniature", pts: 150, desc: "Exceptionnel ! Une trouvaille légendaire !" },
  { nom: "💨 Rien", pts: 0, desc: "La forêt était vide aujourd'hui..." },
  { nom: "💨 Raté", pts: 0, desc: "L'animal a déjoué le piège" },
]
const cooldowns = new Map()

export default async function chasse(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const now = Date.now()
  const cd = cooldowns.get(jid) || 0
  const restant = 45000 - (now - cd)
  if (restant > 0) {
    return sendMessage(sock, sender,
      `☩━━━〔 🏹 *CHASSE* 〕━━━☩\n\n` +
      `☠  ⏳ *Rechargez votre arc !*\n` +
      `⛧  Prêt dans *${Math.ceil(restant/1000)}s*\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
  cooldowns.set(jid, now)
  const proie = PROIES[Math.floor(Math.random() * PROIES.length)]
  if (proie.pts > 0) economyDb.addCoins(jid, proie.pts)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🏹 *CHASSE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎯 *Proie:* ${proie.nom}\n` +
    `⛧  📖 _${proie.desc}_\n` +
    `✝  ${proie.pts > 0 ? `💰 *Gain:* +${proie.pts} 🪙` : `💀 *Rentré bredouille...*`}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
