// commands/mythologie.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const mythes = [
  { dieu: "⚡ Zeus", origine: "Grèce", domaine: "Tonnerre & Ciel", symbole: "Foudre, Aigle", mythe: "Roi de l'Olympe, il régnait sur dieux et mortels depuis le Mont Olympe." },
  { dieu: "🌊 Poséidon", origine: "Grèce", domaine: "Mers & Tremblements de terre", symbole: "Trident, Cheval", mythe: "Maître des océans, il provoquait tempêtes et raz-de-marée de son trident." },
  { dieu: "🌑 Anubis", origine: "Égypte", domaine: "Mort & Momification", symbole: "Tête de chacal", mythe: "Gardien des morts, il pesait les âmes avec une plume de Maât." },
  { dieu: "🔥 Loki", origine: "Norrois", domaine: "Ruse & Magie", symbole: "Flammes, Serpent", mythe: "Dieu espiègle et trompeur qui causait autant de problèmes qu'il en résolvait." },
  { dieu: "☀️ Ra", origine: "Égypte", domaine: "Soleil & Création", symbole: "Disque solaire, Faucon", mythe: "Dieu solaire suprême, il traversait le ciel chaque jour dans sa barque dorée." },
  { dieu: "⚔️ Ares", origine: "Grèce", domaine: "Guerre & Violence", symbole: "Épée, Lance, Casque", mythe: "Dieu de la guerre brutale, redouté même des autres dieux olympiens." },
]

export default async function mythologie(sock, sender, args) {
  try {
  const m = mythes[Math.floor(Math.random() * mythes.length)]
  const text =
    `☩━━━〔 🏛️ *MYTHOLOGIE DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  ${m.dieu}\n` +
    `⛧  🌍 *Origine:* ${m.origine}\n` +
    `✝  ⚡ *Domaine:* ${m.domaine}\n` +
    `☩  🔱 *Symboles:* ${m.symbole}\n\n` +
    `☠  📖 *Mythe:*\n` +
    `⛧  _${m.mythe}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}