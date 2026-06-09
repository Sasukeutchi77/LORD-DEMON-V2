// commands/mystere.js — MYSTÈRE DÉMONIAQUE INTERACTIF
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const rand = arr => arr[Math.floor(Math.random()*arr.length)]
const MYSTERES = [
  { titre:'🗝️ La Clé Perdue d\'Azrael',     difficulte:'🔴 LÉGENDAIRE', indices:3, recompense:800,
    enigme:'Ce qui ouvre toutes les portes mais n\'a aucune serrure, révèle toutes les vérités mais reste lui-même caché.',
    reponse:'Le Silence', explication:'Le silence ouvre les portes de la perception sans avoir besoin de clé.' },
  { titre:'☠ Le Paradoxe du Démon Menteur', difficulte:'🟠 ÉPIQUE',    indices:2, recompense:400,
    enigme:'Je mens toujours, mais si je dis que je mens, dis-je la vérité ou un mensonge ?',
    reponse:'Paradoxe', explication:'C\'est le paradoxe du menteur — une contradiction logique sans solution.' },
  { titre:'🌑 L\'Ombre qui n\'existe pas',   difficulte:'🟡 RARE',       indices:1, recompense:200,
    enigme:'Je suis partout où il y a de la lumière mais je n\'existe que dans l\'obscurité.',
    reponse:'L\'Ombre', explication:'L\'ombre n\'existe que parce que la lumière révèle l\'absence de lumière.' },
  { titre:'🔮 La Vision Aveugle',            difficulte:'🔵 COMMUN',     indices:1, recompense:100,
    enigme:'Plus tu m\'enlèves, plus je grandis. Qu\'est-ce que je suis ?',
    reponse:'Un Trou', explication:'Un trou grandit à mesure qu\'on enlève de la matière.' },
]
const FAUX_INDICES = ['Ce n\'est pas une personne','Ce n\'est pas un objet physique','Pensez de manière abstraite','La réponse est plus simple que vous le pensez']
const cooldowns = new Map()

export default async function mystere(sock, sender, args, msg, ctx={}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const now = Date.now()
    if(now-(cooldowns.get(jid)||0)<20000)
      return sendMessage(sock,sender,`⏳ Prochaine énigme dans ${Math.ceil((20000-(now-(cooldowns.get(jid)||0)))/1000)}s`)
    cooldowns.set(jid,now)

    const m = rand(MYSTERES)
    const indice = rand(FAUX_INDICES)
    const chances = Math.floor(Math.random()*3)+2

    await sendMessage(sock,sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🔍 *MYSTÈRE DÉMONIAQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `📜 *${m.titre}*\n` +
      `🎯 Difficulté : ${m.difficulte}\n` +
      `💰 Récompense : *${m.recompense}* 🪙\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `❓ *Énigme :*\n_"${m.enigme}"_\n\n` +
      `💡 *Indice :* ${indice}\n` +
      `🎲 Tentatives : *${chances}*\n\n` +
      `📖 *Réponse :* ||${m.reponse}||\n` +
      `🧠 *Explication :* _${m.explication}_\n\n` +
      (m.recompense>0?`✅ Récompense accordée : *+${m.recompense}* 🪙\n`:'') +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Gardien des Mystères ☠`)

    if(economyDb){
      try{if(economyDb.addCoins) economyDb.addCoins(jid, Math.floor(m.recompense*0.3))}catch{}
    }
  } catch(e) {
    await sendMessage(sock,sender,`☠ Erreur: ${e.message}`)
  }
}
