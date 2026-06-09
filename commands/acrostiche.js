import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const MOTS_PAR_LETTRE = {
  A:['Ardent','Audacieux','Absolu'],B:['Brillant','Brave','Béni'],C:['Courageux','Céleste','Conquérant'],
  D:['Déterminé','Divin','Dominant'],E:['Éternel','Élite','Énergique'],F:['Fier','Fort','Fantastique'],
  G:['Grand','Glorieux','Généreux'],H:['Héroïque','Honorable','Habile'],I:['Invincible','Intrépide','Immortel'],
  J:['Juste','Judicieux','Jovial'],K:['Kaïzer','Kryptonite'],L:['Légendaire','Loyal','Lumineux'],
  M:['Majestueux','Mystique','Magistral'],N:['Noble','Novateur','Naturel'],O:['Obstiné','Olympique','Orgueilleux'],
  P:['Puissant','Passionné','Perspicace'],Q:['Qualifié'],R:['Redoutable','Résilient','Remarquable'],
  S:['Sage','Supérieur','Stratège'],T:['Téméraire','Tenace','Talentueux'],U:['Ultime','Universel','Unique'],
  V:['Vaillant','Victorieux','Vertueux'],W:['Warrior','Wise'],X:['X-factor'],Y:['Yeux de faucon'],Z:['Zélé','Zen'],
}
export default async function acrostiche(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const word = args.join(' ').toUpperCase().replace(/[^A-Z]/g,'')
  if (!word || word.length > 15) return sendMessage(sock, sender, `☠ Usage: .acrostiche <MOT> (max 15 lettres)`)
  const lines = word.split('').map(c => {
    const mots = MOTS_PAR_LETTRE[c] || ['Exceptionnel']
    const mot = mots[Math.floor(Math.random() * mots.length)]
    return `⛧  *${c}* — ${mot}`
  }).join('\n')
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ✍️ *ACROSTICHE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📝 *Mot:* ${word}\n\n` +
    `${lines}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
