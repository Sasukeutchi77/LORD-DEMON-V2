// commands/jackpot4.js — JACKPOT PROGRESSIF
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const SYMBOLES = [
  { s:'👑 Couronne', val:20, rare:1 },
  { s:'⛧ Démon',    val:10, rare:3 },
  { s:'☠ Crâne',   val:7,  rare:6 },
  { s:'💎 Gemme',   val:5,  rare:10 },
  { s:'🔮 Orbe',    val:3,  rare:15 },
  { s:'🩸 Sang',    val:2,  rare:20 },
  { s:'🌑 Lune',    val:1.5,rare:25 },
  { s:'⚔️ Épée',    val:1,  rare:20 },
]
let jackpotPool = 5000
const cooldowns = new Map()

function tirerSymbole() {
  const total = SYMBOLES.reduce((s,x)=>s+x.rare,0)
  let r=Math.random()*total, acc=0
  for(const s of SYMBOLES){acc+=s.rare;if(r<acc)return s}
  return SYMBOLES[SYMBOLES.length-1]
}

export default async function cmd_jackpot4(sock, sender, args, msg, ctx={}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const now = Date.now()
    if(now-(cooldowns.get(jid)||0)<15000)
      return sendMessage(sock,sender,`⏳ Cooldown: ${Math.ceil((15000-(now-(cooldowns.get(jid)||0)))/1000)}s`)
    cooldowns.set(jid,now)

    const mise = Math.max(20, Math.min(1000, parseInt(args[0])||100))
    let userCoins=9999
    try{if(economyDb){const u=economyDb.ensure?economyDb.ensure(jid):economyDb.get(jid);if(u)userCoins=u.coins}}catch{}
    if(userCoins<mise) return sendMessage(sock,sender,`☠ Fonds insuffisants ! *${userCoins}* < *${mise}* 🪙`)

    jackpotPool += Math.floor(mise*0.1)

    const r1=tirerSymbole(), r2=tirerSymbole(), r3=tirerSymbole()
    const ligne = `${r1.s}  |  ${r2.s}  |  ${r3.s}`

    let gain=0, msg_result=''
    if(r1.s===r2.s && r2.s===r3.s && r1.s==='👑 Couronne') {
      gain=jackpotPool; jackpotPool=5000
      msg_result=`👑 *JACKPOT PROGRESSIF !* ×${r1.val}\n🏆 GAIN TOTAL: *${gain.toLocaleString()}* 🪙 !!`
    } else if(r1.s===r2.s && r2.s===r3.s) {
      gain=Math.floor(mise*r1.val)
      msg_result=`🎰 *TRIPLET !* ×${r1.val}\n✅ Gain: *+${gain}* 🪙`
    } else if(r1.s===r2.s||r2.s===r3.s||r1.s===r3.s) {
      const sym=r1.s===r2.s?r1:r2.s===r3.s?r2:r1
      gain=Math.floor(mise*sym.val*0.5)
      msg_result=`✨ *PAIRE !* ×${sym.val*0.5}\n✅ Gain: *+${gain}* 🪙`
    } else {
      gain=-mise
      msg_result=`❌ *RIEN* — -${mise} 🪙`
    }

    try{
      if(gain>0 && economyDb?.addCoins) economyDb.addCoins(jid,gain)
      else if(gain<0 && economyDb?.removeCoins) economyDb.removeCoins(jid,mise)
    }catch{}

    await sendMessage(sock,sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🎰 *JACKPOT PROGRESSIF*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `💰 Mise: *${mise}* 🪙 | Pool: *${jackpotPool.toLocaleString()}* 🪙\n\n` +
      `┌────────────────────────────┐\n` +
      `│  ${ligne}  │\n` +
      `└────────────────────────────┘\n\n` +
      `${msg_result}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ Triplet 👑 = Jackpot progressif (${jackpotPool.toLocaleString()} 🪙) ☠`)
  } catch(e) {
    await sendMessage(sock,sender,`☠ Erreur: ${e.message}`)
  }
}
