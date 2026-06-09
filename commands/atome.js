import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["⚛️ Hydrogène — Numéro atomique 1, le plus abondant dans l'univers","⚛️ Carbone — Base de toute vie, 4 liaisons, diamant = forme pure","⚛️ Oxygène — 21% atmosphère, combustion, respiration cellulaire","⚛️ Or (Au) — Numéro 79, conducteur parfait, résiste corrosion","⚛️ Uranium — Radioactif, énergie nucléaire, 92 protons","⚛️ Silicium — Semiconducteur, puces informatiques, 28 protons","⚛️ Calcium — Os et dents, 40g chez adulte, numéro 20","⚛️ Fer (Fe) — Noyau terrestre, hémoglobine, numéro 26","⚛️ Hélium — Noble, ballon léger, étoiles, numéro 2","⚛️ Plutonium — Synthétique, arme nucléaire, hautement toxique"]
export default async function atome(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 ⚛️ *ATOME* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}