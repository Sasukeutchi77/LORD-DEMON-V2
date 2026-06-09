import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🫀 Cœur — 300g, 100 000 batt/jour, claque en 3 min sans O2","🧠 Cerveau — 1.4kg, 86Mrd neurones, 20% oxygène corps entier","🫁 Poumons — Surface 70m², 300M alvéoles, 12-20 resp/min","🦴 Fémur — Os le plus long et solide, supporte 30x poids corps","👁️ Œil — 7M cônes couleurs, 120M bâtonnets luminosité, 576MP","👂 Oreille — Entend 20Hz-20kHz, 25 000 cellules ciliées","🦷 Dents — Émail = tissu le plus dur, 4 types différents","💧 Reins — Filtrent 180L sang/jour, 2M néphrons chacun","🩸 Foie — 500 fonctions, seul organe qui se régénère en 6 sem","🦠 Microbiome — 3.8T bactéries, plus que cellules humaines!"]
export default async function corps2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🫀 *CORPS2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}