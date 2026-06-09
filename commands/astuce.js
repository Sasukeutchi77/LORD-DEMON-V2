import { sendMessage } from '../lib/sendMessage.js'
const ASTUCES = [
  { tip: "Bois un verre d'eau avant chaque repas pour contrôler ta faim.", cat: "🥤 Santé" },
  { tip: "Active le mode sombre pour économiser la batterie et préserver les yeux.", cat: "📱 Tech" },
  { tip: "Apprendre une nouvelle langue booste les connexions neuronales.", cat: "🧠 Mental" },
  { tip: "Règle du 24h : attends 24h avant tout achat non essentiel.", cat: "💰 Finance" },
  { tip: "Une plante au bureau améliore la concentration de 15%.", cat: "🌱 Bien-être" },
  { tip: "Garde le même horaire de sommeil 7j/7 pour mieux dormir.", cat: "😴 Sommeil" },
  { tip: "10 minutes de marche après le repas aide la digestion et la glycémie.", cat: "🚶 Santé" },
  { tip: "Lire 20 min/jour = 12 livres par an.", cat: "📚 Culture" },
  { tip: "3 respirations profondes calment instantanément le système nerveux.", cat: "🧘 Mindset" },
  { tip: "Écrire ses objectifs les rend 42% plus susceptibles d'être atteints.", cat: "✍️ Productivité" },
]
export default async function astuce(sock, sender, args, msg, ctx = {}) {
  const a = ASTUCES[Math.floor(Math.random() * ASTUCES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💡 *ASTUCE DU JOUR*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏷️ *Catégorie:* ${a.cat}\n\n` +
    `⛧  💡 _"${a.tip}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
