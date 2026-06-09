import { sendMessage } from '../lib/sendMessage.js'
const CIBLES = [
  { cible: "Espion ennemi", difficulte: "⭐⭐⭐", recompense: 500, methode: "Piège d'ombre et lien magique" },
  { cible: "Démon fugitif", difficulte: "⭐⭐⭐⭐", recompense: 1000, methode: "Sceau de confinement" },
  { cible: "Traître du cercle", difficulte: "⭐⭐", recompense: 300, methode: "Filet enchanté" },
  { cible: "Bête sauvage rare", difficulte: "⭐⭐⭐", recompense: 750, methode: "Amulette de soumission" },
  { cible: "Fantôme rebelle", difficulte: "⭐⭐⭐⭐⭐", recompense: 2000, methode: "Urne des âmes perdues" },
]
export default async function capture(sock, sender, args, msg, ctx = {}) {
  const c = CIBLES[Math.floor(Math.random() * CIBLES.length)]
  const succes = Math.random() > 0.3
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🪤 *CAPTURE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎯 *Cible:* ${c.cible}\n` +
    `⛧  ⚠️ *Difficulté:* ${c.difficulte}\n` +
    `✝  🔧 *Méthode:* ${c.methode}\n` +
    `☩  ${succes ? `✅ *CAPTURÉ ! +${c.recompense} 🪙*` : `❌ *ÉCHEC — cible s'est échappée*`}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
