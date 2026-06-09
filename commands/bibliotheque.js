// commands/bibliotheque.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const livres = [
  { titre: "Le Seigneur des Anneaux", auteur: "J.R.R. Tolkien", genre: "Fantasy", annee: 1954 },
  { titre: "1984", auteur: "George Orwell", genre: "Dystopie", annee: 1949 },
  { titre: "Dune", auteur: "Frank Herbert", genre: "Science-Fiction", annee: 1965 },
  { titre: "Le Petit Prince", auteur: "Antoine de Saint-Exupéry", genre: "Conte", annee: 1943 },
  { titre: "Harry Potter", auteur: "J.K. Rowling", genre: "Fantasy", annee: 1997 },
  { titre: "L'Alchimiste", auteur: "Paulo Coelho", genre: "Fiction", annee: 1988 },
  { titre: "Crime et Châtiment", auteur: "Dostoïevski", genre: "Roman", annee: 1866 },
  { titre: "Le Comte de Monte-Cristo", auteur: "Alexandre Dumas", genre: "Aventure", annee: 1844 },
  { titre: "Les Misérables", auteur: "Victor Hugo", genre: "Roman historique", annee: 1862 },
  { titre: "Fahrenheit 451", auteur: "Ray Bradbury", genre: "Dystopie", annee: 1953 },
]

export default async function bibliotheque(sock, sender, args) {
  const livre = livres[Math.floor(Math.random() * livres.length)]
  const text =
    `☩━━━〔 📚 *BIBLIOTHÈQUE DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  📖 *Titre:* ${livre.titre}\n` +
    `⛧  ✍️ *Auteur:* ${livre.auteur}\n` +
    `✝  🏷️ *Genre:* ${livre.genre}\n` +
    `☩  📅 *Année:* ${livre.annee}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
