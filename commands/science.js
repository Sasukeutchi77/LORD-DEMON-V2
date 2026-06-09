import { sendMessage } from '../lib/sendMessage.js'
const FAITS = ['💡 L\'ADN humain déplié mesure 2 mètres — assez pour aller à la Lune et retour 6000x','🌡️ L\'eau bout à 100°C au niveau de la mer mais à 70°C à l\'Everest','⚡ La foudre frappe la Terre 100 fois par seconde','🦠 Le corps humain contient plus de bactéries que de cellules humaines','🌊 L\'océan couvre 71% de la Terre mais 95% reste inexploré','🧠 Le cerveau génère assez d\'électricité pour allumer une ampoule LED','🌙 La Lune s\'éloigne de 3.8 cm de la Terre chaque année','🐙 La pieuvre possède 3 cœurs et du sang bleu','⭐ Le Soleil représente 99.86% de la masse du système solaire','🦋 Un papillon peut voir la couleur UV invisible à l\'œil humain']
export default async function science(sock, sender, args, msg, ctx = {}) {
  try {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🔬 *FAIT SCIENTIFIQUE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${FAITS[Math.floor(Math.random() * FAITS.length)]}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance des Ténèbres ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
