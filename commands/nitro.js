import { sendMessage } from '../lib/sendMessage.js'

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function code(length) {
  return Array.from({ length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
}

export default async function nitro(sock, sender) {
  try {
  const gift = `discord.gift/${code(16)}`
  const card = `${code(4)}-${code(4)}-${code(4)}-${code(4)}`

  await sendMessage(sock, sender,
    `☩━━━〔 💎 *NITRO DROP* 〕━━━☩\n` +
    `⛧ 🎁 Lien Nitro: ${gift}\n` +
    `☩ 💳 Carte cadeau: ${card}\n` +
    `✝ ⏳ Expire dans: ${Math.floor(Math.random() * 9) + 1} minutes\n` +
    `☠\n` +
    `⛧ 😈 Faux cadeau généré par LORD DEMON.\n` +
    `☩ Si quelqu'un court dessus, le Démon a gagné.\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}