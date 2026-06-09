// commands/element2.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_element2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const LIST=["Feu : Passion et determination","Eau : Sensibilite et intuition","Terre : Stabilite et rigueur","Vent : Creativite et liberte","Foudre : Puissance et vitesse","Glace : Calme et precision","Tenebres : Mystere et profondeur","Lumiere : Joie et esperance"]; const result=LIST[Math.floor(Math.random()*LIST.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   ELEMENT   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n👤 @' + target.split('@')[0] + '\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
