import { sendMessage } from '../lib/sendMessage.js'
export default async function cmdinfo(sock, sender, args, msg, ctx = {}) {
  const cmd = args[0]?.toLowerCase()
  if (!cmd) return sendMessage(sock, sender, `☠ Usage: .cmdinfo <commande>\nEx: .cmdinfo ban`)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ℹ️ *INFO COMMANDE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🔤 *Commande:* .${cmd}\n` +
    `⛧  📖 _Consulte .help ${cmd} pour les détails._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
