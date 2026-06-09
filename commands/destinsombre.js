// commands/destinsombre.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
const destins = [
  "Tu seras l'élu qui brisera les chaînes de l'obscurité ⚡",
  "Une trahison imminente changera ta vie à jamais 🩸",
  "Le pouvoir que tu cherches se cache en toi-même 🌑",
  "Tu rencontreras bientôt quelqu'un qui bouleversera tout ❤️‍🔥",
  "Une décision difficile s'impose. Choisis avec sagesse 🔱",
  "Les ténèbres te reconnaissent comme l'un des leurs ☠",
  "Un sacrifice sera nécessaire pour obtenir ce que tu désires ⛧",
  "Tu seras roi ou serviteur, selon tes prochains choix ♛",
]
export default async function destinsombre(sock, sender, args, msg) {
  const name = msg?.pushName || 'Âme errante'
  const d = destins[Math.floor(Math.random() * destins.length)]
  const text = `☩━━━〔 🌑 *DESTIN SOMBRE* 〕━━━☩\n\n☠  👤 *${name}*, les ténèbres révèlent :\n\n⛧  🔮 _"${d}"_\n\n✝  _Ce destin a été gravé dans le Livre Noir._\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
