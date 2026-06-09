import { sendMessage } from '../lib/sendMessage.js'
const STYLES = [
  { style: "Fantôme Nocturne", arme: "Dague spectrale", technique: "Frappe dans l'ombre sans laisser de trace" },
  { style: "Lame Empoisonnée", arme: "Épée courbe toxique", technique: "Venin dévastateur, mort différée" },
  { style: "Exécuteur Silencieux", arme: "Garrot de soie noire", technique: "Approche imperceptible, mort instantanée" },
  { style: "Archère des Ténèbres", arme: "Arc enchanté sombre", technique: "Frappe à 300m, impossible à esquiver" },
  { style: "Démon Infiltré", arme: "Griffes démoniaques", technique: "Change de forme, s'intègre puis frappe" },
]
export default async function assassin(sock, sender, args, msg, ctx = {}) {
  const s = STYLES[Math.floor(Math.random() * STYLES.length)]
  const precision = Math.floor(Math.random() * 30) + 71
  const furtivite = Math.floor(Math.random() * 20) + 80
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🗡️ *STYLE D'ASSASSIN*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎭 *Style:* ${s.style}\n` +
    `⛧  🗡️ *Arme:* ${s.arme}\n` +
    `✝  🎯 *Technique:* ${s.technique}\n` +
    `☩  📊 *Précision:* ${precision}% | *Furtivité:* ${furtivite}%\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
