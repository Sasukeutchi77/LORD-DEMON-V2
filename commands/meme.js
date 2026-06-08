// commands/meme.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  MÈMES ALÉATOIRES — Reddit (sans clé API)           ║
// ║  Catégories: fr, gaming, anime, sport, dark, dev    ║
// ╚══════════════════════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'

const SUBS = {
  fr:       ['dankmemes_fr', 'france', 'rance'],
  gaming:   ['gaming', 'gamingmemes', 'pcmasterrace'],
  anime:    ['animemes', 'anime_irl', 'goodanimemes'],
  sport:    ['sportsmemes', 'nba', 'soccer'],
  dark:     ['darkhumor', 'dankchristianmemes'],
  dev:      ['ProgrammerHumor', 'webdev', 'linuxmemes'],
  random:   ['dankmemes', 'memes', 'me_irl', 'AdviceAnimals'],
  afrique:  ['africa', 'memes'],
}

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

function isImage(url) {
  return url && IMAGE_EXTS.some(e => url.toLowerCase().split('?')[0].endsWith(e))
}

async function fetchMeme(sub) {
  const url = `https://www.reddit.com/r/${sub}/hot.json?limit=30`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'LordDemonBot/2.0' },
    signal: AbortSignal.timeout(12000)
  })
  if (!res.ok) throw new Error(`Reddit r/${sub}: ${res.status}`)
  const data  = await res.json()
  const posts = (data?.data?.children || [])
    .map(c => c.data)
    .filter(p => !p.over_18 && !p.is_self && isImage(p.url))
  if (!posts.length) throw new Error(`Aucun mème trouvé sur r/${sub}`)
  return posts[Math.floor(Math.random() * Math.min(posts.length, 15))]
}

export default async function meme(sock, sender, args, msg, ctx) {
  const prefix   = process.env.PREFIX || '.'
  const category = args[0]?.toLowerCase() || 'random'

  if (category === 'help' || category === 'liste') {
    return await sendMessage(sock, sender,
      `☩━━━〔 😂 *MÈME DÉMON* 〕━━━☩\n` +
      `☠\n` +
      `⛧  💡 *Usage:* ${prefix}meme [catégorie]\n` +
      `☠\n` +
      `✝  📋 *Catégories:*\n` +
      `☠  😂 random  (défaut)\n` +
      `⛧  🇫🇷 fr\n` +
      `☩  🎮 gaming\n` +
      `✝  🍙 anime\n` +
      `☠  ⚽ sport\n` +
      `⛧  💻 dev\n` +
      `☩  🌍 afrique\n` +
      `✝  🖤 dark\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const subs = SUBS[category] || SUBS.random
  let loadKey = null

  try {
    loadKey = await showProgressLoader(sock, sender, '😂 CHARGEMENT MÈME')

    // Essaie chaque subreddit de la catégorie jusqu'à succès
    let post = null
    for (const sub of subs) {
      try { post = await fetchMeme(sub); break } catch { continue }
    }
    if (!post) throw new Error('Aucun mème disponible pour le moment.')

    const imgRes = await fetch(post.url, { signal: AbortSignal.timeout(15000) })
    if (!imgRes.ok) throw new Error(`Image inaccessible: ${imgRes.status}`)
    const buf  = Buffer.from(await imgRes.arrayBuffer())

    await deleteLoader(sock, sender, loadKey)
    loadKey = null

    const score = post.score >= 1000 ? `${(post.score / 1000).toFixed(1)}k` : String(post.score)
    const caption =
      `☩━━━〔 😂 *MÈME DÉMON* 〕━━━☩\n` +
      `☠\n` +
      `⛧  📝 ${post.title.slice(0, 120)}\n` +
      `☠\n` +
      `☩  ⬆️ ${score}  💬 ${post.num_comments}  •  r/${post.subreddit}\n` +
      `☠\n` +
      `✝  💡 ${prefix}meme ${category} — pour un autre\n` +
      `☠  ${prefix}meme help — pour les catégories\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

    const msgType = post.url.endsWith('.gif') ? 'video' : 'image'
    if (msgType === 'image') {
      await sock.sendMessage(sender, { image: buf, caption })
    } else {
      await sock.sendMessage(sender, { video: buf, caption, gifPlayback: true })
    }

  } catch (e) {
    if (loadKey) await deleteLoader(sock, sender, loadKey)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *ERREUR MÈME* 〕━━━☩\n☠\n⛧  ⚠️ ${e.message.slice(0, 120)}\n☠  Réessaie ou change de catégorie.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}
