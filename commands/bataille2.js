import { sendMessage } from '../lib/sendMessage.js'
const MOVES = ['Attaque Éclair ⚡','Coup Critique 🗡️','Parade 🛡️','Magie Noire 🔥','Esquive 💨','Combo Infernal 💀','Contre-attaque ⚔️','Drain Vie 🌑']
export default async function bataille2(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid||msg.key.participant||msg.key.remoteJid
  const prefix = process.env.PREFIX||'.'
  const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
  const target = mentions?.[0]
  if (!target) return await sendMessage(sock, sender, `☩━━━〔 ⚔️ *BATAILLE* 〕━━━☩\n☠\n⛧  Usage: ${prefix}bataille2 @adversaire\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const atk1 = MOVES[Math.floor(Math.random()*MOVES.length)], atk2 = MOVES[Math.floor(Math.random()*MOVES.length)]
  const hp1 = Math.floor(Math.random()*500)+500, hp2 = Math.floor(Math.random()*500)+500
  const dmg1 = Math.floor(Math.random()*300)+100, dmg2 = Math.floor(Math.random()*300)+100
  const winner = hp1-dmg2 > hp2-dmg1 ? senderJid : target
  const from = senderJid.replace('@s.whatsapp.net',''), to = target.replace('@s.whatsapp.net','')
  await sock.sendMessage(sender, { text:`☩━━━〔 ⚔️ *BATAILLE ÉPIQUE* 〕━━━☩\n☠\n⛧  @${from} (${hp1} PV) vs @${to} (${hp2} PV)\n☠\n✝  ⚔️ @${from}: ${atk1} (-${dmg1} PV)\n☠  ⚔️ @${to}: ${atk2} (-${dmg2} PV)\n☠\n⛧  🏆 VAINQUEUR: @${winner.replace('@s.whatsapp.net','')}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`, mentions:[senderJid,target] }).catch(()=>sendMessage(sock,sender,'⚔️ Bataille terminée!'))
}