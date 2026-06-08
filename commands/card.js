// commands/card.js — CARTES À COLLECTIONNER 🃏
import { sendMessage } from '../lib/sendMessage.js'
import { cardDb, CARD_CATALOG, economyDb } from '../lib/economySystem.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const PULL_COOLDOWN = 30 * 60 * 1000 // 30 min
const lastPull = new Map()

export default async function card(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const sub = args[0]?.toLowerCase()

  if (!sub || sub === 'tirer' || sub === 'pull') {
    const now = Date.now()
    const last = lastPull.get(jid) || 0
    if (now - last < PULL_COOLDOWN) {
      const reste = Math.ceil((PULL_COOLDOWN - (now - last)) / 60000)
      return sendMessage(sock, sender, `⏳ Prochain tirage dans *${reste} minutes* !`)
    }
    lastPull.set(jid, now)
    const pulled = cardDb.pull(jid, 1)
    const cardData = CARD_CATALOG[pulled[0]]
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🃏 *TIRAGE DE CARTE*           ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${cardData.emoji} *${cardData.name}*\n` +
      `🏷️ Rareté: ${cardData.rarity}\n` +
      `⚡ Puissance: *${cardData.power}*\n\n` +
      `📦 Collection: ${cardDb.count(jid)}/${Object.keys(CARD_CATALOG).length} cartes\n` +
      `💡 \`.card collection\` pour voir toutes vos cartes\n` +
      `⏱️ Prochain tirage gratuit dans 30min\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  if (sub === 'collection' || sub === 'col') {
    const collection = cardDb.getCollection(jid)
    if (!collection.length) return sendMessage(sock, sender, `🃏 Aucune carte. Tirez avec \`.card\` !`)
    const byRarity = { l: [], e: [], r: [], c: [] }
    collection.forEach(({ card_id }) => {
      const prefix = card_id[0]
      if (byRarity[prefix]) byRarity[prefix].push(card_id)
    })
    const format = (ids, label) => ids.length ? `${label}\n${ids.map(id => `  ${CARD_CATALOG[id]?.emoji} ${CARD_CATALOG[id]?.name}`).join('\n')}` : ''
    const text = [
      format(byRarity.l, '🔴 *LÉGENDAIRES*'),
      format(byRarity.e, '🟣 *ÉPIQUES*'),
      format(byRarity.r, '🔵 *RARES*'),
      format(byRarity.c, '⚪ *COMMUNES*'),
    ].filter(Boolean).join('\n\n')
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🃏 *VOTRE COLLECTION*          ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${text}\n\n📊 ${collection.length}/${Object.keys(CARD_CATALOG).length} cartes\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  if (sub === 'top' || sub === 'classement') {
    return sendMessage(sock, sender,
      `🃏 *TOP COLLECTIONNEURS*\n💡 Utilisez \`.card collection\` pour voir votre collection !`
    )
  }

  await sendMessage(sock, sender,
    `🃏 *GUIDE CARTES*\n\`.card\` — Tirer une carte (30min cooldown)\n\`.card collection\` — Voir votre collection\n🛒 Achetez des packs avec \`.shop acheter pack_cartes\``
  )
}
