import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🇫🇷 Français — Amour: Je t'aime | Salut: Bonjour | Merci: Merci","🇪🇸 Espagnol — Amor: Te amo | Salut: Hola | Merci: Gracias","🇯🇵 Japonais — 愛: Aishiteru | Salut: こんにちは | Merci: ありがとう","🇸🇦 Arabe — أحبك Uhibbuk | السلام عليكم | شكراً Shukran","🇮🇳 Hindi — प्यार: Pyaar karta hoon | Namaste | Dhanyavaad","🇨🇳 Mandarin — 爱: Wǒ ài nǐ | 你好 Nǐ hǎo | 谢谢 Xièxie","🇰🇷 Coréen — 사랑: Saranghae | 안녕 Annyeong | 감사 Gamsahamnida","🇵🇹 Portugais — Amor: Eu te amo | Olá | Obrigado","🇷🇺 Russe — Любовь: Ya tebya lyublyu | Privet | Spasibo","🇳🇬 Yoruba — Ife: Mo nifẹ rẹ | Ẹ káabọ̀ | E dupe"]
export default async function langue4(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🌐 *LANGUE4* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}