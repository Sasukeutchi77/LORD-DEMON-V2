// commands/horoscope-balance.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["L harmonie relationnelle s ameliore. Rejoignez-vous.","Une decision difficile vous attend. Pesez le pour et le contre.","Votre sens de la justice sera mis a contribution.","Beaute et creativite sont au rendez-vous aujourd hui.","Un equilibre delicat a maintenir dans vos relations."]

export default async function cmd_horoscope_balance(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   HOROSCOPE BALANCE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
