import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function casier(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const infractions = Math.floor(Math.random() * 5)
  const avertissements = Math.floor(Math.random() * 3)
  const statut = infractions === 0 ? "✅ Casier vierge — aucune infraction" : infractions < 3 ? "⚠️ Quelques antécédents" : "🔴 Casier chargé — surveillé"
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📋 *CASIER JUDICIAIRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 *Sujet:* @${target.split('@')[0]}\n` +
    `⛧  📝 *Infractions:* ${infractions}\n` +
    `✝  ⚠️ *Avertissements:* ${avertissements}\n` +
    `☩  📊 *Statut:* ${statut}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
