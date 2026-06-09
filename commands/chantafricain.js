import { sendMessage } from '../lib/sendMessage.js'
const CHANTS = ['🇸🇳 *Birima* — Youssou N\'Dour (Sénégal)\nLégende de la musique africaine','🇳🇬 *Lady* — Fela Kuti (Nigeria)\nAfrobeat révolutionnaire','🇨🇩 *Nakombela* — Fally Ipupa (Congo)\nRumba congolaise moderne','🇿🇦 *Pata Pata* — Miriam Makeba\nVoix de l\'Afrique du Sud','🇨🇮 *On Va Gérer* — Didi B (Côte d\'Ivoire)\nNouchi urban afrobeat','🇬🇭 *Falling* — Adekunle Gold\nAfropop contemporain','🇨🇲 *Makossa* — Manu Dibango (Cameroun)\nFusion funk-africain légendaire']
export default async function chantafricain(sock, sender, args, msg, ctx = {}) {
  try {
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🎵 *MUSIQUE AFRICAINE*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${CHANTS[Math.floor(Math.random() * CHANTS.length)]}\n\n⸸━━━━━━━━━�━━━━━━━━━━━━━━━━━━━━━━⸸`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
