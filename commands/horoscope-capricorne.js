// commands/horoscope-capricorne.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Vos ambitions prennent forme. Continuez methodiquement.","La perseverance paie : les resultats arrivent.","Eviez de vous isoler dans votre travail.","Votre sens des responsabilites est admire.","Une promotion ou reconnaissance professionnelle est proche."]

export default async function cmd_horoscope_capricorne(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   HOROSCOPE CAPRICORNE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
