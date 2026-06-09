import { sendMessage } from '../lib/sendMessage.js'
const MOLECULES = [
  { formule: "H₂O", nom: "Eau", desc: "Molécule essentielle à la vie, solvant universel" },
  { formule: "CO₂", nom: "Dioxyde de carbone", desc: "Gaz à effet de serre, produit par respiration" },
  { formule: "NaCl", nom: "Chlorure de sodium", desc: "Sel de table, cristaux cubiques ioniques" },
  { formule: "C₆H₁₂O₆", nom: "Glucose", desc: "Source d'énergie cellulaire principale" },
  { formule: "O₃", nom: "Ozone", desc: "Couche protectrice, filtre UV, dangereux à faible altitude" },
  { formule: "C₂H₅OH", nom: "Éthanol", desc: "Alcool des boissons, antiseptique" },
  { formule: "NH₃", nom: "Ammoniac", desc: "Fertilisant industriel, gaz piquant" },
  { formule: "Fe₂O₃", nom: "Rouille", desc: "Oxyde de fer, corrosion naturelle du métal" },
]
export default async function chimie2(sock, sender, args, msg, ctx = {}) {
  const m = MOLECULES[Math.floor(Math.random() * MOLECULES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚗️ *MOLÉCULE DU JOUR*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🔬 *Formule:* ${m.formule}\n` +
    `⛧  📝 *Nom:* ${m.nom}\n` +
    `✝  📖 _${m.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
