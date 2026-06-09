import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🌊 Baleine bleue — 30m, 180t, coeur 1m, cœur bat 5-6 fois/min","🦈 Grand requin blanc — 6m, 300 dents rotatives, senso olfactif","🐙 Pieuvre — 3 cœurs, 9 cerveaux, 8 bras, sang bleu cuivre","🐠 Poisson-clown — Vit dans anémone toxique, immunisé","🐡 Poisson-fugu — Tetrodotoxine, 1200x plus toxique que cyanure","🦑 Calmar géant — 13m, yeux de 30cm, profondeur 1000m","🐋 Orque — QI élevé, chasse coopérative, famille soudée","🌿 Kelp — Forêts algues géantes, 40m, habitat 800 espèces","🐢 Tortue luth — 2m, 900kg, plonge 1200m, vit 80 ans","🦀 Crabe yéti — Poils = bactéries, dorsale médio-atlantique"]
export default async function ocean2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🌊 *OCEAN2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}