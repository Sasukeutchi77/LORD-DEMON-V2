import { sendMessage } from '../lib/sendMessage.js'
const PLANETES = [
  { nom: "Terre", age: "4.54 milliards d'années", formation: "Nébuleuse solaire primitive", vie: "Oui — 3.8 milliards d'ans" },
  { nom: "Mars", age: "4.5 milliards d'années", formation: "Même nébuleuse que la Terre", vie: "Peut-être anciennement" },
  { nom: "Jupiter", age: "4.6 milliards d'années", formation: "Gaz accumulés du système solaire", vie: "Impossible (gaz)" },
  { nom: "Saturne", age: "4.5 milliards d'années", formation: "Anneaux formés il y a 100 millions d'ans", vie: "Impossible" },
  { nom: "Mercure", age: "4.5 milliards d'années", formation: "Proche du soleil primordial", vie: "Non — trop chaud/froid" },
  { nom: "Neptune", age: "4.5 milliards d'années", formation: "Expulsée vers l'extérieur par Jupiter", vie: "Non — températures extrêmes" },
]
export default async function ageplanete(sock, sender, args, msg, ctx = {}) {
  const input = args.join(' ').toLowerCase()
  const p = input
    ? PLANETES.find(pl => pl.nom.toLowerCase().includes(input)) || PLANETES[Math.floor(Math.random() * PLANETES.length)]
    : PLANETES[Math.floor(Math.random() * PLANETES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🌍 *ÂGE DE LA PLANÈTE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🪐 *Planète:* ${p.nom}\n` +
    `⛧  ⏳ *Âge:* ${p.age}\n` +
    `✝  🌌 *Formation:* ${p.formation}\n` +
    `☩  🧬 *Vie possible:* ${p.vie}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
