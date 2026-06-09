// commands/lottery.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY, lotteryDb } from '../lib/economySystem.js'
import { isOwner, isSudo, cleanNumber } from '../lib/ownerSystem.js'

export default async function lottery(sock, sender, args, msg, ctx) {
  try {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'
  const sub       = args[0]?.toLowerCase()
  const lot       = lotteryDb.get(sender)
  const myTickets = lotteryDb.getUserTickets(sender, senderJid)
  const allTickets= lotteryDb.getTickets(sender)
  const totalTix  = allTickets.reduce((s, t) => s + t.tickets, 0)

  // ── Statut (défaut) ──────────────────────────────────
  if (!sub || sub === 'info' || sub === 'statut') {
    const user = ecoDb.ensure(senderJid)
    return await sendMessage(sock, sender,
      `☩━━━〔 🎟️ *LOTERIE DÉMON* 〕━━━☩\n` +
      `☠\n` +
      `⛧  💰 *Jackpot:* ${lot.jackpot.toLocaleString()} ${ECONOMY.SYMBOL}\n` +
      `☠  🎟️ *Tickets vendus:* ${totalTix}\n` +
      `☩  👥 *Participants:* ${allTickets.length}\n` +
      `☠\n` +
      `✝  🎟️ *Mes tickets:* ${myTickets}\n` +
      `☠  💰 *Ma poche:* ${user.coins} ${ECONOMY.SYMBOL}\n` +
      `☠\n` +
      `⛧  📌 *Commandes:*\n` +
      `☩  ${prefix}lottery acheter → 1 ticket (${ECONOMY.LOTTERY_TICKET} ${ECONOMY.SYMBOL})\n` +
      `✝  ${prefix}lottery acheter 5 → 5 tickets\n` +
      `☠  ${prefix}lottery tirage → Tirer (owner/admin)\n` +
      `⛧  ${prefix}lottery top → Participants\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── Acheter des tickets ──────────────────────────────
  if (sub === 'acheter' || sub === 'buy' || sub === 'ticket') {
    const qty  = Math.max(1, Math.min(50, parseInt(args[1]) || 1))
    const cost = qty * ECONOMY.LOTTERY_TICKET
    const user = ecoDb.ensure(senderJid)

    if (user.coins < cost) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *FONDS INSUFFISANTS* 〕━━━☩\n☠\n` +
        `⛧  ${qty} ticket(s) = ${cost} ${ECONOMY.SYMBOL}\n☠  Tu as: ${user.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    ecoDb.removeCoins(senderJid, cost, `lottery ${qty} tickets`)
    for (let i = 0; i < qty; i++) lotteryDb.addTicket(sender, senderJid)
    lotteryDb.addJackpot(sender, cost)
    const u2  = ecoDb.get(senderJid)
    const lot2 = lotteryDb.get(sender)
    const myNew = lotteryDb.getUserTickets(sender, senderJid)

    return await sendMessage(sock, sender,
      `☩━━━〔 🎟️ *TICKETS ACHETÉS !* 〕━━━☩\n` +
      `☠\n` +
      `⛧  ✅ *${qty} ticket(s)* acheté(s)\n` +
      `☠  💸 *Coût:* -${cost} ${ECONOMY.SYMBOL}\n` +
      `☠\n` +
      `☩  🎟️ *Mes tickets:* ${myNew}\n` +
      `✝  💰 *Jackpot actuel:* ${lot2.jackpot.toLocaleString()} ${ECONOMY.SYMBOL}\n` +
      `☠  💰 *Poche:* ${u2.coins} ${ECONOMY.SYMBOL}\n` +
      `☠\n` +
      `⛧  🍀 Bonne chance !\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── Top participants ─────────────────────────────────
  if (sub === 'top' || sub === 'participants') {
    if (!allTickets.length) {
      return await sendMessage(sock, sender,
        `☩━━━〔 🎟️ *LOTERIE — PARTICIPANTS* 〕━━━☩\n☠\n⛧  Aucun participant pour l'instant.\n☠  ${prefix}lottery acheter pour rejoindre!\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    const sorted = [...allTickets].sort((a, b) => b.tickets - a.tickets)
    let text = `☩━━━〔 🎟️ *PARTICIPANTS LOTERIE* 〕━━━☩\n☠\n`
    sorted.slice(0, 10).forEach((t, i) => {
      const pct = Math.round((t.tickets / totalTix) * 100)
      text += `⛧  *${i+1}.* ${cleanNumber(t.user_jid)}\n☩  🎟️ ${t.tickets} ticket(s) → ${pct}% de chance\n☠\n`
    })
    text += `✝  💰 Jackpot: *${lot.jackpot.toLocaleString()} ${ECONOMY.SYMBOL}*\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    return await sendMessage(sock, sender, text)
  }

  // ── Tirage (owner/admin) ─────────────────────────────
  if (sub === 'tirage' || sub === 'draw' || sub === 'tirer') {
    const canDraw = isOwner(senderJid) || isSudo(senderJid) || ctx?.isAdmin
    if (!canDraw) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *ACCÈS REFUSÉ* 〕━━━☩\n☠\n⛧  🔒 Réservé aux admins, Owner et Sudos.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    if (totalTix < 2) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *PAS ASSEZ DE PARTICIPANTS* 〕━━━☩\n☠\n⛧  Il faut au moins 2 tickets pour tirer.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const result = lotteryDb.draw(sender)
    if (!result) return await sendMessage(sock, sender, `☠ Erreur lors du tirage.`)
    ecoDb.addCoins(result.winner, result.prize, 'lottery win')
    const wu = ecoDb.get(result.winner)

    await sendMessage(sock, sender,
      `☩━━━〔 🎟️ *TIRAGE LOTERIE !* 〕━━━☩\n` +
      `☠\n` +
      `⛧  🎰 *${result.totalTickets} tickets* en jeu\n☠\n` +
      `✝  🏆 *GAGNANT:*\n` +
      `☠  @${cleanNumber(result.winner)}\n☠\n` +
      `⛧  💰 *Prix:* ${result.prize.toLocaleString()} ${ECONOMY.SYMBOL}\n` +
      `☩  💰 *Poche gagnant:* ${wu.coins} ${ECONOMY.SYMBOL}\n` +
      `☠\n` +
      `✝  🔄 Nouvelle loterie démarrée!\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
    return
  }

  await sendMessage(sock, sender,
    `☩━━━〔 🎟️ *LOTERIE — AIDE* 〕━━━☩\n☠\n⛧  ${prefix}lottery → Statut\n☩  ${prefix}lottery acheter [qté]\n✝  ${prefix}lottery top\n☠  ${prefix}lottery tirage (admin)\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}