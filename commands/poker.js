import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY, makeDeck, CARD_VALUES } from '../lib/economySystem.js'
function evalHand(hand) {
  const ranks = hand.map(c => c.replace(/[♠♥♦♣]/g,'')), suits = hand.map(c => c.slice(-1))
  const rankCount = {}, suitCount = {}
  for (const r of ranks) rankCount[r] = (rankCount[r]||0)+1
  for (const s of suits) suitCount[s] = (suitCount[s]||0)+1
  const counts = Object.values(rankCount).sort((a,b)=>b-a)
  const isFlush = Object.values(suitCount).some(v=>v>=5)
  const nums = [...new Set(ranks.map(r=>r==='A'?14:r==='K'?13:r==='Q'?12:r==='J'?11:parseInt(r)))].sort((a,b)=>a-b)
  const isStraight = nums.length >= 5 && nums[nums.length-1]-nums[0] === 4
  if (isFlush && isStraight) return { name: '🃏 Quinte Flush', mult: 25 }
  if (counts[0] === 4) return { name: '🎴 Carré', mult: 15 }
  if (counts[0] === 3 && counts[1] === 2) return { name: '🎴 Full House', mult: 8 }
  if (isFlush) return { name: '🎴 Couleur', mult: 6 }
  if (isStraight) return { name: '🎴 Suite', mult: 5 }
  if (counts[0] === 3) return { name: '🎴 Brelan', mult: 3 }
  if (counts[0] === 2 && counts[1] === 2) return { name: '🎴 Double Paire', mult: 2 }
  if (counts[0] === 2) return { name: '🎴 Paire', mult: 1.5 }
  return { name: '🃏 Carte haute', mult: 0 }
}
export default async function poker(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const bet = parseInt(args[0])
  if (!bet||bet<20) return await sendMessage(sock, sender,
    `☩━━━〔 ♠️ *VIDEO POKER* 〕━━━☩\n☠\n⛧  Reçois 5 cartes, gagne si combinaison!\n☠  Usage: ${prefix}poker <mise> (min: 20)\n☠\n✝  Combinaisons:\n☠  Paire x1.5 | Double x2 | Brelan x3\n⛧  Suite x5 | Couleur x6 | Full x8\n☩  Carré x15 | Quinte Flush x25\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  const deck = makeDeck()
  const hand = [deck.pop(),deck.pop(),deck.pop(),deck.pop(),deck.pop()]
  const result = evalHand(hand)
  const prize = result.mult > 0 ? Math.floor(bet * result.mult) : 0
  if (prize > 0) ecoDb.addCoins(senderJid, prize-bet, `poker ${result.name}`)
  else ecoDb.removeCoins(senderJid, bet, 'poker loss')
  const u2 = ecoDb.get(senderJid)
  await sendMessage(sock, sender,
    `☩━━━〔 ♠️ *VIDEO POKER* 〕━━━☩\n☠\n⛧  🃏 Main: ${hand.join(' ')}\n☠\n☩  ${result.name} (x${result.mult})\n☠\n✝  ${prize > 0 ? `✅ +${prize} ${ECONOMY.SYMBOL}` : `❌ Perdu ${bet} ${ECONOMY.SYMBOL}`}\n☠  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
