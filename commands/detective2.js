import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const AFFAIRES = [
  { crime: "Un diamant a disparu du musée de nuit", suspects: ["Le gardien de nuit","La conservatrice","Le touriste mystérieux"], indice: "Empreintes de bottes militaires taille 42" },
  { crime: "Le chef du village a été empoisonné", suspects: ["Son rival politique","La cuisinière","Le médecin"], indice: "Résidu de plante rare dans la coupe" },
  { crime: "Un tableau de maître a été substitué par une copie", suspects: ["Le restaurateur d'art","La milliardaire","Le guide touristique"], indice: "Peinture datant de moins de 6 mois" },
  { crime: "La clé du coffre-fort a disparu", suspects: ["Le secrétaire","La femme de ménage","L'associé"], indice: "Empreinte digitale partielle sur le bureau" },
  { crime: "Un message codé a été intercepté", suspects: ["L'ambassadeur","Le journaliste","L'informateur"], indice: "Encre invisible révélée sous UV" },
]
export default async function detective2(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const a = AFFAIRES[Math.floor(Math.random() * AFFAIRES.length)]
  const coupable = a.suspects[Math.floor(Math.random() * a.suspects.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🕵️ *DOSSIER CRIMINEL*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  🚨 *Crime:* ${a.crime}\n\n` +
    `⛧  👥 *Suspects:*\n` +
    `${a.suspects.map(s=>`  • ${s}`).join('\n')}\n\n` +
    `✝  🔍 *Indice:* _${a.indice}_\n\n` +
    `☩  ❓ *Qui est coupable ?*\n\n` +
    `||☠  🎯 *Coupable révélé:* ${coupable}||\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, { mentions: [jid] })
}
