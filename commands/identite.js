// commands/identite.js — GÉNÉRATEUR D'IDENTITÉ DÉMONIAQUE
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const rand = arr => arr[Math.floor(Math.random()*arr.length)]
const PRENOM_DEMON = ['Zar\'ak','Beloth','Mordecai','Azraith','Khal\'vor','Seraphex','Nethrix','Vorn\'ul','Dread\'ax','Sorn\'eth','Velar','Xanoth','Grimthorn','Shaedrik','Morvaine']
const NOM_DEMON    = ['des Ombres Éternelles','du Chaos Primordial','l\'Annihilateur','le Dévastateur','Porteur de Malédictions','Briseur de Sceaux','l\'Implacable','du Voile Brisé','Seigneur Abyssal','le Transcendant']
const TITRES_D     = ['Grand Archidémon','Gardien du Neuvième Cercle','Exécuteur d\'Azrael','Seigneur de la Légion Noire','Champion du Chaos','Porteur du Sceau Maudit','Maître du Voile']
const ORIGINES_D   = ['Forêts Maudites de l\'Abîsse','Ruines du Premier Enfer','Tour des Neuf Sceaux','Catacombes du Néant','Volcan Infernal de Baal','Sanctuaire Maudit d\'Azazel']
const EMBLEMES     = ['Serpent dévorant sa queue','Crâne entouré de flammes','Épée traversant un crâne','Dragon aux yeux rouges','Lune noire avec trois étoiles']
const LANGUES      = ['Infernal Ancien','Abyssal','Draconic Démoniaque','Langue du Voile','Chaos Primordial']
export default async function identite(sock, sender, args, msg, ctx={}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const nom    = `${rand(PRENOM_DEMON)} ${rand(NOM_DEMON)}`
    const titre  = rand(TITRES_D)
    const age    = Math.floor(Math.random()*9000)+500
    const niveau = Math.floor(Math.random()*100)+1
    const origine= rand(ORIGINES_D)
    const embleme= rand(EMBLEMES)
    const langue = rand(LANGUES)
    const pouvoir= Math.floor(Math.random()*1000)+200
    await sendMessage(sock,sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🪪 *IDENTITÉ DÉMONIAQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠ *Nom :* ${nom}\n` +
      `👑 *Titre :* ${titre}\n` +
      `⏳ *Âge :* ${age.toLocaleString()} ans\n` +
      `📊 *Niveau :* ${niveau}/100\n` +
      `⚡ *Puissance :* ${pouvoir.toLocaleString()}\n\n` +
      `⸸─────────────────────────────────⸸\n` +
      `🗺️ *Origine :* ${origine}\n` +
      `🛡️ *Emblème :* ${embleme}\n` +
      `🗣️ *Langue parlée :* ${langue}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Registre des Démons ☠`)
  } catch(e){await sendMessage(sock,sender,`☠ Erreur: ${e.message}`)}
}
