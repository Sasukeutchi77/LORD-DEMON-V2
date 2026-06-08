// commands/google.js — RECHERCHE GOOGLE/DDGO 🔍
import { sendMessage } from '../lib/sendMessage.js'
import fetch from 'node-fetch'

export default async function google(sock, sender, args, msg) {
  if (!args.length) {
    return sendMessage(sock, sender,
      `☩━━━〔 🔍 *RECHERCHE WEB* 〕━━━☩\n` +
      `⛧ Usage: \`.google <recherche>\`\n` +
      `⛧ Ex: \`.google météo Paris\`\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const query = args.join(' ')
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 10000 })
    const data = await res.json()

    let text = `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🔍 *RÉSULTATS: ${query}*\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n`

    if (data.AbstractText) {
      text += `📖 *Réponse directe:*\n${data.AbstractText.slice(0, 500)}\n`
      if (data.AbstractURL) text += `🔗 ${data.AbstractURL}\n`
    }

    if (data.RelatedTopics?.length > 0) {
      const topics = data.RelatedTopics.slice(0, 5).filter(t => t.Text)
      if (topics.length) {
        text += `\n☩━━━〔 📌 *RÉSULTATS LIÉS* 〕━━━☩\n`
        topics.forEach((t, i) => {
          text += `\n${i + 1}. ${t.Text.slice(0, 150)}${t.Text.length > 150 ? '...' : ''}\n`
          if (t.FirstURL) text += `   🔗 ${t.FirstURL}\n`
        })
      }
    }

    if (data.Answer) text += `\n💡 *Réponse rapide:* ${data.Answer}\n`
    if (!data.AbstractText && !data.RelatedTopics?.length && !data.Answer) {
      text += `☠ Aucun résultat trouvé pour: *${query}*\n💡 Essayez d'affiner votre recherche.`
    }

    text += `\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    await sendMessage(sock, sender, text)
  } catch (e) {
    await sendMessage(sock, sender, `☠ Erreur de recherche: ${e.message}`)
  }
}
