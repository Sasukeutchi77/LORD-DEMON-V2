import { sendMessage } from '../lib/sendMessage.js'
const SESSIONS = [{dur:5,title:'Mini-méditation',guide:['🧘 Installe-toi confortablement.','🌬️ Inspire profondément par le nez (4 secondes).','⏸️ Retiens ta respiration (4 secondes).','😮‍💨 Expire lentement par la bouche (6 secondes).','🔁 Répète 5 fois.','✨ Ouvre les yeux. Tu es prêt(e).']},{dur:10,title:'Scan corporel',guide:['🛋️ Allonge-toi ou assieds-toi confortablement.','👀 Ferme les yeux doucement.','🦶 Concentre-toi sur tes pieds. Relâche les tensions.','🦵 Monte vers les jambes. Respire.','🫁 Sens ton ventre monter et descendre.','💆 Relâche les épaules et le cou.','😌 Tu es totalement détendu(e).','💫 Reste ainsi 2 minutes avant d\'ouvrir les yeux.']},{dur:3,title:'Reset rapide',guide:['✋ Stop. Pause tout.','👃 3 inspirations profondes.','🎯 Nomme 5 choses que tu vois.','👂 Nomme 4 sons que tu entends.','🤲 Sens 3 textures autour de toi.','😊 Tu es de retour. Tout va bien.']}]
export default async function meditedemon(sock, sender, args, msg, ctx) {
  try {
  const dur = parseInt(args[0]) || 5
  const session = SESSIONS.find(s=>s.dur===dur) || SESSIONS[0]
  let text = `☩━━━〔 🧘 *MÉDITATION DÉMON* 〕━━━☩\n☠\n⛧  *${session.title}* (${session.dur} min)\n☠\n`
  session.guide.forEach((step,i) => { text += `✝  ${i+1}. ${step}\n☠\n` })
  text += `⛧  Sessions: ${process.env.PREFIX||'.'}meditedemon 3/5/10\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  }
}