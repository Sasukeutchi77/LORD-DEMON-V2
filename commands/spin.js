import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
const ITEMS = ["🎁 +100","💎 +500","🪙 +50","⭐ +250","💀 Rien","🔥 +1000"]
const VALS = [1,5,0.5,2.5,0,10]
export default async function spin(sock, sender, args, msg, ctx) {
  try {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const bet = parseInt(args[0])
  if (!bet||bet<10) return await sendMessage(sock, sender, `☩━━━〔 🎰 *SPIN* 〕━━━☩\n☠\n⛧  Usage: ${prefix}spin <mise>\n☠  Mise min: 10 ${ECONOMY.SYMBOL}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  const idx = Math.floor(Math.random()*ITEMS.length)
  const mult = VALS[idx]
  const prize = Math.floor(bet * mult)
  if (prize > bet) ecoDb.addCoins(senderJid, prize-bet, 'spin')
  else if (prize < bet) ecoDb.removeCoins(senderJid, bet-prize, 'spin')
  const u2 = ecoDb.get(senderJid)
  await sendMessage(sock, sender, `☩━━━〔 🎰 *SPIN* 〕━━━☩\n☠\n⛧  Résultat: *${ITEMS[idx]}*\n☠\n✝  ${prize>bet?`✅ +${prize-bet}`:prize===bet?'🤝 Égalité':`❌ -${bet-prize}`} ${ECONOMY.SYMBOL}\n☠  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}