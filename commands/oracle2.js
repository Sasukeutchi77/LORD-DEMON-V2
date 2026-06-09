// commands/oracle2.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const reponses = [
  "Les astres s'alignent en ta faveur. Agis maintenant ⚡",
  "L'ombre te protège. Reste dans le silence ☠",
  "Une trahison se cache derrière un sourire 🩸",
  "Le chemin est long mais la victoire certaine ⛧",
  "Méfie-toi de celui qui parle trop fort 👁️",
  "La fortune sourit aux audacieux ✝",
  "Un nouveau cycle commence. Prépare-toi 🌑",
  "L'épreuve que tu redoutes sera ta plus grande victoire 💀",
  "Quelqu'un pense à toi en ce moment ☩",
  "Le danger est réel mais tu as la force de l'affronter ⚔️",
  "Lâche prise. L'univers a un plan pour toi 🌌",
  "La vérité que tu cherches est plus proche que tu ne le crois 🔮"
]

export default async function oracle2(sock, sender, args) {
  try {
  if (!args.length) return await sendMessage(sock, sender, `☩━━━〔 🔮 *ORACLE II* 〕━━━☩\n\n✝  Usage: *.oracle2 <ta question>*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const question = args.join(' ')
  const rep = reponses[Math.floor(Math.random() * reponses.length)]
  const text =
    `☩━━━〔 🔮 *ORACLE DES TÉNÈBRES II* 〕━━━☩\n\n` +
    `☠  ❓ *Question:* _${question}_\n\n` +
    `⛧  🔮 *Révélation:*\n` +
    `✝  _"${rep}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}