import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function baccarat(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const mise = parseInt(args[0]) || 100
  const joueur = Math.floor(Math.random() * 10)
  const banque = Math.floor(Math.random() * 10)
  let resultat, gain
  if (joueur > banque) { resultat = '🏆 *JOUEUR GAGNE !*'; gain = mise }
  else if (banque > joueur) { resultat = '🏦 *BANQUE GAGNE !*'; gain = -mise }
  else { resultat = '🤝 *ÉGALITÉ !*'; gain = 0 }
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🃏 *BACCARAT*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎴 *Joueur:* ${joueur} pts | *Banque:* ${banque} pts\n` +
    `⛧  💰 *Mise:* ${mise.toLocaleString()} pièces\n\n` +
    `✝  ${resultat}\n` +
    `☩  ${gain >= 0 ? '💰' : '💸'} *${gain >= 0 ? '+' : ''}${gain.toLocaleString()}* pièces\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
