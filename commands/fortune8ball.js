import { sendMessage } from '../lib/sendMessage.js'
export default async function fortune8ball(sock, sender, args, msg, ctx = {}) {
  try {
    const outcomes = ['🏆 VICTOIRE!','💀 DÉFAITE!','🤝 ÉGALITÉ!','⚡ CRITIQUE!','🌟 PARFAIT!','🔥 DOMINANT!',
    "☠ LES TÉNÈBRES VOUS SOURIENT",
    "⛧ L'ABÎSSE RÉVÈLE VOTRE DESTIN",
    "✝ LA MORT VOUS ACCORDE SA FAVEUR",
    "☩ LES DÉMONS VOUS GUIDRONT",
    "⸸ LE CHAOS EST VOTRE ALLIÉ",
    "☠ L'OMBRE VOUS APPARTIENT",
    "⛧ VOTRE ÂME EST FORGÉE DANS LE FEU",
    "✝ LE VOILE SE LÈVE SUR VOTRE VICTOIRE"]
    const out = outcomes[Math.floor(Math.random()*outcomes.length)]
    const score = Math.floor(Math.random()*1000)+100
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  ⚔️ *FORTUNE8BALL*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${out}\n☩ Score : *${score} pts*\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
