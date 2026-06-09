// commands/malediction2.js — MALÉDICTION DÉMONIAQUE AVEC NIVEAUX
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const MALEDICTIONS = [
  // [niveau, malédiction, durée, effet_jeu]
  { n:1, txt:'Tes applications plantent exactement quand tu as besoin d\'elles',         dur:'1 jour',   effet:'Chance -5%'  },
  { n:1, txt:'Ton chargeur ne dépasse jamais 1% quand tu en as besoin',                  dur:'2 jours',  effet:'Chance -5%'  },
  { n:2, txt:'Tes alliés t\'abandonnent au pire moment du combat',                       dur:'3 jours',  effet:'Chance -15%' },
  { n:2, txt:'Chaque victoire que tu remportes te coûte deux fois l\'effort',            dur:'5 jours',  effet:'XP -20%'     },
  { n:3, txt:'Les ombres te suivent et murmurent tes pires erreurs',                      dur:'7 jours',  effet:'Malus -30%'  },
  { n:3, txt:'Tout ce que tu touches en jeu finit par se retourner contre toi',           dur:'1 semaine',effet:'RNG -25%'    },
  { n:4, txt:'Azrael inscrit ton nom sur la liste des âmes à récupérer prématurément',   dur:'2 semaines',effet:'HP -40%'    },
  { n:4, txt:'Ta chance est consumée par les flammes infernales pour une longue période', dur:'1 mois',  effet:'Tout -50%'   },
  { n:5, txt:'Le Chaos primordial t\'a choisi comme vecteur de sa destruction',          dur:'Éternelle',effet:'Malédiction absolue' },
]
const FORMULES = [
  '⛧ *In nomine Daemonis, maledictus esto!*',
  '☠ *Tenebris te consumat, chaos te devoret!*',
  '✝ *Per ignem et umbram, maledictus in aeternum!*',
  '☩ *Azrael te videt, nomen tuum scriptum est!*',
  '⸸ *Chaos primordialis te petit, nusquam fugies!*',
]
const rand = arr => arr[Math.floor(Math.random()*arr.length)]

export default async function cmd_malediction2(sock, sender, args, msg, ctx = {}) {
  try {
    const jid    = ctx.senderJid || getSenderJid(msg, sock)
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
    const mentions = target !== jid ? [target] : []
    const cible  = target !== jid ? `@${target.split('@')[0]}` : 'vous-même'

    // Niveau aléatoire pondéré (plus rare = plus puissant)
    const weights = [30, 30, 20, 15, 5]
    const total = weights.reduce((a,b)=>a+b,0)
    let r = Math.random()*total, acc=0, niv=1
    for (let i=0;i<weights.length;i++){acc+=weights[i];if(r<acc){niv=i+1;break}}

    const candidates = MALEDICTIONS.filter(m => m.n === niv)
    const mal = rand(candidates.length ? candidates : MALEDICTIONS)
    const formule = rand(FORMULES)
    const etoiles = '💀'.repeat(niv)

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🩸 *MALÉDICTION DÉMONIAQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `🎯 Victime : *${cible}*\n` +
      `💀 Niveau : *${niv}/5* ${etoiles}\n\n` +
      `📜 *La malédiction :*\n_"${mal.txt}"_\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `⏳ Durée : *${mal.dur}*\n` +
      `⚡ Effet : *${mal.effet}*\n\n` +
      `✝ *Formule d\'invocation :*\n${formule}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Maître des Malédictions ☠`,
      mentions.length ? { mentions } : undefined
    )
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
