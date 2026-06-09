import { sendMessage } from '../lib/sendMessage.js'
export default async function metrique2(sock, sender, args, msg, ctx) {
  try {
  const prefix = process.env.PREFIX||'.'
  const val = parseFloat(args[0]), from = args[1]?.toLowerCase(), to = args[2]?.toLowerCase()
  const units = {
    m:1, km:1000, cm:0.01, mm:0.001,
    kg:1000, g:1, lb:453.592, oz:28.3495,
    l:1, ml:0.001, dl:0.1, gal:3.78541,
    h:3600, min:60, s:1, ms:0.001
  }
  if (isNaN(val)||!from||!to||!units[from]||!units[to]) return await sendMessage(sock, sender, `☩━━━〔 📐 *CONVERTISSEUR* 〕━━━☩\n☠\n⛧  ${prefix}metrique2 <val> <de> <vers>\n☠  Distance: m km cm mm\n✝  Masse: kg g lb oz\n☠  Volume: l ml dl gal\n⛧  Temps: h min s ms\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  const result = val * units[from] / units[to]
  await sendMessage(sock, sender, `☩━━━〔 📐 *CONVERSION* 〕━━━☩\n☠\n⛧  *${val} ${from}* = *${result.toFixed(6).replace(/\.?0+$/, '')} ${to}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}