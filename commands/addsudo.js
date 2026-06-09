import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isDeployer, addSudo } from '../lib/ownerSystem.js'
export default async function addsudo(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!isDeployer(jid) && !ctx.isOwner) {
    return sendMessage(sock, sender, `☠ Réservé au propriétaire du bot.`)
  }
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!target) return sendMessage(sock, sender, `☠ Usage: .addsudo @membre`)
  const result = await addSudo(target)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🛡️ *SUDO AJOUTÉ*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n` +
    `⛧  ${result ? '✅ *Permissions sudo accordées*' : '⚠️ *Déjà sudo ou erreur*'}\n` +
    `✝  🔑 _Niveau: Administrateur Bot_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [target] })
}
