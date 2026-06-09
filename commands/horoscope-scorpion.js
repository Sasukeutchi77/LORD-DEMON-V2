// commands/horoscope-scorpion.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Vos ressources cachees emergent au bon moment.","Une transformation interieure est en cours. Faites-lui confiance.","Votre instinct ne vous trompe pas aujourd hui.","La profondeur de vos emotions est une force.","Des secrets seront reveles. Preparez-vous."]

export default async function cmd_horoscope_scorpion(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   HOROSCOPE SCORPION   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
