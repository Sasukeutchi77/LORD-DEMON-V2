import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const STYLES = ['Attaque furtive','Défense totale','Frappe puissante','Combo dévastateur','Contre-attaque']
const EFFETS = ['🔥 Brûlure infligée','❄️ Gel du mouvement','⚡ Choc électrique','💀 Coup mortel','🌀 Étourdissement']
export default async function duel3(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!target) return sendMessage(sock, sender, `☠ Usage: .duel3 @adversaire`)
  const p1Atk = Math.floor(Math.random()*100)+50, p1Def = Math.floor(Math.random()*60)+20
  const p2Atk = Math.floor(Math.random()*100)+50, p2Def = Math.floor(Math.random()*60)+20
  const p1Net = Math.max(0,p1Atk-p2Def), p2Net = Math.max(0,p2Atk-p1Def)
  const winner = p1Net >= p2Net ? jid : target
  const styleA = STYLES[Math.floor(Math.random()*STYLES.length)]
  const styleB = STYLES[Math.floor(Math.random()*STYLES.length)]
  const effet = EFFETS[Math.floor(Math.random()*EFFETS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚔️ *DUEL LÉGENDAIRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🔴 @${jid.split('@')[0]} — ${styleA}\n` +
    `     ATK: ${p1Atk} | DEF: ${p1Def} | Net: ${p1Net}\n\n` +
    `⛧  🔵 @${target.split('@')[0]} — ${styleB}\n` +
    `     ATK: ${p2Atk} | DEF: ${p2Def} | Net: ${p2Net}\n\n` +
    `✝  ${effet}\n\n` +
    `☩  🏆 *VAINQUEUR:* @${winner.split('@')[0]}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid, target] })
}
