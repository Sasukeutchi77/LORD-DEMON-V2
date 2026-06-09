import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const DEFIS = [
  { defi: "Parle à quelqu'un d'inconnu aujourd'hui avec un sourire", cat: "🤝 Social", pts: 150 },
  { defi: "30 squats maintenant. Lève-toi. C'est parti", cat: "💪 Sport", pts: 200 },
  { defi: "Calcule 147 × 8 dans ta tête sans calculette", cat: "🧠 Mental", pts: 100 },
  { defi: "Écris un haïku en 5-7-5 syllabes maintenant", cat: "✍️ Créatif", pts: 180 },
  { defi: "Bois 1L d'eau avant ce soir", cat: "💧 Santé", pts: 80 },
  { defi: "1 heure sans réseaux sociaux — commence le chrono", cat: "📵 Déconnexion", pts: 250 },
  { defi: "Dis merci sincèrement à 3 personnes aujourd'hui", cat: "🙏 Gratitude", pts: 120 },
  { defi: "Écoute un artiste que tu ne connais absolument pas", cat: "🎵 Découverte", pts: 90 },
  { defi: "Lis 10 pages d'un livre aujourd'hui", cat: "📚 Lecture", pts: 130 },
  { defi: "15 minutes dehors sans téléphone — observe la nature", cat: "🌱 Nature", pts: 160 },
]
export default async function defi2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const d = DEFIS[Math.floor(Math.random() * DEFIS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚡ *DÉFI DU JOUR*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${jid.split('@')[0]}\n\n` +
    `⛧  🎯 _${d.defi}_\n\n` +
    `✝  ${d.cat}\n` +
    `☩  🏆 *Récompense:* ${d.pts} pts\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
