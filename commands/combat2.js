// commands/combat2.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

export default async function combat2(sock, sender, args, msg, ctx) {
  const senderName = msg?.pushName || 'Guerrier'
  const cible = args.join(' ') || 'le Démon'
  const atk1 = Math.floor(Math.random() * 100) + 1
  const atk2 = Math.floor(Math.random() * 100) + 1
  const gagnant = atk1 >= atk2 ? senderName : cible
  const perdant = atk1 >= atk2 ? cible : senderName
  const text =
    `☩━━━〔 ⚔️ *COMBAT DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  ⚔️ *${senderName}* VS *${cible}*\n\n` +
    `⛧  💥 ${senderName}: ${atk1} pts de dégâts\n` +
    `✝  💥 ${cible}: ${atk2} pts de dégâts\n\n` +
    `☩  🏆 *VICTOIRE:* ${gagnant} !\n` +
    `☠  ☠️ *DÉFAITE:* ${perdant}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
