import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const COURSES = [
  { cheval: "Tempête Noire ⛧", cote: 2.5, trait: "Vitesse démoniaque, jambes d'acier" },
  { cheval: "Foudre Dorée ⚡", cote: 1.8, trait: "Champion incontesté des plaines" },
  { cheval: "Spectre Blanc 👻", cote: 4.0, trait: "Insaisissable, mystérieux, imprévisible" },
  { cheval: "Fer Rouge 🔥", cote: 3.5, trait: "Endurant, brûle à mi-parcours" },
  { cheval: "Éclipse Royale 👑", cote: 2.0, trait: "Noble sang, race de champion" },
  { cheval: "Vent des Abysses 🌑", cote: 6.0, trait: "Outsider surprenant, explosion finale" },
]
export default async function cheval(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const c = COURSES[Math.floor(Math.random() * COURSES.length)]
  const winner = COURSES[Math.floor(Math.random() * COURSES.length)]
  const won = args[0] && c.cheval.toLowerCase().includes(args[0].toLowerCase())
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🐎 *COURSE HIPPIQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏆 *Cheval du jour:* ${c.cheval}\n` +
    `⛧  📊 *Cote:* x${c.cote}\n` +
    `✝  💬 _"${c.trait}"_\n\n` +
    `☩  🥇 *Vainqueur de la course:* ${winner.cheval}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
