import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["👹 Lich Éternel — Nécromancien immortel, ressuscite en 3 tours","🐉 Dragon Ancien — 2000 PV, souffle feu zone, griffe +500","🌊 Léviathan — Tsunami, 1500 PV, armure maritime impénétrable","💀 Seigneur des Morts — Invoque 10 zombies/tour, intangible","⚡ Zeus Déchu — Foudre divine zone, immunité électrique, ailes","🔥 Phénix Corrompu — Renaît à 50% PV, explosion à la mort","🌑 Ombre Absolue — Intangible jour, x200% force la nuit","🪨 Titan de Pierre — 3000 PV, séisme, immunité physique totale","🧊 Reine des Glaces — Gel zone, ralentit 80%, armure cristal","☠️ Démon Primordial — Toutes magies, téléport, réfléchit sorts"]
export default async function boss2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 👹 *BOSS2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}