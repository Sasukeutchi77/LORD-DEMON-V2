// commands/tresortrouve.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Un coffre en or rempli de pieces","Une arme legendaire ancienne","Une armure indestructible","Un grimoire de sorts rares","Un cristal de puissance infinie","Une potion de vie eternelle","Une carte vers un tresor cache","Un artefact demoniaque ancestral"]

export default async function cmd_tresortrouve(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   TRESOR TROUVE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
