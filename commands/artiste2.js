import { sendMessage } from '../lib/sendMessage.js'
const ARTISTES = [
  { nom: "Pablo Picasso", style: "Cubisme", fact: "147 000 œuvres créées, dont Guernica", emoji: "🖼️" },
  { nom: "Léonard de Vinci", style: "Génie universel", fact: "Peintre, inventeur, anatomiste — Mona Lisa (1503)", emoji: "🎨" },
  { nom: "Michel-Ange", style: "Renaissance italienne", fact: "Chapelle Sixtine, statue David en marbre blanc", emoji: "🗿" },
  { nom: "Vincent van Gogh", style: "Post-impressionnisme", fact: "2100 toiles, La Nuit étoilée, vendu $1 de vivant", emoji: "🌻" },
  { nom: "Frida Kahlo", style: "Surréalisme/Folk", fact: "143 toiles, 55 autoportraits, icône du Mexique", emoji: "🌺" },
  { nom: "Banksy", style: "Street art anonyme", fact: "Identité inconnue, Girl with Balloon autodétruit", emoji: "🎭" },
  { nom: "Jean-Michel Basquiat", style: "Neo-expressionnisme", fact: "Du graffiti NYC aux galeries mondiales à 21 ans", emoji: "✍️" },
  { nom: "Kehinde Wiley", style: "Portraitisme contemporain", fact: "Auteur du portrait officiel de Barack Obama", emoji: "👑" },
]
export default async function artiste2(sock, sender, args, msg, ctx = {}) {
  const a = ARTISTES[Math.floor(Math.random() * ARTISTES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎨 *ARTISTE LÉGENDAIRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ${a.emoji} *${a.nom}*\n` +
    `⛧  🎭 *Style:* ${a.style}\n` +
    `✝  📖 _${a.fact}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
