// commands/ideerap.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Je monte plus haut que le drone de ton voisin","Mon flow coule comme les larmes d un exam rate","J ai plus de layers que ton oignon de philosophie","Ma reussite est un bug qu ils ont pas encore corrige","Je suis l exception qui infirme leur regle","Mon aura eclaire plus que leur projecteur","Ils etudient mes moves comme un cours magistral","Je suis le chapitre qu ils n ont pas encore ecrit"]

export default async function cmd_ideerap(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   PUNCHLINE RAP   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
