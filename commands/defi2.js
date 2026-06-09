import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["⚡ Parle à quelqu'un d'inconnu aujourd'hui avec un sourire.","🏃 30 squats maintenant. Lève-toi. C'est parti.","🧠 Calcule 147 × 8 dans ta tête sans calculette.","📝 Écris un haïku en 5-7-5 syllabes maintenant.","💧 Bois 1L d'eau avant ce soir. Commence maintenant.","📵 1 heure sans réseaux sociaux. Commence le chrono.","🙏 Dis merci sincèrement à 3 personnes aujourd'hui.","🎵 Écoute un artiste que tu ne connais pas du tout.","📚 Lis 10 pages d'un livre aujourd'hui, sans exception.","🌱 15 minutes dehors, sans téléphone. Observe la nature."]
export default async function defi2(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 ⚡ *DEFI2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}