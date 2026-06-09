// commands/cryptage.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

function encrypt(text) {
  return Buffer.from(text).toString('base64')
}
function decrypt(text) {
  try { return Buffer.from(text, 'base64').toString('utf8') } catch { return '❌ Code invalide' }
}

export default async function cryptage(sock, sender, args) {
  if (args.length < 2) return await sendMessage(sock, sender,
    `☩━━━〔 🔐 *CRYPTAGE DÉMONIAQUE* 〕━━━☩\n\n` +
    `⛧  Usage:\n` +
    `✝  *.cryptage encode <texte>*\n` +
    `☩  *.cryptage decode <code>*\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const action = args[0].toLowerCase()
  const texte = args.slice(1).join(' ')
  const result = action === 'encode' ? encrypt(texte) : decrypt(texte)
  const text =
    `☩━━━〔 🔐 *CRYPTAGE DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  🔑 *Opération:* ${action === 'encode' ? 'Encodage' : 'Décodage'}\n` +
    `⛧  📝 *Entrée:* ${texte.slice(0, 50)}${texte.length > 50 ? '...' : ''}\n\n` +
    `✝  ✅ *Résultat:*\n` +
    `☩  \`${result}\`\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
