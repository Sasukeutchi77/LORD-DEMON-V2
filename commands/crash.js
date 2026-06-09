import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
export default async function crash(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const bet = parseInt(args[0])
  if (!bet||bet<ECONOMY.SLOTS_MIN) return await sendMessage(sock, sender,
    `☩━━━〔 💥 *CRASH* 〕━━━☩\n☠\n⛧  Parie avant que ça crash!\n☠  Usage: ${prefix}crash <mise>\n✝  Mise min: ${ECONOMY.SLOTS_MIN} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  // Génération crash point (distribution exponentielle)
  const r = Math.random()
  const crashAt = r < 0.3 ? 1.0 : r < 0.6 ? 1.0 + Math.random()*1 : r < 0.85 ? 2 + Math.random()*3 : r < 0.95 ? 5 + Math.random()*5 : 10 + Math.random()*15
  const mult = Math.min(crashAt, 20)
  // Le joueur cash out à la moitié aléatoirement (simulation)
  const cashout = bet * 1 + Math.random() * (mult - 1) > mult ? mult : 1 + Math.random() * (mult - 1)
  const win = cashout < mult
  const multiplier = parseFloat(cashout.toFixed(2))
  const prize = Math.floor(bet * multiplier)
  if (win) { ecoDb.addCoins(senderJid, prize-bet, `crash x${multiplier}`) } else { ecoDb.removeCoins(senderJid, bet, 'crash loss') }
  const u2 = ecoDb.get(senderJid)
  const bars = '📈'.repeat(Math.min(Math.floor(multiplier),10)) + (mult < 2 ? ' 💥' : '')
  await sendMessage(sock, sender,
    `☩━━━〔 💥 *CRASH* 〕━━━☩\n☠\n⛧  ${bars}\n☠\n☩  🚀 Multiplier: *x${multiplier}*\n✝  💥 Crash à: *x${mult.toFixed(2)}*\n☠\n⛧  ${win ? `✅ Cash out! +${prize} ${ECONOMY.SYMBOL}` : `💀 Crash! -${bet} ${ECONOMY.SYMBOL}`}\n☠  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
