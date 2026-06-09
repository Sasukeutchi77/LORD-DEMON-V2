// commands/fusion.js — SYSTÈME DE FUSION D'ÉLÉMENTS
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const ELEMENTS = {
  feu:     { emoji: '🔥', puissance: 80 },
  eau:     { emoji: '💧', puissance: 70 },
  ombre:   { emoji: '🌑', puissance: 90 },
  lumiere: { emoji: '✨', puissance: 75 },
  chaos:   { emoji: '💥', puissance: 100 },
  glace:   { emoji: '❄️', puissance: 72 },
  foudre:  { emoji: '⚡', puissance: 85 },
  terre:   { emoji: '🪨', puissance: 65 },
  vent:    { emoji: '🌪️', puissance: 68 },
  sang:    { emoji: '🩸', puissance: 88 },
}

const FUSIONS = {
  'feu+eau':       { nom: '💨 Vapeur Infernale',   mult: 1.3, effet: 'Brûlure + Ralentissement' },
  'feu+ombre':     { nom: '🔮 Flamme Maudite',     mult: 1.8, effet: 'Feu qui dévore l\'âme' },
  'feu+glace':     { nom: '☄️ Nova Explosive',     mult: 2.0, effet: 'Explosion thermique dévastatrice' },
  'feu+foudre':    { nom: '⚡🔥 Tempête Ardente',  mult: 1.9, effet: 'Électro-brûlure massive' },
  'ombre+lumiere': { nom: '🌀 Vide Absolu',        mult: 2.5, effet: 'Annihilation de la réalité' },
  'ombre+chaos':   { nom: '☠️ Néant Démoniaque',   mult: 2.2, effet: 'Destruction totale' },
  'ombre+sang':    { nom: '🩸 Pacte de Sang Noir', mult: 2.0, effet: 'Lien mortel indestructible' },
  'foudre+eau':    { nom: '⚡💧 Tempête Électrique',mult: 1.7, effet: 'Vague d\'électrocution' },
  'chaos+lumiere': { nom: '💫 Singularité Sacrée', mult: 2.3, effet: 'Force divine et chaotique' },
  'terre+vent':    { nom: '🌪️ Tempête de Sable',   mult: 1.5, effet: 'Érosion et aveuglement' },
  'sang+feu':      { nom: '🔥🩸 Brasier Vital',    mult: 1.9, effet: 'Consume la vie pour la puissance' },
}

function normalize(s) { return s?.toLowerCase().replace(/é|è|ê/g,'e').replace(/à/g,'a').replace(/[^a-z]/g,'') }

export default async function cmd_fusion(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)

    const listeElements = Object.keys(ELEMENTS).map(k => `${ELEMENTS[k].emoji} \`${k}\``).join(' • ')

    if (!args[0] || !args[1]) {
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   ⚗️ *SYSTÈME DE FUSION*   ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `💡 Usage: \`.fusion <elem1> <elem2>\`\n\n` +
        `🔮 *Éléments disponibles:*\n${listeElements}\n\n` +
        `📖 Exemple: \`.fusion feu ombre\`\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
        `⛧ ${Object.keys(FUSIONS).length} combinaisons secrètes à découvrir ! ☠`)
    }

    const e1 = normalize(args[0])
    const e2 = normalize(args[1])

    if (!ELEMENTS[e1]) return sendMessage(sock, sender, `☠ Élément *${args[0]}* inconnu. Choisissez parmi: ${Object.keys(ELEMENTS).join(', ')}`)
    if (!ELEMENTS[e2]) return sendMessage(sock, sender, `☠ Élément *${args[1]}* inconnu. Choisissez parmi: ${Object.keys(ELEMENTS).join(', ')}`)

    const key1 = `${e1}+${e2}`, key2 = `${e2}+${e1}`
    const fusion = FUSIONS[key1] || FUSIONS[key2]

    const pBase = ELEMENTS[e1].puissance + ELEMENTS[e2].puissance
    const pFinale = fusion ? Math.floor(pBase * fusion.mult) : Math.floor(pBase * 1.1)
    const rarety = pFinale >= 300 ? '🔴 LÉGENDAIRE' : pFinale >= 200 ? '🟣 ÉPIQUE' : pFinale >= 150 ? '🔵 RARE' : '⚪ COMMUN'

    if (fusion) {
      await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   ⚗️ *FUSION RÉUSSIE !*   ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `${ELEMENTS[e1].emoji} *${e1}* + ${ELEMENTS[e2].emoji} *${e2}*\n\n` +
        `✨ *Résultat :* ${fusion.nom}\n` +
        `🏆 *Rareté :* ${rarety}\n` +
        `💥 *Puissance :* *${pFinale}* (×${fusion.mult})\n` +
        `⚡ *Effet :* ${fusion.effet}\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
        `⛧ LORD DEMON — Alchimie des Ténèbres ☠`)
    } else {
      await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   ⚗️ *FUSION INSTABLE*   ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `${ELEMENTS[e1].emoji} *${e1}* + ${ELEMENTS[e2].emoji} *${e2}*\n\n` +
        `⚠️ Combinaison non répertoriée dans le grimoire.\n` +
        `💥 *Puissance brute :* ${pFinale}\n` +
        `🏆 *Rareté :* ${rarety}\n\n` +
        `🔍 *Résultat expérimental* — effets imprévisibles !\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
        `⛧ Essayez d'autres combinaisons ! ☠`)
    }
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
