// commands/bourse.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  COURS DE BOURSE EN TEMPS RÉEL — Yahoo Finance      ║
// ║  Actions, ETF, indices — gratuit sans clé API       ║
// ╚══════════════════════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'

const SYMBOLS_MAP = {
  apple: 'AAPL', aapl: 'AAPL',
  google: 'GOOGL', googl: 'GOOGL', alphabet: 'GOOGL',
  microsoft: 'MSFT', msft: 'MSFT',
  amazon: 'AMZN', amzn: 'AMZN',
  tesla: 'TSLA', tsla: 'TSLA',
  meta: 'META', facebook: 'META',
  nvidia: 'NVDA', nvda: 'NVDA',
  netflix: 'NFLX', nflx: 'NFLX',
  samsung: '005930.KS',
  sp500: '^GSPC', 'cac40': '^FCHI', dow: '^DJI', nasdaq: '^IXIC',
  or: 'GC=F', gold: 'GC=F',
  petrole: 'CL=F', oil: 'CL=F',
  euro: 'EURUSD=X', 'eur/usd': 'EURUSD=X',
}

const DEFAULT_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', '^GSPC', 'GC=F']

function fmtPrice(p, currency) {
  if (!p && p !== 0) return 'N/A'
  const sym = currency === 'EUR' ? '€' : '$'
  return `${sym}${p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function fmtChange(change, pct) {
  if (change == null) return 'N/A'
  const sign  = change >= 0 ? '+' : ''
  const emoji = change >= 2 ? '🚀' : change >= 0 ? '📈' : change > -2 ? '📉' : '💀'
  return `${emoji} ${sign}${change.toFixed(2)} (${sign}${pct?.toFixed(2) || 0}%)`
}

async function fetchYahooQuote(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' },
    signal: AbortSignal.timeout(12000)
  })
  if (!res.ok) throw new Error(`Yahoo Finance erreur: ${res.status}`)
  const data = await res.json()
  const meta = data?.chart?.result?.[0]?.meta
  if (!meta) throw new Error(`Données manquantes pour ${symbol}`)
  return meta
}

export default async function bourse(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX || '.'
  let loadKey  = null

  if (args[0] === 'help') {
    return await sendMessage(sock, sender,
      `☩━━━〔 📈 *BOURSE — AIDE* 〕━━━☩\n` +
      `☠\n` +
      `⛧  *Usage:* ${prefix}bourse [symboles]\n` +
      `☠\n` +
      `✝  📌 *Exemples:*\n` +
      `☠  ${prefix}bourse → top 7 par défaut\n` +
      `⛧  ${prefix}bourse apple tesla nvidia\n` +
      `☩  ${prefix}bourse AAPL MSFT GOOGL\n` +
      `✝  ${prefix}bourse or petrole euro\n` +
      `☠  ${prefix}bourse sp500 nasdaq cac40\n` +
      `☠\n` +
      `⛧  *Symboles supportés:*\n` +
      `☩  apple google microsoft amazon\n` +
      `✝  tesla meta nvidia netflix\n` +
      `☠  sp500 cac40 dow nasdaq\n` +
      `⛧  or gold petrole euro\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  try {
    loadKey = await showProgressLoader(sock, sender, '📈 CHARGEMENT BOURSE')

    let symbols
    if (args.length) {
      symbols = args.map(a => {
        const mapped = SYMBOLS_MAP[a.toLowerCase()]
        return mapped || a.toUpperCase()
      })
      symbols = [...new Set(symbols)].slice(0, 7)
    } else {
      symbols = DEFAULT_SYMBOLS
    }

    const results = await Promise.allSettled(symbols.map(s => fetchYahooQuote(s)))

    await deleteLoader(sock, sender, loadKey)
    loadKey = null

    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    let text   = `☩━━━〔 📈 *BOURSE DÉMON* 〕━━━☩\n☠\n`

    for (let i = 0; i < results.length; i++) {
      const r = results[i]
      if (r.status === 'rejected') {
        text += `⛧  *${symbols[i]}* — ⚠️ Erreur\n☠\n`
        continue
      }
      const m       = r.value
      const change  = (m.regularMarketPrice || 0) - (m.previousClose || m.chartPreviousClose || 0)
      const pct     = m.previousClose ? (change / m.previousClose) * 100 : 0
      const name    = m.shortName || m.symbol || symbols[i]

      text +=
        `⛧  *${m.symbol}* — ${name.slice(0, 25)}\n` +
        `☩  💵 *Prix:* ${fmtPrice(m.regularMarketPrice, m.currency)}\n` +
        `✝  ${fmtChange(change, pct)}\n` +
        `☠  📊 Haut: ${fmtPrice(m.regularMarketDayHigh, m.currency)} | Bas: ${fmtPrice(m.regularMarketDayLow, m.currency)}\n` +
        `☠\n`
    }

    text +=
      `✝  🕐 *Mis à jour:* ${time}\n` +
      `☠  📌 Source: Yahoo Finance\n` +
      `⛧  💡 ${prefix}bourse help pour la liste complète\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

    await sendMessage(sock, sender, text)

  } catch (e) {
    if (loadKey) await deleteLoader(sock, sender, loadKey)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *ERREUR BOURSE* 〕━━━☩\n☠\n⛧  ⚠️ ${e.message.slice(0, 120)}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}
