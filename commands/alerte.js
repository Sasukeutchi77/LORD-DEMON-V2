import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const NIVEAUX = [
  { level: "CRITIQUE ☠", desc: "Danger imminent — tous aux abris !", emoji: "🚨" },
  { level: "ÉLEVÉ ⛧", desc: "Menace sérieuse détectée", emoji: "🔴" },
  { level: "MODÉRÉ ✝", desc: "Vigilance accrue recommandée", emoji: "🟡" },
  { level: "FAIBLE ☩", desc: "Situation sous contrôle", emoji: "🟢" },
]
export default async function alerte(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const n = NIVEAUX[Math.floor(Math.random() * NIVEAUX.length)]
  const raison = args.join(' ') || 'Activité suspecte détectée'
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ${n.emoji} *ALERTE ${n.level}*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📢 *Raison:* ${raison}\n` +
    `⛧  ⚠️ *Statut:* ${n.desc}\n` +
    `✝  👁️ *Émis par:* @${jid.split('@')[0]}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
