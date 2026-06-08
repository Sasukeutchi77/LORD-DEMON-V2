// commands/wikipedia.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  RECHERCHE WIKIPEDIA — FR & EN                      ║
// ║  Résumé, description, lien vers l'article           ║
// ║  Gratuit, sans clé API                              ║
// ╚══════════════════════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'

async function searchAndFetch(query, lang) {
  // Essai direct
  const directUrl = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
  const directRes = await fetch(directUrl, { headers: { 'Accept': 'application/json' }, signal: AbortSignal.timeout(12000) })

  if (directRes.ok) return await directRes.json()

  // Fallback: recherche via opensearch
  const searchRes = await fetch(
    `https://${lang}.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=1&format=json`,
    { signal: AbortSignal.timeout(10000) }
  )
  const [, titles] = await searchRes.json()
  if (!titles || !titles.length) throw new Error(`Aucun résultat pour "${query}"`)

  const pageRes = await fetch(
    `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titles[0])}`,
    { headers: { 'Accept': 'application/json' }, signal: AbortSignal.timeout(12000) }
  )
  if (!pageRes.ok) throw new Error('Page introuvable.')
  return await pageRes.json()
}

function buildMessage(data, prefix) {
  const title       = data.title || 'Inconnu'
  const description = data.description || ''
  const extract     = (data.extract || 'Aucun résumé disponible.').replace(/\n+/g, ' ').trim()
  const truncated   = extract.length > 700 ? extract.slice(0, 700) + '...' : extract
  const pageUrl     = data.content_urls?.desktop?.page || ''
  const type        = data.type === 'disambiguation' ? '⚠️ Page de désambiguïsation' : ''

  return (
    `☩━━━〔 📚 *WIKIPEDIA* 〕━━━☩\n` +
    `☠\n` +
    `⛧  📖 *${title}*\n` +
    (description ? `☩  _${description}_\n` : '') +
    (type ? `✝  ${type}\n` : '') +
    `☠\n` +
    `${truncated}\n` +
    `☠\n` +
    (pageUrl ? `⛧  🔗 ${pageUrl}\n` : '') +
    `☠\n` +
    `✝  💡 ${prefix}wikipedia <sujet> --en (anglais)\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}

export default async function wikipedia(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX || '.'

  if (!args.length) {
    return await sendMessage(sock, sender,
      `☩━━━〔 📚 *WIKIPEDIA DÉMON* 〕━━━☩\n` +
      `☠\n` +
      `⛧  💡 *Usage:* ${prefix}wikipedia <sujet>\n` +
      `☠\n` +
      `✝  📌 *Exemples:*\n` +
      `☠  ${prefix}wikipedia intelligence artificielle\n` +
      `⛧  ${prefix}wikipedia Elon Musk\n` +
      `☩  ${prefix}wikipedia Python --en (en anglais)\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const useEnglish = args.includes('--en')
  const lang       = useEnglish ? 'en' : 'fr'
  const query      = args.filter(a => a !== '--en').join(' ').trim()

  if (!query) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *SUJET MANQUANT* 〕━━━☩\n☠\n⛧  Précise le sujet à rechercher.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  let loadKey = null
  try {
    loadKey = await showProgressLoader(sock, sender, '📚 RECHERCHE WIKIPEDIA')
    const data = await searchAndFetch(query, lang)
    await deleteLoader(sock, sender, loadKey)
    loadKey = null
    await sendMessage(sock, sender, buildMessage(data, prefix))
  } catch (e) {
    if (loadKey) await deleteLoader(sock, sender, loadKey)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *INTROUVABLE* 〕━━━☩\n` +
      `☠\n` +
      `⛧  ⚠️ ${e.message.slice(0, 120)}\n` +
      `☠  💡 Essaie un terme différent ou ajoute --en.\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}
