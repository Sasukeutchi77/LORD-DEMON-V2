// commands/devinette.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const devinettes = [
  { q: "J'ai des dents mais je ne mords pas. Qui suis-je ?", r: "Un peigne 🪮" },
  { q: "Plus je sèche, plus je suis mouillée. Qui suis-je ?", r: "Une serviette 🏖️" },
  { q: "Je parle sans bouche et entends sans oreilles. Qui suis-je ?", r: "Un écho 🗣️" },
  { q: "Je suis toujours devant toi mais ne peut être vue. Qu'est-ce ?", r: "L'avenir 🌌" },
  { q: "J'ai des mains mais pas de corps, un visage mais pas de yeux. Qui suis-je ?", r: "Une horloge ⏰" },
  { q: "Plus tu me prends, plus tu laisses derrière. Qu'est-ce ?", r: "Tes pas 👣" },
  { q: "Je commence la nuit, termine le matin, et je suis au milieu de 'midi'. Qui suis-je ?", r: "La lettre 'N' 🔤" },
  { q: "Je monte mais ne descends jamais. Qu'est-ce ?", r: "Ton âge 🎂" },
  { q: "Je suis léger comme une plume mais même le plus fort ne peut me tenir longtemps. Qui suis-je ?", r: "Son souffle 💨" },
  { q: "Plus il y en a, moins on voit. Qu'est-ce ?", r: "L'obscurité 🌑" },
]

export default async function devinette(sock, sender, args) {
  const dev = devinettes[Math.floor(Math.random() * devinettes.length)]
  const montrerReponse = args[0]?.toLowerCase() === 'rep' || args[0]?.toLowerCase() === 'reponse'
  let text =
    `☩━━━〔 🧩 *DEVINETTE DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  🤔 *Devinette:*\n` +
    `⛧  _${dev.q}_\n\n`
  if (montrerReponse) {
    text += `✝  💡 *Réponse:* ${dev.r}\n\n`
  } else {
    text += `✝  💡 Tape *.devinette rep* pour voir la réponse\n\n`
  }
  text += `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
