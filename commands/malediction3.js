import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["☠️ Malédiction du Sang — Perd 5% PV/tour 10 tours, contagieux","🌑 Ombre Collante — -50% vitesse, -30% esquive, 5 tours","💀 Marque de Mort — Ennemi te cible priorité, +200% aggro","🧊 Gel Profond — Paralysé 2 tours, immunité chaleur perdue","🔇 Silence Arcanique — Aucune magie possible pendant 4 tours","😵 Confusion — 40% chance de frapper soi-même 3 tours","💔 Coeur Brisé — -70% résistance magie, vulnérable sorts","🌊 Malédiction Marine — Dans eau uniquement, noyade lente","🐍 Venin Serpent — Dégâts doublent chaque tour (x2, x4, x8)","🌪️ Tourmente Éternelle — Knockback aléatoire chaque tour"]
export default async function malediction3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 ☠️ *MALEDICTION3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}