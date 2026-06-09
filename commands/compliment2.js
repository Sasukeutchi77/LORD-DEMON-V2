import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const COMPLIMENTS = [
  "Tu es comme le soleil — même tes mauvais jours illuminent ceux des autres.",
  "Ta présence vaut plus que mille mots. Tu fais partie des rares.",
  "Tu as l'intelligence rare de celui qui écoute avant de parler.",
  "Le monde serait moins beau sans ton énergie unique.",
  "Tu es quelqu'un sur qui on peut compter. C'est précieux et rare.",
  "Ton sourire a le pouvoir de changer l'humeur d'une pièce entière.",
  "Tu portes en toi une force silencieuse que tu sous-estimes.",
  "Chaque interaction avec toi laisse les gens meilleurs qu'avant.",
  "Tu es exactement le type de personne dont le monde a besoin maintenant.",
  "Ta façon d'affronter les défis inspire sans que tu le saches.",
]
export default async function compliment2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const item = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💕 *COMPLIMENT DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  💬 _"${item}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
