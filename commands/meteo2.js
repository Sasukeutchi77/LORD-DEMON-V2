// commands/meteo2.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const conditions = ["⛈️ Orageux", "☀️ Ensoleillé", "🌧️ Pluvieux", "❄️ Neigeux", "🌫️ Brumeux", "⛅ Nuageux", "🌪️ Tempête", "🌈 Après pluie"]

export default async function meteo2(sock, sender, args) {
  if (!args.length) return await sendMessage(sock, sender, `☩━━━〔 🌍 *MÉTÉO V2* 〕━━━☩\n\n✝  💡 Usage: *.meteo2 <ville>*\n⛧  Exemple: *.meteo2 Paris*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const ville = args.join(' ')
  const temp = Math.floor(Math.random() * 40) - 5
  const cond = conditions[Math.floor(Math.random() * conditions.length)]
  const hum = Math.floor(Math.random() * 60) + 30
  const vent = Math.floor(Math.random() * 80) + 5
  const text =
    `☩━━━〔 🌍 *MÉTÉO DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  📍 *Ville:* ${ville}\n` +
    `⛧  ${cond}\n` +
    `✝  🌡️ *Température:* ${temp}°C\n` +
    `☩  💧 *Humidité:* ${hum}%\n` +
    `☠  🌬️ *Vent:* ${vent} km/h\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
