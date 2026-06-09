import { sendMessage } from '../lib/sendMessage.js'
const GUILDS = ['☠️ Les Démons de l'Ombre','⚔️ Les Chevaliers d'Acier','🔥 L'Ordre du Phoenix','💎 La Confrérie des Gemmes','🌿 Les Gardiens de la Forêt','🌊 Les Maîtres des Abysses','🏹 La Guilde des Ombres','🧙 Les Mages Éternels','💀 L'Alliance Nécromantique','🦅 Les Sentinelles du Ciel']
const DATA = new Map()
export default async function guilde3(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const sub = args[0]?.toLowerCase()
  if (sub === 'creer') {
    const name = args.slice(1).join(' ')
    if (!name) return await sendMessage(sock, sender, `☠ Usage: ${prefix}guilde3 creer <nom>`)
    DATA.set(senderJid, { name, members: 1, level: 1 })
    return await sendMessage(sock, sender, `☩━━━〔 🏰 *GUILDE CRÉÉE* 〕━━━☩\n☠\n⛧  🏰 *${name}*\n☠  👑 Tu es le chef!\n✝  Membres: 1\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  if (sub === 'info') {
    const guild = DATA.get(senderJid)
    if (!guild) return await sendMessage(sock, sender, `☠ Crée une guilde: ${prefix}guilde3 creer <nom>`)
    return await sendMessage(sock, sender, `☩━━━〔 🏰 *GUILDE* 〕━━━☩\n☠\n⛧  🏰 *${guild.name}*\n☠  👥 Membres: ${guild.members}\n✝  Niveau: ${guild.level}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const guild = GUILDS[Math.floor(Math.random()*GUILDS.length)]
  await sendMessage(sock, sender, `☩━━━〔 🏰 *GUILDES DÉMON* 〕━━━☩\n☠\n⛧  ${guild}\n☠\n✝  ${prefix}guilde3 creer <nom>\n☠  ${prefix}guilde3 info\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}