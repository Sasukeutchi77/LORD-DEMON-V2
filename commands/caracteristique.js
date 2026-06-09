import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const CARACTERISTIQUES = [
  { nom: "Intelligence Émotionnelle", desc: "Tu perçois les émotions comme un livre ouvert", stat: "EQ +95" },
  { nom: "Pensée Analytique", desc: "Chaque problème devient une équation à résoudre", stat: "INT +90" },
  { nom: "Créativité Débordante", desc: "Ton esprit génère des idées que les autres n'osent pas", stat: "CRE +88" },
  { nom: "Leadership Naturel", desc: "Les autres te suivent instinctivement dans le chaos", stat: "LDR +92" },
  { nom: "Empathie Profonde", desc: "Tu ressens la douleur d'autrui comme la tienne", stat: "EMP +85" },
  { nom: "Détermination Féroce", desc: "Rien ni personne ne peut briser ta volonté", stat: "WIL +99" },
  { nom: "Courage Silencieux", desc: "Tu agis sans bruit là où les autres parlent fort", stat: "COU +87" },
  { nom: "Humour Dévastateur", desc: "Une seule phrase désamorce n'importe quelle tension", stat: "CHA +80" },
]
export default async function caracteristique(sock, sender, args, msg, ctx = {}) {
  const c = CARACTERISTIQUES[Math.floor(Math.random() * CARACTERISTIQUES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⭐ *CARACTÉRISTIQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🌟 *${c.nom}*\n` +
    `⛧  💬 _${c.desc}_\n` +
    `✝  📊 *Stat:* ${c.stat}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
