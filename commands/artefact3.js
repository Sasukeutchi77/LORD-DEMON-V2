import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["💎 Gemme du Néant — Absorbe toute magie, dangereux à manier","⚔️ Épée du Destin — Tranche espace-temps, +999 ATK pure","🛡️ Bouclier Éternel — Bloque TOUT dégât une fois par combat","📿 Amulette des Anciens — Régénère 10% PV/tour, anti-poison","👑 Couronne du Démon — +200% magie sombre, corruption âme","🔮 Orbe Prophétique — Prédit coup ennemi, esquive automatique","🗺️ Carte Monde Perdu — Révèle tous trésors cachés de la zone","🌟 Étoile Filante — Forme céleste 1 fois, +500% toutes stats","🎭 Masque Trickster — Change apparence, copie compétences","⚗️ Fiole Phoenix — Ressuscite auto 1 fois avec 100% PV"]
export default async function artefact3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 💎 *ARTEFACT3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}