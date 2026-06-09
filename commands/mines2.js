import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
const games = new Map()
function genGrid(size, bombs) {
  const grid = Array(size*size).fill(0)
  let placed = 0
  while (placed < bombs) { const i = Math.floor(Math.random()*size*size); if (!grid[i]) { grid[i]=1; placed++ } }
  return grid
}
export default async function mines2(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const sub = args[0]?.toLowerCase()
  const key = `${sender}_${senderJid}`
  if (sub === 'cashout' || sub === 'encaisser') {
    if (!games.has(key)) return await sendMessage(sock, sender, `☠ Aucune partie en cours.`)
    const g = games.get(key); games.delete(key)
    const prize = Math.floor(g.bet * g.mult)
    ecoDb.addCoins(senderJid, prize - g.bet, `mines cashout x${g.mult.toFixed(2)}`)
    const u2 = ecoDb.get(senderJid)
    return await sendMessage(sock, sender, `☩━━━〔 💎 *MINES — CASHOUT* 〕━━━☩\n☠\n⛧  ✅ Encaissé à x${g.mult.toFixed(2)}\n☠  💰 +${prize - g.bet} ${ECONOMY.SYMBOL}\n✝  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  if (games.has(key) && /^\d+$/.test(sub||'')) {
    const g = games.get(key)
    const idx = parseInt(sub) - 1
    if (idx < 0 || idx >= g.grid.length || g.revealed[idx]) return await sendMessage(sock, sender, `☠ Case invalide (1-${g.grid.length})`)
    g.revealed[idx] = true
    if (g.grid[idx] === 1) {
      games.delete(key); ecoDb.removeCoins(senderJid, g.bet, 'mines bomb')
      const u2 = ecoDb.get(senderJid)
      return await sendMessage(sock, sender, `☩━━━〔 💥 *MINES — BOOM !* 〕━━━☩\n☠\n⛧  💥 Mine trouvée à la case ${idx+1}!\n☠  💸 Perdu: -${g.bet} ${ECONOMY.SYMBOL}\n✝  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    }
    g.safe++; g.mult = 1 + g.safe * (g.bombs / (g.grid.length - g.safe))
    const prize = Math.floor(g.bet * g.mult)
    const display = g.grid.map((v,i) => g.revealed[i] ? '💎' : '🔲').join('').match(/.{1,5}/g).join('\n')
    await sendMessage(sock, sender, `☩━━━〔 💣 *MINES* (${g.safe} safe) 〕━━━☩\n☠\n\`\`\`\n${display}\n\`\`\`\n☠\n⛧  Multiplicateur: *x${g.mult.toFixed(2)}*\n☠  Si cashout: *${prize} ${ECONOMY.SYMBOL}*\n☠\n✝  ${prefix}mines2 <case> | ${prefix}mines2 cashout\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    return
  }
  const bet = parseInt(args[0])
  if (!bet||bet<10) return await sendMessage(sock, sender, `☩━━━〔 💣 *MINES* 〕━━━☩\n☠\n⛧  Usage: ${prefix}mines2 <mise>\n☠  Puis: ${prefix}mines2 <case 1-25>\n✝  Cashout: ${prefix}mines2 cashout\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  const grid = genGrid(5, 5)
  games.set(key, { grid, revealed: Array(25).fill(false), bet, mult: 1, safe: 0, bombs: 5 })
  await sendMessage(sock, sender, `☩━━━〔 💣 *MINES — DÉBUT* 〕━━━☩\n☠\n⛧  Grille 5x5 — 5 mines cachées!\n☠  Mise: ${bet} ${ECONOMY.SYMBOL}\n☠\n\`\`\`\n${Array(25).fill('🔲').join('').match(/.{1,5}/g).join('\n')}\n\`\`\`\n☠\n✝  Choisis une case (1-25)\n☠  ${prefix}mines2 <numéro>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
