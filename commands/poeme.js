// commands/poeme.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const poemes = [
  { titre: "L'Ombre", texte: "Dans l'ombre je marche seul,\nLe monde dort sous son linceul,\nMais moi je veille, âme de feu,\nDémoniaque sous les cieux." },
  { titre: "La Nuit", texte: "La nuit tombe comme un rideau noir,\nLes étoiles pleurent leur désespoir,\nEt dans ce silence absolu,\nNaît le pouvoir jamais dissous." },
  { titre: "Le Guerrier", texte: "Debout guerrier, l'heure est venue,\nTes ennemis tremblent à ta vue,\nTon sang coule, froid comme l'acier,\nTu n'as jamais plié." },
  { titre: "Le Démon", texte: "Je suis la nuit, je suis la peur,\nJe suis ce qui bat dans ton cœur,\nQuand tu t'endors je m'éveille,\nQu'importe l'heure ou la veille." },
]

export default async function poeme(sock, sender, args) {
  const p = poemes[Math.floor(Math.random() * poemes.length)]
  const text =
    `☩━━━〔 ✍️ *POÈME DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  📜 *${p.titre}*\n\n` +
    `⛧  _${p.texte}_\n\n` +
    `✝  _— Lord Demon Poetry_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
