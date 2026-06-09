import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ENIGMES = [
  { q: "J'ai des villes, mais pas de maisons. Des montagnes, mais pas d'arbres. De l'eau, mais pas de poissons. Qu'est-ce que je suis ?", r: "Une carte géographique 🗺️" },
  { q: "Plus je sèche, plus je suis mouillée. Qui suis-je ?", r: "Une serviette 🏊" },
  { q: "Je parle sans bouche, j'entends sans oreilles. Qui suis-je ?", r: "Un écho 🔊" },
  { q: "Je cours mais n'ai pas de jambes, j'ai un lit mais ne dors pas. Qui suis-je ?", r: "Une rivière 🌊" },
  { q: "Plus je grandis, plus je diminue. Qu'est-ce que je suis ?", r: "Une bougie 🕯️" },
  { q: "Je suis plein de trous mais je retiens l'eau. Qui suis-je ?", r: "Une éponge 🧽" },
  { q: "Je n'ai pas de vie mais je peux mourir. Qui suis-je ?", r: "Une batterie 🔋" },
  { q: "On me jette quand on en a besoin, on me reprend quand on n'en a plus besoin. Qu'est-ce que je suis ?", r: "Une ancre ⚓" },
]
const sessions = new Map()
export default async function enigme(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (sessions.has(sender)) {
    const s = sessions.get(sender)
    const userAnswer = args.join(' ').toLowerCase()
    const correct = s.reponse.toLowerCase().split(' ')[0]
    sessions.delete(sender)
    const ok = userAnswer.includes(correct.replace(/[^a-zàéêèùçôî]/g,''))
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🧩 *RÉSULTAT*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠  ${ok ? '✅ *BONNE RÉPONSE !*' : '❌ *MAUVAISE RÉPONSE !*'}\n` +
      `⛧  💡 *Réponse:* ${s.reponse}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const e = ENIGMES[Math.floor(Math.random() * ENIGMES.length)]
  sessions.set(sender, { reponse: e.r })
  setTimeout(() => sessions.delete(sender), 60000)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🧩 *ÉNIGME DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ❓ _${e.q}_\n\n` +
    `⛧  _Réponds dans ce chat (60 sec)_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
