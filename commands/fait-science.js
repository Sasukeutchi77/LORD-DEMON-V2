// commands/fait-science.js
import { sendMessage } from '../lib/sendMessage.js'

const FACTS = ["🔬 La lumière du soleil met 8 minutes à nous atteindre.","⚡ L'éclair est 5x plus chaud que la surface du soleil.","🧬 L'ADN humain contient environ 3 milliards de paires de bases.","🌊 L'océan couvre 71% de la surface terrestre.","🧠 Le cerveau humain consomme 20% de notre énergie totale.","🦠 Il y a plus de bactéries dans votre corps que de cellules humaines.","🌍 La Terre a 4,5 milliards d'années.","💧 L'eau peut exister en 3 états : solide, liquide, gazeux.","🔭 Il existe plus d'étoiles dans l'univers que de grains de sable sur Terre.","⚛️ Un atome est composé à 99,9% de vide."]

export default async function fait_science(sock, sender, args, msg) {
  try {
  const fact = FACTS[Math.floor(Math.random() * FACTS.length)]
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🔬 FAIT SCIENTIFIQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${fact}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}