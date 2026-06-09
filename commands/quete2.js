// commands/quete2.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function quete_(sock, sender, args, msg) {
  try {
  const generate = () => {
    const action = ['Défaire','Récupérer','Escorter','Découvrir','Détruire','Protéger']
const cible = ['le Dragon Rouge','l\'Artefact Ancien','le Cristal Maudit','la Tour Noire','le Portail Démoniaque','le Trésor Oublié']
const lieu = ['dans la Forêt des Ombres','sous la Montagne de Feu','dans la Crypte Maudite','au Château Interdit']
return action[Math.floor(Math.random()*action.length)]+' '+cible[Math.floor(Math.random()*cible.length)]+' '+lieu[Math.floor(Math.random()*lieu.length)]
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⚔️ QUÊTE ALÉATOIRE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}