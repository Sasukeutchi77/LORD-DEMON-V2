import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const AVERTISSEMENTS = [
  "⚠️ Comportement inadmissible — prochain écart = sanction",
  "🛑 Dernier avertissement avant exclusion du cercle",
  "☠ Ton attitude trouble l'équilibre — rectifie immédiatement",
  "⛧ Les lois du démon s'appliquent — respecte-les ou pars",
  "🔴 Signal rouge : prochaine infraction = bannissement",
]
export default async function avertir(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const raison = args.filter(a => !a.startsWith('@')).join(' ') || 'Comportement inapproprié'
  if (!target) return sendMessage(sock, sender, `☠ Usage: .avertir @user [raison]`)
  const avert = AVERTISSEMENTS[Math.floor(Math.random() * AVERTISSEMENTS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚠️ *AVERTISSEMENT OFFICIEL*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 *Cible:* @${target.split('@')[0]}\n` +
    `⛧  📋 *Motif:* ${raison}\n` +
    `✝  ⚖️ *Verdict:* ${avert}\n` +
    `☩  👮 *Émis par:* @${jid.split('@')[0]}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, target] })
}
