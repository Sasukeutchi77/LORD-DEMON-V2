import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CHALLENGES = [
  { defi: "Fais 30 pompes maintenant et envoie la preuve !", cat: "💪 Physique", diff: "⭐⭐⭐" },
  { defi: "Apprends 5 nouveaux mots en anglais aujourd'hui", cat: "📚 Savoir", diff: "⭐⭐" },
  { defi: "Bois 2 litres d'eau aujourd'hui sans exception", cat: "🥤 Santé", diff: "⭐" },
  { defi: "Envoie un message encourageant à quelqu'un que tu n'as pas contacté depuis 1 mois", cat: "❤️ Social", diff: "⭐⭐" },
  { defi: "Fais 10 minutes de méditation ou respiration profonde", cat: "🧘 Mental", diff: "⭐⭐" },
  { defi: "Lis 20 pages d'un livre avant de dormir", cat: "📖 Culture", diff: "⭐⭐" },
  { defi: "Jeûne numérique 1h : pas de réseaux sociaux !", cat: "🔕 Détox", diff: "⭐⭐⭐" },
  { defi: "Cuisine quelque chose que tu n'as jamais fait", cat: "🍳 Créativité", diff: "⭐⭐⭐" },
]
export default async function challenge2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const c = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎯 *DÉFI DU JOUR*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏷️ *Catégorie:* ${c.cat}\n` +
    `⛧  ⚡ *Difficulté:* ${c.diff}\n\n` +
    `✝  🎯 _"${c.defi}"_\n\n` +
    `☩  💪 _Es-tu prêt à relever ce défi ?_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
