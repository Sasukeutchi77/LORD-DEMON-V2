// commands/chiffre.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_chiffre(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const secret=1+Math.floor(Math.random()*10); const guess=parseInt(args[0]); const result=guess?guess===secret?'BRAVO ! C etait le *'+secret+'*':guess<secret?'Trop petit ! C etait *'+secret+'*':'Trop grand ! C etait *'+secret+'*':'Devinez entre 1 et 10 ! Ex: .chiffre 7'
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   DEVINE LE CHIFFRE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  )
}
