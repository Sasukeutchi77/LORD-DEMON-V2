import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY, makeDeck, CARD_VALUES } from '../lib/economySystem.js'
const games = new Map()
export default async function highlow(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const sub = args[0]?.toLowerCase()
  const key = `${sender}_${senderJid}`
  if (games.has(key) && (sub==='haut'||sub==='bas'||sub==='egal'||sub==='high'||sub==='low')) {
    const g = games.get(key)
    const newCard = g.deck.pop()
    const newVal = CARD_VALUES[newCard.replace(/[♠♥♦♣]/g,'')]
    const oldVal = CARD_VALUES[g.current.replace(/[♠♥♦♣]/g,'')]
    const correct = (sub==='haut'||sub==='high') ? newVal>oldVal : (sub==='bas'||sub==='low') ? newVal<oldVal : newVal===oldVal
    const mult = sub==='egal'||sub==='equal' ? 8 : 1.8
    g.current = newCard; g.mult *= (correct ? mult : 0); g.round++
    if (!correct) { games.delete(key); ecoDb.removeCoins(senderJid, g.bet, 'highlow loss'); const u2=ecoDb.get(senderJid); return await sendMessage(sock, sender, `☩━━━〔 ❌ *HIGH-LOW — PERDU* 〕━━━☩\n☠\n⛧  Carte: *${newCard}* (${newVal})\n☠  Tu as dit: ${sub} — ❌ Faux!\n✝  -${g.bet} ${ECONOMY.SYMBOL} | Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`) }
    if (g.round >= 5) { games.delete(key); const prize=Math.floor(g.bet*g.mult); ecoDb.addCoins(senderJid,prize-g.bet,`highlow win`); const u2=ecoDb.get(senderJid); return await sendMessage(sock, sender, `☩━━━〔 🏆 *HIGH-LOW — GAGNÉ !* 〕━━━☩\n☠\n⛧  5 bonnes réponses !\n☠  x${g.mult.toFixed(2)} — +${prize-g.bet} ${ECONOMY.SYMBOL}\n✝  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`) }
    const prize = Math.floor(g.bet*g.mult)
    return await sendMessage(sock, sender, `☩━━━〔 🃏 *HIGH-LOW* (${g.round}/5) 〕━━━☩\n☠\n⛧  ✅ Correct! Carte: *${newCard}* (${newVal})\n☠  Multiplicateur actuel: x${g.mult.toFixed(2)}\n✝  Si cashout: ${prize} ${ECONOMY.SYMBOL}\n☠\n⛧  La prochaine carte sera...\n☩  *${prefix}highlow haut* | *${prefix}highlow bas* | *${prefix}highlow egal*\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const bet = parseInt(args[0])
  if (!bet||bet<10) return await sendMessage(sock, sender, `☩━━━〔 🃏 *HIGH-LOW* 〕━━━☩\n☠\n⛧  Prédit si la prochaine carte est plus haute ou basse!\n☠  Usage: ${prefix}highlow <mise>\n✝  Puis: ${prefix}highlow haut/bas/egal\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  const deck = makeDeck()
  const card = deck.pop()
  const val = CARD_VALUES[card.replace(/[♠♥♦♣]/g,'')]
  games.set(key, { deck, current: card, bet, mult: 1, round: 0 })
  await sendMessage(sock, sender, `☩━━━〔 🃏 *HIGH-LOW* 〕━━━☩\n☠\n⛧  Carte actuelle: *${card}* (valeur: ${val})\n☠\n✝  La prochaine sera?\n☠  *${prefix}highlow haut* — Plus haute\n⛧  *${prefix}highlow bas* — Plus basse\n☩  *${prefix}highlow egal* — Égale (x8)\n☠\n✝  5 bons = x${Math.pow(1.8,5).toFixed(1)} mise!\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
