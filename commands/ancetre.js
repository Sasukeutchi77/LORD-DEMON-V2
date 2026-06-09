import { sendMessage } from '../lib/sendMessage.js'
const ANCETRES = [
  { nom: "Lord Malachar", epoque: "XIV° siècle", exploit: "Conquit 7 royaumes en 3 ans", heritage: "Épée maudite + Domaine des Cendres" },
  { nom: "Valkara la Sombre", epoque: "IX° siècle", exploit: "Pacta avec les démons primordiaux", heritage: "Magie noire transmissible" },
  { nom: "Arken le Brisé", epoque: "XVI° siècle", exploit: "Survécut à 100 batailles seul", heritage: "Cicatrices sacrées, corps de fer" },
  { nom: "Seraphine des Ombres", epoque: "XII° siècle", exploit: "Fonda l'ordre des assassins nocturnes", heritage: "Art de disparaître, lames empoisonnées" },
  { nom: "Drakon Sinistre", epoque: "VI° siècle", exploit: "Apprivoisa un dragon de guerre", heritage: "Sang de dragon, résistance au feu" },
]
export default async function ancetre(sock, sender, args, msg, ctx = {}) {
  const a = ANCETRES[Math.floor(Math.random() * ANCETRES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💀 *ANCÊTRE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 *Nom:* ${a.nom}\n` +
    `⛧  🕰️ *Époque:* ${a.epoque}\n` +
    `✝  ⚔️ *Exploit:* ${a.exploit}\n` +
    `☩  🏺 *Héritage:* ${a.heritage}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
