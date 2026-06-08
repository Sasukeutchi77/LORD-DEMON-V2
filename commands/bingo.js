// commands/bingo.js — BINGO 🎱
import { sendMessage } from '../lib/sendMessage.js'

const sessions = new Map() // jid -> { card, called, won }

function makeCard() {
  const card = []
  const cols = [[1,15],[16,30],[31,45],[46,60],[61,75]]
  for (let c = 0; c < 5; c++) {
    const col = []
    const [min, max] = cols[c]
    const nums = []
    while (nums.length < 5) {
      const n = min + Math.floor(Math.random() * (max - min + 1))
      if (!nums.includes(n)) nums.push(n)
    }
    card.push(nums.sort((a, b) => a - b))
  }
  card[2][2] = 'FREE'
  return card
}

function renderCard(card, called) {
  const header = `B  I  N  G  O`
  const rows = []
  for (let r = 0; r < 5; r++) {
    const row = card.map((col, c) => {
      const val = col[r]
      if (val === 'FREE') return '🟢'
      return called.has(val) ? '✅' : String(val).padStart(2)
    }).join('  ')
    rows.push(row)
  }
  return '```\n' + header + '\n' + rows.join('\n') + '\n```'
}

function checkWin(card, called) {
  // Lignes
  for (let r = 0; r < 5; r++) {
    if (card.every((col, c) => col[r] === 'FREE' || called.has(col[r]))) return true
  }
  // Colonnes
  for (let c = 0; c < 5; c++) {
    if (card[c].every(v => v === 'FREE' || called.has(v))) return true
  }
  // Diagonales
  if ([0,1,2,3,4].every(i => card[i][i] === 'FREE' || called.has(card[i][i]))) return true
  if ([0,1,2,3,4].every(i => card[4-i][i] === 'FREE' || called.has(card[4-i][i]))) return true
  return false
}

export default async function bingo(sock, sender, args, msg) {
  const sub = args[0]?.toLowerCase()

  if (sub === 'stop') {
    sessions.delete(sender)
    return sendMessage(sock, sender, `🛑 Bingo arrêté.`)
  }

  // Tirer un numéro
  if (sessions.has(sender) && (sub === 'tirer' || sub === 'next' || sub === 'n')) {
    const s = sessions.get(sender)
    if (s.won) return sendMessage(sock, sender, `🎉 Vous avez déjà gagné ! \`.bingo\` pour une nouvelle partie.`)
    let num
    do { num = 1 + Math.floor(Math.random() * 75) } while (s.called.has(num))
    s.called.add(num)
    const letter = ['B','I','N','G','O'][Math.floor((num - 1) / 15)]
    const win = checkWin(s.card, s.called)
    if (win) {
      s.won = true
      sessions.delete(sender)
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n🎉   🎱 *BINGO ! VOUS AVEZ GAGNÉ !* 🎉\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `📢 Tirage: *${letter}${num}*\n\n${renderCard(s.card, s.called)}\n\n🏆 Bravo ! Partie terminée en ${s.called.size} tirages !`
      )
    }
    return sendMessage(sock, sender,
      `🎱 *Tirage:* ${letter}${num}\n\n${renderCard(s.card, s.called)}\n\n` +
      `📊 ${s.called.size} numéros tirés\n▶️ \`.bingo tirer\` pour le prochain`
    )
  }

  // Nouvelle partie
  const card = makeCard()
  sessions.set(sender, { card, called: new Set(['FREE']), won: false })
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🎱 *BINGO DÉMONIAQUE*          ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `${renderCard(card, new Set(['FREE']))}\n\n` +
    `🟢 = Case gratuite (centre)\n✅ = Numéro sorti\n\n` +
    `▶️ \`.bingo tirer\` — Tirer un numéro\n🛑 \`.bingo stop\`  — Arrêter\n` +
    `🎯 Objectif: compléter une ligne/colonne/diagonale !`
  )
}
