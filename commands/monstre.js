// commands/monstre.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function monstre(sock, sender, args, msg) {
  const generate = () => {
    const prefix = ['Ombre','Sang','Feu','Nuit','Mort','Chaos','Ténèbres','Abîme']
const type = ['Dragon','Démon','Liche','Golem','Spectre','Vampire','Loup','Araignée']
const suffix = ['Ancien','Corrompu','Légendaire','Maudit','Immortel','Primordial']
return prefix[Math.floor(Math.random()*prefix.length)]+type[Math.floor(Math.random()*type.length)]+' '+suffix[Math.floor(Math.random()*suffix.length)]
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   👹 MONSTRE ALÉATOIRE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
