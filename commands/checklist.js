import { sendMessage } from '../lib/sendMessage.js'
const lists = new Map()
export default async function checklist(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const sub = args[0]?.toLowerCase()
  const key = sender
  if (!lists.has(key)) lists.set(key, [])
  const list = lists.get(key)
  if (sub === 'add' || sub === 'ajouter') { const item = args.slice(1).join(' '); if(!item) return await sendMessage(sock,sender,`Usage: ${prefix}checklist add <tâche>`); list.push({text:item,done:false}); return await sendMessage(sock,sender,`✅ *${item}* ajouté à ta checklist!`) }
  if (sub === 'done' || sub === 'fait') { const idx = parseInt(args[1])-1; if(isNaN(idx)||!list[idx]) return await sendMessage(sock,sender,'☠ Numéro invalide'); list[idx].done=true; return await sendMessage(sock,sender,`✅ *${list[idx].text}* — Marqué comme fait!`) }
  if (sub === 'clear' || sub === 'vider') { lists.set(key,[]); return await sendMessage(sock,sender,'🗑️ Checklist vidée!') }
  if (sub === 'delete' || sub === 'sup') { const idx = parseInt(args[1])-1; if(isNaN(idx)||!list[idx]) return await sendMessage(sock,sender,'☠ Numéro invalide'); const removed = list.splice(idx,1); return await sendMessage(sock,sender,`🗑️ *${removed[0].text}* supprimé!`) }
  if (!list.length) return await sendMessage(sock,sender,`☩━━━〔 ✅ *CHECKLIST* 〕━━━☩\n☠\n⛧  Ta checklist est vide.\n✝  ${prefix}checklist add <tâche>\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const lines = list.map((i,n)=>`${i.done?'✅':'⬜'} ${n+1}. ${i.text}`).join('\n')
  const done = list.filter(i=>i.done).length
  await sendMessage(sock,sender,`☩━━━〔 ✅ *CHECKLIST* (${done}/${list.length}) 〕━━━☩\n☠\n${lines}\n☠\n⛧  ${prefix}checklist add/done/delete/clear\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}