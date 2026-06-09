import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CLASSES = [
  { classe: "Guerrier", desc: "Force et endurance inébranlables", stats: "ATK +200, DEF +150, HP +500" },
  { classe: "Mage", desc: "Intelligence et maîtrise des sorts", stats: "INT +300, ATK magique +400, MP +300" },
  { classe: "Assassin", desc: "Rapidité et précision mortelle", stats: "AGI +250, CRIT +40%, furtivité max" },
  { classe: "Paladin", desc: "Protection divine et dévotion totale", stats: "DEF +300, soins +200, aura sainte" },
  { classe: "Archer", desc: "Précision et agilité supérieures", stats: "AGI +200, portée x3, vision parfaite" },
  { classe: "Nécromancien", desc: "Magie de l'ombre et mystère", stats: "Invoque 5 morts-vivants, aura maudite" },
  { classe: "Druide", desc: "Nature et équilibre cosmique", stats: "Régén 15%/tour, contrôle animaux" },
  { classe: "Oracle", desc: "Vision et prophétie divine", stats: "Voit l'avenir, immunité aux surprises" },
]
export default async function classerpg(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const c = CLASSES[Math.floor(Math.random() * CLASSES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚔️ *TA CLASSE RPG*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${target.split('@')[0]}\n\n` +
    `⛧  🎭 *Classe:* ${c.classe}\n` +
    `✝  📖 *Description:* ${c.desc}\n` +
    `☩  📊 *Stats:* ${c.stats}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
