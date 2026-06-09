import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const sessions = new Map()
const ROWS = 6, COLS = 7
function makeBoard() { return Array(ROWS).fill(null).map(() => Array(COLS).fill('⬜')) }
function renderBoard(b) { return b.map(r => r.join('')).join('\n') + '\n1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣' }
export default async function connect4(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const sub = args[0]?.toLowerCase()
  if (!sub || sub === 'start') {
    sessions.set(sender, { board: makeBoard(), turn: 0, players: [jid, 'bot'] })
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🔴 *PUISSANCE 4*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${renderBoard(makeBoard())}\n\n` +
      `☠  🔴 Toi vs 🟡 Bot — Tape .connect4 <1-7>\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const col = parseInt(args[0]) - 1
  if (isNaN(col) || col < 0 || col > 6) return sendMessage(sock, sender, `☠ Colonne invalide (1-7).`)
  if (!sessions.has(sender)) return sendMessage(sock, sender, `☠ Tape .connect4 start pour commencer.`)
  const s = sessions.get(sender)
  let placed = false
  for (let r = ROWS-1; r >= 0; r--) {
    if (s.board[r][col] === '⬜') { s.board[r][col] = '🔴'; placed = true; break }
  }
  if (!placed) return sendMessage(sock, sender, `☠ Colonne pleine !`)
  const botCol = Math.floor(Math.random() * COLS)
  for (let r = ROWS-1; r >= 0; r--) {
    if (s.board[r][botCol] === '⬜') { s.board[r][botCol] = '🟡'; break }
  }
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔴 *PUISSANCE 4*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `${renderBoard(s.board)}\n\n` +
    `☠  Tour suivant: Tape .connect4 <1-7>\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
