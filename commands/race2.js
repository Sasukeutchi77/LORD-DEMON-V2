import { sendMessage } from '../lib/sendMessage.js'
const DATA = ["🧝 Elfe — Agilité, perception, longévité 500 ans, forêts","🧙 Humain — Polyvalent, adaptation rapide, talents multiples","⛏️ Nain — Force, résistance, maîtrise forge, mines profondes","🌿 Elfe Sylvestre — Discrétion, communion nature, chasseur né","🔥 Demi-Démon — Magie sombre, instable, transformation bestiale","💎 Cristallin — Corps cristal, résiste magie, rare et mystérieux","🌊 Aquatique — Respire eau, natation, magie des profondeurs","🪨 Golem — Force max, armure naturelle, invulnérable physique","🐺 Lycanthrope — Transformation lune, force nuit, instinct","👁️ Ancien — Sagesse millénaire, pouvoirs uniques, mystérieux"]
export default async function race2(sock, sender, args, msg, ctx) {
  try {
  const item = DATA[Math.floor(Math.random()*DATA.length)]
  await sendMessage(sock, sender, `☩━━━〔 🧝 *RACE2* 〕━━━☩\n☠\n⛧  ${item}\n☠\n✝  _Tape encore pour un autre!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}