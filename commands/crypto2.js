// commands/crypto2.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_crypto2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const coins2=['DemonCoin','DarkToken','ChaosGem','AbyssShield','VoidCrystal']; const c=coins2[Math.floor(Math.random()*coins2.length)]; const price=100+Math.floor(Math.random()*10000); const change=(Math.random()*40-20).toFixed(1); const result=c+': *'+price+' 🪙* ('+change+'% 24h)'
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   CRYPTO TRADING (SIM)   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
