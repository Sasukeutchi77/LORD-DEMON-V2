import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["✨ Grâce Divine — +100% régénération PV, immunité malédictions","⚡ Aura de Foudre — Riposte électrique à chaque attaque reçue","🌟 Lumière Éternelle — Révèle ennemis cachés, vision totale","🛡️ Mur Infranchissable — Immunité physique pendant 3 tours","🔥 Bénédiction Feu — +100 ATQ feu, brûle adjacents auto","💎 Corps Cristallin — +500 DEF, dégâts magiques → PV","🌺 Toucher Guérisseur — Soigne 30% PV allié au contact","🦅 Vol du Faucon — +300% vitesse 5 tours, esquive totale","🌊 Communion Marine — Régénère énergie de l'eau ambiente","👑 Couronne Sainte — Double effets de soutien, aura divine"]
export default async function benediction3(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 ✨ *BENEDICTION3* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}