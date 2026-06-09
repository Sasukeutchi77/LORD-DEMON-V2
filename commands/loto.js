// commands/loto.js — LOTERIE 🎰
import { sendMessage } from '../lib/sendMessage.js'

export default async function loto(sock, sender, args, msg) {
  const nums = new Set()
  while(nums.size < 6) nums.add(1 + Math.floor(Math.random() * 49))
  const sorted = [...nums].sort((a,b) => a-b)
  const bonus = 1 + Math.floor(Math.random() * 10)
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🎰 NUMÉROS LOTO   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n🎱 ${sorted.map(n=>String(n).padStart(2,'0')).join(' — ')}\n⭐ Bonus: *${String(bonus).padStart(2,'0')}*\n\n💡 Bonne chance ! 🍀\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  )
}
