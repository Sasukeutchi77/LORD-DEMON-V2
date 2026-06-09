import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ALLIANCES = [
  { nom: "Alliance de Feu et d'Ombres", pacte: "Combat commun jusqu'à la mort", bonus: "+30% ATK à tous les membres" },
  { nom: "Pacte de Sang Scellé", pacte: "Lié par le sang, indestructible", bonus: "Partage de 20% des points d'XP" },
  { nom: "Coalition des Démons ⛧", pacte: "Forces des abysses unies", bonus: "Immunité aux malédictions mineures" },
  { nom: "Union des Anciens", pacte: "Sagesse et puissance ancestrale", bonus: "Accès aux techniques secrètes" },
  { nom: "Accord Fragile Signé", pacte: "Trêve temporaire mais officielle", bonus: "Cessez-le-feu garanti 5 jours" },
  { nom: "Confrérie des Éternels", pacte: "Au-delà de la mort même", bonus: "Résurrection assistée 1x" },
]
export default async function alliance(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const a = ALLIANCES[Math.floor(Math.random() * ALLIANCES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🤝 *ALLIANCE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏴 *Alliance:* ${a.nom}\n` +
    `⛧  📜 *Pacte:* ${a.pacte}\n` +
    `✝  ✨ *Bonus:* ${a.bonus}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
