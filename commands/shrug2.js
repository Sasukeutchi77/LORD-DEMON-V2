import { sendMessage } from '../lib/sendMessage.js'
export default async function shrug2(sock, sender, args, msg, ctx) {
  try {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
  const quoted = msg.message?.extendedTextMessage?.contextInfo?.participant
  const target = mentions?.[0] || quoted
  const prefix = process.env.PREFIX||'.'
  if (!target) return await sendMessage(sock, sender, `☠ Usage: ${prefix}shrug2 @user`)
  const from = senderJid.replace('@s.whatsapp.net','')
  const to = target.replace('@s.whatsapp.net','')
  await sock.sendMessage(sender, { text:`☩━━━〔 🤷 *SHRUG2* 〕━━━☩\n☠\n⛧  @${from} hausse les épaules devant @${to}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`, mentions:[senderJid,target] }).catch(()=>sendMessage(sock,sender,'🤷 hausse les épaules devant!'))

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}