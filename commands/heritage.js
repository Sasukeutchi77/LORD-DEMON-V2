// commands/heritage.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
const heritages = [
  { titre: "Épée Légendaire ⚔️", rareté: "🔴 Légendaire", bonus: "+200 ATK, immunité aux malédictions", histoire: "Forgée dans les flammes de l'Enfer par un forgeron maudit" },
  { titre: "Grimoire Ancestral 📚", rareté: "🟣 Épique", bonus: "+50 Magie, accès aux sorts anciens", histoire: "Contient des secrets que même les dieux ont oubliés" },
  { titre: "Armure de Dragon 🛡️", rareté: "🔴 Légendaire", bonus: "+300 DEF, résistance au feu", histoire: "Écailles de l'ancien dragon Gorath, tué il y a 1000 ans" },
  { titre: "Anneau de Puissance 💍", rareté: "🟠 Rare", bonus: "+100 à tous les attributs", histoire: "Un anneau qui corrompt son porteur... ou le transcende" },
  { titre: "Cape de l'Ombre 🌑", rareté: "🟣 Épique", bonus: "Invisibilité permanente, +150 Agilité", histoire: "Tissée à partir de ténèbres pures arrachées au néant" },
]
export default async function heritage(sock, sender, args, msg) {
  const name = msg?.pushName || 'Héritier'
  const h = heritages[Math.floor(Math.random() * heritages.length)]
  const text = `☩━━━〔 👑 *HÉRITAGE DÉMONIAQUE* 〕━━━☩\n\n☠  👤 *${name}*, tu hérites de :\n\n⛧  *${h.titre}*\n✝  ${h.rareté}\n\n☩  ⚡ *Bonus:* ${h.bonus}\n☠  📖 *Histoire:*\n⛧  _${h.histoire}_\n\n✝  _Gardez-le précieusement, héritier des ténèbres._\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
