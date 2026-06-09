import { sendMessage } from '../lib/sendMessage.js'
export default async function celsius(sock, sender, args, msg, ctx = {}) {
  const val = parseFloat(args[0])
  if (isNaN(val)) return sendMessage(sock, sender, `☠ Usage: .celsius <température>\nEx: .celsius 100`)
  const fahrenheit = (val * 9/5 + 32).toFixed(1)
  const kelvin = (val + 273.15).toFixed(2)
  const rankine = ((val + 273.15) * 9/5).toFixed(2)
  let desc
  if (val <= 0) desc = '🧊 Gel / Point de congélation'
  else if (val < 20) desc = '❄️ Froid'
  else if (val < 35) desc = '🌡️ Température ambiante'
  else if (val < 60) desc = '♨️ Chaud'
  else if (val < 100) desc = '🔥 Très chaud'
  else desc = '💥 Bouillant / Point d\'ébullition'
  const out =
    `☩━━━〔 🌡️ *CONVERSION TEMPÉRATURES* 〕━━━☩\n\n` +
    `☠  🌡️ *Celsius:* ${val}°C\n` +
    `⛧  🇺🇸 *Fahrenheit:* ${fahrenheit}°F\n` +
    `✝  🔬 *Kelvin:* ${kelvin} K\n` +
    `☩  _${desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
