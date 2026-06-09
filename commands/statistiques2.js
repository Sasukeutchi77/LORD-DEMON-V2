// commands/statistiques2.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_statistiques2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const atk=Math.floor(Math.random()*100),def=Math.floor(Math.random()*100),spd=Math.floor(Math.random()*100),int=Math.floor(Math.random()*100),cha=Math.floor(Math.random()*100); const result='ATK: '+atk+' | DEF: '+def+' | VIT: '+spd+'\nINT: '+int+' | CHA: '+cha
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   TES STATISTIQUES RPG   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n👤 @' + target.split('@')[0] + '\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
