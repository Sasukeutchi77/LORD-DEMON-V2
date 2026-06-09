import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const DEFIS = [
  { defi: "Duel de quiz — 10 questions, le plus rapide gagne !", type: "Intellectuel", enjeu: "500 pièces" },
  { defi: "Race to 100 mots — qui tape le plus vite ?", type: "Vitesse", enjeu: "Gloire éternelle" },
  { defi: "Blague battle — le public vote le gagnant", type: "Humour", enjeu: "Couronne de bouffon" },
  { defi: "Duel rhétorique — qui convainc le jury en 2 min", type: "Éloquence", enjeu: "Titre d'orateur" },
  { defi: "Combat de stratégie — échecs démoniaques", type: "Stratégie", enjeu: "1000 pièces + Badge" },
]
export default async function challenger(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const d = DEFIS[Math.floor(Math.random() * DEFIS.length)]
  const targetStr = target ? `@${target.split('@')[0]}` : "quelqu'un dans le cercle"
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚔️ *DÉFI LANCÉ !*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👊 *@${jid.split('@')[0]}* défie *${targetStr}* !\n\n` +
    `⛧  🎯 *Épreuve:* ${d.defi}\n` +
    `✝  🏷️ *Type:* ${d.type}\n` +
    `☩  💰 *Enjeu:* ${d.enjeu}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, ...(target ? [target] : [])] })
}
