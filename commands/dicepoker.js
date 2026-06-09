// commands/dicepoker.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

function rollDice() { return Math.floor(Math.random() * 6) + 1 }
function getEmoji(n) { return ['⚀','⚁','⚂','⚃','⚄','⚅'][n-1] }

function evaluate(dices) {
  const freq = {}
  dices.forEach(d => freq[d] = (freq[d]||0) + 1)
  const vals = Object.values(freq).sort((a,b) => b-a)
  const unique = Object.keys(freq).length
  if (vals[0] === 5) return '🏆 Yahtzee (5 identiques) !'
  if (vals[0] === 4) return '🔥 Carré (4 identiques)'
  if (vals[0] === 3 && vals[1] === 2) return '⚡ Full House (3+2)'
  const sorted = [...new Set(dices)].sort((a,b) => a-b)
  const isSeq = sorted.length === 5 && sorted[4]-sorted[0] === 4
  if (isSeq) return '🌟 Grande Suite (5 consécutifs)'
  if (vals[0] === 3) return '✝ Brelan (3 identiques)'
  if (vals[0] === 2 && vals[1] === 2) return '⛧ Double paire'
  if (vals[0] === 2) return '☩ Une paire'
  return '☠ Rien (relance !)'
}

export default async function dicepoker(sock, sender, args, msg) {
  const name = msg?.pushName || 'Joueur'
  const dices = [rollDice(), rollDice(), rollDice(), rollDice(), rollDice()]
  const result = evaluate(dices)
  const text =
    `☩━━━〔 🎲 *POKER AUX DÉS DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  👤 *Joueur:* ${name}\n` +
    `⛧  🎲 *Dés:* ${dices.map(getEmoji).join(' ')}\n` +
    `⛧  🔢 *Valeurs:* ${dices.join(' - ')}\n\n` +
    `✝  🏅 *Combinaison:* ${result}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
