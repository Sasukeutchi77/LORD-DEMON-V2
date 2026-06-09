import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const TROUVAILLES = [
  { item: "🗡️ Épée légendaire +500 ATK", valeur: 800 },
  { item: "🛡️ Armure divine +800 DEF", valeur: 950 },
  { item: "💍 Anneau du destin", valeur: 1200 },
  { item: "⚗️ Potion de puissance ×3", valeur: 350 },
  { item: "📿 Amulette sacrée", valeur: 600 },
  { item: "🔮 Orbe de magie pure", valeur: 750 },
  { item: "🪶 Plume de Corbeau Maudit ⛧", valeur: 2000 },
]
export default async function corbeau(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const t = TROUVAILLES[Math.floor(Math.random() * TROUVAILLES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🐦‍⬛ *LE CORBEAU MYSTIQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${jid.split('@')[0]}\n\n` +
    `⛧  🐦‍⬛ _Le corbeau t'apporte un don des ombres..._\n\n` +
    `✝  🎁 *Objet:* ${t.item}\n` +
    `☩  💰 *Valeur:* ${t.valeur.toLocaleString()} pièces\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
