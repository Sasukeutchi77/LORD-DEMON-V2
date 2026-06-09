import { sendMessage } from '../lib/sendMessage.js'
const LIVRES = [
  { titre: "Le Seigneur des Anneaux", auteur: "J.R.R. Tolkien", genre: "Fantasy", annee: 1954, note: "9.8/10" },
  { titre: "1984", auteur: "George Orwell", genre: "Dystopie", annee: 1949, note: "9.7/10" },
  { titre: "Dune", auteur: "Frank Herbert", genre: "Science-Fiction", annee: 1965, note: "9.5/10" },
  { titre: "Le Petit Prince", auteur: "Antoine de Saint-Exupéry", genre: "Conte philosophique", annee: 1943, note: "9.9/10" },
  { titre: "Harry Potter et la Pierre Philosophale", auteur: "J.K. Rowling", genre: "Fantasy", annee: 1997, note: "9.6/10" },
  { titre: "L'Alchimiste", auteur: "Paulo Coelho", genre: "Fiction philosophique", annee: 1988, note: "9.2/10" },
  { titre: "Crime et Châtiment", auteur: "Dostoïevski", genre: "Roman psychologique", annee: 1866, note: "9.8/10" },
  { titre: "Le Comte de Monte-Cristo", auteur: "Alexandre Dumas", genre: "Aventure", annee: 1844, note: "9.9/10" },
]
export default async function bibliotheque(sock, sender, args, msg, ctx = {}) {
  const input = args.join(' ').toLowerCase()
  let livre
  if (input) {
    livre = LIVRES.find(l => l.titre.toLowerCase().includes(input) || l.auteur.toLowerCase().includes(input) || l.genre.toLowerCase().includes(input))
  }
  if (!livre) livre = LIVRES[Math.floor(Math.random() * LIVRES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📚 *BIBLIOTHÈQUE DÉMONIAQUE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📖 *Titre:* ${livre.titre}\n` +
    `⛧  ✍️ *Auteur:* ${livre.auteur}\n` +
    `✝  🎭 *Genre:* ${livre.genre}\n` +
    `☩  📅 *Année:* ${livre.annee} | ⭐ *Note:* ${livre.note}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
