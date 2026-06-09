import { sendMessage } from '../lib/sendMessage.js'
export default async function convertdist(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const val = parseFloat(args[0]), from = args[1]?.toLowerCase(), to = args[2]?.toLowerCase()
  const units = { m:1, km:1000, cm:0.01, mm:0.001, mi:1609.34, ft:0.3048, yd:0.9144, inch:0.0254, nm:1852 }
  if (isNaN(val)||!from||!to||!units[from]||!units[to]) return await sendMessage(sock, sender, `☩━━━〔 📏 *DISTANCE* 〕━━━☩\n☠\n⛧  Usage: ${prefix}convertdist <val> <de> <vers>\n☠  Unités: m km cm mm mi ft yd inch nm\n✝  Ex: ${prefix}convertdist 10 km mi\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const result = val * units[from] / units[to]
  await sendMessage(sock, sender, `☩━━━〔 📏 *CONVERSION DISTANCE* 〕━━━☩\n☠\n⛧  *${val} ${from}* = *${result.toFixed(6)} ${to}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}