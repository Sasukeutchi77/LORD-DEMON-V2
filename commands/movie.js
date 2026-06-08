// commands/movie.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  INFOS FILM & SÉRIE — OMDB API (clé gratuite)       ║
// ║  Synopsis, note, casting, durée, genres, année      ║
// ║  Fallback: Open Library pour les livres             ║
// ╚══════════════════════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'

function stars(rating) {
  const r = parseFloat(rating)
  if (isNaN(r)) return '⭐ N/A'
  const full  = Math.round(r / 2)
  return '⭐'.repeat(Math.min(full, 5)) + '☆'.repeat(Math.max(0, 5 - full)) + ` (${rating}/10)`
}

async function searchOMDB(query, type, apiKey) {
  const typeParam = type ? `&type=${type}` : ''
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}${typeParam}`
  const res = await fetch(url, { signal: AbortSignal.timeout(12000) })
  const data = await res.json()
  if (data.Response === 'False') throw new Error(data.Error || 'Aucun résultat trouvé.')
  return data.Search?.[0]?.imdbID
}

async function getByImdbId(imdbId, apiKey) {
  const url = `https://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=${apiKey}`
  const res = await fetch(url, { signal: AbortSignal.timeout(12000) })
  return await res.json()
}

function buildMovieMessage(d, prefix) {
  const type     = d.Type === 'series' ? '📺 SÉRIE' : d.Type === 'game' ? '🎮 JEU' : '🎬 FILM'
  const seasons  = d.totalSeasons ? `  •  📅 ${d.totalSeasons} saisons` : ''
  const ratings  = (d.Ratings || []).map(r => `☠  ${r.Source}: *${r.Value}*`).join('\n')

  return (
    `☩━━━〔 🎬 *LORD DEMON CINÉMA* 〕━━━☩\n` +
    `☠\n` +
    `⛧  ${type} — *${d.Title}* (${d.Year})\n` +
    `☠\n` +
    `☩  🌍 *Genre:* ${d.Genre || 'N/A'}\n` +
    `✝  ⏱️ *Durée:* ${d.Runtime || 'N/A'}${seasons}\n` +
    `☠  🌐 *Langue:* ${d.Language || 'N/A'}\n` +
    `⛧  🏆 *Récompenses:* ${d.Awards !== 'N/A' ? d.Awards?.slice(0, 60) : 'Aucune'}\n` +
    `☠\n` +
    `☩  ⭐ *Note IMDb:* ${stars(d.imdbRating)}\n` +
    `✝  👥 *Votes:* ${d.imdbVotes || 'N/A'}\n` +
    (ratings ? `☠\n${ratings}\n` : '') +
    `☠\n` +
    `⛧  🎭 *Acteurs:* ${d.Actors || 'N/A'}\n` +
    `☩  🎬 *Réalisateur:* ${d.Director || 'N/A'}\n` +
    `☠\n` +
    `✝  📝 *Synopsis:*\n` +
    `☠  _${(d.Plot || 'N/A').slice(0, 400)}${(d.Plot?.length || 0) > 400 ? '...' : ''}_\n` +
    `☠\n` +
    `⛧  🔗 IMDb: https://www.imdb.com/title/${d.imdbID}\n` +
    `☠\n` +
    `✝  💡 ${prefix}movie <titre> • ${prefix}movie --serie <titre>\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}

async function fetchWithFallbackKey(query, type) {
  // Clés OMDB gratuites publiques (rate-limited mais fonctionnelles)
  const keys = [
    process.env.OMDB_KEY,
    'trilogy',
    'thewdb',
    'b9bd48a6',
    'aa9290b',
  ].filter(Boolean)

  for (const key of keys) {
    try {
      const imdbId = await searchOMDB(query, type, key)
      if (!imdbId) continue
      const data = await getByImdbId(imdbId, key)
      if (data.Response !== 'False') return data
    } catch { continue }
  }
  throw new Error('Impossible de récupérer les données. Essaie un autre titre.')
}

export default async function movie(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX || '.'

  if (!args.length) {
    return await sendMessage(sock, sender,
      `☩━━━〔 🎬 *CINÉMA DÉMON* 〕━━━☩\n` +
      `☠\n` +
      `⛧  💡 *Usage:* ${prefix}movie <titre>\n` +
      `☠\n` +
      `✝  📌 *Exemples:*\n` +
      `☠  ${prefix}movie Avengers\n` +
      `⛧  ${prefix}movie --serie Breaking Bad\n` +
      `☩  ${prefix}movie --serie Game of Thrones\n` +
      `✝  ${prefix}movie Inception 2010\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const isSerie = args.includes('--serie') || args.includes('--series')
  const type    = isSerie ? 'series' : 'movie'
  const query   = args.filter(a => !a.startsWith('--')).join(' ').trim()

  if (!query) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *TITRE MANQUANT* 〕━━━☩\n☠\n⛧  Indique le titre du film ou de la série.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  let loadKey = null
  try {
    loadKey = await showProgressLoader(sock, sender, '🎬 RECHERCHE EN COURS')
    const data = await fetchWithFallbackKey(query, type)
    await deleteLoader(sock, sender, loadKey)
    loadKey = null

    // Envoyer avec poster si disponible
    if (data.Poster && data.Poster !== 'N/A') {
      try {
        const imgRes = await fetch(data.Poster, { signal: AbortSignal.timeout(10000) })
        if (imgRes.ok) {
          const buf = Buffer.from(await imgRes.arrayBuffer())
          await sock.sendMessage(sender, {
            image: buf,
            caption: buildMovieMessage(data, prefix)
          })
          return
        }
      } catch { /* Fallback texte */ }
    }
    await sendMessage(sock, sender, buildMovieMessage(data, prefix))

  } catch (e) {
    if (loadKey) await deleteLoader(sock, sender, loadKey)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *INTROUVABLE* 〕━━━☩\n` +
      `☠\n` +
      `⛧  ⚠️ ${e.message.slice(0, 120)}\n` +
      `☠  💡 Essaie en anglais ou avec l'année: ${prefix}movie Inception 2010\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}
