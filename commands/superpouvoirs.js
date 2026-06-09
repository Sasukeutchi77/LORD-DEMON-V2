import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["⚡ Électrokinésie — Contrôle et génère l'électricité, immunité foudre","🔥 Pyrokinésie — Maîtrise du feu, vision infrarouge, immunité chaleur","🧊 Cryokinésie — Contrôle glace, souffle gelé, marche sur eau","🌊 Hydrokinésie — Contrôle eau, respiration aquatique, vagues","🌪️ Aérokinésie — Contrôle vent, vol libre, bouclier d'air","🪨 Géokinésie — Tremblements, armure pierre, contrôle sol","🌿 Phytokinésie — Accélère croissance, lianes, poison naturel","💀 Nécromancie — Parle aux morts, invoque, immunité maladies","🔮 Télépathie — Lit esprits, projette pensées, illusions mentales","🌌 Contrôle du Temps — Ralentit, accélère, voyage temporel"]
export default async function superpouvoirs(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🦸 *SUPERPOUVOIRS* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}