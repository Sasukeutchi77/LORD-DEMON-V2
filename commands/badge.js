import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, cleanNumber } from '../lib/ownerSystem.js'
const BADGES_LIST = [
  { id: 'warrior', badge: '⚔️ Guerrier', desc: 'Maître du combat', condition: '10 batailles gagnées' },
  { id: 'scholar', badge: '📚 Érudit', desc: 'Soif de connaissance', condition: '50 questions correctes' },
  { id: 'rich', badge: '💰 Fortune', desc: 'Maître des finances', condition: '10 000 pièces accumulées' },
  { id: 'demon', badge: '⛧ Démoniaque', desc: 'Élu des forces sombres', condition: 'Niveau 50 atteint' },
  { id: 'legend', badge: '👑 Légendaire', desc: 'Statut légendaire confirmé', condition: 'Toutes les quêtes terminées' },
]
export default async function badge(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const sub = args[0]?.toLowerCase()
  if (!sub || sub === 'list') {
    const lines = BADGES_LIST.map(b => `☠  ${b.badge} — _${b.condition}_`).join('\n')
    const text =
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🏅 *BADGES DISPONIBLES*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${lines}\n\n` +
      `⛧  _Gagne des badges en relevant des défis._\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    return sendMessage(sock, sender, text)
  }
  const found = BADGES_LIST.find(b => b.id === sub)
  if (!found) return sendMessage(sock, sender, `☠ Badge inconnu. Tape .badge list pour voir la liste.`)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🏅 *BADGE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ${found.badge}\n` +
    `⛧  📖 *Description:* ${found.desc}\n` +
    `✝  🎯 *Condition:* ${found.condition}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
