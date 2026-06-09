// commands/toxicite.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const LEVELS = ["Niveau Tchernobyl ☢️","Très toxique","Toxique modéré","Neutre","Gentil","Pur et innocent ✨"]

export default async function toxicite(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const num = Math.floor(Math.random() * 101)
  const idx = Math.floor((100 - num) / (100 / LEVELS.length))
  const level = LEVELS[Math.min(idx, LEVELS.length - 1)]
  const bar = '█'.repeat(Math.floor(num / 10)) + '░'.repeat(10 - Math.floor(num / 10))
  const mentions = target !== jid ? [target] : []
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☢️ TOXICITÉ   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n👤 @${target.split('@')[0]}\n\n[${bar}] ${num}%\n\n✨ ${level}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
    mentions.length ? { mentions } : undefined
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}