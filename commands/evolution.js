import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const EVOLUTIONS = [
  { titre: "Évolution Initiale", desc: "Tu franchis le premier seuil de puissance", forme: "Forme Éveillée", bonus: "+100 ATK, +50 DEF" },
  { titre: "Métamorphose Sombre", desc: "Ton corps se transforme, absorbant les ténèbres", forme: "Forme Démoniaque", bonus: "+300 ATK, +150 DEF, aura de terreur" },
  { titre: "Ascension Légendaire", desc: "Tu transcendes les limites mortelles", forme: "Forme Légendaire", bonus: "+600 ATK, +300 DEF, immunité aux sorts" },
  { titre: "Apothéose Infernale", desc: "Tu deviens une entité au-delà du bien et du mal", forme: "Forme Divine Sombre", bonus: "+1000 tout stats, résurrection automatique" },
  { titre: "Éveil Primordial", desc: "Le pouvoir originel se manifeste en toi", forme: "Forme Primordiale", bonus: "Puissance illimitée, contrôle total" },
]
export default async function evolution(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const e = EVOLUTIONS[Math.floor(Math.random() * EVOLUTIONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ✨ *ÉVOLUTION !*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🌟 *Stade:* ${e.titre}\n` +
    `⛧  📖 _${e.desc}_\n` +
    `✝  🎭 *Nouvelle forme:* ${e.forme}\n` +
    `☩  ⚡ *Bonus:* ${e.bonus}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
