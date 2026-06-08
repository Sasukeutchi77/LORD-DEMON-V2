// commands/guild.js — GUILDES 🏰
import { sendMessage } from '../lib/sendMessage.js'
import { guildDb } from '../lib/economySystem.js'
import { getSenderJid } from '../lib/ownerSystem.js'

export default async function guild(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const sub = args[0]?.toLowerCase()

  if (!sub || sub === 'info') {
    const membership = guildDb.getMember(jid)
    if (!membership) {
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   🏰 *SYSTÈME DE GUILDES*        ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `☠ Vous n'avez pas de guilde.\n\n` +
        `💡 \`.guild creer <nom> <tag> <desc>\`\n` +
        `💡 \`.guild rejoindre <nom>\`\n` +
        `💡 \`.guild liste\`\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    const g = guildDb.get(membership.guild_id)
    const members = guildDb.members(membership.guild_id)
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `🏰   *GUILDE: ${g.name}* [${g.tag}]      ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `📖 ${g.description || 'Pas de description'}\n\n` +
      `⭐ Niveau: *${g.level}* | 🌟 XP: *${g.xp}*\n` +
      `👥 Membres: *${members.length}*\n` +
      `👑 Chef: @${(g.leader || '').split('@')[0]}\n` +
      `🏷️ Votre rôle: *${membership.role}*\n\n` +
      `💡 \`.guild quitter\` | \`.guild membres\`\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [g.leader] }
    )
  }

  if (sub === 'creer' || sub === 'create') {
    if (guildDb.getMember(jid)) return sendMessage(sock, sender, `☠ Quittez votre guilde actuelle d'abord !`)
    const name = args[1]
    const tag = args[2]
    const desc = args.slice(3).join(' ') || 'Une guilde puissante'
    if (!name || !tag) return sendMessage(sock, sender, `☠ Usage: \`.guild creer <nom> <tag> [description]\``)
    if (tag.length > 5) return sendMessage(sock, sender, `☠ Le tag doit faire 5 caractères max.`)
    const result = guildDb.create(name, tag, jid, desc)
    if (!result.ok) return sendMessage(sock, sender, `☠ ${result.reason}`)
    return sendMessage(sock, sender,
      `✅ *Guilde créée !*\n🏰 *${name}* [${tag.toUpperCase()}]\n👑 Vous êtes le chef !\n💡 \`.guild\` pour voir les infos`
    )
  }

  if (sub === 'rejoindre' || sub === 'join') {
    if (guildDb.getMember(jid)) return sendMessage(sock, sender, `☠ Quittez votre guilde actuelle d'abord !`)
    const name = args.slice(1).join(' ')
    const g = guildDb.getByName(name)
    if (!g) return sendMessage(sock, sender, `☠ Guilde *${name}* introuvable.`)
    guildDb.join(jid, g.id)
    guildDb.addXp(g.id, 10)
    return sendMessage(sock, sender, `✅ Vous avez rejoint *${g.name}* [${g.tag}] !`)
  }

  if (sub === 'quitter' || sub === 'leave') {
    const m = guildDb.getMember(jid)
    if (!m) return sendMessage(sock, sender, `☠ Vous n'êtes pas dans une guilde.`)
    if (m.role === 'chef') return sendMessage(sock, sender, `☠ Le chef ne peut pas quitter. Dissoudre la guilde d'abord.`)
    guildDb.leave(jid)
    return sendMessage(sock, sender, `✅ Vous avez quitté la guilde.`)
  }

  if (sub === 'membres' || sub === 'members') {
    const m = guildDb.getMember(jid)
    if (!m) return sendMessage(sock, sender, `☠ Vous n'êtes pas dans une guilde.`)
    const members = guildDb.members(m.guild_id)
    const g = guildDb.get(m.guild_id)
    const lines = members.map(mb => `⛧ @${(mb.jid || '').split('@')[0]} — *${mb.role}*`).join('\n')
    return sendMessage(sock, sender,
      `🏰 *${g.name}* — ${members.length} membres\n\n${lines}`,
      { mentions: members.map(mb => mb.jid) }
    )
  }

  if (sub === 'liste' || sub === 'list' || sub === 'classement') {
    const top = guildDb.leaderboard(10)
    const lines = top.map((g, i) => `${i+1}. 🏰 *${g.name}* [${g.tag}] — Niv.${g.level} — ${g.member_count} membres`).join('\n')
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   🏆 *CLASSEMENT GUILDES*        ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `${lines || 'Aucune guilde créée.'}\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  await sendMessage(sock, sender, `☠ Sous-commande inconnue. Tapez \`.guild\` pour l'aide.`)
}
