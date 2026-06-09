// commands/sort.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function sort(sock, sender, args, msg) {
  const generate = () => {
    const verbes = ['Ignis','Aqua','Terra','Ventus','Fulgor','Umbra','Lux','Chaos','Nexus','Void']
const effets = ['Maximus','Inferno','Supremus','Eternum','Mortis','Vitae','Tempestis','Arcanum']
return verbes[Math.floor(Math.random()*verbes.length)] + ' ' + effets[Math.floor(Math.random()*effets.length)] + '!'
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ✨ SORT MAGIQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
