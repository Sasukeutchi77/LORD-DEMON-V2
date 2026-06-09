// commands/ideefilm.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Un detective fantome enquete sur sa propre mort","Des IA prennent le controle du net et negocient","Un chef cuisinier dans une dimension parallele","Un musicien decouvre que ses notes ouvrent des portes","Des astronautes trouvent une bouteille de 2024","Un eleve devient professeur dans son reve","Un hacker tombe amoureux d un algorithme","Des humains colonisent une planete et decouvrent que la Terre etait la planete test"]

export default async function cmd_ideefilm(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   IDEE DE FILM   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
