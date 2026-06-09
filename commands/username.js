// commands/username.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function username(sock, sender, args, msg) {
  try {
  const generate = () => {
    const adj = ['Dark','Shadow','Demon','Ghost','Steel','Storm','Iron','Blood','Fire','Void','Neon','Cyber']
const noun = ['Wolf','Dragon','Phoenix','Reaper','Hunter','Knight','Mage','Raven','Cobra','Viper','Wraith','Specter']
const num = () => Math.floor(Math.random()*999)
const name = adj[Math.floor(Math.random()*adj.length)] + noun[Math.floor(Math.random()*noun.length)] + '_' + num()
return name
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   👤 GÉNÉRATEUR USERNAME   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}