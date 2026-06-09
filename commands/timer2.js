import { sendMessage } from '../lib/sendMessage.js'
const timers = new Map()
export default async function timer2(sock, sender, args, msg, ctx) {
  try {
  const prefix = process.env.PREFIX||'.'
  const sub = args[0]?.toLowerCase()
  if (sub === 'stop') { clearTimeout(timers.get(sender)); timers.delete(sender); return await sendMessage(sock, sender, '🛑 Timer annulé!') }
  const mins = parseFloat(args[0])
  if (!mins||mins<=0||mins>60) return await sendMessage(sock, sender, `☩━━━〔 ⏱️ *TIMER* 〕━━━☩\n☠\n⛧  ${prefix}timer2 <minutes> (max 60min)\n☠  ${prefix}timer2 stop — annuler\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const label = args.slice(1).join(' ')||'Timer'
  const t = setTimeout(async()=>{ timers.delete(sender); await sendMessage(sock,sender,`☩━━━〔 ⏰ *TIMER TERMINÉ!* 〕━━━☩\n☠\n⛧  ⏰ *${label}* — ${mins} min écoulées!\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`) }, mins*60000)
  timers.set(sender, t)
  await sendMessage(sock, sender, `⏱️ Timer *${label}* lancé pour *${mins}* minute(s)!`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}