import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CONCURRENTS = [
  { nom: "Foudre Noire ⛧", vitesse: 95, style: "Sprint démoniaque" },
  { nom: "Tempête d'Or ⚡", vitesse: 92, style: "Endurance légendaire" },
  { nom: "Vent Glacial ❄️", vitesse: 88, style: "Tactique aérienne" },
  { nom: "Fantôme Rouge 🔴", vitesse: 97, style: "Imprévisible et explosif" },
  { nom: "Titan Vert 💚", vitesse: 85, style: "Force brute constante" },
]
export default async function course(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const sorted = [...CONCURRENTS].sort(() => Math.random() - 0.5)
  const winner = sorted.reduce((a,b) => a.vitesse + Math.random()*20 > b.vitesse + Math.random()*20 ? a : b)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🏁 *COURSE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  *Partants:*\n` +
    `${CONCURRENTS.map(c=>`⛧  ${c.nom} — ${c.vitesse} km/h`).join('\n')}\n\n` +
    `✝  🏆 *VAINQUEUR: ${winner.nom}*\n` +
    `☩  💨 _${winner.style}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
