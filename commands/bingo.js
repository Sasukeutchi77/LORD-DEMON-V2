import { sendMessage } from '../lib/sendMessage.js'
const sessions = new Map()
function makeCard() {
  const nums = Array.from({length:25}, (_,i)=>i+1).sort(()=>Math.random()-0.5)
  return nums.slice(0,25)
}
function renderCard(card, called) {
  let rows = []
  for (let i=0;i<5;i++) {
    let row = []
    for (let j=0;j<5;j++) {
      const n = card[i*5+j]
      const center = i===2&&j===2
      row.push(center ? '🌟' : called.includes(n) ? '✅' : String(n).padStart(2,'0'))
    }
    rows.push(row.join(' '))
  }
  return rows.join('\n')
}
export default async function bingo(sock, sender, args, msg, ctx = {}) {
  const sub = args[0]?.toLowerCase()
  if (!sub || sub==='start') {
    const card = makeCard()
    sessions.set(sender, { card, called: [], won: false })
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🎱 *BINGO DÉMONIAQUE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠  Carte générée ! Tape .bingo <1-25> pour cocher.\n\n` +
      `${renderCard(card, [])}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const n = parseInt(args[0])
  if (isNaN(n)) return sendMessage(sock, sender, `☠ Usage: .bingo <nombre>`)
  if (!sessions.has(sender)) return sendMessage(sock, sender, `☠ Tape .bingo start pour commencer.`)
  const s = sessions.get(sender)
  if (!s.called.includes(n) && s.card.includes(n)) s.called.push(n)
  const card = renderCard(s.card, s.called)
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎱 *BINGO*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `${card}\n\n` +
    `☠  ✅ Cochés: ${s.called.length}/24\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
