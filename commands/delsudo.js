import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isDeployer, removeSudo } from '../lib/ownerSystem.js'
export default async function delsudo(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!isDeployer(jid) && !ctx.isOwner) {
    return sendMessage(sock, sender, `☠ Réservé au propriétaire du bot.`)
  }
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!target) return sendMessage(sock, sender, `☠ Usage: .delsudo @membre`)
  const result = await removeSudo(target)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔴 *SUDO RETIRÉ*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n` +
    `⛧  ${result ? '✅ *Permissions sudo révoquées*' : '⚠️ *Pas trouvé dans la liste sudo*'}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [target] })
}
