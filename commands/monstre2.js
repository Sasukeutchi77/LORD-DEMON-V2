// commands/monstre2.js — BOSS LÉGENDAIRES AVEC SYSTÈME DE COMBAT AVANCÉ
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const BOSS = [
  { nom:'🐉 Drakon Suprême des Flammes Éternelles', hp:25000,atk:1200,def:800,  elem:'🔥 Feu',   capa:'Souffle Apocalyptique',  faib:'❄️ Glace',  xp:8000, coins:3000, loot:'Cœur de Dragon Légendaire' },
  { nom:'👹 ARCHIDÉMON — Seigneur du 9e Cercle',    hp:30000,atk:1500,def:600,  elem:'☠ Mort',   capa:'Dévoration Totale',     faib:'✨ Lumière', xp:12000,coins:5000, loot:'Corne Démoniaque Absolue' },
  { nom:'🧟 LICHE PRIMORDIALE — Maître des Morts',  hp:40000,atk:900, def:1200, elem:'💀 Nécro', capa:'Armée Infinie',          faib:'🔥 Feu Sacré',xp:15000,coins:7000,loot:'Phylactère Éternel' },
  { nom:'🌊 KRAKEN ABYSSAL — Gardien des Profondeurs',hp:35000,atk:1100,def:900,elem:'💧 Eau',   capa:'Étreinte Cosmique',     faib:'⚡ Foudre', xp:10000,coins:4500, loot:'Tentacule Magique Primordial' },
  { nom:'☠ AZRAEL DÉCHU — Ange de Destruction',    hp:50000,atk:2000,def:500,  elem:'⛧ Chaos',  capa:'Annihilation Absolue',  faib:'💎 Lumière Divine',xp:25000,coins:12000,loot:'Plume d\'Azrael' },
]

function roll(min, max) { return Math.floor(Math.random()*(max-min+1))+min }
function bar(val, max, len=12) { const f=Math.min(Math.round((val/max)*len),len); return '█'.repeat(f)+'░'.repeat(len-f) }
const cooldowns = new Map()

export default async function monstre2(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const now = Date.now()
    if (now-(cooldowns.get(jid)||0) < 60000)
      return sendMessage(sock, sender, `⏳ *Boss cooldown :* ${Math.ceil((60000-(now-(cooldowns.get(jid)||0)))/1000)}s — récupérez vos forces !`)
    cooldowns.set(jid, now)

    const boss = BOSS[Math.floor(Math.random()*BOSS.length)]

    // Combat en 3 phases
    const phase1_atk = roll(200, 600)
    const phase2_atk = roll(300, 800)
    const phase3_atk = roll(400, 1200)
    const totalAtk   = phase1_atk + phase2_atk + phase3_atk
    const dmgRecv    = roll(boss.atk * 0.1, boss.atk * 0.4)

    const hpRestant = Math.max(0, boss.hp - totalAtk)
    const pcBoss    = Math.round((hpRestant / boss.hp) * 100)
    const win       = totalAtk >= boss.hp * 0.6

    const isCrit = Math.random() < 0.12
    const critTxt = isCrit ? '\n☠ *COUP FINAL CRITIQUE !* (×2.0)' : ''

    if (win && economyDb) {
      try { if (economyDb.addCoins) economyDb.addCoins(jid, boss.coins) } catch {}
    }

    const hpBarBoss  = bar(hpRestant, boss.hp)
    const winTxt = win
      ? `🏆 *BOSS VAINCU !*\n💰 +${boss.coins.toLocaleString()} 🪙\n⚡ XP: +${boss.xp.toLocaleString()}\n🎁 Loot: *${boss.loot}*`
      : `💀 *DÉFAITE !*\n☠ Le boss est trop puissant — revenez renforcé !\n🛡️ Dommages infligés : ${totalAtk.toLocaleString()}/${boss.hp.toLocaleString()}`

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   💀 *COMBAT DE BOSS*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠ *${boss.nom}*\n` +
      `🌀 Élément : ${boss.elem} | Capa: *${boss.capa}*\n` +
      `⚠️ Faiblesse : ${boss.faib}\n\n` +
      `❤️ HP Boss [${hpBarBoss}] ${hpRestant.toLocaleString()}/${boss.hp.toLocaleString()}\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `⚔️ *Vos attaques :*\n` +
      `  Phase 1 : *${phase1_atk}*\n` +
      `  Phase 2 : *${phase2_atk}*\n` +
      `  Phase 3 : *${phase3_atk}*${critTxt}\n` +
      `  Total : *${totalAtk.toLocaleString()}* dégâts\n\n` +
      `🩸 Dégâts reçus : *${Math.floor(dmgRecv)}*\n\n` +
      `${winTxt}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Chasseur de Boss ☠`)
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
