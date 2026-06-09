// commands/fibonacci.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_fibonacci(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const n=Math.min(parseInt(args[0])||10,20); const fib=[0,1]; for(let i=2;i<n;i++) fib.push(fib[i-1]+fib[i-2]); const result='Fibonacci('+n+'): '+fib.join(', ')
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   FIBONACCI   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}