// commands/chanter.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_chanter(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const songs=['une ballade demoniaque','une chanson pop','un rap freestyle','une ode epique','un hymne de victoire']; const result='*@'+jid.split('@')[0]+'* chante '+songs[Math.floor(Math.random()*songs.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   CHANTER (RP)   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    { mentions: [jid] }
  )
}
