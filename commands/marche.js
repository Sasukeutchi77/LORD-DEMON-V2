// commands/marche.js — MARCHE
import { sendMessage } from '../lib/sendMessage.js'
import { SHOP_ITEMS } from '../lib/economySystem.js'

export default async function marche(sock, sender, args, msg) {
  const lines = Object.entries(SHOP_ITEMS).map(([id, item]) => '⛧ ' + item.name + ' — *' + item.price + ' 🪙*\n   ' + item.desc).join('\n')
  await sendMessage(sock, sender,
    '†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🏪 MARCHE DU DEMON   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n' +
    lines + '\n\n💡 .shop acheter <id> pour acheter\n' +
    '⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸'
  )
}
