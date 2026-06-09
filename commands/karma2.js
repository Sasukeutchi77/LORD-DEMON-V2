// commands/karma2.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
const actions = [
  { act: "Tu as aidé quelqu'un sans rien demander en retour", karma: "+50 Karma ✨", niveau: "Bonne action" },
  { act: "Tu as ignoré quelqu'un dans le besoin", karma: "-30 Karma 🩸", niveau: "Mauvaise action" },
  { act: "Tu as partagé tes ressources généreusement", karma: "+40 Karma 💫", niveau: "Générosité" },
  { act: "Tu as trahi la confiance d'un ami", karma: "-60 Karma ☠", niveau: "Trahison" },
  { act: "Tu as protégé quelqu'un de plus faible", karma: "+70 Karma ⚡", niveau: "Bravoure" },
  { act: "Tu as menti pour ton profit personnel", karma: "-45 Karma 🌑", niveau: "Mensonge" },
]
export default async function karma2(sock, sender, args, msg) {
  try {
  const name = msg?.pushName || 'Âme'
  const a = actions[Math.floor(Math.random() * actions.length)]
  const total = Math.floor(Math.random() * 500) - 100
  const text = `☩━━━〔 ☯️ *KARMA COSMIQUE* 〕━━━☩\n\n☠  👤 *${name}*\n\n⛧  📖 *Dernière action:*\n✝  _${a.act}_\n\n☩  ⚡ *Impact:* ${a.karma}\n☠  🏷️ *Type:* ${a.niveau}\n⛧  📊 *Karma total:* ${total > 0 ? '+' : ''}${total}\n\n✝  ${total > 200 ? '🌟 Âme bénie !' : total > 0 ? '✅ Karma positif' : total > -100 ? '⚠️ Karma instable' : '☠️ Âme corrompue'}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}