// commands/mission2.js — MISSIONS DE GUILDE / RAID
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const RAIDS = [
  { nom:'🏰 Donjon du Seigneur Maudit',     min_joueurs:2, difficulte:'🔵 Normal',    recompense:500,  xp:800,  boss:'Gardien Squelette',   loot:'Épée Rouillée' },
  { nom:'🌋 Volcan des Démons Anciens',      min_joueurs:3, difficulte:'🟣 Difficile', recompense:1200, xp:2000, boss:'Drake Infernal',       loot:'Écaille de Lave' },
  { nom:'🌑 Catacombes du Néant Abyssal',   min_joueurs:3, difficulte:'🔴 Épique',    recompense:2500, xp:4000, boss:'Liche de Rang VII',    loot:'Phylactère Ancien' },
  { nom:'⛧ Tour des Neuf Cercles',          min_joueurs:5, difficulte:'☠ Légendaire', recompense:6000, xp:10000,boss:'Azrael Déchu',         loot:'Fragment d\'Éternité' },
  { nom:'💀 Abîsse Primordial — Fin du Monde',min_joueurs:8,difficulte:'👑 MYTHIQUE',  recompense:15000,xp:25000,boss:'CHAOS PRIMORDIAL',     loot:'Sceau du Cosmos' },
]
const PHASES = ['Entrée dans la zone','Combat contre les sbires','Affrontement du boss','Collecte du trésor']
const cooldowns = new Map()

export default async function mission2(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const now = Date.now()
    const cdTime = 45 * 60 * 1000

    if (now - (cooldowns.get(jid)||0) < cdTime) {
      const reste = Math.ceil((cdTime-(now-(cooldowns.get(jid)||0)))/60000)
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⏳ *RÉCUPÉRATION POST-RAID*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☠ Prochain raid disponible dans *${reste} min*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    }
    cooldowns.set(jid, now)

    // Sélection pondérée du raid
    const weights = [30, 25, 20, 15, 10]
    const total = weights.reduce((a,b)=>a+b,0)
    let r = Math.random()*total, acc=0, raid=RAIDS[0]
    for (let i=0;i<weights.length;i++){acc+=weights[i];if(r<acc){raid=RAIDS[i];break}}

    // Simulation du raid
    const phase = Math.floor(Math.random()*4)
    const succes = Math.random() > 0.3
    const critique = succes && Math.random() < 0.2

    const baseGain = succes ? (critique ? Math.floor(raid.recompense*1.5) : raid.recompense) : Math.floor(raid.recompense*0.1)
    const baseXP   = succes ? (critique ? Math.floor(raid.xp*1.5) : raid.xp) : Math.floor(raid.xp*0.05)
    const loot     = succes ? raid.loot : 'Équipement cassé'

    if (succes && economyDb) {
      try { if (economyDb.addCoins) economyDb.addCoins(jid, baseGain) } catch {}
    }

    const statusTxt = !succes
      ? `💀 *RAID ÉCHOUÉ* — Retraite forcée !`
      : critique
      ? `🏆 *RAID LÉGENDAIRE !* Performance parfaite !`
      : `✅ *RAID RÉUSSI !*`

    const phaseTxt = PHASES.slice(0, phase+1).map((p,i) => `${i+1}. ${i===phase?'⚔️':'✅'} ${p}`).join('\n')

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   ⚔️ *RAPPORT DE RAID*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `🏰 *${raid.nom}*\n` +
      `🎯 Difficulté : ${raid.difficulte}\n` +
      `👹 Boss : *${raid.boss}*\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `📋 *Progression :*\n${phaseTxt}\n\n` +
      `${statusTxt}\n\n` +
      `⚡ XP : *+${baseXP.toLocaleString()}*\n` +
      `💰 Récompense : *+${baseGain.toLocaleString()}* 🪙\n` +
      `🎁 Loot : *${loot}*\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ Prochain raid dans 45min ☠`)
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
