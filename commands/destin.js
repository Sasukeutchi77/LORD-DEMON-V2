import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid } from '../lib/ownerSystem.js'
const DESTINS = [
  { destin: "Tu seras riche et célèbre", signe: "💰", epoque: "Dans moins de 3 ans" },
  { destin: "Une grande aventure t'attend", signe: "⚔️", epoque: "Très bientôt" },
  { destin: "La gloire sera au rendez-vous", signe: "🏆", epoque: "Après une épreuve difficile" },
  { destin: "Des épreuves te rendront plus fort", signe: "💪", epoque: "Dès maintenant" },
  { destin: "L'amour frappera bientôt", signe: "❤️", epoque: "Quand tu t'y attends le moins" },
  { destin: "Un voyage inattendu changera ta vie", signe: "🗺️", epoque: "Dans les prochains mois" },
  { destin: "La sagesse sera ta plus grande force", signe: "📿", epoque: "Progressivement" },
  { destin: "Tu deviendras une légende", signe: "⛧", epoque: "Inéluctablement" },
]
export default async function destin(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || jid
  const d = DESTINS[Math.floor(Math.random() * DESTINS.length)]
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔮 *DESTIN RÉVÉLÉ*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 *Âme lue:* @${target.split('@')[0]}\n\n` +
    `⛧  ${d.signe} *Destin:* ${d.destin}\n` +
    `✝  🕰️ *Quand:* ${d.epoque}\n\n` +
    `☩  _Les étoiles ne mentent jamais..._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text, target !== jid ? { mentions: [target] } : undefined)
}
