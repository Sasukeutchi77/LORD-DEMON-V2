import { sendMessage } from '../lib/sendMessage.js'
const sessions = new Map()
export default async function pomodoro(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const sub = args[0]?.toLowerCase()
  const key = sender
  if (sub === 'stop') { const s = sessions.get(key); if(s) { clearTimeout(s.t); sessions.delete(key) }; return await sendMessage(sock, sender, '🛑 Pomodoro arrêté.') }
  if (sub === 'stats') { const s = sessions.get(key) || { count: 0 }; return await sendMessage(sock, sender, `⏱️ Pomodoros complétés: *${s.count || 0}*`) }
  const work = parseInt(args[0]) || 25
  const rest = parseInt(args[1]) || 5
  const label = args.slice(2).join(' ') || 'Focus'
  await sendMessage(sock, sender, `☩━━━〔 🍅 *POMODORO* 〕━━━☩\n☠\n⛧  🎯 *${label}*\n☠  ⏱️ Travail: ${work} min | Pause: ${rest} min\n✝  C'est parti! Concentre-toi...\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const t = setTimeout(async () => { const s = sessions.get(key) || {}; s.count = (s.count||0)+1; sessions.set(key, {...s, t: setTimeout(async () => { sessions.delete(key); await sendMessage(sock, sender, `🍅 Pause terminée! Recommence: ${prefix}pomodoro`) }, rest*60000)}); await sendMessage(sock, sender, `☩━━━〔 🍅 *POMODORO — PAUSE!* 〕━━━☩\n☠\n⛧  ✅ *${work} min* de travail terminées!\n☠  🧘 Pause de ${rest} min. Détends-toi.\n✝  Pomodoro #${s.count} complété!\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`) }, work*60000)
  const existing = sessions.get(key) || {}
  sessions.set(key, { ...existing, t })
}