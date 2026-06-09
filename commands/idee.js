// commands/idee.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function idee(sock, sender, args, msg) {
  try {
  const generate = () => {
    const adj = ['Ultra','Super','Méga','Turbo','Smart','Dark','Cyber','Neo','Auto','Hyper']
const noun = ['Bot','App','Système','Réseau','Plateforme','Outil','Hub','Base','Engine','Lab']
const domain = ['pour gamers','pour créateurs','pour entrepreneurs','pour étudiants','pour artistes','démonique','social','financier']
return adj[Math.floor(Math.random()*adj.length)]+noun[Math.floor(Math.random()*noun.length)]+' '+domain[Math.floor(Math.random()*domain.length)]
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   💡 IDÉE DE PROJET   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}