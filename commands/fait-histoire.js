// commands/fait-histoire.js
import { sendMessage } from '../lib/sendMessage.js'

const FACTS = ["⚔️ La Grande Muraille de Chine n'est PAS visible de l'espace à l'oeil nu.","👑 Cléopâtre vivait plus près de nous que de la construction des pyramides.","🗓️ L'Empire Ottoman a survécu jusqu'en 1922.","🦁 Les gladiateurs romains étaient des célébrités de leur temps.","📜 La Magna Carta a été signée en 1215.","🏛️ Rome ne s'est pas construite en un jour — mais aussi pas en 1000 ans.","⚡ Benjamin Franklin n'a pas inventé l'électricité, il a prouvé que la foudre en est.","🚢 Le Titanic coulait depuis 2h40 avant de disparaître complètement.","🗡️ Les Spartiates envoyaient leurs enfants à l'école militaire à 7 ans.","🏰 Versailles n'avait pas de toilettes — on utilisait des pots de chambre."]

export default async function fait_histoire(sock, sender, args, msg) {
  try {
  const fact = FACTS[Math.floor(Math.random() * FACTS.length)]
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   📜 FAIT HISTORIQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${fact}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}