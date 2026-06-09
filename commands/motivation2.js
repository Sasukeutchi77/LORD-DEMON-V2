// commands/motivation2.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Aujourd hui est le meilleur jour pour commencer","Tes reves valent chaque sacrifice","La distance entre toi et ton objectif c est la regularite","Ne t arretes pas quand tu es fatigue mais quand tu as fini","Un petit pas vaut mieux que zero","Chaque expert etait d abord un debutant","Ton heure viendra reste pret","Agis maintenant regrettes plus tard"]

export default async function cmd_motivation2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   MOTIVATION   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
