import { sendMessage } from '../lib/sendMessage.js'
const CAPITALES = [
  { ville: "Paris", pays: "France 🇫🇷", surnom: "Ville Lumière", pop: "2.2M", fact: "Tour Eiffel, symbole mondial" },
  { ville: "Tokyo", pays: "Japon 🇯🇵", surnom: "La mégapole", pop: "37M", fact: "Plus grande métropole du monde" },
  { ville: "New York", pays: "USA 🇺🇸", surnom: "La Grosse Pomme", pop: "8.3M", fact: "Siège de l'ONU, Wall Street" },
  { ville: "Pékin", pays: "Chine 🇨🇳", surnom: "Cité Impériale", pop: "21M", fact: "Cité Interdite, 3000 ans d'histoire" },
  { ville: "Moscou", pays: "Russie 🇷🇺", surnom: "La Troisième Rome", pop: "12M", fact: "Le Kremlin, plus grande ville d'Europe" },
  { ville: "Lagos", pays: "Nigeria 🇳🇬", surnom: "Géant africain", pop: "15M+", fact: "Plus grande ville d'Afrique" },
  { ville: "Le Caire", pays: "Égypte 🇪🇬", surnom: "La Mère des villes", pop: "20M", fact: "Pyramides, fleuve Nil sacré" },
  { ville: "Nairobi", pays: "Kenya 🇰🇪", surnom: "Silicon Savannah", pop: "4M", fact: "Hub tech de l'Afrique de l'Est" },
  { ville: "Dakar", pays: "Sénégal 🇸🇳", surnom: "Porte de l'Afrique", pop: "3M", fact: "Pointe la plus occidentale d'Afrique" },
]
export default async function capitale3(sock, sender, args, msg, ctx = {}) {
  const c = CAPITALES[Math.floor(Math.random() * CAPITALES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🏙️ *CAPITALE DU MONDE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏙️ *Ville:* ${c.ville} — ${c.pays}\n` +
    `⛧  🏷️ *Surnom:* ${c.surnom}\n` +
    `✝  👥 *Population:* ${c.pop}\n` +
    `☩  📖 _${c.fact}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
