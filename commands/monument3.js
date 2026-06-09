import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Tour Eiffel (Paris) — 330m, 1889, 7M visiteurs/an","Pyramides Gizeh (Égypte) — 4500 ans, 138m, Kheops","Colisée (Rome) — 70000 spectateurs, 80 arcs, 70 ap","Machu Picchu (Pérou) — Cité inca 2430m, 1450","Angkor Wat (Cambodge) — Plus grand complexe religieux","Alhambra (Grenade) — Palais mauresque, jardins Nasrides","Sagrada Família — Gaudí, non finie depuis 1882","Kremlin (Moscou) — 5 palais, 4 cathédrales, 20 tours","Mosquée Hassan II (Maroc) — 3e plus grande du monde","Mont-Saint-Michel — Abbaye sur île de marée, Normandie"]
export default async function monument3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🏛️ *MONUMENT3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}