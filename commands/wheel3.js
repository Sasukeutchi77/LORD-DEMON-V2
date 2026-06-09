import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
const ITEMS = ["x2","x3","x5","x10","x0.5","x1","x0","x4"]
const VALS = [2,3,5,10,0.5,1,0,4]
export default async function wheel3(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const bet = parseInt(args[0])
  if (!bet||bet<10) return await sendMessage(sock, sender, `☩━━━〔 🎡 *WHEEL3* 〕━━━☩\n☠\n⛧  Usage: ${prefix}wheel3 <mise>\n☠  Mise min: 10 ${ECONOMY.SYMBOL}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  const idx = Math.floor(Math.random()*ITEMS.length)
  const mult = VALS[idx]
  const prize = Math.floor(bet * mult)
  if (prize > bet) ecoDb.addCoins(senderJid, prize-bet, 'wheel3')
  else if (prize < bet) ecoDb.removeCoins(senderJid, bet-prize, 'wheel3')
  const u2 = ecoDb.get(senderJid)
  await sendMessage(sock, sender, `☩━━━〔 🎡 *WHEEL3* 〕━━━☩\n☠\n⛧  Résultat: *${ITEMS[idx]}*\n☠\n✝  ${prize>bet?`✅ +${prize-bet}`:prize===bet?'🤝 Égalité':`❌ -${bet-prize}`} ${ECONOMY.SYMBOL}\n☠  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}