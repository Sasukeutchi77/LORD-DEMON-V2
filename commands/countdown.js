import { sendMessage } from '../lib/sendMessage.js'
export default async function countdown(sock, sender, args, msg, ctx = {}) {
  const dateStr = args.join(' ')
  if (!dateStr) return sendMessage(sock, sender, `☠ Usage: .countdown <AAAA-MM-JJ>\nEx: .countdown 2025-12-31`)
  const target = new Date(dateStr)
  if (isNaN(target.getTime())) return sendMessage(sock, sender, `☠ Date invalide. Format: AAAA-MM-JJ`)
  const now = new Date()
  const diff = target - now
  if (diff < 0) return sendMessage(sock, sender, `☠ Cette date est déjà passée !`)
  const jours = Math.floor(diff / 86400000)
  const heures = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const text =
    `☩━━━〔 ⏳ *COMPTE À REBOURS* 〕━━━☩\n\n` +
    `☠  📅 *Date cible:* ${target.toLocaleDateString('fr-FR')}\n\n` +
    `⛧  ⏳ *Temps restant:*\n` +
    `✝  📆 ${jours} jours\n` +
    `☩  ⏰ ${heures} heures\n` +
    `☠  ⏱️ ${mins} minutes\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
