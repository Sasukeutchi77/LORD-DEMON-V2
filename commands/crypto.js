// commands/crypto.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  PRIX CRYPTOMONNAIES EN TEMPS RÉEL — CoinGecko      ║
// ║  Gratuit, sans clé API                              ║
// ║  Données: prix, variation 1h/24h/7j, market cap     ║
// ╚══════════════════════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'

const COIN_MAP = {
  btc: 'bitcoin',        bitcoin: 'bitcoin',
  eth: 'ethereum',       ethereum: 'ethereum',
  bnb: 'binancecoin',    binance: 'binancecoin',
  sol: 'solana',         solana: 'solana',
  xrp: 'ripple',         ripple: 'ripple',
  ada: 'cardano',        cardano: 'cardano',
  doge: 'dogecoin',      dogecoin: 'dogecoin',
  dot: 'polkadot',       polkadot: 'polkadot',
  matic: 'matic-network',polygon: 'matic-network',
  usdt: 'tether',        tether: 'tether',
  ltc: 'litecoin',       litecoin: 'litecoin',
  link: 'chainlink',     chainlink: 'chainlink',
  avax: 'avalanche-2',   avalanche: 'avalanche-2',
  shib: 'shiba-inu',     'shiba-inu': 'shiba-inu',
  ton: 'the-open-network',
  trx: 'tron',           tron: 'tron',
  usdc: 'usd-coin',
  near: 'near',
  apt: 'aptos',
  sui: 'sui',
}

const DEFAULT_IDS = ['bitcoin','ethereum','binancecoin','solana','ripple','dogecoin','the-open-network']

function fmtPrice(p) {
  if (p === null || p === undefined) return 'N/A'
  if (p >= 1) return `$${p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  return `$${p.toFixed(6)}`
}

function fmtChange(v) {
  if (v === null || v === undefined) return 'N/A'
  const sign  = v >= 0 ? '+' : ''
  const emoji = v >= 2 ? '🚀' : v >= 0 ? '📈' : v > -2 ? '📉' : '💀'
  return `${emoji} ${sign}${v.toFixed(2)}%`
}

function fmtCap(mc) {
  if (!mc) return 'N/A'
  if (mc >= 1e12) return `$${(mc / 1e12).toFixed(2)}T`
  if (mc >= 1e9)  return `$${(mc / 1e9).toFixed(2)}B`
  return `$${(mc / 1e6).toFixed(2)}M`
}

export default async function crypto(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX || '.'
  let loadKey  = null

  if (args[0] === 'help' || args[0] === '--help') {
    return await sendMessage(sock, sender,
      `☩━━━〔 📊 *CRYPTO DÉMON — AIDE* 〕━━━☩\n` +
      `☠\n` +
      `⛧  *Usage:* ${prefix}crypto [monnaies...]\n` +
      `☠\n` +
      `✝  📌 *Exemples:*\n` +
      `☠  ${prefix}crypto → top 7 par défaut\n` +
      `⛧  ${prefix}crypto btc eth sol\n` +
      `☩  ${prefix}crypto doge shib ton\n` +
      `☠\n` +
      `✝  🪙 *Codes supportés:*\n` +
      `☠  btc eth bnb sol xrp ada doge\n` +
      `⛧  dot matic usdt ltc link avax\n` +
      `☩  shib ton trx usdc near apt sui\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  try {
    loadKey = await showProgressLoader(sock, sender, '📊 CHARGEMENT CRYPTO')

    let ids
    if (args.length) {
      const mapped = args.map(a => COIN_MAP[a.toLowerCase()]).filter(Boolean)
      if (!mapped.length) throw new Error(`Code inconnu: ${args[0]}. Tape ${prefix}crypto help.`)
      ids = [...new Set(mapped)]
    } else {
      ids = DEFAULT_IDS
    }

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
    const res = await fetch(url, { headers: { 'Accept': 'application/json' }, signal: AbortSignal.timeout(15000) })
    if (!res.ok) throw new Error(`CoinGecko API: ${res.status}`)
    const coins = await res.json()
    if (!coins.length) throw new Error('Aucune donnée reçue.')

    await deleteLoader(sock, sender, loadKey)
    loadKey = null

    const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    let text = `☩━━━〔 📊 *CRYPTO DÉMON* 〕━━━☩\n☠\n`

    for (const c of coins) {
      const ch1h  = c.price_change_percentage_1h_in_currency
      const ch24h = c.price_change_percentage_24h
      const ch7d  = c.price_change_percentage_7d_in_currency

      text +=
        `⛧  *${c.symbol.toUpperCase()}* — ${c.name}\n` +
        `☩  💵 *Prix:* ${fmtPrice(c.current_price)}\n` +
        `✝  1h: ${fmtChange(ch1h)}  |  24h: ${fmtChange(ch24h)}\n` +
        `☠  7j: ${fmtChange(ch7d)}  |  Cap: ${fmtCap(c.market_cap)}\n` +
        `☠\n`
    }

    text +=
      `✝  🕐 *Mis à jour:* ${time}\n` +
      `☠  📌 Source: CoinGecko\n` +
      `⛧  💡 ${prefix}crypto btc eth sol\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

    await sendMessage(sock, sender, text)

  } catch (e) {
    if (loadKey) await deleteLoader(sock, sender, loadKey)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *ERREUR CRYPTO* 〕━━━☩\n☠\n⛧  ⚠️ ${e.message.slice(0, 120)}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}
