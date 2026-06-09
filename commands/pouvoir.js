// commands/pouvoir.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const LEVELS = ["DIEU ⛧","Surhumain","Champion","Humain lambda","Faible","Tu fais peur aux fourmis... pas beaucoup",
    "⛧ Contrôle du Chaos Primordial — déformer la réalité !",
    "☠ Absorption d'Âme — voler la force vitale ennemie !",
    "✝ Résurrection Démoniaque — revenir des abysses !",
    "☩ Manipulation du Temps — ralentir ou accélérer !",
    "⸸ Vision Infernale — voir à travers le Voile !",
    "💀 Bouclier de Ténèbres — absorber toute magie noire !",
    "🔥 Frappe Abyssale — coup qui transperce l'âme !",
    "👹 Forme Démoniaque — transformation totale !"]

export default async function pouvoir(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const num = Math.floor(Math.random() * 101)
  const idx = Math.floor((100 - num) / (100 / LEVELS.length))
  const level = LEVELS[Math.min(idx, LEVELS.length - 1)]
  const bar = '█'.repeat(Math.floor(num / 10)) + '░'.repeat(10 - Math.floor(num / 10))
  const mentions = target !== jid ? [target] : []
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⚡ NIVEAU DE POUVOIR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n👤 @${target.split('@')[0]}\n\n[${bar}] ${num}%\n\n✨ ${level}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
    mentions.length ? { mentions } : undefined
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}