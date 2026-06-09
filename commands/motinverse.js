import { sendMessage } from '../lib/sendMessage.js'
export default async function motinverse(sock, sender, args, msg, ctx) {
  try {
  const prefix = process.env.PREFIX||'.'
  const text = args.join(' ')
  if (!text) return await sendMessage(sock, sender, `☩━━━〔 🔄 *MOT INVERSÉ* 〕━━━☩\n☠\n⛧  ${prefix}motinverse <texte>\n☠  Ex: ${prefix}motinverse LORD DEMON\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const reversed = text.split('').reverse().join('')
  const wordReversed = text.split(' ').reverse().join(' ')
  await sendMessage(sock, sender, `☩━━━〔 🔄 *TEXTE INVERSÉ* 〕━━━☩\n☠\n⛧  Original: _${text}_\n☠\n✝  🔄 Lettres: *${reversed}*\n☠  📝 Mots: *${wordReversed}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}