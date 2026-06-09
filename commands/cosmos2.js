import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🌌 Voie Lactée — 200-400Mrd d'étoiles, 100 000 années-lumière","⭐ Soleil — 1.4M km diamètre, 4.6 milliards ans, G2V jaune","🕳️ Trou noir — Sagittarius A* = 4M fois soleil, centre galaxie","🌟 Bételgeuse — Supergéante rouge, 1000x soleil, bientôt nova?","🪐 Exoplanètes — 5500+ confirmées, dont Kepler 186f habitable?","🌠 Étoile à neutrons — 2km rayon, 2M°C, densité max possible","🌌 Nébuleuse — Nuage gaz, naissent étoiles, Pilliers création","🔭 Télescope Webb (JWST) — 13.8Mrd années-lumière, 1er galaxies","☄️ Comète de Halley — Orbite 75 ans, prochaine visite 2061","🌍 Astéroïde Apophis — 340m, passe proche 2029, 2068 risque"]
export default async function cosmos2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🌌 *COSMOS2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}