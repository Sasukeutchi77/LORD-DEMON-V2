import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CHATEAUX = [
  { nom: "Château des Ombres ⛧", type: "Forteresse démoniaque", defence: 950, tresors: 12, desc: "Impénétrable, gardé par des spectres anciens" },
  { nom: "Tour d'Ivoire 👑", type: "Palais royal", defence: 800, tresors: 20, desc: "Richesse légendaire, protégée par des chevaliers d'élite" },
  { nom: "Citadelle de Pierre 🪨", type: "Bastion militaire", defence: 1200, tresors: 5, desc: "Murs épais de 10 mètres, résiste à tout siège" },
  { nom: "Manoir Hanté 👻", type: "Demeure maudite", defence: 400, tresors: 30, desc: "Trésors cachés, mais au péril de ton âme" },
  { nom: "Forteresse Céleste 🌟", type: "Sanctuaire divin", defence: 1500, tresors: 8, desc: "Bénie des dieux, quasi imprenable" },
]
export default async function chateau(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const c = CHATEAUX[Math.floor(Math.random() * CHATEAUX.length)]
  const attaque = Math.floor(Math.random() * 1500) + 500
  const resultat = attaque > c.defence ? `🏆 *SIÈGE RÉUSSI !* (+${c.tresors} trésors)` : `🛡️ *REPOUSSÉ !* Les murs tiennent.`
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🏰 *SIÈGE DE CHÂTEAU*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏰 *Cible:* ${c.nom}\n` +
    `⛧  🏷️ *Type:* ${c.type}\n` +
    `✝  🛡️ *Défense:* ${c.defence} | ⚔️ *Ton attaque:* ${attaque}\n\n` +
    `☩  ${resultat}\n` +
    `☠  📖 _${c.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
