import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CHARGES = [
  { nom: "Charge Berserker", desc: "Attaque frénétique, abandonne toute défense", dmg: () => Math.floor(Math.random()*800)+400, risk: "50% chance de prendre des dégâts en retour" },
  { nom: "Charge de Cavalerie", desc: "Percussion à pleine vitesse impossible à arrêter", dmg: () => Math.floor(Math.random()*600)+350, risk: "Dépasse la cible si raté" },
  { nom: "Charge Démoniaque", desc: "Énergie infernale canalisée dans le corps", dmg: () => Math.floor(Math.random()*1000)+500, risk: "Brûle 20% de ses propres PV" },
  { nom: "Charge Éclair", desc: "Vitesse supersonique, frappe avant tout", dmg: () => Math.floor(Math.random()*500)+300, risk: "Précision réduite si fatigué" },
]
export default async function charge(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const c = CHARGES[Math.floor(Math.random() * CHARGES.length)]
  const dmg = c.dmg()
  const targetStr = target ? `@${target.split('@')[0]}` : "l'ennemi"
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💨 *CHARGE !*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚡ *@${jid.split('@')[0]}* effectue une *${c.nom}* sur ${targetStr} !\n\n` +
    `⛧  📖 _${c.desc}_\n` +
    `✝  💥 *Dégâts:* ${dmg} pts\n` +
    `☩  ⚠️ *Risque:* ${c.risk}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, ...(target ? [target] : [])] })
}
