import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function acronyme(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const word = args.join(' ').toUpperCase().replace(/[^A-Z]/g, '')
  if (!word) return sendMessage(sock, sender, `☠ Usage: .acronyme <MOT>\nEx: .acronyme LORD`)
  const defs = {
    L:'Légendaire','O':'Obstiné','R':'Redoutable','D':'Démoniaque',
    A:'Audacieux','B':'Brillant','C':'Courageux','E':'Éternel','F':'Fort',
    G:'Grand','H':'Héroïque','I':'Invincible','J':'Juste','K':'Kaïzer',
    M:'Majestueux','N':'Noble','P':'Puissant','Q':'Qualifié','S':'Sage',
    T:'Téméraire','U':'Ultime','V':'Vaillant','W':'Warrior','X':'X-factor',
    Y':'Yeux de faucon','Z':'Zélé',
  }
  const lines = word.split('').map(c => `⛧  *${c}* — ${defs[c] || 'Exceptionnel'}`).join('\n')
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔤 *ACRONYME DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📝 *Mot:* ${word}\n\n` +
    `${lines}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
