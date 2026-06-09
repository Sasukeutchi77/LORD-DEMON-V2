// commands/confiance.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

export default async function confiance(sock, sender, args, msg) {
  const mentionné = args.join(' ') || 'quelqu\'un'
  const score = Math.floor(Math.random() * 101)
  let niveau, emoji
  if (score >= 90) { niveau = 'Confiance absolue'; emoji = '💎' }
  else if (score >= 70) { niveau = 'Très fiable'; emoji = '✅' }
  else if (score >= 50) { niveau = 'Modérément fiable'; emoji = '⚠️' }
  else if (score >= 30) { niveau = 'Méfiance recommandée'; emoji = '🔶' }
  else { niveau = 'DANGER — Ne pas faire confiance'; emoji = '☠️' }
  const bar = '🩸'.repeat(Math.floor(score/10)) + '░'.repeat(10 - Math.floor(score/10))
  const text =
    `☩━━━〔 🤝 *INDICE DE CONFIANCE* 〕━━━☩\n\n` +
    `☠  👤 *Sujet:* ${mentionné}\n\n` +
    `⛧  ${bar} ${score}%\n\n` +
    `✝  ${emoji} *Niveau:* ${niveau}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
