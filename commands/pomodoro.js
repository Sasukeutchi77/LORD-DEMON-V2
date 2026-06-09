import { sendMessage } from '../lib/sendMessage.js'
const sessions = new Map()
export default async function pomodoro(sock, sender, args, msg, ctx) {
  try {
  const prefix = process.env.PREFIX||'.'
  const sub = args[0]?.toLowerCase()
  if (sub==='stop') { const s=sessions.get(sender); if(s){clearTimeout(s.t);sessions.delete(sender)}; return await sendMessage(sock,sender,'🛑 Pomodoro arrêté!') }
  const work = parseInt(args[0])||25, rest = parseInt(args[1])||5
  const label = args.slice(2).join(' ')||'Focus'
  await sendMessage(sock, sender, `🍅 Pomodoro *${label}* lancé! ${work}min travail + ${rest}min pause. Allez!\n${prefix}pomodoro stop pour annuler`)
  const t = setTimeout(async()=>{
    const s=sessions.get(sender)||{count:0}; s.count++;
    await sendMessage(sock,sender,`☩━━━〔 🍅 *PAUSE MÉRITÉE!* 〕━━━☩\n☠\n⛧  ✅ ${work}min terminées! Pomodoro #${s.count}\n☠  🧘 Repose-toi ${rest}min. Bien mérité!\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    const t2=setTimeout(()=>{ sessions.delete(sender); sendMessage(sock,sender,`🍅 Pause terminée! Lance: ${prefix}pomodoro`) },rest*60000)
    sessions.set(sender,{...s,t:t2})
  }, work*60000)
  sessions.set(sender,{t,count:(sessions.get(sender)||{count:0}).count})

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}