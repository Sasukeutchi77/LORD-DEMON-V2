import { sendMessage } from '../lib/sendMessage.js'
export default async function acrostiche2(sock, sender, args, msg, ctx) {
  const text = args.join(' ').toUpperCase()
  if (!text.trim() || text.length > 15) return await sendMessage(sock, sender, `☠ Usage: ${process.env.PREFIX||'.'}acrostiche2 <MOT> (max 15 lettres)`)
  const WORDS_BY_LETTER = {A:['Audacieux','Ardent','Agile','Astucieux'],B:['Brillant','Brave','Bienveillant'],C:['Courageux','Créatif','Charismatique'],D:['Déterminé','Dynamique','Divin'],E:['Élégant','Énergique','Éternel'],F:['Fort','Fier','Fantastique'],G:['Grand','Généreux','Glorieux'],H:['Héroïque','Habile','Honorable'],I:['Intrépide','Intelligent','Invincible'],J:['Juste','Jovial','Judicieux'],K:['Kryptonite','Kaïzer'],L:['Légendaire','Loyal','Lumineux'],M:['Majestueux','Mystique','Magistral'],N:['Noble','Novateur','Naturel'],O:['Olympique','Obstiné','Orgueilleux'],P:['Puissant','Passionné','Perspicace'],Q:['Qualifié','Quintessence'],R:['Redoutable','Remarquable','Résilient'],S:['Sage','Stratège','Supérieur'],T:['Téméraire','Talentueux','Tenace'],U:['Universel','Unique','Ultime'],V:['Victorieux','Vaillant','Vertueux'],W:['Warrior','Wise'],X:['X-factor'],Y:['Yeux de faucon'],Z:['Zélé','Zen']}
  let poem = `☩━━━〔 📜 *ACROSTICHE* 〕━━━☩\n☠\n`
  for (const c of text.replace(/[^A-Z]/g,'')) {
    const words = WORDS_BY_LETTER[c] || [c+'...']
    const word = words[Math.floor(Math.random()*words.length)]
    poem += `⛧  *${c}* — ${word}\n`
  }
  poem += `☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, poem)
}
