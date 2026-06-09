// commands/age.js
import { sendMessage } from '../lib/sendMessage.js'
export default async function age(sock, sender, args, msg) {
  const input = args.join(' ')
  if (!input) return sendMessage(sock, sender, '☠ Usage: .age <DD/MM/YYYY>')
  const [d,m,y] = input.split('/').map(Number)
  if (!d||!m||!y) return sendMessage(sock, sender, '☠ Format: DD/MM/YYYY')
  const now = new Date(), birth = new Date(y,m-1,d)
  let years = now.getFullYear() - birth.getFullYear()
  if (now < new Date(now.getFullYear(), m-1, d)) years--
  const nextBd = new Date(now.getFullYear(), m-1, d)
  if (nextBd < now) nextBd.setFullYear(now.getFullYear()+1)
  const days = Math.ceil((nextBd-now)/86400000)
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🎂 ÂGE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n📅 Naissance: ${d}/${m}/${y}\n🎂 Âge: *${years} ans*\n⏳ Prochain anniversaire dans *${days} jours*\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
