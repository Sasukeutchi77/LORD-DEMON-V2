import { sendMessage } from '../lib/sendMessage.js'
const QAS = [{"q":"What has keys but no locks? (en anglais!)","a":"keyboard,piano"},{"q":"What gets wetter as it dries?","a":"towel"},{"q":"I speak without a mouth, hear without ears. What am I?","a":"echo"},{"q":"What has hands but can't clap?","a":"clock"},{"q":"The more you take, the more you leave behind. What am I?","a":"footsteps,steps"},{"q":"What can run but never walks, has a mouth but never talks?","a":"river"},{"q":"What has a thumb and four fingers but is not alive?","a":"glove"},{"q":"What has cities but no houses, forests but no trees, water but no fish?","a":"map"}]
const games = new Map()
export default async function riddle2(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const answer = args.join(' ').toLowerCase().trim()
  if (games.has(sender)) {
    const g = games.get(sender)
    const correct = g.q.a.toLowerCase().split(',').some(a => answer.includes(a.trim()) || a.trim().includes(answer))
    games.delete(sender)
    return await sendMessage(sock, sender, correct
      ? `☩━━━〔 🔮 ✅ *CORRECT!* 〕━━━☩\n☠\n⛧  🎉 Bonne réponse: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      : `☩━━━〔 🔮 ❌ *FAUX!* 〕━━━☩\n☠\n⛧  La réponse était: *${g.q.a}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const q = QAS[Math.floor(Math.random()*QAS.length)]
  games.set(sender, { q })
  setTimeout(() => games.delete(sender), 60000)
  await sendMessage(sock, sender, `☩━━━〔 🔮 *RIDDLE2* 〕━━━☩\n☠\n⛧  ❓ ${q.q}\n☠\n✝  ${prefix}riddle2 <réponse> (60s)\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}