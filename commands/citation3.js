// commands/citation3.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["La seule facon de faire du bon travail est d aimer ce que vous faites.","Le succes c est tomber sept fois se relever huit.","La vie est trop courte pour etre petite.","Osez etre la personne que vous voulez devenir.","Chaque expert a ete un debutant.","La determination d aujourd hui est le succes de demain.","Il n y a pas de limite sauf celles que tu t imposes.","Crois en toi et le monde sera a tes pieds."]

export default async function cmd_citation3(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   CITATION MOTIVANTE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  )
}
