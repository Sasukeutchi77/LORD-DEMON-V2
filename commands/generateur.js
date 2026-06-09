// commands/generateur.js — GÉNÉRATEUR DÉMONIAQUE MULTI-TYPES
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const NOMS_PRE  = ['Dark','Shadow','Blood','Death','Void','Chaos','Demon','Hell','Soul','Grave','Abyss','Nether','Doom','Eldritch','Cursed','Forsaken','Malefic','Sinister','Spectral','Infernal','Umbra','Mortis']
const NOMS_SUF  = ['Blade','Reaper','Lord','Wraith','Shade','Bane','Void','Slayer','Caster','Seeker','Chosen','Born','Walker','Hunter','Forge','Keeper','Sworn','Fallen','Rise','Wake','Bite','Fang']
const TITRES    = ['Seigneur des Ombres','Maître du Chaos','Gardien du Voile','Porteur de Malédiction','Enfant de la Mort','Héritier des Ténèbres','Élu d\'Azrael','Champion du Néant','Serviteur du Chaos Primordial','Briseur de Sceaux','Conquérant des Abysses']
const MOTS_MDP  = ['Ombre','Sang','Mort','Chaos','Démon','Nuit','Abîsse','Spectre','Ruine','Néant','Voile','Cendre','Enfer','Abîme']
const CODES     = ['AZR-','DEM-','STX-','CHX-','VLD-','INF-','NTH-','OBL-','ABY-','MOR-']
const PHRASES   = [
  'Les ombres murmurent ton nom dans les couloirs du néant.',
  'Le chaos te choisit comme vecteur de sa volonté.',
  'L\'obscurité te reconnaît comme l\'un des siens.',
  'Ta destinée est gravée dans le Livre Noir d\'Azrael.',
  'Les portes de l\'Enfer s\'ouvrent devant toi ce soir.',
  'Le Voile entre les mondes est le plus mince là où tu marches.',
]
const rand = arr => arr[Math.floor(Math.random()*arr.length)]

export default async function generateur(sock, sender, args, msg, ctx = {}) {
  try {
    const jid    = ctx.senderJid || getSenderJid(msg, sock)
    const prefix = process.env.PREFIX || '.'
    const type   = args[0]?.toLowerCase()

    if (!type) {
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   🎲 *GÉNÉRATEUR DÉMONIAQUE*   ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `📋 *Sous-commandes disponibles:*\n\n` +
        `⛧ \`${prefix}generateur nom\` — Nom démoniaque\n` +
        `☠ \`${prefix}generateur titre\` — Titre épique\n` +
        `✝ \`${prefix}generateur phrase\` — Phrase aléatoire\n` +
        `☩ \`${prefix}generateur code\` — Code secret\n` +
        `⸸ \`${prefix}generateur mdp\` — Mot de passe gothique\n` +
        `💀 \`${prefix}generateur tout\` — Générer tout !\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
        `⛧ LORD DEMON — Générateur Ultime ☠`)
    }

    let result = ''
    if (type === 'nom') {
      const nom = rand(NOMS_PRE) + rand(NOMS_SUF)
      result = `☠ *Nom Démoniaque :*\n\`${nom}\``
    } else if (type === 'titre') {
      result = `👑 *Titre Épique :*\n\`${rand(TITRES)}\``
    } else if (type === 'phrase') {
      result = `📜 *Phrase des Ténèbres :*\n_"${rand(PHRASES)}"_`
    } else if (type === 'code') {
      const code = rand(CODES) + Math.floor(Math.random()*9000+1000) + '-' + String.fromCharCode(65+Math.floor(Math.random()*26)) + String.fromCharCode(65+Math.floor(Math.random()*26))
      result = `🔐 *Code Secret :*\n\`${code}\``
    } else if (type === 'mdp') {
      const w1 = rand(MOTS_MDP), w2 = rand(MOTS_MDP)
      const num = Math.floor(Math.random()*999+1)
      const mdp = `${w1}${num}${w2}!`
      result = `🔒 *Mot de Passe Gothique :*\n\`${mdp}\`\n_Ne partagez pas ce mot de passe !_`
    } else if (type === 'tout') {
      const nom   = rand(NOMS_PRE) + rand(NOMS_SUF)
      const titre = rand(TITRES)
      const code  = rand(CODES) + Math.floor(Math.random()*9000+1000)
      result = `☠ *Nom :* \`${nom}\`\n👑 *Titre :* \`${titre}\`\n📜 _"${rand(PHRASES)}"_\n🔐 *Code :* \`${code}\``
    } else {
      result = `❌ Type *${type}* inconnu. Tapez \`${prefix}generateur\` pour la liste`
    }

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🎲 *GÉNÉRATEUR DÉMONIAQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${result}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Créateur des Abysses ☠`)
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
