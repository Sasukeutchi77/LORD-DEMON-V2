import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const BIOS = [
  { bio: "Amateur de mystères et de ramen à 3h du mat", titre: "Le Veilleur Nocturne" },
  { bio: "Cogite beaucoup, agit encore plus fort", titre: "Le Stratège Silencieux" },
  { bio: "Construit pour survivre au chaos absolu", titre: "L'Indestructible" },
  { bio: "Mode démon activé en permanence", titre: "L'Élu des Ténèbres" },
  { bio: "Explore l'impossible depuis toujours", titre: "Le Pionnier" },
  { bio: "Collectionneur d'expériences rares et d'âmes perdues", titre: "Le Chasseur d'Âmes" },
  { bio: "Quelque part entre le génie et la folie", titre: "Le Paradoxe Vivant" },
  { bio: "Vivant à 200% ou pas du tout", titre: "Le Fanatique de l'Extrême" },
]
export default async function bio(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const b = BIOS[Math.floor(Math.random() * BIOS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📝 *BIO DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 *@${target.split('@')[0]}*\n` +
    `⛧  🎭 *Titre:* ${b.titre}\n` +
    `✝  💬 *Bio:* _${b.bio}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
