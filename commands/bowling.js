import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function bowling(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const quilles = Math.floor(Math.random() * 11)
  let resultat, bonus
  if (quilles === 10) { resultat = '🎳 STRIKE ! Toutes les quilles abattues !'; bonus = 500 }
  else if (quilles >= 8) { resultat = `🎳 ${quilles}/10 quilles — Excellent !`; bonus = 200 }
  else if (quilles >= 5) { resultat = `🎳 ${quilles}/10 quilles — Correct`; bonus = 100 }
  else { resultat = `🎳 ${quilles}/10 quilles — Mauvais lancer`; bonus = 10 }
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎳 *BOWLING DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎳 *@${jid.split('@')[0]}* envoie la boule !\n\n` +
    `⛧  ${resultat}\n` +
    `✝  💰 *Bonus:* +${bonus} pts\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
