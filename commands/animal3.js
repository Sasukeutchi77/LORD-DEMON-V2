import { sendMessage } from '../lib/sendMessage.js'
const ANIMAUX = [
  { nom: "Lion", fact: "Rugit à 8km, dort 20h/jour, vit en savane", emoji: "🦁", stat: "Roi de la savane" },
  { nom: "Baleine bleue", fact: "30m de long, 180 tonnes, cœur de 200kg", emoji: "🐋", stat: "Le plus grand animal" },
  { nom: "Aigle royal", fact: "Vision 8x humaine, envergure 2.3m", emoji: "🦅", stat: "Seigneur des cieux" },
  { nom: "Éléphant", fact: "6 tonnes, gestation 22 mois, fait le deuil de ses morts", emoji: "🐘", stat: "Mémoire éternelle" },
  { nom: "Grand requin blanc", fact: "7m, 300 dents rotatives, nage à 56 km/h", emoji: "🦈", stat: "Prédateur suprême" },
  { nom: "Guépard", fact: "110 km/h en 3 secondes, sprint de 400m max", emoji: "🐆", stat: "Animal le plus rapide" },
  { nom: "Pieuvre", fact: "3 cœurs, 9 cerveaux, sang bleu, maître du camouflage", emoji: "🐙", stat: "Intelligence aquatique" },
  { nom: "Papillon monarque", fact: "Migration annuelle de 4500 km", emoji: "🦋", stat: "Voyageur légendaire" },
]
export default async function animal3(sock, sender, args, msg, ctx = {}) {
  const a = ANIMAUX[Math.floor(Math.random() * ANIMAUX.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🦁 *FAITS ANIMALIERS*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ${a.emoji} *${a.nom}*\n` +
    `⛧  📖 ${a.fact}\n` +
    `✝  🏆 _"${a.stat}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
