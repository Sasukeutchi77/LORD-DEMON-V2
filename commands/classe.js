import { sendMessage } from '../lib/sendMessage.js'
const CLASSES = [
  { nom: "Guerrier", emoji: "⚔️", role: "Tank / DPS", style: "Force brute, armure lourde, résistance totale", stat: "STR ████ | DEF ████ | AGI ██░░" },
  { nom: "Mage", emoji: "🧙", role: "DPS / Support", style: "Magie offensive, zone, téléportation, faible DEF", stat: "INT ████ | MAG ████ | DEF █░░░" },
  { nom: "Assassin", emoji: "🗡️", role: "DPS furtif", style: "Furtivité, coup critique élevé, dague empoisonnée", stat: "AGI ████ | CRT ████ | DEF ██░░" },
  { nom: "Archer", emoji: "🏹", role: "DPS distance", style: "Précision longue portée, pièges, mobilité extrême", stat: "DEX ████ | RNG ████ | STR ██░░" },
  { nom: "Paladin", emoji: "🛡️", role: "Tank / Support", style: "Force + magie divine, soin + frappe sacrée", stat: "STR ███░ | MAG ███░ | DEF ████" },
  { nom: "Nécromancien", emoji: "💀", role: "Invocateur", style: "Invocation de morts, drain de vie, magie sombre", stat: "MAG ████ | SOM ████ | VIE ██░░" },
  { nom: "Berserk", emoji: "🔥", role: "DPS furieux", style: "Rage totale, ignore la douleur, dommages croissants", stat: "STR █████ | VIE ███░ | DEF █░░░" },
  { nom: "Druide", emoji: "🌿", role: "Soutien / Métamorphe", style: "Métamorphose animale, magie nature, soins de zone", stat: "SPT ████ | NAT ████ | MET ███░" },
]
export default async function classe(sock, sender, args, msg, ctx = {}) {
  const c = CLASSES[Math.floor(Math.random() * CLASSES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ${c.emoji} *CLASSE RPG*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ${c.emoji} *${c.nom}* — ${c.role}\n` +
    `⛧  🎭 _${c.style}_\n` +
    `✝  📊 ${c.stat}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
