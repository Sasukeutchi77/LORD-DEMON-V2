import { sendMessage } from '../lib/sendMessage.js'
export default async function convertpoids(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const val = parseFloat(args[0]), from = args[1]?.toLowerCase(), to = args[2]?.toLowerCase()
  const units = { kg:1, g:0.001, lb:0.453592, oz:0.0283495, t:1000, mg:0.000001 }
  if (isNaN(val)||!from||!to||!units[from]||!units[to]) return await sendMessage(sock, sender, `☩━━━〔 ⚖️ *POIDS* 〕━━━☩\n☠\n⛧  Usage: ${prefix}convertpoids <val> <de> <vers>\n☠  Unités: kg g lb oz t mg\n✝  Ex: ${prefix}convertpoids 5 kg lb\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const result = val * units[from] / units[to]
  await sendMessage(sock, sender, `☩━━━〔 ⚖️ *CONVERSION POIDS* 〕━━━☩\n☠\n⛧  *${val} ${from}* = *${result.toFixed(4)} ${to}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}