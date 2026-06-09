// commands/manger.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_manger(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const foods=['Pizza','Ramen','Sushi','Steak','Burger','Salade','Pasta','Taco','Sandwich','Bento']; const result='*@'+jid.split('@')[0]+'* mange des '+foods[Math.floor(Math.random()*foods.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   MANGER (RP)   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    { mentions: [jid] }
  )
}
