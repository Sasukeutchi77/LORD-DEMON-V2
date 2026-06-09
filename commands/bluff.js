import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const BLUFFS = [
  { technique: "Regard de Glace", desc: "Impassible, rien ne transparaît", niveau: "Maître" },
  { technique: "Sourire Mystérieux", desc: "Un sourire qui cache mille mensonges", niveau: "Expert" },
  { technique: "Silence Calculé", desc: "Le silence fait plus peur que les mots", niveau: "Légendaire" },
  { technique: "Diversion Parfaite", desc: "Attirer l'attention ailleurs au bon moment", niveau: "Élite" },
  { technique: "Confiance Absolue", desc: "Affirmer avec une conviction totale", niveau: "Divin" },
]
export default async function bluff(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const b = BLUFFS[Math.floor(Math.random() * BLUFFS.length)]
  const succes = Math.random() > 0.35
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🃏 *ART DU BLUFF*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎭 *Technique:* ${b.technique}\n` +
    `⛧  📖 _${b.desc}_\n` +
    `✝  👑 *Niveau:* ${b.niveau}\n` +
    `☩  ${succes ? '✅ *BLUFF RÉUSSI — personne n\'a rien vu !*' : '❌ *DÉMASQUÉ — le bluff a échoué !*'}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
