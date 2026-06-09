import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
const ITEMS = ["🍋🍋🍋 x1","🍊🍊🍊 x2","🍒🍒🍒 x3","🎯🎯🎯 x5","💎💎💎 x10","☠️☠️☠️ x20","🌟🌟🌟 x50","🎰🎰🎰 x0"]
const VALS = [1,2,3,5,10,20,50,0]
export default async function jackpot4(sock, sender, args, msg, ctx) {
  try {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const bet = parseInt(args[0])
  if (!bet||bet<10) return await sendMessage(sock, sender, `☩━━━〔 🎰 *JACKPOT4* 〕━━━☩\n☠\n⛧  Usage: ${prefix}jackpot4 <mise>\n☠  Mise minimum: 10 ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  const idx = Math.floor(Math.random()*ITEMS.length)
  const mult = VALS[idx], prize = Math.floor(bet*mult)
  if (prize>bet) ecoDb.addCoins(senderJid,prize-bet,'jackpot4')
  else if (prize<bet) ecoDb.removeCoins(senderJid,bet-prize,'jackpot4')
  const u2 = ecoDb.get(senderJid)
  const res = prize>bet ? `✅ +${prize-bet}` : prize===bet ? '🤝 Égalité' : `❌ -${bet-prize}`
  await sendMessage(sock, sender, `☩━━━〔 🎰 *JACKPOT4* 〕━━━☩\n☠\n⛧  Résultat: *${ITEMS[idx]}*\n☠\n✝  ${res} ${ECONOMY.SYMBOL}\n☠  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}