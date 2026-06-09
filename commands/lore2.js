// commands/lore2.js — LORE AVANCÉ AVEC SAGA COMPLÈTE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const rand = arr => arr[Math.floor(Math.random()*arr.length)]
const CHAPITRES = [
  { titre:'🌑 L\'Éveil',          desc:'Avant même votre naissance, les ombres ont reconnu votre âme comme particulière.' },
  { titre:'⛧ Le Premier Pacte',   desc:'Dans un moment de désespoir, vous avez conclu un accord avec une entité des abysses.' },
  { titre:'⚔️ La Grande Épreuve', desc:'Une bataille qui a failli vous détruire vous a au contraire forgé dans le chaos.' },
  { titre:'☠ La Trahison',        desc:'Un allié de confiance a failli mettre fin à votre histoire dans un acte impardonnable.' },
  { titre:'🔮 La Révélation',     desc:'Les vérités cachées sur votre origine ont changé le sens de tout ce que vous aviez fait.' },
  { titre:'👑 L\'Ascension',      desc:'Vous avez embrassé ce que vous étiez vraiment et êtes devenu une légende des ténèbres.' },
]
const ALLIANCES = ['Légion des Ombres Éternelles','Confrérie du Sang Noir','Ordre du Voile Brisé','Pacte des Sept Démons','Cercle d\'Azrael','Armée du Chaos Primordial']
const ARTEFACTS = ['Épée de la Mort Incarnée','Grimoire des Sept Sceaux Brisés','Amulette du Temps Arrêté','Bouclier Forgé dans le Néant','Couronne des Neuf Cercles']
const ENEMIS    = ['Conseil des Anges Déchus','Ordre de la Lumière Absolue','Les Chasseurs du Voile','Confrérie Anti-Démonique','Armée de la Rédemption']
const CITATIONS = [
  '"Je ne suis pas né dans les ténèbres — j\'en suis l\'architecte."',
  '"Chaque cicatrice est un chapitre de mon histoire que mes ennemis ont écrit en perdant."',
  '"Le chaos n\'est pas mon ennemi. C\'est mon héritage."',
  '"Ils m\'ont maudit. Je leur ai montré ce que la malédiction voulait vraiment dire."',
  '"Les dieux créent des règles. Les légendes les brisent."',
  '"J\'ai survécu à ce qui devait me tuer. Maintenant je suis ce dont les autres doivent survivre."',
]

export default async function cmd_lore2(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
    const nom = args.join(' ') || msg?.pushName || 'Seigneur des Ombres'

    const niveauPuissance = Math.floor(Math.random()*100)+1
    const annees = Math.floor(Math.random()*900)+100
    const chap1 = rand(CHAPITRES), chap2 = rand(CHAPITRES.filter(c=>c!==chap1))
    const alliance = rand(ALLIANCES)
    const artefact = rand(ARTEFACTS)
    const ennemi   = rand(ENEMIS)
    const citation = rand(CITATIONS)
    const rang = niveauPuissance>=95?'👑 MYTHIQUE':niveauPuissance>=80?'🔴 LÉGENDAIRE':niveauPuissance>=60?'🟣 ÉPIQUE':'🔵 RARE'

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   📕 *SAGA DÉMONIAQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠ *${nom}*\n` +
      `${rang} | Puissance: *${niveauPuissance}/100*\n` +
      `⏳ Ancienneté : *${annees} ans* dans les Ténèbres\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `📖 *${chap1.titre}*\n_${chap1.desc}_\n\n` +
      `📖 *${chap2.titre}*\n_${chap2.desc}_\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `⚔️ Alliance : *${alliance}*\n` +
      `💎 Artefact : *${artefact}*\n` +
      `👿 Ennemi Juré : *${ennemi}*\n\n` +
      `💬 _${citation}_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Chroniqueur des Ténèbres ☠`,
      target !== jid ? { mentions: [target] } : undefined
    )
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
