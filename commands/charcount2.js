import { sendMessage } from '../lib/sendMessage.js'
export default async function charcount2(sock, sender, args, msg, ctx = {}) {
  const text = args.join(' ')
  if (!text.trim()) return sendMessage(sock, sender, `☠ Usage: .charcount2 <texte>`)
  const total = text.length
  const letters = text.replace(/[^a-zA-ZÀ-ÿ]/g, '').length
  const digits = text.replace(/[^0-9]/g, '').length
  const spaces = text.split(' ').length - 1
  const words = text.trim().split(/\s+/).length
  const special = total - letters - digits - spaces
  const out =
    `☩━━━〔 🔢 *ANALYSE DE TEXTE* 〕━━━☩\n\n` +
    `☠  📝 _"${text.slice(0,50)}${text.length>50?'...':''}"_\n\n` +
    `⛧  🔤 *Lettres:* ${letters}\n` +
    `✝  🔢 *Chiffres:* ${digits}\n` +
    `☩  📏 *Mots:* ${words}\n` +
    `☠  ⎵ *Espaces:* ${spaces}\n` +
    `⛧  ✨ *Spéciaux:* ${special}\n` +
    `✝  📊 *Total:* ${total} caractères\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
