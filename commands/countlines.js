import { sendMessage } from '../lib/sendMessage.js'
export default async function countlines(sock, sender, args, msg, ctx) {
  const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
  const text = quoted ? (quoted.conversation || quoted.extendedTextMessage?.text || '') : args.join(' ')
  if (!text.trim()) return await sendMessage(sock, sender, `☠ Reply sur un message ou: ${process.env.PREFIX||'.'}countlines <texte>`)
  const lines = text.split('\n'), nonEmpty = lines.filter(l=>l.trim())
  await sendMessage(sock, sender,
    `☩━━━〔 📋 *ANALYSE LIGNES* 〕━━━☩\n☠\n⛧  📑 Lignes totales: *${lines.length}*\n☠  📝 Lignes non vides: *${nonEmpty.length}*\n☩  ⎵  Lignes vides: *${lines.length-nonEmpty.length}*\n✝  💬 Mots: *${text.split(/\s+/).filter(Boolean).length}*\n☠  🔤 Caractères: *${text.length}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
