// commands/destin.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_destin(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const LIST=["Tu seras riche et celebre","Une grande aventure t attendt","La gloire sera au rendez-vous","Des epreuves te rendront plus fort","L amour frappera bientot","Un voyage inattendu changera ta vie","La sagesse sera ta plus grande force","Tu deviendras une legende"]; const result=LIST[Math.floor(Math.random()*LIST.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   DESTIN   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n👤 @' + target.split('@')[0] + '\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
