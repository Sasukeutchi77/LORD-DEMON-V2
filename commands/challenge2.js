// commands/challenge2.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const challenges = [
  "🏃 Fais 30 pompes maintenant et envoie la preuve !",
  "🎯 Apprends 5 nouveaux mots en anglais aujourd'hui",
  "🧘 Médite 10 minutes les yeux fermés",
  "📚 Lis 20 pages d'un livre ce soir",
  "🌊 Bois 2 litres d'eau aujourd'hui",
  "📵 N'utilise pas les réseaux sociaux pendant 2 heures",
  "🎵 Écoute une musique que tu n'as jamais entendue",
  "✍️ Écris tes 3 objectifs de la semaine",
  "🌙 Couche-toi avant 23h ce soir",
  "🤝 Complimente sincèrement quelqu'un aujourd'hui",
  "🍎 Mange 3 fruits ou légumes aujourd'hui",
  "💆 Déconnecte-toi du téléphone 1 heure",
]

export default async function challenge2(sock, sender, args, msg) {
  const name = msg?.pushName || 'Guerrier'
  const ch = challenges[Math.floor(Math.random() * challenges.length)]
  const text =
    `☩━━━〔 🎯 *CHALLENGE DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  👤 *${name}*, ton défi d'aujourd'hui :\n\n` +
    `⛧  *${ch}*\n\n` +
    `✝  ⏰ *Durée:* Aujourd'hui\n` +
    `☩  🏆 *Récompense:* Fierté & progression !\n\n` +
    `☠  _Relève le défi ou reste dans l'ombre..._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
