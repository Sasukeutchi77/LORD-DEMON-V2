// commands/niveau2.js — SYSTÈME DE NIVEAUX DÉMONIAQUE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const RANGS = [
  { min:0,    max:499,   nom:'⚪ Mortel Ordinaire',      classe:'Aucune classe',          bonus:'', perks:[] },
  { min:500,  max:1499,  nom:'🔵 Initié des Ombres',     classe:'Apprenti Invocateur',    bonus:'XP +5%', perks:['Accès au Grimoire Basique'] },
  { min:1500, max:3999,  nom:'🟢 Adepte du Voile',       classe:'Mage Novice',            bonus:'XP +10%', perks:['Sort Gratuit x1/jour','Bonus minage +10%'] },
  { min:4000, max:9999,  nom:'🟡 Maître des Runes',      classe:'Archimage',              bonus:'XP +20%', perks:['Invocation Rang III gratuit','Mission bonus'] },
  { min:10000,max:24999, nom:'🟠 Seigneur des Ombres',   classe:'Seigneur Démoniaque',    bonus:'XP +35%', perks:['Boss exclusif','Artefact légendaire'] },
  { min:25000,max:49999, nom:'🔴 Gardien du Chaos',      classe:'Archidémon de Rang VII', bonus:'XP +50%', perks:['Toutes commandes débloquées','Récompenses ×2'] },
  { min:50000,max:99999, nom:'☠ Liche Primordiale',      classe:'Maître Absolu',          bonus:'XP +75%', perks:['Pouvoir de bannissement','Jackpot ×3'] },
  { min:100000,max:Infinity,nom:'👑 AZRAEL RÉINCARNÉ',   classe:'DIVINITÉ DES TÉNÈBRES',  bonus:'XP ×2',   perks:['Puissance absolue','Tous bonus actifs'] },
]
function bar(xp, max, len=12){const f=Math.min(Math.round((xp/max)*len),len);return '█'.repeat(f)+'░'.repeat(len-f)}

export default async function niveau2(sock, sender, args, msg, ctx={}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
    let coins=0
    try{if(economyDb){const u=economyDb.ensure?economyDb.ensure(target):economyDb.get(target);if(u)coins=u.coins||0}}catch{}

    // XP simulé à partir des coins (ratio 1 coin = 2 XP)
    const xp = coins*2 + Math.floor(Math.random()*500)
    const rang = RANGS.find(r=>xp>=r.min&&xp<=r.max)||RANGS[0]
    const prochainRang = RANGS[Math.min(RANGS.indexOf(rang)+1, RANGS.length-1)]
    const progressPct = rang.max===Infinity?100:Math.min(100,Math.round(((xp-rang.min)/(rang.max-rang.min))*100))
    const xpRestant = rang.max===Infinity?0:rang.max-xp+1
    const barreXP = rang.max===Infinity?'█'.repeat(12):`[${bar(xp-rang.min,rang.max-rang.min)}]`
    const mentions = target!==jid?[target]:[]
    const perksStr = rang.perks.length?rang.perks.map(p=>`  ✅ ${p}`).join('\n'):'  ❌ Aucun avantage encore'

    await sendMessage(sock,sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   📊 *PROFIL DE NIVEAU*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `👤 @${target.split('@')[0]}\n` +
      `✨ *${rang.nom}*\n` +
      `🎓 Classe : *${rang.classe}*\n\n` +
      `⚡ XP : *${xp.toLocaleString()}*\n` +
      `📈 Progression : ${barreXP} *${progressPct}%*\n` +
      (rang.max!==Infinity?`🎯 Prochain rang dans : *${xpRestant.toLocaleString()} XP*\n`:`🏆 *RANG MAXIMUM ATTEINT !*\n`) +
      `💰 Coins : *${coins.toLocaleString()}* 🪙\n` +
      `⚡ Bonus XP : *${rang.bonus||'Aucun'}*\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `🔓 *Avantages actifs :*\n${perksStr}\n\n` +
      (rang.max!==Infinity?`⬆️ *Prochain rang :* ${prochainRang.nom}\n`:'') +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Progression Démoniaque ☠`,
      mentions.length?{mentions}:undefined)
  } catch(e){await sendMessage(sock,sender,`☠ Erreur: ${e.message}`)}
}
