import { sendMessage } from '../lib/sendMessage.js'
const sessions = new Map()
export default async function chiffremystere(sock, sender, args, msg, ctx = {}) {
  const sub = args[0]?.toLowerCase()
  if (sub === 'stop') { sessions.delete(sender); return sendMessage(sock, sender, `☠ Partie annulée.`) }
  if (!sessions.has(sender)) {
    const secret = Math.floor(Math.random() * 100) + 1
    sessions.set(sender, { secret, tentatives: 0, max: 7 })
    const text =
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🔮 *CHIFFRE MYSTÈRE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠  🎲 J'ai choisi un chiffre entre 1 et 100.\n` +
      `⛧  💡 Tu as *7 tentatives* pour le trouver.\n` +
      `✝  📝 Usage: .chiffremystere <nombre>\n` +
      `☩  🚫 Stop: .chiffremystere stop\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    return sendMessage(sock, sender, text)
  }
  const { secret, tentatives, max } = sessions.get(sender)
  const guess = parseInt(args[0])
  if (isNaN(guess)) return sendMessage(sock, sender, `☠ Donne un nombre valide !`)
  const newTent = tentatives + 1
  sessions.set(sender, { secret, tentatives: newTent, max })
  if (guess === secret) {
    sessions.delete(sender)
    return sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🎉 *VICTOIRE !*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☠  ✅ Bravo ! Le chiffre était *${secret}*\n⛧  🏆 Trouvé en ${newTent} tentative(s) !\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  if (newTent >= max) {
    sessions.delete(sender)
    return sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   💀 *DÉFAITE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☠  ❌ Plus de tentatives ! C'était *${secret}*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const hint = guess < secret ? '📈 *Trop petit !*' : '📉 *Trop grand !*'
  await sendMessage(sock, sender, `☩━━━〔 🔮 *CHIFFRE MYSTÈRE* 〕━━━☩\n\n☠  ${hint}\n⛧  📊 Tentatives: ${newTent}/${max}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
