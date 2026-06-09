import { sendMessage } from '../lib/sendMessage.js'
const FORTUNES = ['💫 La fortune sourit aux audacieux. Agis maintenant.','🌟 Un grand changement approche. Reste vigilant.','⚡ Ton prochain défi te rendra plus fort que tu ne l\'imagines.','🔥 Le succès est proche, ne lâche pas maintenant.','🌙 La nuit la plus sombre précède toujours l\'aube.','💎 Ta vraie valeur sera bientôt reconnue.','🌊 Laisse les petits problèmes partir comme des vagues.','🦅 Vole plus haut que tes doutes te le permettent.','🌺 Une nouvelle opportunité se présente à toi bientôt.','⚔️ Les guerriers ne cherchent pas la paix — ils la méritent.','🎯 Concentre-toi sur l\'essentiel, le reste suivra.','🌈 Après la tempête vient le beau temps — et pour toi, très beau.','🏆 Ta persévérance sera ta plus grande victoire.','🔮 L\'univers prépare quelque chose d\'extraordinaire pour toi.','🌸 Souviens-toi: même les diamants sont formés sous pression.']
export default async function fortune2(sock, sender, args, msg, ctx) {
  try {
  const fortune = FORTUNES[Math.floor(Math.random()*FORTUNES.length)]
  const hour = new Date().getHours(), period = hour<12?'matin':hour<18?'après-midi':'soir'
  await sendMessage(sock, sender,
    `☩━━━〔 🔮 *FORTUNE DU JOUR* 〕━━━☩\n☠\n⛧  🌙 Bonsoir — voici ton destin ce ${period}:\n☠\n✝  ${fortune}\n☠\n⛧  🎴 Numéros chanceux: ${Array.from({length:5},()=>Math.floor(Math.random()*49)+1).sort((a,b)=>a-b).join(' - ')}\n☠  🌈 Couleur du jour: ${['Rouge','Bleu','Vert','Or','Violet','Blanc'][Math.floor(Math.random()*6)]}\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}