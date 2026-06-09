// commands/arme.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function arme(sock, sender, args, msg) {
  const generate = () => {
    const adj = ['Maudite','Légendaire','Ancienne','Démonique','Sacrée','Corrompue','Spectrale']
const type = ['Épée','Lance','Arc','Hache','Dague','Marteau','Faux','Bâton']
const nom = ['Crépuscule','Ténèbres','Inferno','Azrael','Nemesis','Requiem','Chaos']
return type[Math.floor(Math.random()*type.length)]+' '+adj[Math.floor(Math.random()*adj.length)]+' de '+nom[Math.floor(Math.random()*nom.length)]
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ⚔️ ARME LÉGENDAIRE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
