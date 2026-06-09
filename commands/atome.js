import { sendMessage } from '../lib/sendMessage.js'
const ATOMES = [
  { nom: "Hydrogène", num: 1, fact: "Le plus abondant dans l'univers — forme les étoiles", symbole: "H" },
  { nom: "Carbone", num: 6, fact: "Base de toute vie, 4 liaisons, forme pure = diamant", symbole: "C" },
  { nom: "Oxygène", num: 8, fact: "21% de l'atmosphère, combustion, respiration cellulaire", symbole: "O" },
  { nom: "Or", num: 79, fact: "Conducteur parfait, résiste à la corrosion, symbole de richesse", symbole: "Au" },
  { nom: "Uranium", num: 92, fact: "Radioactif, énergie nucléaire, découvert en 1789", symbole: "U" },
  { nom: "Silicium", num: 14, fact: "Semiconducteur, puces informatiques, 26% de la croûte terrestre", symbole: "Si" },
  { nom: "Fer", num: 26, fact: "Noyau terrestre, hémoglobine du sang, métal le plus utilisé", symbole: "Fe" },
  { nom: "Plutonium", num: 94, fact: "Synthétique, arme nucléaire, hautement toxique et radioactif", symbole: "Pu" },
]
export default async function atome(sock, sender, args, msg, ctx = {}) {
  const a = ATOMES[Math.floor(Math.random() * ATOMES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⚛️ *ÉLÉMENT CHIMIQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⚛️ *${a.nom}* (${a.symbole})\n` +
    `⛧  🔢 *Numéro atomique:* ${a.num}\n` +
    `✝  📖 _${a.fact}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
