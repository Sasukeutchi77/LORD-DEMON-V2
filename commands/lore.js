// commands/lore.js — GÉNÉRATEUR DE LORE RPG COMPLET
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const rand = arr => arr[Math.floor(Math.random() * arr.length)]

const ORIGINES = [
  'Élu des Dieux Oubliés','Enfant Maudit du Chaos','Dernier Héritier de l\'Abîsse',
  'Orphelin du Voile Spectral','Né lors d\'une Éclipse de Sang','Survivant du Rituel des Neuf',
  'Revenant des Ténèbres Éternelles','Âme Fracturée par le Néant','Forgé dans le Feu Infernal',
  'Marqué par Azrael dès la Naissance','Fragment de Divinité Déchue','Porteur du Sceau Maudit',
]
const CLASSES = [
  { nom: '⚔️ Paladin des Ombres', stats: 'FOR 90 | DEF 85 | MAG 40' },
  { nom: '🔮 Archimage Démoniaque', stats: 'FOR 45 | DEF 50 | MAG 100' },
  { nom: '🗡️ Assassin Spectral', stats: 'FOR 85 | DEF 55 | AGI 95' },
  { nom: '🩸 Nécromancien de Sang', stats: 'FOR 60 | DEF 45 | MAG 90' },
  { nom: '🔥 Berserker Infernal', stats: 'FOR 100 | DEF 40 | AGI 70' },
  { nom: '🌑 Gardien du Voile', stats: 'FOR 65 | DEF 90 | MAG 75' },
  { nom: '☠ Liche Primordiale', stats: 'FOR 50 | DEF 70 | MAG 95' },
  { nom: '⛧ Seigneur Démoniaque', stats: 'FOR 80 | DEF 80 | MAG 80' },
]
const POUVOIRS = [
  'Absorption d\'Âme','Vision des Morts','Contrôle du Temps',
  'Résurrection Obscure','Manipulation des Ombres','Immunité aux Malédictions',
  'Pacte Infernal Éternel','Frappe qui Transperce le Voile','Invocation d\'Armée Spectrale',
  'Transformation Démoniaque Totale',
]
const MALÉDICTIONS = [
  'Brûle sous la lumière sacrée','Ne peut jamais dormir','Attire les âmes errantes',
  'Maudit à ne jamais mourir','Chaque victoire coûte un fragment d\'âme',
  'Les miroirs ne reflètent pas son image','Vieilli d\'un an à chaque mensonge',
]
const DESTINS = [
  'Détruire les Neuf Sceaux du Néant','Devenir le successeur d\'Azrael',
  'Ouvrir le Portail Final entre les Mondes','Sceller le Chaos Primordial pour l\'éternité',
  'Régner sur le Cinquième Cercle','Libérer les âmes prisonnières du Voile',
  'Trahir les Dieux et devenir un Dieu du Chaos',
]
const ENNEMIS = [
  'L\'Ordre des Anges Corrompus','Le Conseil des Ombres Éternelles',
  'Les Chasseurs du Voile','La Confrérie de la Lumière Absolue',
  'Le Seigneur du Cinquième Cercle','Les Huit Archidémons Rivaux',
]

export default async function cmd_lore(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
    const nom = args.join(' ') || msg?.pushName || `Invocateur`

    const origine  = rand(ORIGINES)
    const classe   = rand(CLASSES)
    const pouvoir  = rand(POUVOIRS)
    const pouvoir2 = rand(POUVOIRS.filter(p => p !== pouvoir))
    const malédiction = rand(MALÉDICTIONS)
    const destin   = rand(DESTINS)
    const ennemi   = rand(ENNEMIS)
    const level    = Math.floor(Math.random() * 80) + 20
    const hp       = level * Math.floor(Math.random() * 30 + 70)
    const rang     = level >= 90 ? '👑 LÉGENDAIRE' : level >= 70 ? '🔴 ÉPIQUE' : level >= 50 ? '🔵 RARE' : '⚪ COMMUN'

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   📜 *LORE DU PERSONNAGE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠ *${nom}*\n` +
      `✝ Classe : ${classe.nom}\n` +
      `⛧ Rang : ${rang} | Niveau : *${level}*\n` +
      `❤️ HP Max : *${hp.toLocaleString()}*\n` +
      `📊 Stats : \`${classe.stats}\`\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `📖 *Origine :*\n_${origine}_\n\n` +
      `⚡ *Pouvoirs :*\n• ${pouvoir}\n• ${pouvoir2}\n\n` +
      `☠ *Malédiction :*\n_${malédiction}_\n\n` +
      `🌀 *Destin :*\n_${destin}_\n\n` +
      `⚔️ *Ennemi Juré :*\n_${ennemi}_\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Forger votre Légende ☠`,
      target !== jid ? { mentions: [target] } : undefined
    )
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
