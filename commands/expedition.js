import { sendMessage } from '../lib/sendMessage.js'
export default async function expedition(sock, sender, args, msg, ctx = {}) {
  try {
    const items = ['🗡️ Épée légendaire +500 ATK','🛡️ Armure divine +800 DEF','💍 Anneau du destin','⚗️ Potion de puissance','📿 Amulette sacrée','🏺 Artefact ancien','🔮 Orbe de magie']
    const item = items[Math.floor(Math.random()*items.length)]
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  🌑 *EXPEDITION*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n✨ Vous avez obtenu:\n${item}\n\n_Votre puissance augmente!_\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance Démoniaque ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
