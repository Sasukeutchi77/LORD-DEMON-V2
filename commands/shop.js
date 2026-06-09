// commands/shop.js — BOUTIQUE 🛒
import { sendMessage } from '../lib/sendMessage.js'
import { economyDb, SHOP_ITEMS } from '../lib/economySystem.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function shop(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const sub = args[0]?.toLowerCase()

  if (!sub || sub === 'liste' || sub === 'list') {
    const lines = Object.entries(SHOP_ITEMS).map(([id, item]) =>
      `⛧ \`${id}\` — ${item.name} — *${item.price} 🪙*\n   └ ${item.desc}`
    ).join('\n')
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🛒 *BOUTIQUE DÉMONIAQUE*       ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${lines}\n\n` +
      `💡 \`.shop acheter <id>\` pour acheter\n` +
      `📦 \`.shop inventaire\` pour voir vos objets\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  if (sub === 'inventaire' || sub === 'inv') {
    const inv = economyDb.getInventory(jid)
    const entries = Object.entries(inv).filter(([,v]) => v > 0)
    if (!entries.length) return sendMessage(sock, sender, `🎒 Votre inventaire est vide.\n💡 Achetez des objets avec \`.shop acheter <id>\``)
    const lines = entries.map(([id, qty]) => {
      const item = SHOP_ITEMS[id]
      return item ? `⛧ ${item.name} x${qty}` : `⛧ ${id} x${qty}`
    }).join('\n')
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🎒 *INVENTAIRE*                ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${lines}\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  if (sub === 'acheter' || sub === 'buy') {
    const itemId = args[1]?.toLowerCase()
    const item = SHOP_ITEMS[itemId]
    if (!item) return sendMessage(sock, sender, `☠ Objet *${itemId}* introuvable. Voir \`.shop liste\``)
    const e = economyDb.ensure(jid)
    if ((e.coins || 0) < item.price) {
      return sendMessage(sock, sender, `☠ Pas assez de 🪙 coins !\nPrix: ${item.price} 🪙 | Vous avez: ${e.coins || 0} 🪙`)
    }
    economyDb.removeCoins(jid, item.price)
    // Effets spéciaux
    if (itemId === 'capacite_banque') {
      const db = (await import('better-sqlite3')).default
      const path = (await import('path')).default
      const { fileURLToPath } = await import('url')
      const __dirname = path.dirname(fileURLToPath(import.meta.url))
      const dbConn = db(path.join(__dirname, '..', 'data', 'demon.db'))
      dbConn.prepare(`UPDATE economy SET bank_capacity = bank_capacity + 5000 WHERE jid = ?`).run(jid)
    } else if (itemId === 'pack_cartes') {
      const { cardDb } = await import('../lib/economySystem.js')
      const cards = cardDb.pull(jid, 5)
      await sendMessage(sock, sender, `🃏 Vous avez reçu 5 cartes ! Utilisez \`.card collection\` pour les voir.`)
    } else {
      economyDb.addItem(jid, itemId)
    }
    return sendMessage(sock, sender,
      `✅ *Achat réussi !*\n🛒 ${item.name}\n💸 -${item.price} 🪙\n💳 Solde restant: ${economyDb.get(jid).coins} 🪙`
    )
  }

  await sendMessage(sock, sender, `☠ Sous-commande inconnue. Tapez \`.shop\` pour l'aide.`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}