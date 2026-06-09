// commands/would.js — TU PRÉFÈRES ?
import { sendMessage } from '../lib/sendMessage.js'

const Q = [["Voler 🦅","Être invisible 👻"],["Vivre 200 ans sans argent","Vivre 80 ans très riche"],["Parler toutes les langues","Jouer de tous les instruments"],["Voyager dans le passé","Voyager dans le futur"],["Lire les pensées","Voir l'avenir"],["Dormir 2h et être reposé","Ne jamais avoir faim"],["Être le plus fort du monde","Être le plus intelligent"],["Ne plus jamais mentir","Ne plus jamais faire de promesse"],["Perdre la mémoire","Ne jamais oublier"],["Être riche mais seul","Être pauvre mais entouré"]]

export default async function would(sock, sender, args, msg) {
  try {
  const q = Q[Math.floor(Math.random()*Q.length)]
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🤔 TU PRÉFÈRES ?   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n🅐 ${q[0]}\n\n   VS\n\n🅑 ${q[1]}\n\n💬 Répondez A ou B !\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}