// commands/tarot.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const cartes = [
  { nom: "Le Mat", num: "0", sens: "Liberté, nouveau départ, innocence", inv: "Imprudence, fuite, irresponsabilité" },
  { nom: "Le Bateleur", num: "I", sens: "Habileté, volonté, action", inv: "Duperie, manque de volonté" },
  { nom: "La Papesse", num: "II", sens: "Sagesse intérieure, secret, intuition", inv: "Ignorance, secrets cachés" },
  { nom: "L'Impératrice", num: "III", sens: "Abondance, fertilité, créativité", inv: "Stagnation, blocage créatif" },
  { nom: "L'Empereur", num: "IV", sens: "Autorité, stabilité, puissance", inv: "Tyrannie, rigidité" },
  { nom: "Le Pape", num: "V", sens: "Tradition, spiritualité, sagesse", inv: "Dogmatisme, hypocrisie" },
  { nom: "L'Amoureux", num: "VI", sens: "Amour, choix, harmonie", inv: "Indécision, désaccord" },
  { nom: "Le Chariot", num: "VII", sens: "Triomphe, maîtrise, succès", inv: "Échec, désorientation" },
  { nom: "La Justice", num: "VIII", sens: "Équité, vérité, loi", inv: "Injustice, déséquilibre" },
  { nom: "L'Ermite", num: "IX", sens: "Sagesse, solitude, introspection", inv: "Isolement, peur" },
  { nom: "La Roue de Fortune", num: "X", sens: "Chance, cycles, destin", inv: "Malchance, résistance au changement" },
  { nom: "La Force", num: "XI", sens: "Courage, maîtrise, patience", inv: "Faiblesse, doute" },
  { nom: "Le Pendu", num: "XII", sens: "Sacrifice, lâcher-prise, nouvelle perspective", inv: "Stagnation, résistance" },
  { nom: "La Mort", num: "XIII", sens: "Transformation, fin de cycle, renouveau", inv: "Résistance au changement" },
  { nom: "La Lune", num: "XVIII", sens: "Illusion, mystère, rêves", inv: "Confusion, peur irrationnelle" },
  { nom: "Le Soleil", num: "XIX", sens: "Joie, succès, vitalité", inv: "Arrogance, excès d'optimisme" },
  { nom: "Le Jugement", num: "XX", sens: "Réveil, absolution, transformation", inv: "Stagnation, refus d'évoluer" },
  { nom: "Le Monde", num: "XXI", sens: "Accomplissement, plénitude, succès total", inv: "Inachèvement, retards" }
]

export default async function tarot(sock, sender, args) {
  try {
  const carte = cartes[Math.floor(Math.random() * cartes.length)]
  const inverse = Math.random() < 0.3
  const text =
    `☩━━━〔 🃏 *TAROT DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  🃏 *Carte:* ${carte.nom} (${carte.num})\n` +
    `⛧  ${inverse ? '🔄 *Position:* Inversée' : '✅ *Position:* Droite'}\n\n` +
    `✝  📖 *Message:*\n` +
    `☩  _${inverse ? carte.inv : carte.sens}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}