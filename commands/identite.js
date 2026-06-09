// commands/identite.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

const prenoms = ['Zephyr', 'Draven', 'Morgana', 'Vesper', 'Lucian', 'Seraphina', 'Raven', 'Damian', 'Lyra', 'Orion']
const noms = ['Blackwood', 'Shadowmere', 'Voidwalker', 'Duskborn', 'Hellfire', 'Darkbloom', 'Grimshaw', 'Nightfall']
const ages = () => Math.floor(Math.random() * 30) + 18
const professions = ['Chasseur de primes ⚔️', 'Sorcier noir 🔮', 'Assassin de l\'ombre ☠️', 'Chevalier maudit 🛡️', 'Alchimiste démoniaque ⚗️', 'Nécromancien 💀']
const villes = ['Nécropolys 🌑', 'Abyssoria ⛧', 'Ténèbropolis ☠️', 'Limborgh ✝', 'Sombrevil 🌙']

export default async function identite(sock, sender, args, msg) {
  try {
  const prenom = prenoms[Math.floor(Math.random() * prenoms.length)]
  const nom = noms[Math.floor(Math.random() * noms.length)]
  const age = ages()
  const prof = professions[Math.floor(Math.random() * professions.length)]
  const ville = villes[Math.floor(Math.random() * villes.length)]
  const text =
    `☩━━━〔 🪪 *IDENTITÉ DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  👤 *Nom complet:* ${prenom} ${nom}\n` +
    `⛧  🎂 *Âge:* ${age} ans\n` +
    `✝  💼 *Profession:* ${prof}\n` +
    `☩  🏙️ *Ville:* ${ville}\n` +
    `☠  🔑 *ID:* ${Math.random().toString(36).substr(2,8).toUpperCase()}\n\n` +
    `⛧  _Cette identité vous a été assignée par les Ténèbres._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}