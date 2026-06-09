import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ARCANES = [
  { carte: "L'Étoile", signif: "Espoir et guidance divine", message: "La lumière te guide vers ton destin" },
  { carte: "La Lune", signif: "Illusion et intuition profonde", message: "Fais confiance à ton instinct démoniaque" },
  { carte: "Le Soleil", signif: "Succès et vitalité", message: "La gloire t'appartient, saisis-la" },
  { carte: "La Tour", signif: "Changement soudain brutal", message: "Une transformation radicale approche" },
  { carte: "La Justice", signif: "Équilibre et vérité absolue", message: "Chaque action aura sa conséquence" },
  { carte: "Le Monde", signif: "Accomplissement et cycle accompli", message: "Tu as atteint un sommet important" },
  { carte: "La Mort", signif: "Transformation profonde", message: "Une ère se ferme, une autre commence" },
  { carte: "La Roue", signif: "Cycles et destin", message: "La chance tourne — sois prêt" },
  { carte: "La Force", signif: "Courage et volonté intérieure", message: "Ta puissance vient de l'intérieur" },
  { carte: "Le Mage", signif: "Créativité et maîtrise", message: "Tu as tous les outils pour réussir" },
]
export default async function arcane(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const a = ARCANES[Math.floor(Math.random() * ARCANES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🃏 *CARTE ARCANE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  🃏 *Carte:* ${a.carte}\n` +
    `✝  📖 *Signification:* ${a.signif}\n` +
    `☩  💬 _"${a.message}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
