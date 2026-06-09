import { sendMessage } from '../lib/sendMessage.js'
const CHANTS = [
  { titre: "Birima", artiste: "Youssou N'Dour", pays: "Sénégal 🇸🇳", style: "Mbalax légendaire, rythmes africains profonds" },
  { titre: "Lady", artiste: "Fela Kuti", pays: "Nigeria 🇳🇬", style: "Afrobeat révolutionnaire, message politique" },
  { titre: "Nakombela", artiste: "Fally Ipupa", pays: "Congo 🇨🇩", style: "Rumba congolaise moderne, voix envoûtante" },
  { titre: "Pata Pata", artiste: "Miriam Makeba", pays: "Afrique du Sud 🇿🇦", style: "Icône mondiale, rythme inoubliable" },
  { titre: "On Va Gérer", artiste: "Didi B", pays: "Côte d'Ivoire 🇨🇮", style: "Nouchi urban afrobeat, énergie brute" },
  { titre: "Makossa", artiste: "Manu Dibango", pays: "Cameroun 🇨🇲", style: "Fusion funk-africain légendaire" },
]
export default async function chantafricain(sock, sender, args, msg, ctx = {}) {
  const c = CHANTS[Math.floor(Math.random() * CHANTS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎵 *MUSIQUE AFRICAINE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎶 *Titre:* ${c.titre}\n` +
    `⛧  🎤 *Artiste:* ${c.artiste}\n` +
    `✝  🌍 *Origine:* ${c.pays}\n` +
    `☩  🎸 *Style:* ${c.style}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
