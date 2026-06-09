import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
const ITEMS = ["🧱 Étage 1 (x1.2)","🧱🧱 Étage 2 (x1.5)","⚔️ Étage 3 (x2)","🔥 Étage 4 (x3)","💎 Étage 5 (x5)","☠️ Piège (x0)","👑 Sommet (x8)","🌟 Hors-rang (x0)"]
const VALS = [1.2,1.5,2,3,5,0,8,0]
export default async function tower(sock, sender, args, msg, ctx) {
  try {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const bet = parseInt(args[0])
  if (!bet||bet<10) return await sendMessage(sock, sender, `☩━━━〔 🏰 *TOWER* 〕━━━☩\n☠\n⛧  Usage: ${prefix}tower <mise>\n☠  Mise minimum: 10 ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  const idx = Math.floor(Math.random()*ITEMS.length)
  const mult = VALS[idx], prize = Math.floor(bet*mult)
  if (prize>bet) ecoDb.addCoins(senderJid,prize-bet,'tower')
  else if (prize<bet) ecoDb.removeCoins(senderJid,bet-prize,'tower')
  const u2 = ecoDb.get(senderJid)
  const res = prize>bet ? `✅ +${prize-bet}` : prize===bet ? '🤝 Égalité' : `❌ -${bet-prize}`
  await sendMessage(sock, sender, `☩━━━〔 🏰 *TOWER* 〕━━━☩\n☠\n⛧  Résultat: *${ITEMS[idx]}*\n☠\n✝  ${res} ${ECONOMY.SYMBOL}\n☠  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}