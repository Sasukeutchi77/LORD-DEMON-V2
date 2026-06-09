// commands/pari.js — SYSTÈME DE PARIS DÉMONIAQUE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const COMBATS = [
  { a:'🐉 Dragon Infernal', b:'👹 Archidémon', cote_a:1.8, cote_b:2.1 },
  { a:'⚔️ Paladin Maudit',  b:'🧟 Liche Ancienne', cote_a:2.5, cote_b:1.5 },
  { a:'🌊 Kraken',          b:'🔥 Phoenix Infernal', cote_a:1.7, cote_b:2.2 },
  { a:'💀 Nécromancien',    b:'☠ Vampire Primordial', cote_a:1.9, cote_b:1.9 },
  { a:'⛧ Seigneur du Chaos',b:'✝ Ange Déchu', cote_a:2.0, cote_b:2.0 },
]
const cooldowns = new Map()

export default async function pari(sock, sender, args, msg, ctx={}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const prefix = process.env.PREFIX||'.'
    const now = Date.now()
    if(now-(cooldowns.get(jid)||0)<15000)
      return sendMessage(sock,sender,`⏳ Cooldown paris: ${Math.ceil((15000-(now-(cooldowns.get(jid)||0)))/1000)}s`)

    const combat = COMBATS[Math.floor(Math.random()*COMBATS.length)]
    const mise = Math.max(10, Math.min(500, parseInt(args[0])||50))
    const choix = args[1]?.toLowerCase()

    if(!choix || !['a','b','1','2'].includes(choix)){
      return sendMessage(sock,sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   🎲 *PARIS DÉMONIAQUE*   ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `⚔️ *Combat du moment :*\n` +
        `A) ${combat.a} — cote *×${combat.cote_a}*\n` +
        `B) ${combat.b} — cote *×${combat.cote_b}*\n\n` +
        `💡 Usage: \`${prefix}pari <mise> <a|b>\`\n` +
        `📖 Exemple: \`${prefix}pari 100 a\`\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    }

    cooldowns.set(jid,now)
    const parie_a = ['a','1'].includes(choix)
    const gagnant = Math.random()<0.5?'a':'b'
    const win = parie_a ? gagnant==='a' : gagnant==='b'
    const cote = parie_a ? combat.cote_a : combat.cote_b
    const gains = win ? Math.floor(mise*cote) : -mise

    let userCoins=9999
    try{if(economyDb){const u=economyDb.ensure?economyDb.ensure(jid):economyDb.get(jid);if(u)userCoins=u.coins}}catch{}
    if(userCoins<mise)return sendMessage(sock,sender,`☠ Fonds insuffisants ! *${userCoins}* < *${mise}* 🪙`)

    try{
      if(gains>0 && economyDb?.addCoins) economyDb.addCoins(jid,gains)
      else if(gains<0 && economyDb?.removeCoins) economyDb.removeCoins(jid,mise)
    }catch{}

    const vainqueur = gagnant==='a'?combat.a:combat.b
    await sendMessage(sock,sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🎲 *RÉSULTAT DU PARI*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `⚔️ ${combat.a} VS ${combat.b}\n` +
      `🏆 *Vainqueur :* ${vainqueur}\n\n` +
      `🎯 Votre pari : *${parie_a?combat.a:combat.b}*\n` +
      `💰 Mise : *${mise}* 🪙 (×${cote})\n\n` +
      `${win?`✅ *GAGNÉ !* +${gains} 🪙`:`❌ *PERDU !* -${mise} 🪙`}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Maître des Paris ☠`)
  } catch(e){await sendMessage(sock,sender,`☠ Erreur: ${e.message}`)}
}
