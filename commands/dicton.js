// commands/dicton.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const dictons = [
  "Qui sème le vent récolte la tempête 🌪️",
  "L'habit ne fait pas le moine 👘",
  "Mieux vaut tard que jamais ⏰",
  "Les absents ont toujours tort 🚶",
  "Pierre qui roule n'amasse pas mousse 🌿",
  "Qui vivra verra 👁️",
  "Vouloir c'est pouvoir 💪",
  "Un tiens vaut mieux que deux tu l'auras 🤝",
  "Les chiens aboient, la caravane passe 🐕",
  "Tout ce qui brille n'est pas or ✨",
  "La nuit porte conseil 🌙",
  "Après la pluie, le beau temps 🌈",
  "Qui ne risque rien n'a rien ⚔️",
  "Le mieux est l'ennemi du bien 🎯",
  "Il ne faut pas vendre la peau de l'ours avant de l'avoir tué 🐻",
]

export default async function dicton(sock, sender, args) {
  const d = dictons[Math.floor(Math.random() * dictons.length)]
  const text =
    `☩━━━〔 📜 *DICTON DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  📜 *Dicton du jour:*\n\n` +
    `⛧  _"${d}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
