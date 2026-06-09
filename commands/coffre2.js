import { sendMessage } from '../lib/sendMessage.js'
const COFFRES = [
  { type: "Coffre de Bois", contenu: "50-150 pièces + Parchemin commun", chance: "80%", rareté: "Commun" },
  { type: "Coffre d'Argent", contenu: "200-500 pièces + Équipement rare", chance: "40%", rareté: "Rare" },
  { type: "Coffre d'Or", contenu: "800-1500 pièces + Arme épique", chance: "15%", rareté: "Épique" },
  { type: "Coffre de Cristal", contenu: "2000-5000 pièces + Set légendaire complet", chance: "5%", rareté: "Légendaire" },
  { type: "Coffre Démoniaque ⛧", contenu: "10000 pièces + Artefact Mythique + Titre rare", chance: "1%", rareté: "Mythique" },
]
export default async function coffre2(sock, sender, args, msg, ctx = {}) {
  const roll = Math.random() * 100
  let coffre
  if (roll < 1) coffre = COFFRES[4]
  else if (roll < 6) coffre = COFFRES[3]
  else if (roll < 21) coffre = COFFRES[2]
  else if (roll < 60) coffre = COFFRES[1]
  else coffre = COFFRES[0]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   📦 *OUVERTURE DE COFFRE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📦 *Type:* ${coffre.type}\n` +
    `⛧  💎 *Rareté:* ${coffre.rareté}\n` +
    `✝  🎁 *Contenu:* ${coffre.contenu}\n` +
    `☩  🎲 *Probabilité:* ${coffre.chance}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
