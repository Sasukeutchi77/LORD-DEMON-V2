// commands/magie2.js — DUEL DE MAGIE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const rand = arr => arr[Math.floor(Math.random()*arr.length)]
const roll = (min,max) => Math.floor(Math.random()*(max-min+1))+min

const ELEMENTS_DUEL = {
  feu:     { emoji:'🔥', atk:[100,200], faib:'eau',    fort:'glace',   desc:'Puissance brute et destruction' },
  eau:     { emoji:'💧', atk:[80,160],  faib:'foudre', fort:'feu',     desc:'Régénération et contrôle' },
  foudre:  { emoji:'⚡', atk:[120,220], faib:'terre',  fort:'eau',     desc:'Vitesse et paralysie' },
  terre:   { emoji:'🪨', atk:[90,170],  faib:'vent',   fort:'foudre',  desc:'Défense et écrasement' },
  ombre:   { emoji:'🌑', atk:[130,240], faib:'lumiere',fort:'vent',    desc:'Corruption et malédiction' },
  glace:   { emoji:'❄️', atk:[110,190], faib:'feu',    fort:'eau',     desc:'Ralentissement et fragmentation' },
}
const COUPS_SPECIAUX = ['Vague Finale','Explosion Absolue','Coup de Grâce','Assaut Céleste','Frappe Dimensionnelle']
const cooldowns = new Map()

export default async function magie2(sock, sender, args, msg, ctx={}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const now = Date.now()
    if(now-(cooldowns.get(jid)||0)<20000)
      return sendMessage(sock,sender,`⏳ Cooldown duel: ${Math.ceil((20000-(now-(cooldowns.get(jid)||0)))/1000)}s`)
    cooldowns.set(jid,now)

    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    const mentions = target?[target]:[]
    const adversaire = target?`@${target.split('@')[0]}`:'un Mage Rival'

    const elemKeys = Object.keys(ELEMENTS_DUEL)
    const e1Key = rand(elemKeys)
    const e2Key = rand(elemKeys)
    const e1 = ELEMENTS_DUEL[e1Key]
    const e2 = ELEMENTS_DUEL[e2Key]

    // Calcul dégâts avec avantages
    const isFaib1 = e1.faib === e2Key
    const isFort1 = e1.fort === e2Key
    let dmg1 = roll(...e1.atk)
    let dmg2 = roll(...e2.atk)
    if(isFaib1) { dmg1=Math.floor(dmg1*0.6); dmg2=Math.floor(dmg2*1.4) }
    if(isFort1) { dmg1=Math.floor(dmg1*1.4); dmg2=Math.floor(dmg2*0.6) }

    const crit = Math.random()<0.15
    if(crit) dmg1=Math.floor(dmg1*1.8)

    const win = dmg1>dmg2
    const coup = rand(COUPS_SPECIAUX)
    const gains = win ? roll(20,80) : 0
    if(win && economyDb){try{if(economyDb.addCoins)economyDb.addCoins(jid,gains)}catch{}}

    const avantage = isFort1?'⚡ AVANTAGE ÉLÉMENTAIRE':isFaib1?'⚠️ DÉSAVANTAGE':''

    await sendMessage(sock,sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🔮 *DUEL DE MAGIE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${e1.emoji} *Vous* (${e1Key}) VS ${e2.emoji} *${adversaire}* (${e2Key})\n` +
      (avantage?`${avantage}\n`:'')+`\n` +
      `⸸─────────────────────────────────⸸\n` +
      `⚡ *${coup}* !\n\n` +
      `🗡️ Vos dégâts : *${dmg1}*${crit?' ☠ CRITIQUE !':''}\n` +
      `🛡️ Dégâts adverses : *${dmg2}*\n\n` +
      `${win?`✅ *VICTOIRE !* +${gains} 🪙\n_${e1.desc}_`:`❌ *DÉFAITE !*\n_${e2.desc}_ a triomphé`}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ Usage: \`.magie2 @adversaire\` ☠`,
      mentions.length?{mentions:[jid,...mentions]}:{mentions:[jid]})
  } catch(e) {
    await sendMessage(sock,sender,`☠ Erreur: ${e.message}`)
  }
}
