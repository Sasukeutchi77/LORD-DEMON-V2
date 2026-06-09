// commands/regles.js — RÈGLES 📋
import { sendMessage } from '../lib/sendMessage.js'
import { groupSettingsDb } from '../lib/database.js'
export default async function regles(sock, sender, args, msg) {
  try {
  const groupId = msg.key.remoteJid
  const settings = groupSettingsDb.get(groupId)
  const rules = settings?.rules
  if (!rules) {
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   📋 RÈGLES DU GROUPE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n1️⃣ Respectez tous les membres\n2️⃣ Pas de spam ni de flood\n3️⃣ Pas de liens sans permission\n4️⃣ Restez dans le sujet du groupe\n5️⃣ Obéissez aux admins\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
  await sendMessage(sock, sender, `📋 *Règles du groupe:*\n${rules}`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}