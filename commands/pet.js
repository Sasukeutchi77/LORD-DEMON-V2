// commands/pet.js — ANIMAUX VIRTUELS 🐾
import { sendMessage } from '../lib/sendMessage.js'
import { petDb, SPECIES } from '../lib/economySystem.js'
import { getSenderJid } from '../lib/ownerSystem.js'

function statBar(val) {
  const filled = Math.round(val / 10)
  const emoji = val > 60 ? '🟢' : val > 30 ? '🟡' : '🔴'
  return emoji + ' ' + '█'.repeat(filled) + '░'.repeat(10 - filled) + ` ${val}%`
}

export default async function pet(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const sub = args[0]?.toLowerCase()

  if (!sub || sub === 'info') {
    const p = petDb.get(jid)
    if (!p) {
      const speciesList = Object.keys(SPECIES).map(s => `⛧ \`${s}\``).join('\n')
      return sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧   🐾 *ANIMAUX VIRTUELS*          ☩\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
        `Vous n'avez pas d'animal.\n\nEspèces disponibles:\n${speciesList}\n\n` +
        `💡 \`.pet adopter <espèce> <nom>\`\n` +
        `Ex: \`.pet adopter 🐺 Loup Shadow\`\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
    petDb.decay(jid)
    const updated = petDb.get(jid)
    const sp = SPECIES[updated.species] || { emoji: '🐾' }
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `${sp.emoji}   *${updated.name}* — Niv.${updated.level}  ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `🐾 Espèce: *${updated.species}*\n` +
      `⭐ Niveau: *${updated.level}* (${updated.xp} XP)\n` +
      `💫 Pouvoir: *${sp.power || '?'}*\n\n` +
      `🍖 Faim:    ${statBar(updated.hunger)}\n` +
      `😊 Bonheur: ${statBar(updated.happiness)}\n` +
      `❤️ Santé:   ${statBar(updated.health)}\n\n` +
      `🦴 \`.pet nourrir\`  — Nourrir (+30 faim)\n` +
      `🎾 \`.pet jouer\`   — Jouer (+20 bonheur, +XP)\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  if (sub === 'adopter' || sub === 'adopt') {
    if (petDb.get(jid)) return sendMessage(sock, sender, `☠ Vous avez déjà un animal !`)
    const speciesKey = args.slice(1, -1).join(' ')
    const name = args[args.length - 1]
    if (!speciesKey || !name || args.length < 3) return sendMessage(sock, sender, `☠ Usage: \`.pet adopter <espèce> <nom>\`\nEx: \`.pet adopter 🐺 Loup Shadow\``)
    const matchedSpecies = Object.keys(SPECIES).find(s => s.toLowerCase().includes(args[1]?.toLowerCase()) || args[1] === s)
    const species = matchedSpecies || Object.keys(SPECIES)[Math.floor(Math.random() * Object.keys(SPECIES).length)]
    petDb.adopt(jid, name, species)
    return sendMessage(sock, sender,
      `✅ *Animal adopté !*\n${SPECIES[species]?.emoji || '🐾'} *${name}* vous rejoint !\n💡 Nourrissez-le avec \`.pet nourrir\``
    )
  }

  if (sub === 'nourrir' || sub === 'feed') {
    if (!petDb.get(jid)) return sendMessage(sock, sender, `☠ Pas d'animal à nourrir.`)
    const updated = petDb.feed(jid)
    return sendMessage(sock, sender, `🦴 *${updated.name}* a été nourri !\n🍖 Faim: ${statBar(updated.hunger)}`)
  }

  if (sub === 'jouer' || sub === 'play') {
    if (!petDb.get(jid)) return sendMessage(sock, sender, `☠ Pas d'animal.`)
    const updated = petDb.play(jid)
    return sendMessage(sock, sender,
      `🎾 *${updated.name}* est content de jouer avec vous !\n😊 Bonheur: ${statBar(updated.happiness)}\n✨ +5 XP (Total: ${updated.xp})`
    )
  }

  await sendMessage(sock, sender, `☠ Sous-commande inconnue. Tapez \`.pet\` pour l'aide.`)
}
