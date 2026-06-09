// commands/potion2.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function potion_(sock, sender, args, msg) {
  const generate = () => {
    const adj = ['Cramoisie','Argentée','Verdâtre','Noire','Bleue','Dorée','Violette','Écarlate']
const effet = ['de Force','de Vitesse','de Vie','d\'Intelligence','d\'Invisibilité','de Feu','de Glace','de Poison','de Chance']
return 'Potion '+adj[Math.floor(Math.random()*adj.length)]+' '+effet[Math.floor(Math.random()*effet.length)]
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⚗️ POTION ALÉATOIRE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
