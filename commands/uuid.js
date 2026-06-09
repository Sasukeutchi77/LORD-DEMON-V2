// commands/uuid.js
import { sendMessage } from '../lib/sendMessage.js'

export default async function uuid(sock, sender, args, msg) {
  const generate = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  const r = Math.random()*16|0
  return (c=='x'?r:(r&0x3|0x8)).toString(16)
})
  }
  const result = generate()
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🆔 GÉNÉRATEUR UUID   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ ${result}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
