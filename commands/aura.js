// commands/aura.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const LEVELS = ["Aura dorée légendaire","Aura violette mystique","Aura bleue calme","Aura verte naturelle","Aura rouge explosive","Aura grise... 😐"]

export default async function aura(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const num = Math.floor(Math.random() * 101)
  const idx = Math.floor((100 - num) / (100 / LEVELS.length))
  const level = LEVELS[Math.min(idx, LEVELS.length - 1)]
  const bar = '█'.repeat(Math.floor(num / 10)) + '░'.repeat(10 - Math.floor(num / 10))
  const mentions = target !== jid ? [target] : []
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🌈 AURA   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n👤 @${target.split('@')[0]}\n\n[${bar}] ${num}%\n\n✨ ${level}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
    mentions.length ? { mentions } : undefined
  )
}
