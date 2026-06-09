import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["💤 Chute libre — Cerveau résout problème de contrôle, phase REM","✈️ Voler — Ambition, liberté, désir de surmonter obstacles","💀 Mort — Transformation, fin d'une période, nouveau départ","🌊 Inondation — Émotions submergées, stress accumulé","🦷 Dents qui tombent — Insécurité, peur jugement social","🏃 Courir sans avancer — Sentiment de stagnation, blocage","👁️ Être observé — Conscience de soi élevée, anxiété sociale","🏠 Maison inconnue — Exploration de soi, nouvelles facettes","🐍 Serpent — Peur, trahison, ou transformation selon contexte","🌙 Lucide — Conscient qu'on rêve, 23% population régulièrement"]
export default async function reve2(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 💤 *REVE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}