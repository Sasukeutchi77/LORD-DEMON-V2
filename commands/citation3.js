import { sendMessage } from '../lib/sendMessage.js'
const CITATIONS_DEMON = [
  { texte: "Dans les ténèbres, ceux qui ont connu la lumière brillent le plus fort.", auteur: "Lord Demon" },
  { texte: "La puissance ne s'acquiert pas — elle se conquiert, dans la douleur et le silence.", auteur: "Axiome démoniaque" },
  { texte: "Ton pire ennemi n'est pas devant toi. Il est dans le miroir.", auteur: "Vérité des Abysses" },
  { texte: "Les lions ne perdent pas de sommeil à cause des opinions des moutons.", auteur: "Proverbe sombre" },
  { texte: "La mort n'est pas la fin. C'est la transformation d'une puissance en une autre.", auteur: "Parchemin Ancien" },
  { texte: "Celui qui ne tremble pas devant l'obscurité possède une lumière intérieure immortelle.", auteur: "Oracle Démoniaque" },
  { texte: "Le destin n'est pas fixé. Il se forge dans le feu de la volonté.", auteur: "Sagesse Infernale" },
  { texte: "La vraie force n'est pas de ne jamais tomber — c'est de se relever chaque fois.", auteur: "Code du Guerrier" },
]
export default async function citation3(sock, sender, args, msg, ctx = {}) {
  const c = CITATIONS_DEMON[Math.floor(Math.random() * CITATIONS_DEMON.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ☩ *SAGESSE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  💬 _"${c.texte}"_\n\n` +
    `⛧  ✍️ — *${c.auteur}*\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
