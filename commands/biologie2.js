import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🔬 Cellule — Unité vie, 37.2T dans corps humain, 200 types","🔬 ADN — 3Mrd paires bases, 2m dans chaque cellule déroulé","🔬 Mitose — Division cellulaire, 2 cellules identiques filles","🔬 Méiose — Gamètes sexuels, 4 cellules filles haploïdes","🔬 Photosynthèse — 6CO2+6H2O → C6H12O6+6O2, chloroplaste","🔬 ATP — Monnaie énergétique cellule, 40kg produits/jour","🔬 ARN messager — Copie ADN → ribosome → protéines","🔬 Enzyme — Catalyseur biologique, 3000 types, températures","🔬 Virus — Non-cellulaire, 20-300nm, détourne machine cellulaire","🔬 Bactérie — Prokaryote, divise en 20 min, 1T dans corps"]
export default async function biologie2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🔬 *BIOLOGIE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}