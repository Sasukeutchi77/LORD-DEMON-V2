import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🏰 Citadelle Nord — Zone contestée, ressources rares, monstres","🌿 Forêt Maudite — Territoire elfique, pièges, magie ancienne","🌊 Baie des Pirates — Port libre, commerce noir, trésors","🔥 Terres Calcinées — Domaine Dragon, lave, minerais précieux","🏔️ Monts du Gel — Territoire nain, mines profondes, glace","💀 Catacombes Oubliées — Royaumes morts, liches, artefacts","🌙 Plaine Ombre — Nuit éternelle, vampires, loups-garous","⚡ Tour Éclair — Laboratoire mage fou, expériences danger","🌺 Jardin Enchanté — Créatures fées, plantes magiques, potions","🏜️ Désert des Crânes — Tombeaux anciens, scorpions géants"]
export default async function territoire(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🗺️ *TERRITOIRE* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}