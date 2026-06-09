// commands/grimoire2.js — GRIMOIRE INTERACTIF AVEC SOUS-COMMANDES
import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const SORTS = [
  { id:'flammes',   nom:'🔥 Flammes Éternelles',     niveau:5, type:'Attaque',    mana:50,  dmg:[120,200], effet:'Brûlure continue — -15HP/tour pendant 3 tours', cooldown:'45s' },
  { id:'ombre',     nom:'🌑 Voile des Ombres',         niveau:3, type:'Défense',    mana:35,  dmg:[0,0],     effet:'Invisibilité + esquive +40% pendant 60s',        cooldown:'2min' },
  { id:'sang',      nom:'🩸 Malédiction de Sang',     niveau:5, type:'Maléfice',   mana:80,  dmg:[80,120],  effet:'Réduit la force ennemie de 50% pour 24h',        cooldown:'1h' },
  { id:'regen',     nom:'💚 Régénération Démoniaque', niveau:3, type:'Soin',       mana:40,  dmg:[150,250], effet:'Restaure 200 HP en 10 secondes',                  cooldown:'30s' },
  { id:'tempete',   nom:'⚡ Tempête Électrique',       niveau:4, type:'Attaque',    mana:65,  dmg:[100,180], effet:'Frappe jusqu\'à 5 ennemis simultanément',         cooldown:'1min' },
  { id:'bouclier',  nom:'🛡️ Bouclier de Pierre',      niveau:2, type:'Défense',    mana:20,  dmg:[0,0],     effet:'Absorbe les 3 prochains dégâts (max 500)',        cooldown:'20s' },
  { id:'vision',    nom:'👁️ Vision du Futur',          niveau:3, type:'Divination', mana:30,  dmg:[0,0],     effet:'Révèle les intentions de l\'ennemi sur 3 tours',  cooldown:'5min' },
  { id:'mort',      nom:'☠ Mort Instantanée',         niveau:5, type:'Ultime',     mana:120, dmg:[300,500], effet:'10% de chance de tuer instantanément',           cooldown:'10min' },
  { id:'convoc',    nom:'👹 Grande Convocation',       niveau:4, type:'Invocation', mana:90,  dmg:[0,0],     effet:'Invoque un Archidémon pour 5 minutes',           cooldown:'30min' },
  { id:'chaos',     nom:'💥 Chaos Primordial',         niveau:5, type:'Ultime',     mana:150, dmg:[250,450], effet:'Détruit toutes les protections + dégâts massifs', cooldown:'1h' },
]
const rand = arr => arr[Math.floor(Math.random()*arr.length)]
function rollDmg(d) { return d[0]===0?null:Math.floor(Math.random()*(d[1]-d[0]+1))+d[0] }

export default async function grimoire2(sock, sender, args, msg, ctx = {}) {
  try {
    const jid = ctx.senderJid || getSenderJid(msg, sock)
    const sub = args[0]?.toLowerCase()

    // Sous-commande: liste
    if (!sub || sub === 'liste' || sub === 'list') {
      const lignes = SORTS.map(s =>
        `${'⭐'.repeat(s.niveau)} \`${s.id}\` — *${s.nom}*\n  💧 Mana: ${s.mana} | 🏷️ ${s.type}`
      ).join('\n\n')
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   📚 *GRIMOIRE DÉMONIAQUE II*   ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `${lignes}\n\n` +
        `💡 Usage: \`.grimoire2 <id_sort>\`\n` +
        `💡 Exemple: \`.grimoire2 flammes\`\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
        `⛧ ${SORTS.length} sorts dans le grimoire ☠`)
    }

    // Consulter un sort précis
    const sort = SORTS.find(s => s.id === sub)
    if (!sort) {
      const alea = rand(SORTS)
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   📚 *GRIMOIRE — SORT ALÉATOIRE*   ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `✨ *${alea.nom}* ${'⭐'.repeat(alea.niveau)}\n` +
        `🏷️ Type : *${alea.type}*\n` +
        `💧 Mana : *${alea.mana}*\n` +
        `⏱️ Cooldown : *${alea.cooldown}*\n\n` +
        `⚡ *Effet :* ${alea.effet}\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
        `⛧ \`.grimoire2 liste\` pour tous les sorts ☠`)
    }

    const dmg = rollDmg(sort.dmg)
    const isCrit = Math.random() < 0.15
    const dmgFinal = dmg ? (isCrit ? Math.floor(dmg * 1.7) : dmg) : null
    const critTxt = isCrit && dmgFinal ? `\n☠ *CRITIQUE !* ×1.7` : ''

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   📚 *${sort.nom.toUpperCase()}*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${'⭐'.repeat(sort.niveau)} Niveau *${sort.niveau}*\n` +
      `🏷️ Type : *${sort.type}*\n` +
      `💧 Mana requis : *${sort.mana}*\n` +
      `⏱️ Cooldown : *${sort.cooldown}*\n\n` +
      `⚡ *Effet :*\n_${sort.effet}_${critTxt}\n` +
      (dmgFinal ? `\n💥 *Dégâts lancés : ${dmgFinal}*\n` : '') +
      `\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n` +
      `⛧ LORD DEMON — Grimoire des Ténèbres ☠`)
  } catch (e) {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
}
