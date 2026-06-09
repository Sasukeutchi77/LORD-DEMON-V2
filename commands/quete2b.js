import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["📜 La Tour du Sorcier — Infiltre la tour, récupère le grimoire","🗡️ Épée du Destin — Prouve ta valeur aux anciens guerriers","🐉 La Tanière du Dragon — Chasse le dragon qui terrorise","💀 Le Donjon Maudit — Explore, bats le boss, prends l'artefact","🌊 Le Trésor Englouti — Plonge dans la cité sous les mers","🧙 L'Apprenti Sorcier — 3 rituels pour débloquer ta magie","🏰 La Citadelle Oubliée — Libère-la des griffes de l'ombre","⚔️ Le Tournoi Infernal — Bats 10 champions pour le titre","🌿 Le Jardin Éternel — Trouve la fleur immortelle en forêt","💎 La Pierre Philosophale — Résous 7 énigmes alchimistes"]
export default async function quete2b(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 📜 *QUETE2B* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}