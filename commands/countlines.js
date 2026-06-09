import { sendMessage } from '../lib/sendMessage.js'
export default async function countlines(sock, sender, args, msg, ctx = {}) {
  const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
  const text = quoted ? (quoted.conversation || quoted.extendedTextMessage?.text || '') : args.join(' ')
  if (!text.trim()) return sendMessage(sock, sender, `☠ Usage: .countlines <texte> (ou cite un message)`)
  const lignes = text.split('\n').length
  const mots = text.trim().split(/\s+/).length
  const chars = text.length
  const out =
    `☩━━━〔 📊 *ANALYSE LIGNES* 〕━━━☩\n\n` +
    `☠  📏 *Lignes:* ${lignes}\n` +
    `⛧  📝 *Mots:* ${mots}\n` +
    `✝  🔤 *Caractères:* ${chars}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
