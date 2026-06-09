import { sendMessage } from '../lib/sendMessage.js'
const ARTEFACTS3 = [
  { nom: "Masque Trickster", effet: "Change d'apparence, copie les compétences ennemies", bonus: "Tromperie +500%" },
  { nom: "Carte du Monde Perdu", effet: "Révèle tous les trésors cachés de la zone", bonus: "Exploration totale" },
  { nom: "Sablier Démoniaque", effet: "Peut rembobiner 3 secondes de temps", bonus: "1 erreur annulée" },
  { nom: "Cœur de Dragon Ancien", effet: "Infusion de flammes éternelles dans le corps", bonus: "Immunité feu + attaques enflammées" },
  { nom: "Œil de l'Abyssal", effet: "Voit à travers toutes les illusions et invisibilités", bonus: "Perception absolue" },
  { nom: "Parchemin de Résurrection Ultime", effet: "Ressuscite toute l'équipe en cas de défaite totale", bonus: "Usage unique" },
]
export default async function artefact3(sock, sender, args, msg, ctx = {}) {
  const a = ARTEFACTS3[Math.floor(Math.random() * ARTEFACTS3.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔮 *ARTEFACT MYSTIQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🔮 *Nom:* ${a.nom}\n` +
    `⛧  ✨ *Effet:* ${a.effet}\n` +
    `✝  🎁 *Bonus:* ${a.bonus}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
