// commands/fun_fact.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Les pieuvres ont 3 coeurs.","Les fourmis ne dorment jamais.","Les cochons ne peuvent pas lever les yeux vers le ciel.","Le miel ne se perime jamais.","Les escargots peuvent dormir 3 ans.","La banane est techniquement une baie.","Les pandas passent 16h par jour a manger.","Une seule feuille d arbre contient 50 000 cellules."]

export default async function cmd_fun_fact(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   FUN FACT   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
  )
}
