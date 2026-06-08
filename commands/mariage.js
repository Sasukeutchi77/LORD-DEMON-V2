// commands/mariage.js — SYSTÈME DE MARIAGE 💒
import { sendMessage } from '../lib/sendMessage.js'
import { marriageDb, economyDb } from '../lib/economySystem.js'
import { getSenderJid } from '../lib/ownerSystem.js'

const proposals = new Map() // jid -> { target, expires }

export default async function mariage(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const sub = args[0]?.toLowerCase()

  if (!sub || sub === 'info' || sub === 'statut') {
    const partner = marriageDb.getPartner(jid)
    if (!partner) {
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   💒 *SYSTÈME DE MARIAGE*        ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `💔 Vous êtes *célibataire*.\n\n` +
        `💡 \`.mariage proposer @personne\`\n` +
        `💡 \`.mariage accepter\`\n` +
        `💡 \`.mariage divorcer\`\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    const m = marriageDb.get(jid)
    const duration = Math.floor((Date.now() - m.married_at) / (1000 * 60 * 60 * 24))
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `${m.ring}   💒 *ÉTAT MATRIMONIAL*          ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `💑 Marié(e) avec: @${partner.split('@')[0]}\n` +
      `💍 Bague: ${m.ring}\n` +
      `📅 Depuis: *${duration} jour(s)*\n\n` +
      `💡 \`.mariage divorcer\` pour divorcer\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [partner] }
    )
  }

  if (sub === 'proposer' || sub === 'propose') {
    if (marriageDb.getPartner(jid)) return sendMessage(sock, sender, `☠ Vous êtes déjà marié(e) !`)
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.participant
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    const target = quoted || mentioned
    if (!target) return sendMessage(sock, sender, `☠ Mentionnez la personne à qui faire la demande !`)
    if (target === jid) return sendMessage(sock, sender, `☠ Vous ne pouvez pas vous marier avec vous-même !`)
    if (marriageDb.getPartner(target)) return sendMessage(sock, sender, `☠ Cette personne est déjà mariée !`)
    proposals.set(target, { from: jid, expires: Date.now() + 5 * 60 * 1000 })
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `💍   💒 *DEMANDE EN MARIAGE*        💍\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `@${jid.split('@')[0]} fait une demande en mariage à @${target.split('@')[0]} ! 💍\n\n` +
      `@${target.split('@')[0]}, tapez \`.mariage accepter\` ou \`.mariage refuser\`\n` +
      `⏱️ Valable 5 minutes.\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [jid, target] }
    )
  }

  if (sub === 'accepter' || sub === 'accept') {
    const proposal = proposals.get(jid)
    if (!proposal || Date.now() > proposal.expires) return sendMessage(sock, sender, `☠ Aucune demande en cours ou expirée.`)
    if (marriageDb.getPartner(jid)) return sendMessage(sock, sender, `☠ Vous êtes déjà marié(e) !`)
    proposals.delete(jid)
    marriageDb.marry(proposal.from, jid, '💍')
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `💒   🎊 *MARIAGE CÉLÉBRÉ !* 🎊      💒\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `💑 @${proposal.from.split('@')[0]} & @${jid.split('@')[0]} sont maintenant mariés ! 💍\n\n` +
      `🎉 Félicitations ! Que votre union soit éternelle !\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [proposal.from, jid] }
    )
  }

  if (sub === 'refuser' || sub === 'refuse') {
    proposals.delete(jid)
    return sendMessage(sock, sender, `💔 Demande refusée.`)
  }

  if (sub === 'divorcer' || sub === 'divorce') {
    if (!marriageDb.getPartner(jid)) return sendMessage(sock, sender, `☠ Vous n'êtes pas marié(e).`)
    const partner = marriageDb.getPartner(jid)
    marriageDb.divorce(jid)
    return sendMessage(sock, sender,
      `💔 *Divorce prononcé.*\n@${jid.split('@')[0]} et @${partner.split('@')[0]} sont maintenant séparés.`,
      { mentions: [jid, partner] }
    )
  }

  await sendMessage(sock, sender, `☠ Sous-commande inconnue. Tapez \`.mariage\` pour l'aide.`)
}
