import { sendMessage } from '../lib/sendMessage.js'
const ANIMES = [
  { titre: "Attack on Titan", genre: "Action/Drame", note: "9.9/10", desc: "Humanité vs titans géants, mystères profonds" },
  { titre: "Demon Slayer", genre: "Combat/Émotion", note: "9.7/10", desc: "Arts martiaux du souffle contre des démons" },
  { titre: "Death Note", genre: "Thriller/Psychologique", note: "9.8/10", desc: "Carnet de la mort entre génie et dieu" },
  { titre: "Fullmetal Alchemist: Brotherhood", genre: "Aventure/Philosophie", note: "9.9/10", desc: "Alchimie, sacrifice et vérité absolue" },
  { titre: "Jujutsu Kaisen", genre: "Surnaturel/Combat", note: "9.5/10", desc: "Exorcistes contre malédictions ancestrales" },
  { titre: "One Piece", genre: "Aventure/Amitié", note: "9.6/10", desc: "Roi des pirates — odyssée épique sans fin" },
  { titre: "Steins;Gate", genre: "Sci-Fi/Drama", note: "9.8/10", desc: "Voyages temporels et conséquences tragiques" },
  { titre: "Re:Zero", genre: "Isekai/Psychologique", note: "9.4/10", desc: "Mort et résurrection dans un monde cruel" },
]
export default async function anime2(sock, sender, args, msg, ctx = {}) {
  const a = ANIMES[Math.floor(Math.random() * ANIMES.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🎌 *RECOMMANDATION ANIME*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🎌 *Titre:* ${a.titre}\n` +
    `⛧  🎭 *Genre:* ${a.genre}\n` +
    `✝  ⭐ *Note:* ${a.note}\n` +
    `☩  📖 _${a.desc}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
