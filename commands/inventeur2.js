import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["💡 Thomas Edison — Ampoule 1879, phonographe, 1093 brevets","📞 Alexander Graham Bell — Téléphone 1876, voix transmise","✈️ Frères Wright — Premier avion 1903, 59 secondes de vol","💊 Alexander Fleming — Pénicilline 1928, par accident, antibio","🔬 Marie Curie — Radioactivité, 2 Prix Nobel, polonium radium","🌐 Tim Berners-Lee — World Wide Web 1991, inventé au CERN","🚗 Karl Benz — 1ère automobile à moteur, 1885, Benz Patent","📱 Steve Jobs — iPhone 2007, révolution smartphone moderne","🧬 Watson & Crick — ADN double hélice 1953, structure","⚡ Nikola Tesla — Courant alternatif, bobine Tesla, AC/DC"]
export default async function inventeur2(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 💡 *INVENTEUR2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}