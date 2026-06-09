import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🥗 Protéines — 0.8g/kg/jour, viande/légumineuses/oeufs, muscles","🍞 Glucides — 50-55% calories, céréales complètes, énergie","🫒 Lipides — 30% calories, oméga-3 poisson, avocat, amandes","🧴 Vitamines — A vision, B énergie, C immunité, D os, E peau","⚗️ Minéraux — Fer sang, Calcium os, Magnésium 300 fonctions","💧 Eau — 60% corps, 2L/jour min, transport nutriments","🌿 Fibres — 25-30g/jour, probiotiques, microbiome sain","🍓 Antioxydants — Vitamines C/E, polyphénols, anti-âge","🐟 Oméga-3 — Cerveau, coeur, anti-inflammatoire, poissons gras","🫙 Probiotiques — Yogourt, kéfir, kimchi, flore intestinale"]
export default async function nutrition3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🥗 *NUTRITION3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}