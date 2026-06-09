import { sendMessage } from '../lib/sendMessage.js'
export default async function couleur2(sock, sender, args, msg, ctx = {}) {
  const hex = args[0]?.replace('#','')
  if (!hex || !/^[0-9a-fA-F]{6}$/.test(hex)) {
    const r = Math.floor(Math.random()*256), g = Math.floor(Math.random()*256), b = Math.floor(Math.random()*256)
    const h = '#' + [r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')
    return sendMessage(sock, sender,
      `☩━━━〔 🎨 *COULEUR ALÉATOIRE* 〕━━━☩\n\n` +
      `☠  🎨 *HEX:* ${h.toUpperCase()}\n` +
      `⛧  🔴 R: ${r} | 🟢 G: ${g} | 🔵 B: ${b}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16)
  const bright = (r*299+g*587+b*114)/1000
  const desc = bright > 128 ? '☀️ Couleur claire' : '🌑 Couleur sombre'
  const out =
    `☩━━━〔 🎨 *COULEUR HEX* 〕━━━☩\n\n` +
    `☠  🎨 *HEX:* #${hex.toUpperCase()}\n` +
    `⛧  🔴 R: ${r} | 🟢 G: ${g} | 🔵 B: ${b}\n` +
    `✝  ${desc}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
