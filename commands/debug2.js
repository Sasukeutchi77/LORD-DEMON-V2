import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isDeployer } from '../lib/ownerSystem.js'
export default async function debug2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  if (!isDeployer(jid) && !ctx.isOwner) {
    return sendMessage(sock, sender, `☠ Réservé au propriétaire du bot.`)
  }
  const now = new Date()
  const uptime = process.uptime()
  const h = Math.floor(uptime/3600), m = Math.floor((uptime%3600)/60), s = Math.floor(uptime%60)
  const mem = process.memoryUsage()
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔧 *DEBUG SYSTÈME*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⏱️ *Uptime:* ${h}h ${m}m ${s}s\n` +
    `⛧  🧠 *RAM Heap:* ${(mem.heapUsed/1024/1024).toFixed(1)} MB\n` +
    `✝  📊 *RSS:* ${(mem.rss/1024/1024).toFixed(1)} MB\n` +
    `☩  🤖 *Node.js:* ${process.version}\n` +
    `☠  📅 *Date:* ${now.toLocaleString('fr-FR')}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
