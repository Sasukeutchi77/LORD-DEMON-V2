import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["⚔️ Guerrier — Force brute, armure lourde, tank de la team","🧙 Mage — Magie offensive, zone, téléport, faible défense","🗡️ Voleur — Furtivité, croche-pied, critique élevé, dague","🏹 Archer — Distance, précision, pièges, mobilité extrême","🛡️ Paladin — Force + magie divine, soin + attaque sainte","🌿 Druide — Métamorphose animale, magie nature, soin zone","💀 Nécromancien — Invocation morts, drain vie, magie sombre","🔥 Sorcier — Pacte démoniaque, magie ténèbres, hexes puissants","🎵 Barde — Buffs musicaux, charme, support, critiques variés","👊 Moine — Arts martiaux, ki, vitesse extrême, résistance tout"]
export default async function classe(sock, sender, args, msg, ctx) {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 ⚔️ *CLASSE* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}