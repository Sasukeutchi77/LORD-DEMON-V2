import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CLASSES = ['⚔️ Guerrier','🧙 Mage','🗡️ Assassin','🏹 Archer','🛡️ Paladin','💀 Nécromancien']
const RACES = ['🧝 Elfe','🧙 Humain','⛏️ Nain','🔥 Demi-Démon','🪨 Golem','🐺 Lycanthrope']
const WEAPONS = ['Épée longue','Bâton runique','Dague fantôme','Arc des anciens','Lance sacrée','Faux des ombres']
const SPELLS = ['Éclair divin','Feu noir','Invisibilité','Barrière de lumière','Drain de vie','Régénération','Tempête','Paralysie','Portail sombre']
const rand = arr => arr[Math.floor(Math.random() * arr.length)]
const stat = () => Math.floor(Math.random() * 50) + 50
export default async function characterbuild(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const name = args.join(' ') || msg?.pushName || `Guerrier_${jid.split('@')[0].slice(-4)}`
  const classe = rand(CLASSES), race = rand(RACES), weapon = rand(WEAPONS)
  const spell1 = rand(SPELLS), spell2 = rand(SPELLS.filter(s=>s!==spell1))
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🧙 *CRÉATION DE PERSONNAGE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 *Nom:* ${name}\n` +
    `⛧  🗡️ *Classe:* ${classe} | *Race:* ${race}\n` +
    `✝  🔱 *Arme:* ${weapon}\n` +
    `☩  ✨ *Sorts:* ${spell1}, ${spell2}\n\n` +
    `☠  📊 *Stats:*\n` +
    `⛧  ❤️ PV: ${stat()} | ⚔️ ATK: ${stat()} | 🛡️ DEF: ${stat()}\n` +
    `✝  🔮 MAG: ${stat()} | ⚡ AGI: ${stat()} | 🍀 LCK: ${stat()}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
