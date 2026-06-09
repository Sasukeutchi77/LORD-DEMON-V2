// commands/magie.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ITEMS = ["Ignis Supremus — Boule de feu !","Glacius Maximus — Blizzard !","Fulgur Eternum — Eclair divin !","Umbra Mortis — Ombre de mort !","Vita Plenissimus — Soin complet !","Chaos Infinitum — Explosion magique !","Nexus Temporis — Arret du temps !","Lux Aeterna — Lumiere eternelle !"]

export default async function cmd_magie(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const item = ITEMS[Math.floor(Math.random() * ITEMS.length)]
  await sendMessage(sock, sender,
    'X┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈X\n⛧   SORT LANCE   ☩\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' + item + '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    target !== jid ? { mentions: [target] } : undefined
  )
}
