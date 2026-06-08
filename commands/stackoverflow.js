// commands/stackoverflow.js — RECHERCHE STACKOVERFLOW 💻
import { sendMessage } from '../lib/sendMessage.js'
import fetch from 'node-fetch'

export default async function stackoverflow(sock, sender, args, msg) {
  if (!args.length) {
    return sendMessage(sock, sender,
      `☩━━━〔 💻 *STACKOVERFLOW* 〕━━━☩\n` +
      `⛧ Usage: \`.stackoverflow <question>\`\n` +
      `⛧ Ex: \`.stackoverflow how to read file nodejs\`\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const query = args.join(' ')
  try {
    const url = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&q=${encodeURIComponent(query)}&site=stackoverflow&filter=withbody&pagesize=3`
    const res = await fetch(url, { timeout: 10000 })
    const data = await res.json()
    const items = data.items || []

    if (!items.length) return sendMessage(sock, sender, `☠ Aucun résultat pour: *${query}*`)

    let text = `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   💻 *STACKOVERFLOW*             ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n`
    text += `🔍 Recherche: *${query}*\n\n`

    items.forEach((item, i) => {
      text += `${i + 1}. *${item.title}*\n`
      text += `   👍 ${item.score} votes | ${item.is_answered ? '✅ Répondu' : '❓ Non répondu'}\n`
      text += `   🔗 ${item.link}\n\n`
    })

    text += `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    await sendMessage(sock, sender, text)
  } catch (e) {
    await sendMessage(sock, sender, `☠ Erreur: ${e.message}`)
  }
}
