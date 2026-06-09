import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🔥 En mode chasseur. Rien ne m'arrête aujourd'hui.","💤 10% batterie humaine. Recharge urgente nécessaire.","😏 Je sais ce que je veux et je l'obtiendrai. Simple.","🌙 Vibe lunaire: émotion, intuition, mystère ce soir.","⚡ Mode Sigma: solitaire mais redoutable et focalisé.","🌺 Vibe solaire: énergie positive, attire la chance.","💀 Vibe gothique: tout est temporaire sauf mon style.","🏆 Mode compétition: je suis là pour gagner, pas participer.","🧘 Vibe zen: en paix avec tout. Les problèmes ne m'atteignent pas.","🦁 Mode prédateur: focalisé, calme, redoutable si nécessaire."]
export default async function vibe3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🎭 *VIBE3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}