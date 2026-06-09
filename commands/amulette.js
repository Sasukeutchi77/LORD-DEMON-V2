import { sendMessage } from '../lib/sendMessage.js'
const AMULETTES = [
  { nom: "Amulette de l'Ombre", symbole: "🌑", pouvoir: "Protection contre les ténèbres", stats: "+50 DEF, immunité silence" },
  { nom: "Sceau Démoniaque", symbole: "⛧", pouvoir: "Canalise l'énergie infernale", stats: "+100 ATK, régénère 5% PV/tour" },
  { nom: "Croix Inversée", symbole: "✝", pouvoir: "Brise les barrières magiques", stats: "Perce toutes les armures" },
  { nom: "Médaillon de Sang", symbole: "🩸", pouvoir: "Lie l'âme au combat", stats: "+200 PV max, résurrection 1x" },
  { nom: "Crâne des Ancêtres", symbole: "☠", pouvoir: "Invoque sagesse des morts", stats: "+30% critique, vision ténèbres" },
  { nom: "Sceau du Maître", symbole: "☩", pouvoir: "Marque de l'élu démoniaque", stats: "+150 tous stats, aura de terreur" },
]
export default async function amulette(sock, sender, args, msg, ctx = {}) {
  const a = AMULETTES[Math.floor(Math.random() * AMULETTES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ${a.symbole} *AMULETTE MYSTIQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏺 *Nom:* ${a.nom}\n` +
    `⛧  🔮 *Pouvoir:* ${a.pouvoir}\n` +
    `✝  ⚡ *Stats:* ${a.stats}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
