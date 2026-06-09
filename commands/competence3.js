import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["⚡ Éclair Céleste — Frappe 3 ennemis, paralysie 2 tours","🔥 Inferno — Zone feu, brûlure continue 5 tours dégâts","🛡️ Rempart Divin — Bouclier 50% dégâts, dure 3 tours","💀 Drain Âme — Vol PV: récupère 40% des dégâts infligés","🌊 Raz de Marée — Zone eau, pousse ennemis, knockback massif","🌪️ Tourbillon — Spin 360°, frappe tous adjacents autour","💎 Cristallisation — Transforme ennemi en cristal 2 tours","🎯 Tir Parfait — 100% critique, ignore armure et esquive","🌿 Forêt Sauvage — Lianes, ralentit, poison par tour","☁️ Brouillard Sombre — Zone fumée, -50% précision 4 tours"]
export default async function competence3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 💫 *COMPETENCE3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}