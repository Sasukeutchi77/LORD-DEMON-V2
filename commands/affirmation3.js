import { sendMessage } from '../lib/sendMessage.js'
const AFFIRMATIONS = [
  "Je suis capable de réaliser ce que je veux.",
  "Chaque jour je deviens une meilleure version de moi.",
  "Ma force intérieure est plus grande que mes peurs.",
  "Je mérite le succès et le bonheur.",
  "Mes erreurs me font grandir, pas échouer.",
  "Je suis le maître de ma destinée.",
  "La persévérance est ma plus grande qualité.",
  "Chaque obstacle est une opportunité déguisée.",
  "Je rayonne de confiance et d'énergie positive.",
  "Mon potentiel est illimité.",
  "Je choisis la paix intérieure chaque jour.",
  "Mes actions d'aujourd'hui créent mon futur.",
  "Je suis entouré de gens qui me soutiennent.",
  "La réussite est inévitable quand je travaille dur.",
  "Je transforme mes rêves en réalité.",
]
export default async function affirmation3(sock, sender, args, msg, ctx = {}) {
  const aff = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]
  const date = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🌟 *AFFIRMATION POSITIVE*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📅 _${date}_\n\n` +
    `⛧  💬 _"${aff}"_\n\n` +
    `✝  🌅 _Répète cela 3 fois avec conviction._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
