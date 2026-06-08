// commands/news.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  ACTUALITÉS EN TEMPS RÉEL — Reddit RSS              ║
// ║  Catégories: monde, tech, crypto, sport, africa...  ║
// ║  Gratuit, sans clé API                              ║
// ╚══════════════════════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'

const CATEGORIES = {
  monde:   { sub: 'worldnews',       label: '🌍 MONDE' },
  world:   { sub: 'worldnews',       label: '🌍 MONDE' },
  tech:    { sub: 'technology',      label: '💻 TECH' },
  technologie: { sub: 'technology',  label: '💻 TECH' },
  crypto:  { sub: 'CryptoCurrency',  label: '₿ CRYPTO' },
  sport:   { sub: 'sports',          label: '⚽ SPORT' },
  sports:  { sub: 'sports',          label: '⚽ SPORT' },
  france:  { sub: 'france',          label: '🇫🇷 FRANCE' },
  africa:  { sub: 'africa',          label: '🌍 AFRIQUE' },
  afrique: { sub: 'africa',          label: '🌍 AFRIQUE' },
  science: { sub: 'science',         label: '🔬 SCIENCE' },
  gaming:  { sub: 'gaming',          label: '🎮 GAMING' },
  jeux:    { sub: 'gaming',          label: '🎮 GAMING' },
  ia:      { sub: 'artificial',      label: '🤖 IA' },
  music:   { sub: 'Music',           label: '🎵 MUSIQUE' },
  musique: { sub: 'Music',           label: '🎵 MUSIQUE' },
  finance: { sub: 'finance',         label: '💰 FINANCE' },
}

export default async function news(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX || '.'

  if (!args.length || args[0] === 'help') {
    return await sendMessage(sock, sender,
      `☩━━━〔 📰 *NEWS DÉMON* 〕━━━☩\n` +
      `☠\n` +
      `⛧  💡 *Usage:* ${prefix}news <catégorie>\n` +
      `☠\n` +
      `✝  📋 *Catégories disponibles:*\n` +
      `☠  🌍 monde  |  💻 tech\n` +
      `⛧  ₿ crypto  |  ⚽ sport\n` +
      `☩  🇫🇷 france |  🌍 afrique\n` +
      `✝  🔬 science |  🎮 gaming\n` +
      `☠  🤖 ia      |  💰 finance\n` +
      `⛧  🎵 musique\n` +
      `☠\n` +
      `☩  📌 *Exemple:* ${prefix}news tech\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const cat    = args[0].toLowerCase()
  const config = CATEGORIES[cat]

  if (!config) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *CATÉGORIE INCONNUE* 〕━━━☩\n` +
      `☠\n⛧  "${cat}" non reconnu.\n☠  💡 Tape ${prefix}news pour voir la liste.\n☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  let loadKey = null
  try {
    loadKey = await showProgressLoader(sock, sender, '📰 CHARGEMENT ACTUALITÉS')

    const url = `https://www.reddit.com/r/${config.sub}/top.json?limit=7&t=day`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'LordDemonBot/2.0' },
      signal: AbortSignal.timeout(15000)
    })
    if (!res.ok) throw new Error(`Erreur Reddit: ${res.status}`)

    const data  = await res.json()
    const posts = (data?.data?.children || [])
      .map(c => c.data)
      .filter(p => !p.is_self && p.title)
      .slice(0, 6)

    if (!posts.length) throw new Error('Aucune actualité disponible pour le moment.')

    await deleteLoader(sock, sender, loadKey)
    loadKey = null

    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    let text   = `☩━━━〔 📰 *NEWS — ${config.label}* 〕━━━☩\n☠\n`

    posts.forEach((post, i) => {
      const title = post.title.length > 130 ? post.title.slice(0, 130) + '...' : post.title
      const score = post.score >= 1000 ? `${(post.score / 1000).toFixed(1)}k` : String(post.score)
      text +=
        `⛧  *${i + 1}.* ${title}\n` +
        `☩  ⬆️ ${score}  💬 ${post.num_comments} commentaires\n` +
        `☠\n`
    })

    text +=
      `✝  🕐 ${time}  •  r/${config.sub}\n` +
      `☠  📌 Source: Reddit\n` +
      `⛧  💡 ${prefix}news <monde|tech|crypto|sport>\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

    await sendMessage(sock, sender, text)

  } catch (e) {
    if (loadKey) await deleteLoader(sock, sender, loadKey)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *ERREUR NEWS* 〕━━━☩\n☠\n⛧  ⚠️ ${e.message.slice(0, 120)}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}
