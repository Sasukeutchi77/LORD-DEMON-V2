import { sendMessage } from '../lib/sendMessage.js'
const MESSAGES = [
  { msg: "Ce jour appartient aux démons. Sois implacable.", emoji: "⛧" },
  { msg: "Les ombres s'alignent. Ta destinée s'écrit dans le feu.", emoji: "🔥" },
  { msg: "Le Démon Primordial observe chacun de tes mouvements.", emoji: "👁️" },
  { msg: "Ce n'est pas une journée ordinaire — c'est une journée de conquête.", emoji: "⚔️" },
  { msg: "Les faibles tremblent. Les forts avancent. Lequel es-tu ?", emoji: "💀" },
  { msg: "Aujourd'hui, le voile entre les mondes est mince. Méfie-toi.", emoji: "🌑" },
  { msg: "La puissance des ténèbres est à son apogée ce jour.", emoji: "🕯️" },
]
export default async function demonday(sock, sender, args, msg, ctx = {}) {
  const now = new Date()
  const m = MESSAGES[now.getDay() % MESSAGES.length]
  const date = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🌑 *JOUR DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📅 *${date.toUpperCase()}*\n\n` +
    `${m.emoji}  _"${m.msg}"_\n\n` +
    `⛧  — LORD DEMON\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
