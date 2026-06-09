import { sendMessage } from '../lib/sendMessage.js'
const COMPAT = ['💘 COUPLE PARFAIT','🔥 PASSION INTENSE','💕 BELLE COMPLICITÉ','😊 BONNE AMITIÉ','🤔 PEUT MARCHER','😬 DIFFICILE MAIS POSSIBLE','❌ PAS COMPATIBLES','💀 CATASTROPHE TOTALE']
export default async function shipper2(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
  const target = mentions?.[0]
  if (!target) return await sendMessage(sock, sender, `☠ Usage: ${prefix}shipper2 @user`)
  const compat = COMPAT[Math.floor(Math.random()*COMPAT.length)]
  const pct = Math.floor(Math.random()*101)
  const hearts = '❤️'.repeat(Math.floor(pct/20)+1)
  const from = senderJid.replace('@s.whatsapp.net',''), to = target.replace('@s.whatsapp.net','')
  await sock.sendMessage(sender, { text:`☩━━━〔 💕 *COMPATIBILITÉ* 〕━━━☩\n☠\n⛧  @${from} & @${to}\n☠\n✝  ${hearts}\n☠  📊 Compatibilité: *${pct}%*\n⛧  🎯 ${compat}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`, mentions:[senderJid,target] }).catch(()=>sendMessage(sock,sender,`💕 ${pct}% - ${compat}`))
}