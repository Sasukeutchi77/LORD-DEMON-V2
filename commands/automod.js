import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const MODES = ['antilink', 'antispam', 'antiflood', 'antiword', 'antitag', 'antibot']
export default async function automod(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!ctx.isAdmin && !ctx.isOwner && !ctx.isSudo) {
    return sendMessage(sock, sender, `☠ Réservé aux administrateurs.`)
  }
  const sub = args[0]?.toLowerCase()
  const val = args[1]?.toLowerCase()
  if (!sub) {
    const lines = MODES.map(m => `☠  ⚙️ .automod ${m} on|off`).join('\n')
    const text =
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🤖 *AUTOMOD SYSTÈME*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${lines}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    return sendMessage(sock, sender, text)
  }
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🤖 *AUTOMOD: ${sub.toUpperCase()}*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚙️ *Module:* ${sub}\n` +
    `⛧  ${val === 'on' ? '✅ *Activé*' : val === 'off' ? '❌ *Désactivé*' : '📊 *Statut non modifié*'}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
