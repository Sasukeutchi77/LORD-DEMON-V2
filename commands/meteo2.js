import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["⛈️ Ouragan — Vents > 118 km/h, catégorie 1-5, cyclone tropical","🌪️ Tornade — Entonnoir 500 km/h, EF5 = destructeur total","❄️ Blizzard — Neige + vent > 56 km/h, visibilité < 400m","🌊 Tsunami — Onde sismique, 800 km/h océan, 30m côte","⚡ Foudre — 300 000 km/s, 30 000°C, 5x plus chaud Soleil","🌧️ Mousson — Saison pluies Asie, 70% eau annuelle Inde","🌡️ El Niño — Réchauffement Pacifique, perturbe météo mondiale","🌈 Arc-en-ciel — Réfraction lumière dans gouttes eau, 42°","☁️ Cumulonimbus — Nuage orage, jusqu'à 18km hauteur, grêle","❄️ Verglas — Pluie gelée, route -0.5°C, danger maximum"]
export default async function meteo2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 ⛈️ *METEO2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}