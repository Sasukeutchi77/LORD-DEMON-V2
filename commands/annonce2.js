// commands/annonce2.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
import { isOwner, isSudo } from '../lib/ownerSystem.js'

export default async function annonce2(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg?.key?.participant || msg?.key?.remoteJid
  if (!isOwner(senderJid) && !isSudo(senderJid)) {
    return await sendMessage(sock, sender, `☩━━━〔 📢 *ACCÈS REFUSÉ* 〕━━━☩\n\n⛧  Réservé aux Owner/Sudo.\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  if (!args.length) return await sendMessage(sock, sender, `☩━━━〔 📢 *ANNONCE II* 〕━━━☩\n\n✝  Usage: *.annonce2 <message>*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const message = args.join(' ')
  const now = new Date().toLocaleString('fr-FR')
  const text =
    `╔════════════════════════════╗\n` +
    `║  📢  *ANNONCE OFFICIELLE*  ║\n` +
    `╚════════════════════════════╝\n\n` +
    `${message}\n\n` +
    `─────────────────────────────\n` +
    `🕐 ${now}\n` +
    `👑 _LORD DEMON Official_`
  await sendMessage(sock, sender, text)
}
