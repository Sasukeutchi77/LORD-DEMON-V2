// commands/morse.js
import { sendMessage } from '../lib/sendMessage.js'
const M = {A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.',  ' ':'/',}
export default async function morse(sock, sender, args, msg) {
  const text = args.join(' ').toUpperCase()
  if (!text) return sendMessage(sock, sender, '☠ Usage: .morse <texte>')
  const result = text.split('').map(c=>M[c]||c).join(' ')
  await sendMessage(sock, sender, `☩━━━〔 ⛧ *MORSE* 〕━━━☩

🔤 *Morse:*\n${result}

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
