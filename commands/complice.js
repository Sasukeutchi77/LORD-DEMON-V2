// commands/complice.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["🦁 Le Lion — Courageux et protecteur","🦊 Le Renard — Ruse et strategique","🐺 Le Loup — Loyal et feroce","🦅 L Aigle — Visionnaire et libre","🐉 Le Dragon — Puissant et sage","🦂 Le Scorpion — Dangereux et precis","🐍 Le Serpent — Discret et mortel","🦇 La Chauve-souris — Nocturne et mysterieuse"]

export default async function cmd_complice(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   TON COMPLICE IDEAL   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
