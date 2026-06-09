import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["Lion — Rugit à 8km, dorme 20h/jour, savane","Baleine bleue — 30m, 180 tonnes, coeur 200kg","Aigle royal — Vision 8x, envergure 2.3m","Éléphant — 6 tonnes, gestation 22 mois, deuil","Grand requin blanc — 7m, 300 dents rotatives","Guépard — 110 km/h en 3 secondes, sprint 400m","Pieuvre — 3 coeurs, 9 cerveaux, sang bleu","Perroquet ara — Vit 80 ans, 1000 mots appris","Manchot empereur — Plonge 550m, supporte -60°C","Papillon monarque — Migration annuelle 4500 km"]
export default async function animal3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🦁 *ANIMAL3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}