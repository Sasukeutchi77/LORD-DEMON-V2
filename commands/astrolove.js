import { sendMessage } from '../lib/sendMessage.js'
const SIGNS = ['Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire','Capricorne','Verseau','Poissons']
const COMPAT = {
  'Bélier': ['Sagittaire','Lion','Gémeaux'],
  'Taureau': ['Vierge','Capricorne','Cancer'],
  'Gémeaux': ['Balance','Verseau','Bélier'],
  'Cancer': ['Scorpion','Poissons','Taureau'],
  'Lion': ['Bélier','Sagittaire','Gémeaux'],
  'Vierge': ['Taureau','Capricorne','Cancer'],
  'Balance': ['Gémeaux','Verseau','Sagittaire'],
  'Scorpion': ['Cancer','Poissons','Vierge'],
  'Sagittaire': ['Bélier','Lion','Balance'],
  'Capricorne': ['Taureau','Vierge','Scorpion'],
  'Verseau': ['Gémeaux','Balance','Sagittaire'],
  'Poissons': ['Cancer','Scorpion','Capricorne'],
}
export default async function astrolove(sock, sender, args, msg, ctx = {}) {
  const input = args.join(' ').trim()
  const match = SIGNS.find(s => s.toLowerCase() === input.toLowerCase())
  if (!match) {
    return sendMessage(sock, sender, `☠ Usage: .astrolove <signe>\nSignes: ${SIGNS.join(', ')}`)
  }
  const best = COMPAT[match]
  const random = SIGNS.filter(s => !best.includes(s) && s !== match)[Math.floor(Math.random() * (SIGNS.length - 4))]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💕 *COMPATIBILITÉ ${match.toUpperCase()}*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  💕 *Meilleurs matchs:*\n` +
    `⛧  ❤️ *${best[0]}* — Connexion forte\n` +
    `✝  💕 *${best[1]}* — Très compatible\n` +
    `☩  😊 *${best[2]}* — Bonne entente\n\n` +
    `☠  ⚠️ *À éviter:* _${random}_ (parfois !)\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
