import { sendMessage } from '../lib/sendMessage.js'
const ARTEFACTS = [
  { nom: "Gemme du Néant", effet: "Absorbe toute magie, dangereux à manier", rareté: "Mythique" },
  { nom: "Épée du Destin", effet: "Tranche l'espace-temps, +999 ATK pure", rareté: "Légendaire" },
  { nom: "Bouclier Éternel", effet: "Bloque TOUT dégât une fois par combat", rareté: "Divin" },
  { nom: "Amulette des Anciens", effet: "Régénère 10% PV/tour, anti-poison permanent", rareté: "Épique" },
  { nom: "Couronne du Démon", effet: "+200% magie sombre, corruption de l'âme", rareté: "Mythique" },
  { nom: "Orbe Prophétique", effet: "Prédit le coup ennemi, esquive automatique", rareté: "Légendaire" },
  { nom: "Étoile Filante", effet: "Forme céleste 1 fois, +500% toutes stats", rareté: "Divin" },
  { nom: "Fiole Phénix", effet: "Ressuscite automatiquement 1 fois avec 100% PV", rareté: "Mythique" },
]
export default async function artefact2(sock, sender, args, msg, ctx = {}) {
  const a = ARTEFACTS[Math.floor(Math.random() * ARTEFACTS.length)]
  const RARITY_COLORS = { Mythique: "⛧🔴", Légendaire: "⭐🟡", Divin: "👼🔵", Épique: "💜🟣" }
  const badge = RARITY_COLORS[a.rareté] || "⭐"
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💎 *ARTEFACT LÉGENDAIRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  💎 *Nom:* ${a.nom}\n` +
    `⛧  ✨ *Effet:* ${a.effet}\n` +
    `✝  ${badge} *Rareté:* ${a.rareté}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
