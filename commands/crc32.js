// commands/crc32.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_crc32(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const text=args.join(' '); if(!text) return sendMessage(sock,sender,'Usage: .crc32 <texte>'); let crc=0xFFFFFFFF; for(const c of text) { crc^=c.charCodeAt(0); for(let i=0;i<8;i++) crc=crc&1?(crc>>>1)^0xEDB88320:(crc>>>1) } const result='CRC32: '+(~crc>>>0).toString(16).toUpperCase()
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   CRC32 CHECKSUM   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
