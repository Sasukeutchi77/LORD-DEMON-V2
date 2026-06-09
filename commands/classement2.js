import { sendMessage } from '../lib/sendMessage.js'
const RANGS = [
  { pos: "🥇 1er", nom: "Lord Arken", score: 98450, titre: "Champion Absolu" },
  { pos: "🥈 2ème", nom: "Dame Valkara", score: 87320, titre: "Maîtresse des Ombres" },
  { pos: "🥉 3ème", nom: "Drakon", score: 74800, titre: "Terreur Infernale" },
  { pos: "4ème", nom: "Seraph", score: 63100, titre: "Fantôme Légendaire" },
  { pos: "5ème", nom: "Titan", score: 55700, titre: "Colosse de Fer" },
]
export default async function classement2(sock, sender, args, msg, ctx = {}) {
  const podium = RANGS.map(r =>
    `${r.pos} *${r.nom}* — ${r.score.toLocaleString()} pts _(${r.titre})_`
  ).join('\n')
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🏆 *CLASSEMENT DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `${podium}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
