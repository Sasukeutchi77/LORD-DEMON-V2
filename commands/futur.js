// commands/futur.js — PRÉDICTION DU FUTUR DÉTAILLÉE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const rand = arr => arr[Math.floor(Math.random()*arr.length)]

const EVENEMENTS = [
  { type:'💰 Fortune',   pos:['Une richesse inattendue arrive dans votre direction','Un investissement se révélera très rentable','Quelqu\'un vous offrira une opportunité rare'],
                          neg:['Une perte financière imminente — prudence','Une dépense imprévue risque de vous déséquilibrer','Quelqu\'un cherche à vous escroquer'] },
  { type:'⚔️ Conflit',   pos:['Vous sortirez vainqueur du prochain affrontement','Votre ennemi capitulera sans combat','Une alliance inattendue vous renforcera'],
                          neg:['Une confrontation difficile approche — préparez-vous','Quelqu\'un prépare une trahison dans votre entourage','Un conflit évitable deviendra inévitable'] },
  { type:'❤️ Relations', pos:['Un lien profond va se renforcer','Une rencontre importante approche','La loyauté d\'un proche sera prouvée'],
                          neg:['Une relation va se fracturer','La jalousie ronge quelqu\'un de proche','Un mensonge sera révélé'] },
  { type:'🔮 Mystique',  pos:['Votre puissance démoniaque va s\'amplifier','Un portail de chance s\'ouvrira pour vous','Les esprits vous guideront dans vos choix'],
                          neg:['Une malédiction ancienne se réveille','Les ombres réclament quelque chose de vous','Un sort vous vise actuellement'] },
  { type:'🏆 Succès',    pos:['Un projet aboutira au-delà de vos espérances','La reconnaissance que vous méritez arrive enfin','Un obstacle majeur s\'effacera de lui-même'],
                          neg:['L\'échec que vous craignez est plus proche que vous ne le pensez','Un effort mal dirigé vous coûtera du temps','Votre plan actuel a une faille critique'] },
]
const DELAIS = ['dans les prochaines heures','avant la fin de cette journée','d\'ici 3 jours','sous 7 jours','avant la prochaine lune','dans les semaines à venir']
const INTENSITES = ['⚪ Faible','🔵 Modérée','🟡 Notable','🟠 Forte','🔴 PUISSANTE','☠ ABSOLUE']
const CONSEILS = [
  '⛧ _Méfiez-vous de ce qui brille trop dans l\'obscurité_',
  '☠ _Les ombres savent ce que la lumière cache_',
  '✝ _La force vient du chaos maîtrisé_',
  '☩ _Ne faites confiance qu\'à votre instinct démoniaque_',
  '⸸ _Ce que vous craignez est souvent ce dont vous avez besoin_',
]

export default async function futur(sock, sender, args, msg, ctx = {}) {
  try {
    const jid  = ctx.senderJid || getSenderJid(msg, sock)
    const nom  = args.join(' ') || msg?.pushName || 'Invocateur'

    const evt       = rand(EVENEMENTS)
    const isPos     = Math.random() > 0.4
    const prediction = rand(isPos ? evt.pos : evt.neg)
    const delai     = rand(DELAIS)
    const intensite = INTENSITES[Math.floor(Math.random() * INTENSITES.length)]
    const conseil   = rand(CONSEILS)
    const conf      = Math.floor(Math.random() * 40) + 60 // 60-100%
    const isAbsolu  = conf >= 95

    const signe = isPos ? '✅' : '⚠️'
    const tonalite = isPos ? '🟢 Favorable' : '🔴 Défavorable'

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🔮 *VISION DU FUTUR*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠ *${nom}*, les ténèbres révèlent...\n\n` +
      `🌀 Domaine : *${evt.type}*\n` +
      `🌡️ Intensité : *${intensite}*\n` +
      `🎭 Tonalité : ${tonalite}\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `${signe} *Prédiction :*\n_"${prediction}"_\n\n` +
      `⏳ Échéance : *${delai}*\n` +
      `📊 Certitude de l\'Oracle : *${conf}%*${isAbsolu ? ' — ⚠️ PROPHÉTIE ABSOLUE' : ''}\n\n` +
      `💡 *Conseil des Ténèbres :*\n${conseil}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Voyant des Abysses ☠`)
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
