// commands/backstory.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_backstory(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const bs=['As perdu sa famille dans une guerre','A ete trahi par son meilleur ami','A grandi en solitaire dans la nature','A survécu a une catastrophe qui a tout emporte','A ete choisi par une entite inconnue','A vendu son ame pour la puissance','A fait serment de vengeance a 15 ans','Porte un secret qui pourrait changer le monde']; const result=bs[Math.floor(Math.random()*bs.length)]
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   TON BACKSTORY   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
