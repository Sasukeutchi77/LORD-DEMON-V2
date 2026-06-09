import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ITEMS = [
  { item: "Fragment de cristal bleu ⛧", valeur: 250, rareté: "Épique" },
  { item: "Rune ancienne gravée ✝", valeur: 400, rareté: "Légendaire" },
  { item: "Pièce d'or démoniaque 💰", valeur: 150, rareté: "Rare" },
  { item: "Potion de régénération 🧪", valeur: 100, rareté: "Commun" },
  { item: "Parchemin mystique 📜", valeur: 300, rareté: "Épique" },
  { item: "Gemme des abysses 💎", valeur: 600, rareté: "Mythique" },
  { item: "Plume de phoenix 🪶", valeur: 350, rareté: "Rare" },
]
export default async function collecte(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  const quantite = Math.floor(Math.random() * 3) + 1
  const total = item.valeur * quantite
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎒 *COLLECTE DU JOUR*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${jid.split('@')[0]}\n\n` +
    `⛧  💎 *Objet trouvé:* ${item.item} x${quantite}\n` +
    `✝  💰 *Valeur:* ${total} pièces\n` +
    `☩  🏷️ *Rareté:* ${item.rareté}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
