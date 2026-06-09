import { sendMessage } from '../lib/sendMessage.js'
const timers = new Map()
export default async function timer2(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const sub = args[0]?.toLowerCase()
  const key = sender
  if (sub === 'stop') { clearTimeout(timers.get(key)); timers.delete(key); return await sendMessage(sock, sender, '🛑 Timer arrêté.') }
  const mins = parseFloat(args[0])
  if (!mins || mins <= 0 || mins > 60) return await sendMessage(sock, sender, `☩━━━〔 ⏱️ *TIMER* 〕━━━☩\n☠\n⛧  Usage: ${prefix}timer2 <minutes> (max 60)\n☠  ${prefix}timer2 stop — pour annuler\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const label = args.slice(1).join(' ') || 'Timer'
  const t = setTimeout(async () => { timers.delete(key); await sendMessage(sock, sender, `☩━━━〔 ⏰ *TIMER TERMINÉ* 〕━━━☩\n☠\n⛧  ⏰ *${label}* — ${mins} min écoulées!\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`) }, mins * 60000)
  timers.set(key, t)
  await sendMessage(sock, sender, `☩━━━〔 ⏱️ *TIMER LANCÉ* 〕━━━☩\n☠\n⛧  🎯 *${label}*\n☠  ⏳ Durée: ${mins} minute(s)\n✝  Je t'avertirai dans ${mins} min!\n☠  ${prefix}timer2 stop pour annuler\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}