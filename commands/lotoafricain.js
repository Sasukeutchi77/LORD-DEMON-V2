import { sendMessage } from '../lib/sendMessage.js'
export default async function lotoafricain(sock, sender, args, msg, ctx = {}) {
  try {
    const tirer = (max, n) => { const s = new Set(); while (s.size < n) s.add(Math.floor(Math.random() * max) + 1); return [...s].sort((a,b) => a-b) }
    const nums = tirer(90, 5), bonus = tirer(10, 1)[0]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🎰 *LOTO AFRICAIN*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n☩ Numéros : *${nums.join(' — ')}*\n✝ Numéro chance : *⭐ ${bonus}*\n\n🍀 Bonne chance!\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
