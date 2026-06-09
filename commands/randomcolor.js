import { sendMessage } from '../lib/sendMessage.js'
export default async function randomcolor(sock, sender, args, msg, ctx) {
  const r = Math.floor(Math.random()*256), g = Math.floor(Math.random()*256), b = Math.floor(Math.random()*256)
  const hex = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`.toUpperCase()
  const names = ['Rouge','Orange','Jaune','Vert','Bleu','Indigo','Violet','Rose','Marron','Gris','Blanc','Noir','Cyan','Magenta','Doré','Argenté']
  const colorName = names[Math.floor(Math.random()*names.length)]
  await sendMessage(sock, sender, `☩━━━〔 🎨 *COULEUR ALÉATOIRE* 〕━━━☩\n☠\n⛧  HEX: *${hex}*\n☠  RGB: *rgb(${r}, ${g}, ${b})*\n✝  Nom approx: *${colorName}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}