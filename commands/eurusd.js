// commands/eurusd.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_eurusd(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const eur=parseFloat(args[0])||1; const rate=1.08+Math.random()*0.04; const result=eur+'€ ≈ *'+(eur*rate).toFixed(2)+' USD* (taux approx.)'
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   EUR → USD   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  )
}
