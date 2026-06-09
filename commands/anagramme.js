import { sendMessage } from '../lib/sendMessage.js'
const MOTS_JEUX = [
  { mot: 'DRAGON', indice: '🐉 Créature mythique crachant du feu' },
  { mot: 'VAMPIRE', indice: '🧛 Boit du sang la nuit' },
  { mot: 'ZOMBIE', indice: '🧟 Mort-vivant qui revient à la vie' },
  { mot: 'SORCIER', indice: '🧙 Pratique la magie noire' },
  { mot: 'DEMON', indice: '😈 Être maléfique et puissant' },
  { mot: 'FANTOME', indice: '👻 Esprit d\'un mort qui hante' },
  { mot: 'CHAUVE-SOURIS', indice: '🦇 Créature nocturne des cavernes' },
  { mot: 'SPECTRE', indice: '☠️ Apparition terrifiante' },
]
function shuffleWord(w) {
  const arr = w.split('')
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.join('')
}
export default async function anagramme(sock, sender, args, msg, ctx = {}) {
  const m = MOTS_JEUX[Math.floor(Math.random() * MOTS_JEUX.length)]
  let shuffled
  do { shuffled = shuffleWord(m.mot) } while (shuffled === m.mot)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔤 *ANAGRAMME DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🧩 *Lettres mélangées:* *${shuffled}*\n` +
    `⛧  💡 *Indice:* ${m.indice}\n` +
    `✝  🔑 *Réponse:* || ${m.mot} ||\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
