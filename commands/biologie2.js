import { sendMessage } from '../lib/sendMessage.js'
const FACTS = [
  { fait: "L'ADN humain contient environ 3 milliards de paires de bases.", cat: "🧬 Génétique" },
  { fait: "Le cerveau génère ~20 watts d'énergie — assez pour allumer une ampoule LED.", cat: "🧠 Neurologie" },
  { fait: "Les globules rouges vivent en moyenne 120 jours avant d'être remplacées.", cat: "🩸 Hématologie" },
  { fait: "Le corps humain contient plus de bactéries que de cellules humaines.", cat: "🦠 Microbiologie" },
  { fait: "Le cœur bat en moyenne 100 000 fois par jour, 37 millions par an.", cat: "❤️ Cardiologie" },
  { fait: "Les os se renouvellent complètement tous les 10 ans environ.", cat: "🦴 Ostéologie" },
  { fait: "L'estomac se régénère sa muqueuse complètement toutes les 2 semaines.", cat: "🫁 Gastroentérologie" },
  { fait: "L'œil humain peut distinguer environ 10 millions de couleurs différentes.", cat: "👁️ Ophtalmologie" },
]
export default async function biologie2(sock, sender, args, msg, ctx = {}) {
  const f = FACTS[Math.floor(Math.random() * FACTS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔬 *FAIT BIOLOGIQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏷️ *Catégorie:* ${f.cat}\n\n` +
    `⛧  📖 _${f.fait}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
