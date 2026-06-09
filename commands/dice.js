import { sendMessage } from '../lib/sendMessage.js'
const FACES = ['⚀','⚁','⚂','⚃','⚄','⚅']
export default async function dice(sock, sender, args, msg, ctx = {}) {
  const count = Math.min(parseInt(args[0]) || 1, 6)
  const nb = parseInt(args[1]) || 6
  const results = Array.from({length: count}, () => Math.floor(Math.random() * nb) + 1)
  const total = results.reduce((a,b)=>a+b,0)
  const display = count <= 6 && nb === 6
    ? results.map(r=>FACES[r-1]).join(' ')
    : results.join(' + ')
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎲 *LANCER DE DÉS*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎲 *${count}d${nb}:* ${display}\n\n` +
    `${count > 1 ? `⛧  🧮 *Total:* ${total}\n` : ''}` +
    `✝  📊 *Résultats:* ${results.join(', ')}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
