import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["☀️ Solaire — Panneaux photovoltaïques, 173 000 TW disponibles","💨 Éolienne — Éolien offshore 15MW/turbine, 8% électricité mondiale","🌊 Hydraulique — Barrages, 1ère source renouvelable mondiale 16%","🌋 Géothermique — Chaleur terrestre, islande 90% chauffage","🌿 Biomasse — Déchets organiques, biogaz, biocarburants","🌊 Marémotrice — Marées, Barrage de la Rance France, fiable","💧 Hydrogène vert — Électrolyse, pile à combustible, propre","🔋 Stockage — Batterie lithium-ion, pompage, gravité","⚡ Fusion nucléaire — ITER, 500MW pour 50MW investis, 2035?","🌐 Smart Grid — Réseau intelligent, équilibre offre/demande"]
export default async function energierenouvelable(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 ☀️ *ENERGIERENOUVELABLE* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}