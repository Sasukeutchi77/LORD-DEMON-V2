// commands/coins.js — PORTEFEUILLE 🪙
import { sendMessage } from '../lib/sendMessage.js'
import { economyDb, JOBS } from '../lib/economySystem.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function coins(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const e = economyDb.ensure(jid)
  const inv = economyDb.getInventory(jid)
  const itemCount = Object.values(inv).reduce((s, v) => s + v, 0)
  const job = e.job ? (JOBS[e.job] || null) : null
  const total = (e.coins || 0) + (e.bank || 0)

  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🪙 *PORTEFEUILLE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☩━━━〔 💰 *FINANCES* 〕━━━☩\n` +
    `⛧  💵 En poche:  *${e.coins || 0} 🪙*\n` +
    `☩  🏦 En banque: *${e.bank || 0} / ${e.bank_capacity || 5000} 🪙*\n` +
    `✝  💎 Total:     *${total} 🪙*\n` +
    `☠  📈 Total gagné: *${e.total_earned || 0} 🪙*\n\n` +
    `☩━━━〔 💼 *TRAVAIL* 〕━━━☩\n` +
    `${job ? `⛧  ${job.emoji} Métier: *${job.name}*\n☩  XP métier: ${e.job_xp || 0}` : `⛧  Aucun métier — \`.job liste\``}\n\n` +
    `☩━━━〔 🎒 *INVENTAIRE* 〕━━━☩\n` +
    `⛧  ${itemCount > 0 ? `${itemCount} objets` : 'Vide'} — \`.shop inventaire\`\n\n` +
    `💡 \`.bank\` — banque | \`.shop\` — boutique | \`.job\` — métier\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
