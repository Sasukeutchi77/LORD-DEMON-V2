// commands/fait-espace.js
import { sendMessage } from '../lib/sendMessage.js'

const FACTS = ["🚀 Neptune a des vents à 2000 km/h.","☀️ Un million de Terres rentreraient dans le Soleil.","🌕 La Lune s'éloigne de 3,8 cm de la Terre chaque année.","⭐ Les étoiles que vous voyez sont mortes depuis des millénaires.","🪐 Saturne est si légère qu'elle flotterait sur l'eau.","🌌 La Voie Lactée contient 200-400 milliards d'étoiles.","☄️ Les comètes sentent le soufre et les amandes amères.","🌍 La Terre tourne à 1670 km/h sur son axe.","♾️ L'univers a 13,8 milliards d'années.","🔭 Il faut 100 000 ans pour traverser la Voie Lactée à la vitesse de la lumière."]

export default async function fait_espace(sock, sender, args, msg) {
  const fact = FACTS[Math.floor(Math.random() * FACTS.length)]
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🚀 FAIT SPATIAL   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${fact}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
