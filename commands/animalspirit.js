import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const SPIRITS = [
  { animal: "Loup 🐺", trait: "Loyauté et leadership", message: "Tu es un guide naturel que les autres suivent" },
  { animal: "Aigle 🦅", trait: "Vision et liberté", message: "Tu vois loin là où les autres ne voient rien" },
  { animal: "Lion 🦁", trait: "Courage et noblesse", message: "Ta présence inspire le respect et la puissance" },
  { animal: "Dragon 🐉", trait: "Sagesse et puissance infinie", message: "Tu portes en toi une force légendaire" },
  { animal: "Renard 🦊", trait: "Intelligence et ruse", message: "Tu trouves toujours la solution là où aucune n'existe" },
  { animal: "Serpent 🐍", trait: "Régénération et mystère", message: "Tu te transformes là où d'autres restent figés" },
  { animal: "Hibou 🦉", trait: "Connaissance et sagesse nocturne", message: "La vérité t'est accessible là où règne l'obscurité" },
  { animal: "Panthère ⛧", trait: "Ombre et domination silencieuse", message: "Tu agis dans l'ombre et frappes avec précision" },
]
export default async function animalspirit(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const s = SPIRITS[Math.floor(Math.random() * SPIRITS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🦋 *ANIMAL SPIRITUEL*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  🐾 *Ton animal:* ${s.animal}\n` +
    `✝  🌟 *Trait:* ${s.trait}\n` +
    `☩  💬 _"${s.message}"_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
