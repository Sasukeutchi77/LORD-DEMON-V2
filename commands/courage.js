// commands/courage.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Tu es plus fort que tu ne le crois","Cette epreuve ne te definit pas elle te forge","Chaque pas en avant compte peu importe sa taille","Tu as deja surmonte pire que ca","La peur n est qu une etape vers le courage","Respire et avance meme lentement","Les heros ont aussi peur mais ils agissent quand meme","Tu peux le faire je le sais"]

export default async function cmd_courage(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   DOSE DE COURAGE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
