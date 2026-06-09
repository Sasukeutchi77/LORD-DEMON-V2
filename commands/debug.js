import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function debug(sock, sender, args, msg, ctx = {}) {
  if (!ctx.isOwner) return sendMessage(sock, sender, `☠ Réservé au maître démoniaque.`)
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const mem = process.memoryUsage()
  const uptime = process.uptime()
  const h = Math.floor(uptime / 3600)
  const m = Math.floor((uptime % 3600) / 60)
  const s = Math.floor(uptime % 60)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔧 *DIAGNOSTIC SYSTÈME*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🖥️ *Node.js:* ${process.version}\n` +
    `⛧  💻 *Plateforme:* ${process.platform}\n` +
    `✝  🧠 *RAM utilisée:* ${(mem.heapUsed / 1024 / 1024).toFixed(1)} MB / ${(mem.heapTotal / 1024 / 1024).toFixed(1)} MB\n` +
    `☩  ⏱️ *Uptime:* ${h}h ${m}m ${s}s\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
