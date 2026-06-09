import { sendMessage } from '../lib/sendMessage.js'
const FILMS = [
  { titre: "The Dark Knight", genre: "Action/Thriller", note: "9.0/10", desc: "Batman face au Joker dans Gotham City sombre" },
  { titre: "Avengers: Endgame", genre: "Superhéros/Action", note: "8.4/10", desc: "Fin épique d'une ère de Marvel" },
  { titre: "Inception", genre: "Sci-Fi/Thriller", note: "8.8/10", desc: "Vol de rêves et réalités emboîtées" },
  { titre: "Black Panther", genre: "Superhéros", note: "7.3/10", desc: "Roi de Wakanda, puissance africaine" },
  { titre: "Interstellar", genre: "Sci-Fi/Drame", note: "8.6/10", desc: "Voyage cosmique pour sauver l'humanité" },
  { titre: "Parasite", genre: "Thriller/Drame", note: "8.5/10", desc: "Palme d'Or, critique sociale coréenne" },
  { titre: "Le Seigneur des Anneaux", genre: "Fantasy épique", note: "9.0/10", desc: "Trilogie légendaire de Tolkien" },
  { titre: "Léon", genre: "Action/Drame", note: "8.5/10", desc: "Assassin professionnel et petite fille" },
]
export default async function cinema2(sock, sender, args, msg, ctx = {}) {
  const f = FILMS[Math.floor(Math.random() * FILMS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎬 *RECOMMANDATION FILM*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎬 *Titre:* ${f.titre}\n` +
    `⛧  🎭 *Genre:* ${f.genre}\n` +
    `✝  ⭐ *Note:* ${f.note}\n` +
    `☩  📖 _${f.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
