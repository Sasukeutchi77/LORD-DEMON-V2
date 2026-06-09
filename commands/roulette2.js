import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
export default async function roulette2(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const bet = parseInt(args[0])
  const betType = args[1]?.toLowerCase()
  if (!bet||bet<10||!betType) return await sendMessage(sock, sender,
    `☩━━━〔 🎡 *ROULETTE* 〕━━━☩\n☠\n⛧  Usage: ${prefix}roulette2 <mise> <type>\n☠\n✝  Types de paris:\n☠  rouge / noir → x2\n⛧  pair / impair → x2\n☩  1-18 / 19-36 → x2\n✝  <numéro 0-36> → x35\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  const num = Math.floor(Math.random()*37)
  const RED = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
  const color = num === 0 ? '🟢' : RED.includes(num) ? '🔴' : '⚫'
  let win = false, mult = 2
  const betNum = parseInt(betType)
  if (!isNaN(betNum) && betNum >= 0 && betNum <= 36) { win = num === betNum; mult = 35 }
  else if (betType === 'rouge') win = RED.includes(num)
  else if (betType === 'noir') win = !RED.includes(num) && num !== 0
  else if (betType === 'pair') win = num !== 0 && num % 2 === 0
  else if (betType === 'impair') win = num % 2 === 1
  else if (betType === '1-18') win = num >= 1 && num <= 18
  else if (betType === '19-36') win = num >= 19 && num <= 36
  if (win) ecoDb.addCoins(senderJid, bet*(mult-1), `roulette win x${mult}`)
  else ecoDb.removeCoins(senderJid, bet, 'roulette loss')
  const u2 = ecoDb.get(senderJid)
  await sendMessage(sock, sender,
    `☩━━━〔 🎡 *ROULETTE* 〕━━━☩\n☠\n⛧  La boule tombe sur...\n☠\n✝  ${color} *${num}* ${color}\n☠\n⛧  Pari: *${betType}* — Mise: ${bet} ${ECONOMY.SYMBOL}\n☠  ${win ? `✅ GAGNÉ! +${bet*(mult-1)} ${ECONOMY.SYMBOL}` : `❌ PERDU! -${bet} ${ECONOMY.SYMBOL}`}\n✝  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
