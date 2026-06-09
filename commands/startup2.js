// commands/startup2.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_startup2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const pref=['Neo','Omni','Hyper','Meta','Ultra','Inno','Tech','Smart','Digi','Auto']; const suf=['Lab','Hub','Base','Space','Link','Flow','Loop','Net','AI','OS']; const result=pref[Math.floor(Math.random()*pref.length)]+suf[Math.floor(Math.random()*suf.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   NOM DE STARTUP   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
