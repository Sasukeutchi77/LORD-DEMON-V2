import { sendMessage } from '../lib/sendMessage.js'
const EVENEMENTS = [
  { annee: -3000, evt: "Naissance de l'écriture cunéiforme en Mésopotamie", cat: "🏛️ Antiquité" },
  { annee: -776, evt: "Premiers Jeux Olympiques à Olympie, Grèce", cat: "🏛️ Antiquité" },
  { annee: 1066, evt: "Conquête de l'Angleterre par Guillaume le Conquérant", cat: "⚔️ Moyen Âge" },
  { annee: 1492, evt: "Christophe Colomb découvre l'Amérique", cat: "🌍 Exploration" },
  { annee: 1789, evt: "Révolution française — Prise de la Bastille", cat: "🏴 Révolution" },
  { annee: 1865, evt: "Abolition de l'esclavage aux États-Unis", cat: "✊ Droits" },
  { annee: 1945, evt: "Fin de la Seconde Guerre Mondiale", cat: "🕊️ Paix" },
  { annee: 1969, evt: "Neil Armstrong marche sur la Lune — Apollo 11", cat: "🚀 Espace" },
  { annee: 1991, evt: "Dissolution de l'URSS — fin de la Guerre Froide", cat: "🌐 Géopolitique" },
  { annee: 2007, evt: "Steve Jobs présente le premier iPhone", cat: "📱 Tech" },
]
export default async function chronologie(sock, sender, args, msg, ctx = {}) {
  const e = EVENEMENTS[Math.floor(Math.random() * EVENEMENTS.length)]
  const anneeStr = e.annee < 0 ? `${Math.abs(e.annee)} av. J.-C.` : `${e.annee}`
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ⏳ *CHRONOLOGIE HISTORIQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🏷️ *Catégorie:* ${e.cat}\n` +
    `⛧  📅 *Année:* ${anneeStr}\n\n` +
    `✝  📖 _${e.evt}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
