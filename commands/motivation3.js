import { sendMessage } from '../lib/sendMessage.js'
const QUOTES = [['Nelson Mandela','Tout semble impossible jusqu\'à ce que ce soit fait.'],['Albert Einstein','La logique vous emmènera de A à B. L\'imagination vous emmènera partout.'],['Bob Marley','You may not be her first, her last, or her only. But if she loves you now, what else matters?'],['Chinua Achebe','Quand la lune est en lumière, le chasseur rentre à la maison.'],['Maya Angelou','Faire de son mieux, c\'est déjà suffisant.'],['Kobe Bryant','Si tu veux être un champion, tu dois t\'entraîner comme un champion.'],['Tupac Shakur','La haine prend trop d\'énergie. Je suis trop occupé à grandir.'],['Chimamanda Ngozi Adichie','Nous devrions tous être féministes.'],['Malcolm X','L\'avenir appartient à ceux qui s\'y préparent aujourd\'hui.'],['Wangari Maathai','Dans la nature, rien ne se gaspille.']]
export default async function motivation3(sock, sender, args, msg, ctx) {
  try {
  const [author, quote] = QUOTES[Math.floor(Math.random()*QUOTES.length)]
  await sendMessage(sock, sender,
    `☩━━━〔 💪 *MOTIVATION* 〕━━━☩\n☠\n⛧  💬 *"${quote}"*\n☠\n✝  — *${author}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}