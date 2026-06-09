import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CHOIX_BOT = ['✊ Pierre', '✋ Feuille', '✌️ Ciseaux']
const CHOIX_MAP = { pierre: '✊ Pierre', feuille: '✋ Feuille', ciseaux: '✌️ Ciseaux' }
function determinerGagnant(j, b) {
  if (j === b) return '🤝 Égalité !'
  if ((j.includes('Pierre') && b.includes('Ciseaux')) ||
      (j.includes('Feuille') && b.includes('Pierre')) ||
      (j.includes('Ciseaux') && b.includes('Feuille'))) return '🏆 Tu gagnes !'
  return '💀 Le bot gagne !'
}
export default async function chifoumi(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const input = args[0]?.toLowerCase()
  if (!input || !CHOIX_MAP[input]) return sendMessage(sock, sender, `☠ Usage: .chifoumi <pierre|feuille|ciseaux>`)
  const joueur = CHOIX_MAP[input]
  const bot = CHOIX_BOT[Math.floor(Math.random() * 3)]
  const res = determinerGagnant(joueur, bot)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎮 *PIERRE-FEUILLE-CISEAUX*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎮 *Toi:* ${joueur}\n` +
    `⛧  🤖 *Bot:* ${bot}\n\n` +
    `✝  ${res}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
