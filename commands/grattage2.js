import { sendMessage } from '../lib/sendMessage.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
export default async function grattage2(sock, sender, args, msg, ctx) {
  try {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const bet = parseInt(args[0]) || 50
  if (bet < 50) return await sendMessage(sock, sender, `☠ Mise minimum: 50 ${ECONOMY.SYMBOL}`)
  const user = ecoDb.ensure(senderJid)
  if (user.coins < bet) return await sendMessage(sock, sender, `☠ Fonds insuffisants: ${user.coins} ${ECONOMY.SYMBOL}`)
  ecoDb.removeCoins(senderJid, bet, 'grattage')
  const SYMBOLS2 = ['⭐','💰','💎','🍀','🔔','🎁','🎰','🪙']
  const grid = Array(9).fill(0).map(()=>SYMBOLS2[Math.floor(Math.random()*SYMBOLS2.length)])
  const counts = {}; for(const s of grid) counts[s]=(counts[s]||0)+1
  const best = Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]
  const MULTIPLIERS2 = {9:100,8:50,7:20,6:10,5:5,4:2,3:1,2:0,1:0,0:0}
  const mult = MULTIPLIERS2[best[1]] || 0
  const prize = Math.floor(bet * mult)
  if (prize>0) ecoDb.addCoins(senderJid, prize, `grattage x${mult}`)
  const u2 = ecoDb.get(senderJid)
  const display = grid.join('').match(/.{3}/g).join('\n')
  await sendMessage(sock, sender,
    `☩━━━〔 🎟️ *GRATTAGE* 〕━━━☩\n☠\n⛧  Grille:\n✝ \`\`\`\n${display}\n\`\`\`\n☠\n☩  ${best[1]}x ${best[0]} → x${mult}\n✝  ${prize>0?`✅ +${prize} ${ECONOMY.SYMBOL}`:`❌ Rien`}\n☠  💰 Poche: ${u2.coins} ${ECONOMY.SYMBOL}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}