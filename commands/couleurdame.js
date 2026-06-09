// commands/couleurdame.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_couleurdame(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const LIST=["Rouge : Passion amour energie","Orange : Creativite enthousiasme","Jaune : Joie optimisme intelligence","Vert : Croissance guerison equilibre","Bleu : Calme loyaute verite","Violet : Spiritualite mystere sagesse","Noir : Puissance elegance mystere","Blanc : Purete paix lumiere"]; const result=LIST[Math.floor(Math.random()*LIST.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   TA COULEUR D AME   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n👤 @' + target.split('@')[0] + '\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
