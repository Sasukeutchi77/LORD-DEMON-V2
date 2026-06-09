import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
const MULTIPLIERS = [0, 0.5, 1, 1.5, 2, 3, 5, 3, 2, 1.5, 1, 0.5, 0]
export default async function plinko(sock, sender, args, msg, ctx) {
  try {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const bet = parseInt(args[0])
  if (!bet||bet<ECONOMY.SLOTS_MIN) return await sendMessage(sock, sender,
    `☩━━━〔 🎯 *PLINKO* 〕━━━☩\n☠\n⛧  Lâche la bille et gagne!\n☠  Usage: ${prefix}plinko <mise>\n✝  Multiplicateurs: x0 → x5 → x0\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  // Simulation de chute (random walk)
  let pos = 6
  const path = []
  for (let i = 0; i < 8; i++) { pos += Math.random() > 0.5 ? 1 : -1; pos = Math.max(0, Math.min(12, pos)); path.push(pos > 6 ? '↘' : pos < 6 ? '↙' : '↓') }
  const mult = MULTIPLIERS[pos]
  const prize = Math.floor(bet * mult)
  if (prize > bet) ecoDb.addCoins(senderJid, prize-bet, `plinko x${mult}`)
  else ecoDb.removeCoins(senderJid, bet-prize, `plinko x${mult}`)
  const u2 = ecoDb.get(senderJid)
  const board = MULTIPLIERS.map((m,i) => i===pos ? `[${m}]` : ` ${m} `).join('')
  await sendMessage(sock, sender,
    `☩━━━〔 🎯 *PLINKO* 〕━━━☩\n☠\n⛧  Chemin: ${path.join('')}\n☠\n✝  ${board}\n☠\n⛧  🎯 Atterri sur: *x${mult}*\n☠  ${prize > bet ? `✅ +${prize-bet}` : prize === bet ? `🤝 Égalité` : `💀 -${bet-prize}`} ${ECONOMY.SYMBOL}\n✝  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}