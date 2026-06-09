// commands/ideehistoire.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Il etait une fois un demon qui tomba amoureux de sa proie...","Dans un monde ou la magie avait disparu un enfant la retrouva...","Le dernier humain sur Terre entendit frapper a sa porte...","Elle avait vendu son ombre et en avait perdu sa memoire...","En ouvrant ce vieux livre il libera quelque chose qu il ne pouvait refermer...","Le temps s arreta sauf pour lui...","Il herita d une carte qui menait au seul endroit qu il cherchait a fuir...","Elle se reveilla avec tous les souvenirs de ses vies anterieures..."]

export default async function cmd_ideehistoire(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   DEBUT D HISTOIRE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
