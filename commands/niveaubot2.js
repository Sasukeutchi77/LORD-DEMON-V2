import { sendMessage } from '../lib/sendMessage.js'
const RANKS = [{min:0,name:'Mortel',e:'💀'},{min:100,name:'Initié',e:'🌱'},{min:500,name:'Apprenti',e:'📚'},{min:1000,name:'Guerrier',e:'⚔️'},{min:2500,name:'Chevalier',e:'🛡️'},{min:5000,name:'Champion',e:'🏆'},{min:10000,name:'Héros',e:'🦸'},{min:25000,name:'Légende',e:'⭐'},{min:50000,name:'Mythe',e:'🌟'},{min:100000,name:'Divin',e:'✨'},{min:500000,name:'Démon Absolu',e:'☠️'}]
export default async function niveaubot2(sock, sender, args, msg, ctx) {
  try {
  const level = Math.floor(Math.random()*10)+1
  const xp = level*847+Math.floor(Math.random()*500)
  const rank = RANKS.slice().reverse().find(r=>xp>=r.min)||RANKS[0]
  const nextRank = RANKS[RANKS.indexOf(rank)+1]
  const progress = nextRank?Math.floor(((xp-rank.min)/(nextRank.min-rank.min))*20):20
  const bar = '█'.repeat(progress)+'░'.repeat(20-progress)
  const next = nextRank ? `\n✝  Prochain: ${nextRank.e} ${nextRank.name} (${nextRank.min.toLocaleString()} XP)` : ''
  await sendMessage(sock, sender, `☩━━━〔 📊 *NIVEAU DÉMON* 〕━━━☩\n☠\n⛧  ${rank.e} Rang: *${rank.name}*\n☠  📊 Niveau: *${level}*\n✝  ⭐ XP: *${xp.toLocaleString()}*\n☠  [${bar}]${next}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}