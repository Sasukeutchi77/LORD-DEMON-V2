// commands/arcane.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_arcane(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const LIST=["L Etoile : Espoir et guidance","La Lune : Illusion et intuition","Le Soleil : Succes et vitalite","La Tour : Changement soudain","La Justice : Equilibre et verite","Le Monde : Accomplissement","La Mort : Transformation","La Roue : Cycles du destin","La Force : Courage interieur","Le Mage : Creativite et habilete"]; const result=LIST[Math.floor(Math.random()*LIST.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   CARTE ARCANE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n👤 @' + target.split('@')[0] + '\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
