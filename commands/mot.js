// commands/mot.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function mot(sock, sender, args, msg) {
  const generate = () => {
    const mots = ['épopée','crépuscule','mélancolie','lumière','ténèbres','frisson','sérénité','mystère','abîme','zenith','zéphyr','éclat','vertige','infini','chaos','solstice','équinoxe','néant','sublime','éternité']
return mots[Math.floor(Math.random()*mots.length)]
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   📝 MOT ALÉATOIRE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
