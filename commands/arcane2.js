import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const INVOCATIONS = [
  { nom: "Invocation des Ombres", effet: "Flammes démoniaques enveloppent la zone", puissance: "⭐⭐⭐⭐" },
  { nom: "Rituel du Sang", effet: "Pacte activé, puissance décuplée", puissance: "⭐⭐⭐⭐⭐" },
  { nom: "Appel des Ténèbres", effet: "Ombre convoquée comme bouclier", puissance: "⭐⭐⭐" },
  { nom: "Sort de l'Abîsse", effet: "Portail ouvert vers le néant", puissance: "⭐⭐⭐⭐⭐" },
  { nom: "Sceau Infernal", effet: "Cible marquée pour toujours", puissance: "⭐⭐⭐" },
]
export default async function arcane2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const input = args.join(' ') || 'invocation'
  const inv = INVOCATIONS[Math.floor(Math.random() * INVOCATIONS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⛧ *ARCANE AVANCÉ*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🔮 *Rituel:* ${inv.nom}\n` +
    `⛧  ✨ *Effet:* ${inv.effet}\n` +
    `✝  💥 *Puissance:* ${inv.puissance}\n` +
    `☩  📝 *Cible:* ${input}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
