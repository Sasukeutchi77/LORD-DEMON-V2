import { sendMessage } from '../lib/sendMessage.js'
export default async function zodiac3(sock, sender, args, msg, ctx = {}) {
  try {
    const outcomes = ['🏆 VICTOIRE!','💀 DÉFAITE!','🤝 ÉGALITÉ!','⚡ CRITIQUE!','🌟 PARFAIT!','🔥 DOMINANT!',
    "♈ Bélier Démoniaque — Guerre et destruction !",
    "♉ Taureau Maudit — Force et obstination infernale !",
    "♊ Gémeaux Spectraux — Dualité des ombres !",
    "♋ Cancer Abyssal — Gardien des profondeurs !",
    "♌ Lion Infernal — Majesté et terreur !",
    "♍ Vierge Corrompue — Perfectionnisme du chaos !",
    "♎ Balance Brisée — Justice démoniaque !",
    "♏ Scorpion Maudit — Venin des enfers !",
    "♐ Sagittaire Maudit — Flèches de ténèbres !",
    "♑ Capricorne Infernal — Ambition sans limites !",
    "♒ Verseau Spectral — Chaos et révolution !",
    "♓ Poissons Abyssaux — Profondeurs insondables !"]
    const out = outcomes[Math.floor(Math.random()*outcomes.length)]
    const score = Math.floor(Math.random()*1000)+100
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  ⚔️ *ZODIAC3*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${out}\n☩ Score : *${score} pts*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance des Ténèbres ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
