import { sendMessage } from '../lib/sendMessage.js'
const WORDS_BY_LETTER = {
  A:['Audacieux','Ardent','Agile','Absolu'],B:['Brillant','Brave','Béni'],C:['Courageux','Créatif','Charismatique'],
  D:['Déterminé','Dynamique','Divin'],E:['Élégant','Énergique','Éternel'],F:['Fort','Fier','Fantastique'],
  G:['Grand','Généreux','Glorieux'],H:['Héroïque','Habile','Honorable'],I:['Intrépide','Intelligent','Invincible'],
  J:['Juste','Jovial','Judicieux'],K:['Kryptonite','Kaïzer'],L:['Légendaire','Loyal','Lumineux'],
  M:['Majestueux','Mystique','Magistral'],N:['Noble','Novateur','Naturel'],O:['Olympique','Obstiné'],
  P:['Puissant','Passionné','Perspicace'],Q:['Qualifié'],R:['Redoutable','Remarquable','Résilient'],
  S:['Sage','Stratège','Supérieur'],T:['Téméraire','Talentueux','Tenace'],U:['Universel','Unique','Ultime'],
  V:['Victorieux','Vaillant','Vertueux'],W:['Warrior','Wise'],X:['X-factor'],Y:['Yeux de faucon'],Z:['Zélé','Zen'],
}
export default async function acrostiche2(sock, sender, args, msg, ctx = {}) {
  const text = args.join(' ').toUpperCase().replace(/[^A-Z]/g,'')
  if (!text.trim() || text.length > 15) return sendMessage(sock, sender, `☠ Usage: .acrostiche2 <MOT> (max 15 lettres)`)
  const lines = text.split('').map(c => {
    const mots = WORDS_BY_LETTER[c] || ['Exceptionnel']
    const mot = mots[Math.floor(Math.random() * mots.length)]
    return `  *${c}* ➤ ${mot}`
  }).join('\n')
  const out =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ✍️ *ACROSTICHE PREMIUM*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📝 *Mot:* ${text}\n\n` +
    `${lines}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
