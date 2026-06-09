import { sendMessage } from '../lib/sendMessage.js'
export default async function textrepeat(sock, sender, args, msg, ctx) {
  try {
  const times = parseInt(args[0])
  const text = args.slice(1).join(' ')
  if (!times || times < 1 || times > 20 || !text) return await sendMessage(sock, sender, `☩━━━〔 ⛧ *TEXTREPEAT* 〕━━━☩

☠ Usage: ${process.env.PREFIX||'.'}textrepeat <fois> <texte> (max 20)

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  await sendMessage(sock, sender, Array(times).fill(text).join('\n'))

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}