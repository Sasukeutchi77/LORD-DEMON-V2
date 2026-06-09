import { sendMessage } from '../lib/sendMessage.js'
const CLASSES = ['⚔️ Guerrier','🧙 Mage','🗡️ Assassin','🏹 Archer','🛡️ Paladin','💀 Nécromancien']
const RACES = ['🧝 Elfe','🧙 Humain','⛏️ Nain','🔥 Demi-Démon','🪨 Golem','🐺 Lycanthrope']
const WEAPONS = ['Épée longue','Bâton runique','Dague fantôme','Arc des anciens','Lance sacrée','Faux de l'ombre']
const SPELLS = ['Éclair divin','Feu noir','Invisibilité','Barrière','Drain','Régénération','Tempête','Paralysie']
export default async function characterbuild(sock, sender, args, msg, ctx) {
  const cl = CLASSES[Math.floor(Math.random()*CLASSES.length)]
  const race = RACES[Math.floor(Math.random()*RACES.length)]
  const wpn = WEAPONS[Math.floor(Math.random()*WEAPONS.length)]
  const sp1 = SPELLS[Math.floor(Math.random()*SPELLS.length)]
  const sp2 = SPELLS.filter(s=>s!==sp1)[Math.floor(Math.random()*(SPELLS.length-1))]
  const stats = { atk:Math.floor(Math.random()*500)+100, def:Math.floor(Math.random()*300)+50, spd:Math.floor(Math.random()*200)+50, hp:Math.floor(Math.random()*2000)+500 }
  await sendMessage(sock, sender, `☩━━━〔 🎮 *CHARACTER BUILD* 〕━━━☩\n☠\n⛧  Classe: *${cl}*\n☠  Race: *${race}*\n✝  Arme: *${wpn}*\n☠  Sorts: *${sp1}* + *${sp2}*\n☠\n✝  ❤️ HP: ${stats.hp} | ⚔️ ATK: ${stats.atk}\n☠  🛡️ DEF: ${stats.def} | 💨 SPD: ${stats.spd}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}