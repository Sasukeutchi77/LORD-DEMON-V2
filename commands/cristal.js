import { sendMessage } from '../lib/sendMessage.js'
const CRISTAUX = [
  { nom: "Cristal de Sang", couleur: "Rouge sang", propriete: "Amplifie les pouvoirs offensifs", valeur: 1200, rareté: "Épique" },
  { nom: "Cristal des Ombres", couleur: "Noir absolu", propriete: "Canalise l'énergie des ténèbres", valeur: 2500, rareté: "Légendaire" },
  { nom: "Cristal Spectral", couleur: "Violet fantôme", propriete: "Ouvre un portail vers l'au-delà", valeur: 3000, rareté: "Mythique" },
  { nom: "Cristal de Feu", couleur: "Orange brûlant", propriete: "Dégâts de feu +300%", valeur: 800, rareté: "Rare" },
  { nom: "Cristal de Glace", couleur: "Bleu glacial", propriete: "Gèle les ennemis au contact", valeur: 900, rareté: "Rare" },
  { nom: "Cristal Doré", couleur: "Or pur", propriete: "Multiplie les récompenses x3", valeur: 5000, rareté: "Divin" },
]
export default async function cristal(sock, sender, args, msg, ctx = {}) {
  const c = CRISTAUX[Math.floor(Math.random() * CRISTAUX.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💎 *CRISTAL DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  💎 *Nom:* ${c.nom}\n` +
    `⛧  🎨 *Couleur:* ${c.couleur}\n` +
    `✝  ✨ *Propriété:* ${c.propriete}\n` +
    `☩  💰 *Valeur:* ${c.valeur.toLocaleString()} 🪙 | *Rareté:* ${c.rareté}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
