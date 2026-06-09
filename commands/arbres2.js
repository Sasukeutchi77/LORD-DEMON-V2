import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🌳 Séquoia géant — 94m, 1385t, le plus grand être vivant","🌲 Pin Bristlecone — 5000 ans, le plus vieux arbre, Californie","🌴 Baobab — 2000 ans, 9m diamètre, stocke 120 000L eau","🍁 Érable du Japon — Feuilles rouges, sirop érable Canada","🌿 Bambou — 91cm/jour, le plus rapide, graminée géante","🌸 Sakura — Cerisier du Japon, floraison 1-2 semaines/an","🦋 Arbre à soie — Mimosa, fleurs duvet rose-rouge éclatant","🌱 Mangrove — Racines aériennes, protection côtière, nurserie","🍀 Chêne anglais — 1000 ans, 500 espèces logent dedans","☠️ Manchineel — L'arbre le plus dangereux, pomme vénéneuse"]
export default async function arbres2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🌳 *ARBRES2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}