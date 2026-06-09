import { sendMessage } from '../lib/sendMessage.js'
export default async function celsius(sock, sender, args, msg, ctx = {}) {
  try {
    const val = parseFloat(args[0])
    if (isNaN(val)) return await sendMessage(sock, sender, '☠ Usage: .celsius <température>\nEx: .celsius 100')
    const f = ((val * 9/5) + 32).toFixed(2), k = (val + 273.15).toFixed(2)
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🌡️ *CONVERSION TEMPÉRATURE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Celsius : *${val}°C*\n✝ Fahrenheit : *${f}°F*\n☠ Kelvin : *${k} K*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
