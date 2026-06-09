// commands/horoscope-cancer.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Vos emotions sont a fleur de peau. Accordez-vous du temps.","La famille sera au centre de cette journee.","Un souvenir passe refait surface. C est normal.","Votre intuition est votre meilleure boussole aujourd hui.","Moments de douceur et de calme en perspective."]

export default async function cmd_horoscope_cancer(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   HOROSCOPE CANCER   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
