// commands/suggestion.js — BOÎTE À SUGGESTIONS 💡
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
export default async function suggestion(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const text = args.join(' ')
  if (!text) return sendMessage(sock, sender, '☠ Usage: .suggestion <votre suggestion>')
  await sendMessage(sock, sender,
    `✅ *Suggestion enregistrée !*\n\n💡 "${text}"\n\n📤 De: @${jid.split('@')[0']}\nMerci pour votre retour !`,
    { mentions: [jid] }
  )
}
