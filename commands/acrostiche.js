// commands/acrostiche.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function cmd_acrostiche(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const text=(args.join(' ')||'DEMON').toUpperCase(); const words={'D':'Devastateur','E':'Eternel','M':'Maudit','O':'Omniscient','N':'Necromancien','A':'Azrael','R':'Redoutable','G':'Glorieux','S':'Sinistre','T':'Terrible','L':'Legendaire','I':'Infernal','C':'Chaotique','F':'Feroce','P':'Puissant','B':'Brutal','V':'Vengeur','H':'Horreur','K':'Kill','U':'Ultime'}; const result=text.split('').map(c=>(words[c]||c)+' ← '+c).join('\n')
  await sendMessage(sock, sender, 'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   ACROSTICHE DEMONIAQUE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + result + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
}
