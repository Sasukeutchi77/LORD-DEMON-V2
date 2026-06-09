import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
export default async function keno(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const bet = parseInt(args[0])
  const picks = args.slice(1).map(Number).filter(n=>n>=1&&n<=40)
  if (!bet||bet<10||picks.length<2||picks.length>10) return await sendMessage(sock, sender,
    `☩━━━〔 🎰 *KENO* 〕━━━☩\n☠\n⛧  Choisis 2-10 numéros (1-40)!\n☠  Usage: ${prefix}keno <mise> <n1> <n2> ...\n✝  Ex: ${prefix}keno 50 5 12 23 31\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  const allNums = Array.from({length:40},(_,i)=>i+1).sort(()=>Math.random()-0.5)
  const drawn = allNums.slice(0,20)
  const hits = picks.filter(n=>drawn.includes(n)).length
  const PAYOUTS = {0:0,1:0,2:1,3:2,4:4,5:8,6:16,7:32,8:80,9:160,10:500}
  const mult = PAYOUTS[Math.min(hits, picks.length)] || 0
  const prize = Math.floor(bet * mult)
  if (prize > 0) ecoDb.addCoins(senderJid, prize-bet, `keno ${hits} hits`)
  else ecoDb.removeCoins(senderJid, bet, 'keno loss')
  const u2 = ecoDb.get(senderJid)
  const drawnStr = drawn.sort((a,b)=>a-b).map(n=>picks.includes(n)?`*${n}*`:n).join(' ')
  await sendMessage(sock, sender,
    `☩━━━〔 🎰 *KENO* 〕━━━☩\n☠\n⛧  Tes numéros: ${picks.join(' ')}\n☠  Tirés: ${drawnStr}\n☠\n☩  🎯 *${hits}* numéros corrects sur ${picks.length}\n✝  Multiplicateur: x${mult}\n☠  ${prize>0?`✅ +${prize-bet} ${ECONOMY.SYMBOL}`:`❌ -${bet} ${ECONOMY.SYMBOL}`}\n☠  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
