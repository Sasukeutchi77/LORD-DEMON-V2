import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const PREFIXES = ['Lord','Dark','Shadow','Eternal','Blood','Soul','Void','Abyssal','Infernal','Chaos']
const NAMES = ['Marduk','Keres','Zephael','Malphas','Valefar','Agares','Phenex','Sitri','Belias','Raum']
const TITLES = ['of Shadows','the Destroyer','of Fire','the Eternal','of the Abyss','the Fallen','of Darkness','the Undying']
const DOMAINS = ['Chaos','Destruction','Fear','Illusion','Death','Fire','Ice','Shadow','Blood','Time']
const POWERS = [
  "Contrôle des ombres",
  "Invulnérabilité aux armes mortelles",
  "Télékinésie démoniaque",
  "Vision de l'avenir",
  "Possession de corps",
  "Régénération instantanée",
  "Portails dimensionnels",
]
export default async function demongenerator(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const name = `${PREFIXES[Math.floor(Math.random()*PREFIXES.length)]} ${NAMES[Math.floor(Math.random()*NAMES.length)]} ${TITLES[Math.floor(Math.random()*TITLES.length)]}`
  const domain = DOMAINS[Math.floor(Math.random()*DOMAINS.length)]
  const power = POWERS[Math.floor(Math.random()*POWERS.length)]
  const rank = Math.floor(Math.random()*90)+10
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   👿 *GÉNÉRATEUR DE DÉMON*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${jid.split('@')[0]}, ton alter ego démoniaque :\n\n` +
    `⛧  👿 *Nom:* ${name}\n` +
    `✝  🌑 *Domaine:* ${domain}\n` +
    `☩  ⚡ *Pouvoir:* ${power}\n` +
    `☠  🏆 *Rang:* ${rank}/100\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
