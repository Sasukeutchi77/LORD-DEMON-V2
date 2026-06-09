import { sendMessage } from '../lib/sendMessage.js'
const FLAGS = [{pays:'France',f:'🇫🇷',col:'Bleu, Blanc, Rouge'},{pays:'Sénégal',f:'🇸🇳',col:'Vert, Jaune, Rouge + étoile'},{pays:'Nigeria',f:'🇳🇬',col:'Vert, Blanc, Vert'},{pays:'Japon',f:'🇯🇵',col:'Blanc + cercle rouge'},{pays:'Brésil',f:'🇧🇷',col:'Vert, Jaune, Bleu'},{pays:'Ghana',f:'🇬🇭',col:'Rouge, Or, Vert + étoile noire'},{pays:'Allemagne',f:'🇩🇪',col:'Noir, Rouge, Or'},{pays:'Espagne',f:'🇪🇸',col:'Rouge, Jaune, Rouge'},{pays:'Maroc',f:'🇲🇦',col:'Rouge + étoile verte'},{pays:'Algérie',f:'🇩🇿',col:'Vert, Blanc + croissant'}]
export default async function drapeauquiz(sock, sender, args, msg, ctx = {}) {
  try {
    const d = FLAGS[Math.floor(Math.random() * FLAGS.length)]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🏳️ *QUIZ DRAPEAU*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n❓ À quel pays appartient ce drapeau ?\n\n${d.f}\n\n⏳ Réponse dans 15s...\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
    setTimeout(async () => {
      await sendMessage(sock, sender, `✅ *${d.f} = ${d.pays}*\nCouleurs: ${d.col}`)
    }, 15000)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
