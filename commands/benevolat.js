import { sendMessage } from '../lib/sendMessage.js'
const ACTIONS_BENE = [
  { action: "Soins aux blessés de guerre", impact: "+200 réputation, +50 karma", recompense: "Titre: Guérisseur des Ombres" },
  { action: "Distribution de provisions aux démunis", impact: "+150 réputation, +30 karma", recompense: "Bénédiction de 3 villages" },
  { action: "Reconstruction d'un orphelinat détruit", impact: "+300 réputation, +100 karma", recompense: "Loyauté de 50 habitants" },
  { action: "Enseignement des arts de combat aux faibles", impact: "+100 réputation, +20 karma", recompense: "5 disciples fidèles" },
  { action: "Libération de prisonniers injustes", impact: "+250 réputation, +80 karma", recompense: "Alliance avec la résistance" },
]
export default async function benevolat(sock, sender, args, msg, ctx = {}) {
  const a = ACTIONS_BENE[Math.floor(Math.random() * ACTIONS_BENE.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🤲 *BÉNÉVOLAT*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🌟 *Action:* ${a.action}\n` +
    `⛧  📈 *Impact:* ${a.impact}\n` +
    `✝  🏆 *Récompense:* ${a.recompense}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
