// commands/horoscope-vierge.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Votre sens du detail fait la difference aujourd hui.","Organisation et methode sont vos meilleurs atouts.","Evitez le perfectionnisme excessif.","Une erreur de calcul dans vos plans ? Rectifiez sans panique.","Votre analyse fine vous protegera d une erreur."]

export default async function cmd_horoscope_vierge(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   HOROSCOPE VIERGE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
