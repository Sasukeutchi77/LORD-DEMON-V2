// commands/blackjack.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY, makeDeck, handValue } from '../lib/economySystem.js'
import { cleanNumber } from '../lib/ownerSystem.js'

// Parties en cours : { [sender_jid]: { deck, player, dealer, bet } }
const games = new Map()

function renderHand(hand, hideSecond = false) {
  if (hideSecond) return `${hand[0]} 🂠`
  return hand.join(' ')
}

function buildStatus(game, done = false) {
  const pv = handValue(game.player)
  const dv = done ? handValue(game.dealer) : handValue([game.dealer[0]])
  return (
    `☩━━━〔 🃏 *BLACKJACK* 〕━━━☩\n` +
    `☠\n` +
    `⛧  🎰 *Mise:* ${game.bet} ${ECONOMY.SYMBOL}\n` +
    `☠\n` +
    `✝  *Dealer:* ${renderHand(game.dealer, !done)} — *${done ? dv : '?'}*\n` +
    `☠  *Toi:*   ${renderHand(game.player)} — *${pv}*\n` +
    `☠\n`
  )
}

export default async function blackjack(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'
  const sub       = args[0]?.toLowerCase()
  const key       = `${sender}_${senderJid}`

  // ── Partie en cours → tirer/rester ──────────────────
  if (games.has(key)) {
    const g = games.get(key)
    if (sub === 'tirer' || sub === 'hit' || sub === 't') {
      g.player.push(g.deck.pop())
      const pv = handValue(g.player)
      if (pv > 21) {
        games.delete(key)
        ecoDb.removeCoins(senderJid, g.bet, 'blackjack loss')
        const u = ecoDb.get(senderJid)
        return await sendMessage(sock, sender,
          buildStatus(g, true) +
          `⛧  💥 *BUST !* Tu dépasses 21.\n☠  💸 Perdu: -${g.bet} ${ECONOMY.SYMBOL}\n☩  💰 Poche: ${u.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        )
      }
      if (pv === 21) {
        // Auto-stand
        return await finishGame(sock, sender, senderJid, g, key, prefix)
      }
      return await sendMessage(sock, sender,
        buildStatus(g) +
        `✝  *${prefix}bj tirer* — Encore une carte\n☠  *${prefix}bj rester* — Garder ta main\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    if (sub === 'rester' || sub === 'stand' || sub === 'r') {
      return await finishGame(sock, sender, senderJid, g, key, prefix)
    }
    return await sendMessage(sock, sender,
      buildStatus(g) +
      `✝  *${prefix}bj tirer* — Encore une carte\n☠  *${prefix}bj rester* — Garder ta main\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── Nouvelle partie ──────────────────────────────────
  const bet = parseInt(args[0])
  if (!bet || bet < ECONOMY.BLACKJACK_MIN) {
    return await sendMessage(sock, sender,
      `☩━━━〔 🃏 *BLACKJACK* 〕━━━☩\n☠\n⛧  💡 *Usage:* ${prefix}bj <mise>\n☠  Mise minimum: ${ECONOMY.BLACKJACK_MIN} ${ECONOMY.SYMBOL}\n☠\n✝  *En jeu:*\n☠  ${prefix}bj tirer → Carte\n⛧  ${prefix}bj rester → Stand\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *FONDS INSUFFISANTS* 〕━━━☩\n☠\n⛧  Tu as ${user.coins} ${ECONOMY.SYMBOL}, mise = ${bet} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const deck   = makeDeck()
  const player = [deck.pop(), deck.pop()]
  const dealer = [deck.pop(), deck.pop()]
  const game   = { deck, player, dealer, bet }

  const pv = handValue(player)
  if (pv === 21) {
    const prize = Math.floor(bet * 1.5)
    ecoDb.addCoins(senderJid, prize, 'blackjack natural')
    const u = ecoDb.get(senderJid)
    return await sendMessage(sock, sender,
      buildStatus({ player, dealer, bet }, true) +
      `⛧  🎉 *BLACKJACK NATUREL !* +${prize} ${ECONOMY.SYMBOL}\n☠  💰 Poche: ${u.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  games.set(key, game)
  await sendMessage(sock, sender,
    buildStatus(game) +
    `✝  *${prefix}bj tirer* — Encore une carte\n☠  *${prefix}bj rester* — Garder ta main\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}

async function finishGame(sock, sender, senderJid, g, key, prefix) {
  games.delete(key)
  while (handValue(g.dealer) < 17) g.dealer.push(g.deck.pop())
  const pv = handValue(g.player)
  const dv = handValue(g.dealer)

  let result, coins
  if (dv > 21 || pv > dv) {
    result = `🏆 *VICTOIRE !* +${g.bet} ${ECONOMY.SYMBOL}`
    ecoDb.addCoins(senderJid, g.bet, 'blackjack win')
  } else if (pv === dv) {
    result = `🤝 *ÉGALITÉ !* Mise remboursée`
    coins  = 0
  } else {
    result = `💀 *DÉFAITE !* -${g.bet} ${ECONOMY.SYMBOL}`
    ecoDb.removeCoins(senderJid, g.bet, 'blackjack loss')
  }
  const u = ecoDb.get(senderJid)
  await sendMessage(sock, sender,
    buildStatus(g, true) +
    `⛧  ${result}\n☠  💰 Poche: ${u.coins} ${ECONOMY.SYMBOL}\n☠\n⛧  💡 ${prefix}bj <mise> pour rejouer\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
