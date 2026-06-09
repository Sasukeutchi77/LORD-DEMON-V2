import { sendMessage } from '../lib/sendMessage.js'
const lists = new Map()
export default async function checklist(sock, sender, args, msg, ctx = {}) {
  const sub = args[0]?.toLowerCase()
  const key = sender
  if (!sub || sub === 'help') {
    return sendMessage(sock, sender,
      `☩━━━〔 ✅ *CHECKLIST* 〕━━━☩\n\n` +
      `☠  .checklist add <tâche>\n` +
      `⛧  .checklist done <numéro>\n` +
      `✝  .checklist list\n` +
      `☩  .checklist clear\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  if (!lists.has(key)) lists.set(key, [])
  const list = lists.get(key)
  if (sub === 'add') {
    const task = args.slice(1).join(' ')
    if (!task) return sendMessage(sock, sender, `☠ Usage: .checklist add <tâche>`)
    list.push({ task, done: false })
    return sendMessage(sock, sender, `✅ Tâche ajoutée: "${task}" (#${list.length})`)
  }
  if (sub === 'done') {
    const idx = parseInt(args[1]) - 1
    if (isNaN(idx) || !list[idx]) return sendMessage(sock, sender, `☠ Numéro invalide.`)
    list[idx].done = true
    return sendMessage(sock, sender, `☑️ Tâche #${idx+1} marquée terminée !`)
  }
  if (sub === 'clear') { lists.set(key, []); return sendMessage(sock, sender, `🗑️ Checklist vidée.`) }
  if (sub === 'list') {
    if (!list.length) return sendMessage(sock, sender, `☠ Aucune tâche dans ta checklist.`)
    const items = list.map((t,i) => `${t.done ? '☑️' : '☐'} ${i+1}. ${t.task}`).join('\n')
    const done = list.filter(t=>t.done).length
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   ✅ *MA CHECKLIST*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${items}\n\n` +
      `☠  📊 *${done}/${list.length} tâches complétées*\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
