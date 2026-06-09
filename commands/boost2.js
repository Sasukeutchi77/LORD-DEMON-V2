import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const BOOSTS = [
  { nom: "Boost de Combat", effet: "+200 ATK pendant 5 tours", icone: "⚔️" },
  { nom: "Boost de Défense", effet: "+300 DEF + bouclier magique", icone: "🛡️" },
  { nom: "Boost Critique", effet: "Taux critique +50% pendant 3 tours", icone: "⚡" },
  { nom: "Boost de Régénération", effet: "Régénère 20% PV/tour pendant 4 tours", icone: "💚" },
  { nom: "Boost Ultime ⛧", effet: "Tous stats x2, durée 2 tours", icone: "🌟" },
]
export default async function boost2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const b = BOOSTS[Math.floor(Math.random() * BOOSTS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ${b.icone} *BOOST DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  🚀 *Boost:* ${b.nom}\n` +
    `✝  ✨ *Effet:* ${b.effet}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
