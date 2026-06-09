import { sendMessage } from '../lib/sendMessage.js'
export default async function couleur2(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const input = args[0]?.replace('#','')
  if (!input) return await sendMessage(sock, sender, `☩━━━〔 🎨 *COULEUR* 〕━━━☩\n☠\n⛧  Usage: ${prefix}couleur2 <hex>\n☠  Ex: ${prefix}couleur2 FF5500\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  if (!/^[0-9A-Fa-f]{6}$/.test(input)) return await sendMessage(sock, sender, '☠ Code hex invalide (6 chiffres hexadécimaux)')
  const r = parseInt(input.slice(0,2),16), g = parseInt(input.slice(2,4),16), b = parseInt(input.slice(4,6),16)
  const max=Math.max(r,g,b)/255, min=Math.min(r,g,b)/255, l=(max+min)/2
  const s = max===min?0:(max-min)/(1-Math.abs(2*l-1))
  const h = max===min?0:max===r/255?((g-b)/255/(max-min))%6:max===g/255?(b-r)/255/(max-min)+2:(r-g)/255/(max-min)+4
  const hsl = `hsl(${Math.round(h*60)}°, ${(s*100).toFixed(0)}%, ${(l*100).toFixed(0)}%)`
  await sendMessage(sock, sender, `☩━━━〔 🎨 *COULEUR #${input.toUpperCase()}* 〕━━━☩\n☠\n⛧  🔴 Rouge: *${r}* (${((r/255)*100).toFixed(0)}%)\n☠  🟢 Vert: *${g}* (${((g/255)*100).toFixed(0)}%)\n✝  🔵 Bleu: *${b}* (${((b/255)*100).toFixed(0)}%)\n☠\n⛧  HEX: *#${input.toUpperCase()}*\n☠  RGB: *rgb(${r}, ${g}, ${b})*\n✝  HSL: *${hsl}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}