import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const QUETES = [
  { titre: "La Crypte Maudite", lieu: "Forêt des Ombres", danger: "⭐⭐⭐⭐", recompense: "500 pièces + Arme légendaire" },
  { titre: "Le Gouffre Infernal", lieu: "Montagne Écarlate", danger: "⭐⭐⭐⭐⭐", recompense: "1000 pièces + Armure de boss" },
  { titre: "Ruines de l'Ancien Monde", lieu: "Désert de Cendre", danger: "⭐⭐⭐", recompense: "300 pièces + Parchemin rare" },
  { titre: "Temple du Démon Dormant", lieu: "Marécages Noirs", danger: "⭐⭐⭐⭐⭐", recompense: "2000 pièces + Titre de champion" },
  { titre: "Tour des Esprits", lieu: "Plaine des Morts", danger: "⭐⭐", recompense: "150 pièces + Potion d'élite" },
]
export default async function aventure(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const q = QUETES[Math.floor(Math.random() * QUETES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚔️ *AVENTURE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🗺️ *Quête:* ${q.titre}\n` +
    `⛧  📍 *Lieu:* ${q.lieu}\n` +
    `✝  ⚠️ *Danger:* ${q.danger}\n` +
    `☩  💰 *Récompense:* ${q.recompense}\n\n` +
    `☠  _@${jid.split('@')[0]}, acceptes-tu cette quête ?_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
