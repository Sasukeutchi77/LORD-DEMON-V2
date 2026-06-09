import { sendMessage } from '../lib/sendMessage.js'
export default async function wave2(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
  const quoted = msg.message?.extendedTextMessage?.contextInfo?.participant
  const target = mentions?.[0] || quoted
  const prefix = process.env.PREFIX||'.'
  if (!target) return await sendMessage(sock, sender, `☠ Usage: ${prefix}wave2 @user`)
  const from = senderJid.replace('@s.whatsapp.net','')
  const to = target.replace('@s.whatsapp.net','')
  await sock.sendMessage(sender, { text:`☩━━━〔 👋 *WAVE2* 〕━━━☩\n☠\n⛧  @${from} fait signe à @${to}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`, mentions:[senderJid,target] }).catch(()=>sendMessage(sock,sender,'👋 fait signe à!'))
}