// commands/pourcentage.js
import { sendMessage } from '../lib/sendMessage.js'
export default async function pourcentage(sock, sender, args, msg) {
  try {
  const p = parseFloat(args[0]), val = parseFloat(args[1])
  if (!p||!val) return sendMessage(sock, sender, '☠ Usage: .pourcentage <X%> <de Y>\nEx: .pourcentage 20 150')
  const result = (p/100*val).toFixed(2)
  await sendMessage(sock, sender, `☩━━━〔 ⛧ *POURCENTAGE* 〕━━━☩

📊 *${p}% de ${val} = ${result}*

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}