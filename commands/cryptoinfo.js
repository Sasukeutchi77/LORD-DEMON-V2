import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["₿ Bitcoin — 2009, Satoshi, 21M max, proof-of-work, réserve valeur","💻 Ethereum — 2015, smart contracts, DeFi, proof-of-stake depuis 2022","💎 BNB — Binance Coin, réductions frais, Binance Smart Chain","🔵 Solana — 65 000 TPS, rapide, écosystème NFT/DeFi croissant","🌊 XRP (Ripple) — Transferts internationaux rapides, banques","🔗 Chainlink — Oracle, connecte blockchain aux données réelles","🌟 Polygon (MATIC) — Couche 2 Ethereum, rapide, moins cher","💰 Stablecoins — USDT/USDC indexés dollar, stabilité relative","📊 DeFi — Finance décentralisée, 50Mrd$ bloqués, sans banque","🖼️ NFT — Token non-fongible, art numérique, propriété blockchain"]
export default async function cryptoinfo(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 ₿ *CRYPTOINFO* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}