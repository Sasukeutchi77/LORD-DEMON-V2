// commands/marche.js — MARCHE
import { sendMessage } from '../lib/sendMessage.js'
import { SHOP_ITEMS } from '../lib/economySystem.js'

export default async function marche(sock, sender, args, msg) {
  try {
  const lines = Object.entries(SHOP_ITEMS).map(([id, item]) => '⛧ ' + item.name + ' — *' + item.price + ' 🪙*\n   ' + item.desc).join('\n')
  await sendMessage(sock, sender,
    '†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🏪 MARCHE DU DEMON   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n' +
    lines + '\n\n💡 .shop acheter <id> pour acheter\n' +
    '⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸'
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}