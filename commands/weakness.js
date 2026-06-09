// commands/weakness.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_weakness(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const wks=['Vulnerable a la confiance accordee trop vite','Faiblesse face a l isolement','Trop loyal meme avec les mauvaises personnes','Tendance a sous-estimer les petits ennemis','Perfectionnisme paralysant','Impulsivite en situation de stress','Attachement emotionnel trop fort','Incapacite a demander de l aide']; const result=wks[Math.floor(Math.random()*wks.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   TA FAIBLESSE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
