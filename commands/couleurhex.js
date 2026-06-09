import { sendMessage } from '../lib/sendMessage.js'
export default async function couleurhex(sock, sender, args, msg, ctx = {}) {
  const input = args[0]?.replace('#','').trim()
  const hex = input && /^[0-9a-fA-F]{6}$/.test(input) ? input : null
  if (!hex) {
    const r = Math.floor(Math.random()*256), g = Math.floor(Math.random()*256), b = Math.floor(Math.random()*256)
    const h = [r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')
    return sendMessage(sock, sender,
      `☩━━━〔 🎨 *HEX ALÉATOIRE* 〕━━━☩\n\n` +
      `☠  🎨 *Code:* #${h.toUpperCase()}\n` +
      `⛧  R:${r} G:${g} B:${b}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16)
  const hsl = (() => {
    const r1=r/255,g1=g/255,b1=b/255
    const max=Math.max(r1,g1,b1),min=Math.min(r1,g1,b1)
    const l=(max+min)/2
    const s=max===min?0:(l>0.5?(max-min)/(2-max-min):(max-min)/(max+min))
    return `S:${(s*100).toFixed(0)}% L:${(l*100).toFixed(0)}%`
  })()
  const out =
    `☩━━━〔 🎨 *ANALYSE COULEUR* 〕━━━☩\n\n` +
    `☠  🎨 *HEX:* #${hex.toUpperCase()}\n` +
    `⛧  🔴 R:${r} 🟢 G:${g} 🔵 B:${b}\n` +
    `✝  💡 HSL: ${hsl}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
