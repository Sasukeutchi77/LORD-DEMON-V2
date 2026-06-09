// commands/meditedemon.js — MÉDITATION DÉMONIAQUE PROFONDE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const rand = arr => arr[Math.floor(Math.random()*arr.length)]
const ENTITES = [
  { nom:'Baal — Prince de l\'Enfer',   rang:'Niveau IX',  pouvoir:'Contrôle des flammes infernales',    energie:500 },
  { nom:'Asmodée — Démon de la Luxure',rang:'Niveau VIII', pouvoir:'Séduction et manipulation mentale',   energie:400 },
  { nom:'Léviathan — Seigneur des Mers',rang:'Niveau VIII',pouvoir:'Domination des eaux primordiales',   energie:380 },
  { nom:'Belzébuth — Seigneur des Mouches',rang:'Niveau IX',pouvoir:'Corruption et décomposition',      energie:450 },
  { nom:'Mammon — Démon de la Cupidité',rang:'Niveau VII', pouvoir:'Attirer la richesse et les trésors', energie:300 },
  { nom:'Azazel — L\'Ange Déchu',      rang:'Niveau X',   pouvoir:'Accès aux connaissances interdites',  energie:600 },
]
const REVELATIONS = [
  'Une vérité cachée sur votre passé sera bientôt dévoilée',
  'Un ennemi prétendant être allié travaille contre vous',
  'Votre puissance n\'a pas encore atteint son vrai plafond',
  'Un artefact ancien vous attend quelque part, proche',
  'Le prochain défi que vous affronterez changera tout',
  'Quelqu\'un pense à vous en ce moment avec des intentions ambiguës',
]
const MANTRAS_DEMON = [
  'Ave Satanis, per tenebras, ad gloriam...',
  'Chaos primordialis, da mihi potentiam...',
  'Azrael audis me, ostende viam...',
  'In nomine tenebris, spiritus meus surgit...',
]
const cooldowns = new Map()

export default async function meditedemon(sock, sender, args, msg, ctx={}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const now = Date.now()
    const cdTime = 30*60*1000
    if(now-(cooldowns.get(jid)||0)<cdTime){
      const r=Math.ceil((cdTime-(now-(cooldowns.get(jid)||0)))/60000)
      return sendMessage(sock,sender,`†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🧘 *TRANSE EN COURS*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☠ Votre transe démoniaque se termine dans *${r} min*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    }
    cooldowns.set(jid,now)

    const entite = rand(ENTITES)
    const revelation = rand(REVELATIONS)
    const mantra = rand(MANTRAS_DEMON)
    const profondeur = Math.floor(Math.random()*101)
    const barre = '█'.repeat(Math.floor(profondeur/10))+'░'.repeat(10-Math.floor(profondeur/10))
    const energieReelle = Math.floor(entite.energie*(profondeur/100))

    if(energieReelle>0 && economyDb){
      try{if(economyDb.addCoins) economyDb.addCoins(jid,Math.floor(energieReelle/10))}catch{}
    }

    await sendMessage(sock,sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🧘 *CONTACT DÉMONIAQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `✝ *_${mantra}_*\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `👹 *Entité contactée :*\n${entite.nom}\n` +
      `📊 Rang : *${entite.rang}*\n` +
      `⚡ Pouvoir transmis : *${entite.pouvoir}*\n\n` +
      `🌀 Profondeur de transe : [${barre}] *${profondeur}%*\n` +
      `💫 Énergie absorbée : *${energieReelle}* unités démoniaques\n` +
      (energieReelle>0?`💰 Bonus économique : *+${Math.floor(energieReelle/10)}* 🪙\n`:'') +
      `\n📜 *Révélation reçue :*\n_"${revelation}"_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ Prochaine transe dans 30min ☠`)
  } catch(e) {
    await sendMessage(sock,sender,`☠ Erreur: ${e.message}`)
  }
}
