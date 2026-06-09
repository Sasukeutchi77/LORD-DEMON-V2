// commands/speedtest.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

export default async function speedtest(sock, sender, args) {
  const start = Date.now()
  const msg = await sendMessage(sock, sender,
    `☩━━━〔 ⚡ *SPEED TEST* 〕━━━☩\n\n⛧  Test en cours...\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const ping = Date.now() - start
  const memUsed = Math.round(process.memoryUsage().rss / 1024 / 1024)
  const uptime = Math.floor(process.uptime())
  const h = Math.floor(uptime/3600), m = Math.floor((uptime%3600)/60), s = uptime%60
  let rating = '🔴 Lent'
  if (ping < 100) rating = '🟢 Excellent'
  else if (ping < 300) rating = '🟡 Bon'
  else if (ping < 600) rating = '🟠 Moyen'
  const text =
    `☩━━━〔 ⚡ *SPEED TEST DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  📡 *Ping:* ${ping}ms\n` +
    `⛧  💭 *Mémoire:* ${memUsed} MB\n` +
    `✝  ⏱️ *Uptime:* ${h}h ${m}m ${s}s\n` +
    `☩  🏷️ *Note:* ${rating}\n\n` +
    `☠  ${ping < 300 ? '✅ Le Démon répond rapidement !' : '⚠️ Le Démon est légèrement ralenti...'}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
