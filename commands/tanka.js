// commands/tanka.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Dans les abysses sombres\\nTon ame cherche la lumiere\\nLe demon attend\\nPour te montrer le chemin\\nVers la verite profonde","La lune est croissante\\nComme tes desirs secrets\\nTu brules de l interieur\\nMais cette flamme purge\\nTout ce qui te retient"]

export default async function cmd_tanka(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   TANKA POETIQUE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
