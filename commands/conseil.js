// commands/conseil.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Ne compare pas ton chapitre 1 au chapitre 20 des autres.","Prends soin de toi avant de prendre soin des autres.","Chaque non est un pas vers le bon oui.","Apprends de tes erreurs mais ne te bats pas pour elles.","La patience est la cle de toutes les portes.","Dis ce que tu penses et pense a ce que tu dis.","Sois la personne que tu voulais rencontrer.","L effort d aujourd hui est la recompense de demain."]

export default async function cmd_conseil(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   CONSEIL DU SAGE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  )
}
