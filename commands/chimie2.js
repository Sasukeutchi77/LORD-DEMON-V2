import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🧪 Acide chlorhydrique (HCl) — Estomac, pH < 2, corrosif","🧪 Eau oxygénée (H2O2) — Antiseptique, décolorant, décompose","🧪 ADN — Désoxyribose + phosphate + base azotée, double hélice","🧪 Glucose (C6H12O6) — Carburant cellules, glycémie sanguin","🧪 NaCl — Sel table, 7g/L dans mer, ions Na+ et Cl-","🧪 CO2 — Gaz carbonique, respiré out, photosynthèse plantes","🧪 Éthanol (C2H5OH) — Alcool, antiseptique, carburant, 78°C","🧪 Caféine — Antagoniste adénosine, demi-vie 5-6 heures","🧪 Mélatonine — Hormone sommeil, produite dans le noir","🧪 Pénicilline — 1er antibiotique, Fleming 1928, beta-lactamine"]
export default async function chimie2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🧪 *CHIMIE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}