import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
const ITEMS = ["🪜 Niveau 1 (x1.5)","🪜🪜 Niveau 2 (x2)","🪜🪜🪜 Niveau 3 (x3)","⭐ Niveau 4 (x5)","💎 Niveau 5 (x0)","☠️ Tu tombes (x0)","🏆 Sommet (x10)","🔥 Inferno (x8)"]
const VALS = [1.5,2,3,5,0,0,10,8]
export default async function ladder(sock, sender, args, msg, ctx) {
  try {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const bet = parseInt(args[0])
  if (!bet||bet<10) return await sendMessage(sock, sender, `☩━━━〔 🪜 *LADDER* 〕━━━☩\n☠\n⛧  Usage: ${prefix}ladder <mise>\n☠  Mise minimum: 10 ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  const idx = Math.floor(Math.random()*ITEMS.length)
  const mult = VALS[idx], prize = Math.floor(bet*mult)
  if (prize>bet) ecoDb.addCoins(senderJid,prize-bet,'ladder')
  else if (prize<bet) ecoDb.removeCoins(senderJid,bet-prize,'ladder')
  const u2 = ecoDb.get(senderJid)
  const res = prize>bet ? `✅ +${prize-bet}` : prize===bet ? '🤝 Égalité' : `❌ -${bet-prize}`
  await sendMessage(sock, sender, `☩━━━〔 🪜 *LADDER* 〕━━━☩\n☠\n⛧  Résultat: *${ITEMS[idx]}*\n☠\n✝  ${res} ${ECONOMY.SYMBOL}\n☠  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}