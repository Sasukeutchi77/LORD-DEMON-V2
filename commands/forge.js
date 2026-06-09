// commands/forge.js — SYSTÈME DE FORGE AVEC RECETTES
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import { economyDb } from '../lib/economySystem.js'

const RECETTES = {
  'epee_maudite':    { nom: '⚔️ Épée Maudite',       cout: 300,  atk: 85,  def: 20,  desc: 'Lame forgée dans le sang démoniaque' },
  'bouclier_ombre':  { nom: '🛡️ Bouclier des Ombres', cout: 250,  atk: 10,  def: 95,  desc: 'Absorbe la magie noire' },
  'orbe_chaos':      { nom: '🔮 Orbe du Chaos',       cout: 400,  atk: 70,  def: 30,  desc: 'Amplifie les sorts de 50%' },
  'dague_spectrale': { nom: '🗡️ Dague Spectrale',     cout: 200,  atk: 70,  def: 15,  desc: 'Critique +25%, invisible dans l\'ombre' },
  'grimoire_noir':   { nom: '📕 Grimoire Noir',        cout: 500,  atk: 90,  def: 10,  desc: 'Contient les 7 sorts interdits' },
  'amulette_demon':  { nom: '📿 Amulette Démoniaque',  cout: 350,  atk: 40,  def: 60,  desc: 'Protection contre les malédictions' },
  'couronne_mort':   { nom: '👑 Couronne de Mort',     cout: 1000, atk: 100, def: 100, desc: 'L\'artefact ultime du Seigneur Démoniaque' },
}
const cooldowns = new Map()

export default async function forge(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const prefix = process.env.PREFIX || '.'
    const sub = args[0]?.toLowerCase()

    // Liste des recettes
    if (!sub || sub === 'liste' || sub === 'list') {
      const lignes = Object.entries(RECETTES).map(([k, r]) =>
        `⛧ \`${k}\` — *${r.nom}*\n  💰 ${r.cout} 🪙 | ⚔️ ATK+${r.atk} 🛡️ DEF+${r.def}`
      ).join('\n\n')
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   🔨 *FORGE DÉMONIAQUE*   ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `📋 *Recettes disponibles:*\n\n${lignes}\n\n` +
        `💡 Usage: \`${prefix}forge <nom_recette>\`\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
        `⛧ LORD DEMON — Forger la Puissance ☠`)
    }

    const recette = RECETTES[sub]
    if (!recette) {
      const disponibles = Object.keys(RECETTES).join(', ')
      return sendMessage(sock, sender,
        `☠ Recette *${sub}* inconnue !\n📋 Disponibles: \`${disponibles}\`\n💡 \`${prefix}forge liste\` pour voir tout`)
    }

    // Cooldown
    const now = Date.now()
    if (now - (cooldowns.get(jid) || 0) < 30000)
      return sendMessage(sock, sender, `⏳ La forge refroidit: ${Math.ceil((30000-(now-(cooldowns.get(jid)||0)))/1000)}s`)
    cooldowns.set(jid, now)

    // Vérifier fonds
    let coins = 99999
    try { if (economyDb) { const u = economyDb.ensure ? economyDb.ensure(jid) : economyDb.get(jid); if (u) coins = u.coins } } catch {}
    if (coins < recette.cout)
      return sendMessage(sock, sender,
        `☠ Fonds insuffisants !\n💰 Requis: *${recette.cout}* 🪙 | Vous avez: *${coins}* 🪙`)

    try { if (economyDb?.removeCoins) economyDb.removeCoins(jid, recette.cout) } catch {}

    // Chance de critique de forge
    const crit = Math.random() < 0.15
    const atkFinal = crit ? Math.floor(recette.atk * 1.3) : recette.atk
    const defFinal = crit ? Math.floor(recette.def * 1.3) : recette.def
    const critTxt = crit ? '\n✨ *FORGE CRITIQUE !* (+30% sur tous les stats)' : ''

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🔨 *OBJET FORGÉ !*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `✅ *${recette.nom}* créé !${critTxt}\n\n` +
      `📖 _${recette.desc}_\n\n` +
      `⚔️ ATK : *+${atkFinal}*\n` +
      `🛡️ DEF : *+${defFinal}*\n` +
      `💰 Coût : *-${recette.cout}* 🪙\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Maître de la Forge ☠`)
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
