import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const MOVES = [
  { nom: 'Attaque Éclair ⚡', dmg: () => Math.floor(Math.random()*300)+200, type: 'Physique' },
  { nom: 'Coup Critique 🗡️', dmg: () => Math.floor(Math.random()*500)+300, type: 'Précision' },
  { nom: 'Magie Noire 🔥', dmg: () => Math.floor(Math.random()*700)+400, type: 'Magique' },
  { nom: 'Combo Infernal 💀', dmg: () => Math.floor(Math.random()*600)+500, type: 'Combo' },
  { nom: 'Drain de Vie 🌑', dmg: () => Math.floor(Math.random()*400)+300, type: 'Sombre' },
  { nom: 'Invocation ⛧', dmg: () => Math.floor(Math.random()*900)+600, type: 'Démoniaque' },
]
export default async function bataille2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!target) return sendMessage(sock, sender, `☠ Usage: .bataille2 @adversaire`)
  const m1 = MOVES[Math.floor(Math.random() * MOVES.length)]
  const m2 = MOVES[Math.floor(Math.random() * MOVES.length)]
  const d1 = m1.dmg(), d2 = m2.dmg()
  const winner = d1 >= d2 ? jid : target
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚔️ *BATAILLE ÉPIQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚡ @${jid.split('@')[0]}: *${m1.nom}* — ${d1} dégâts\n` +
    `⛧  🗡️ @${target.split('@')[0]}: *${m2.nom}* — ${d2} dégâts\n\n` +
    `✝  🏆 *VAINQUEUR: @${winner.split('@')[0]}*\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, target] })
}
