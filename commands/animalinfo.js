import { sendMessage } from '../lib/sendMessage.js'
const ANIMAUX = {
  lion: { emoji: '🦁', vie: '10-14 ans', regime: 'Carnivore', poids: '120-250 kg', hab: 'Savane africaine', stat: 'Vulnérable' },
  elephant: { emoji: '🐘', vie: '60-70 ans', regime: 'Herbivore', poids: '4000-6000 kg', hab: 'Afrique/Asie', stat: 'Menacé' },
  tigre: { emoji: '🐯', vie: '10-15 ans', regime: 'Carnivore', poids: '100-300 kg', hab: 'Forêts Asie', stat: 'En danger' },
  gorille: { emoji: '🦍', vie: '35-40 ans', regime: 'Herbivore', poids: '70-200 kg', hab: 'Afrique centrale', stat: 'En danger critique' },
  dauphin: { emoji: '🐬', vie: '15-50 ans', regime: 'Poissons/céphalopodes', poids: '150-650 kg', hab: 'Tous les océans', stat: 'Stable' },
  panda: { emoji: '🐼', vie: '15-20 ans', regime: 'Bambou 99%', poids: '70-130 kg', hab: 'Montagnes Chine', stat: 'Vulnérable' },
  cheetah: { emoji: '🐆', vie: '10-12 ans', regime: 'Carnivore', poids: '35-65 kg', hab: 'Savane africaine', stat: 'Vulnérable' },
}
export default async function animalinfo(sock, sender, args, msg, ctx = {}) {
  const input = args.join(' ').toLowerCase()
  const i = ANIMAUX[input]
  if (!i) return sendMessage(sock, sender, `☠ Usage: .animalinfo <animal>\nDisponibles: ${Object.keys(ANIMAUX).join(', ')}`)
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ${i.emoji} *${input.toUpperCase()}*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  ⏳ *Espérance de vie:* ${i.vie}\n` +
    `⛧  🍖 *Régime:* ${i.regime}\n` +
    `✝  ⚖️ *Poids:* ${i.poids}\n` +
    `☩  🌍 *Habitat:* ${i.hab}\n` +
    `☠  🔴 *Statut:* ${i.stat}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
