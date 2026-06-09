// commands/fight.js
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ACTIONS = ["*lance un défi épique !* ⚔️","*dégaine l'épée* 🗡️","*battle initiated !* 💢","*cri de guerre démoniaque* ☠️",
    "*fracasse son adversaire avec une force démoniaque!* 💀",
    "*invoque une lame spectrale et attaque!* ⚔️",
    "*canalise l'énergie des enfers en un coup dévastateur!* ☠️",
    "*ouvre un portail chaotique et frappe depuis l'ombre!* ⛧",
    "*hurle le nom des anciens et libère une vague de destruction!* 🔥",
    "*se transforme en entité démoniaque et dévore l'ennemi!* 👹",
    "*prononce un sort maudit qui consume l'âme adverse!* ✝️",
    "*saisit la gorge de l'ennemi avec une poigne de spectre!* 💀"]

export default async function fight(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || msg.message?.extendedTextMessage?.contextInfo?.participant
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]
  const mentions = target ? [target] : []
  const targetStr = target ? `@${target.split('@')[0]}` : `vous`
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⚔️ COMBAT   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n@${jid.split('@')[0]} → ${targetStr}\n\n${action}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
    mentions.length ? { mentions: [jid, ...mentions] } : { mentions: [jid] }
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}