import { sendMessage } from '../lib/sendMessage.js'
const COSMOS = [
  { sujet: "Voie Lactée", emoji: "🌌", fact: "200-400 milliards d'étoiles, 100 000 années-lumière de diamètre" },
  { sujet: "Soleil", emoji: "⭐", fact: "1.4M km de diamètre, 4.6 milliards d'ans, étoile de type G2V" },
  { sujet: "Sagittarius A*", emoji: "🕳️", fact: "Trou noir central, 4 millions de fois la masse du soleil" },
  { sujet: "Bételgeuse", emoji: "🌟", fact: "Supergéante rouge 1000x le soleil — bientôt supernova ?" },
  { sujet: "Exoplanètes", emoji: "🪐", fact: "5500+ confirmées, dont Kepler 186f dans la zone habitable" },
  { sujet: "Étoile à neutrons", emoji: "💫", fact: "2km de rayon, 2 millions °C, densité maximale possible" },
  { sujet: "Télescope James Webb", emoji: "🔭", fact: "Observe jusqu'à 13.8 milliards d'années-lumière — premières galaxies" },
  { sujet: "Astéroïde Apophis", emoji: "☄️", fact: "340m de large, passage serré en 2029, risque en 2068" },
]
export default async function cosmos2(sock, sender, args, msg, ctx = {}) {
  const c = COSMOS[Math.floor(Math.random() * COSMOS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔭 *COSMOS INFINI*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ${c.emoji} *${c.sujet}*\n\n` +
    `⛧  📖 _${c.fact}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
