// commands/mystere.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Qui a vraiment construit les Pyramides ?","Le Triangle des Bermudes existe-t-il vraiment ?","Y a-t-il de la vie ailleurs dans l univers ?","Qu est-il arrive au vol MH370 ?","La Theorie de la Simulation : sommes-nous dans un jeu ?","Qui etait vraiment Jack l Eventreur ?","Le Monstre du Loch Ness existe-t-il ?","Qu est-ce qu il y a au centre de la Terre ?"]

export default async function cmd_mystere(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   MYSTERE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  )
}
