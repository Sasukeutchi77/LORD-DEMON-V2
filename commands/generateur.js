// commands/generateur.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

export default async function generateur(sock, sender, args) {
  const type = args[0]?.toLowerCase()
  const prefix = process.env.PREFIX || '.'
  if (!type) return await sendMessage(sock, sender,
    `☩━━━〔 🎲 *GÉNÉRATEUR DÉMONIAQUE* 〕━━━☩\n\n` +
    `✝  Sous-commandes disponibles:\n` +
    `⛧  *.generateur nom* — Nom démoniaque\n` +
    `☩  *.generateur phrase* — Phrase aléatoire\n` +
    `☠  *.generateur code* — Code secret\n` +
    `⛧  *.generateur titre* — Titre épique\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)

  let result = ''
  if (type === 'nom') {
    const prefixes = ['Dark', 'Shadow', 'Blood', 'Death', 'Void', 'Chaos', 'Demon', 'Hell', 'Soul', 'Grave']
    const suffixes = ['Blade', 'Storm', 'Fire', 'Lord', 'King', 'Master', 'Reaper', 'Slayer', 'Hunter', 'Walker']
    result = prefixes[Math.floor(Math.random() * prefixes.length)] + suffixes[Math.floor(Math.random() * suffixes.length)]
  } else if (type === 'phrase') {
    const phrases = [
      "Les ombres gouvernent ceux qui refusent la lumière",
      "Le sang coule mais l'âme reste immortelle",
      "Dans le chaos naît la vraie puissance",
      "Seuls les forts méritent de régner sur les ténèbres",
      "La mort n'est qu'un passage vers une autre forme de pouvoir"
    ]
    result = phrases[Math.floor(Math.random() * phrases.length)]
  } else if (type === 'code') {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%'
    result = Array.from({length: 12}, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  } else if (type === 'titre') {
    const titres = ['Seigneur des Ombres', 'Maître de la Nuit', 'Roi des Démons', 'Gardien des Abysses', 'Souverain Éternel', 'Porteur de Ténèbres']
    result = titres[Math.floor(Math.random() * titres.length)]
  } else {
    result = 'Type inconnu. Essaie: nom, phrase, code, titre'
  }

  const text =
    `☩━━━〔 🎲 *GÉNÉRATEUR DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  🏷️ *Type:* ${type}\n\n` +
    `⛧  ✨ *Résultat:*\n` +
    `✝  _${result}_\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
