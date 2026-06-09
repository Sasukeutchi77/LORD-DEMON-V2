// commands/timestamp.js
import { sendMessage } from '../lib/sendMessage.js'
export default async function timestamp(sock, sender, args, msg) {
  try {
  const ts = args[0]
  if (ts) {
    const d = new Date(parseInt(ts) * (ts.length <= 10 ? 1000 : 1))
    return sendMessage(sock, sender, `📅 Timestamp ${ts} = ${d.toLocaleString('fr-FR')}`)
  }
  const now = Date.now()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⏰ TIMESTAMP   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n⏰ Unix: *${Math.floor(now/1000)}*\n📅 Date: *${new Date(now).toLocaleString('fr-FR')}*\n🔢 Ms: ${now}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}