import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const ATTAQUES = [
  { nom: "Frappe Foudroyante", type: "Physique", dmg: () => Math.floor(Math.random()*300)+100, desc: "Coup puissant qui fait trembler le sol" },
  { nom: "Sort de Flammes", type: "Magique 🔥", dmg: () => Math.floor(Math.random()*500)+200, desc: "Projectile de feu infernal" },
  { nom: "Lame Spectrale", type: "Sombre ☠", dmg: () => Math.floor(Math.random()*400)+150, desc: "Coupe à travers armures et défenses" },
  { nom: "Coup de Tonnerre", type: "Électrique ⚡", dmg: () => Math.floor(Math.random()*600)+250, desc: "Frappe avec la puissance de l'orage" },
  { nom: "Impact Démoniaque", type: "Infernal ⛧", dmg: () => Math.floor(Math.random()*800)+400, desc: "Énergie des abysses canalisée en un coup" },
]
export default async function attaque(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const a = ATTAQUES[Math.floor(Math.random() * ATTAQUES.length)]
  const dmg = a.dmg()
  const critique = Math.random() > 0.8
  const totalDmg = critique ? Math.floor(dmg * 1.5) : dmg
  const targetStr = target ? `@${target.split('@')[0]}` : "l'ennemi"
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚔️ *ATTAQUE !*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚡ *@${jid.split('@')[0]}* attaque *${targetStr}* !\n\n` +
    `⛧  🎯 *Attaque:* ${a.nom}\n` +
    `✝  🔥 *Type:* ${a.type}\n` +
    `☩  💥 *Dégâts:* ${totalDmg} pts${critique ? ' ⚡ *CRITIQUE !*' : ''}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, ...(target ? [target] : [])] })
}
