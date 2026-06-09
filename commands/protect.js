// commands/protect.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ACTIONS = ["*se place devant pour protéger* 🛡️","*bouclier activé !* 🛡️💪","*personne ne touche mon ami* ⚔️","*garde du corps activé* 🤜"]

export default async function protect(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
  const mentions = target ? [target] : []
  const targetStr = target ? `@${target.split('@')[0]}` : `vous`
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🛡️ PROTECTION   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n@${jid.split('@')[0]} → ${targetStr}\n\n${action}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
    mentions.length ? { mentions: [jid, ...mentions] } : { mentions: [jid] }
  )
}
