// commands/passe.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'

export default async function passe(sock, sender, args, msg) {
  try {
  const name = msg?.pushName || 'Invocateur'
  const input = args.join(' ') || 'invocation'
  const pool = ['⚡ Invocation réussie', '🔥 Flammes démoniaques', '☠ Ténèbres révélées', '⛧ Rituel accompli', '🌑 Ombre convoquée', '💀 Sort déclenché', '🩸 Pacte activé', '✝ Puissance octroyée']
  const result = pool[Math.floor(Math.random() * pool.length)]

  const text =
    `☩━━━〔 ⛧ *PASSE* 〕━━━☩\n\n` +
    `☠  👤 *${name}*\n` +
    `⛧  📝 *Entrée :* ${input}\n` +
    `✝  ✨ *Résultat :* ${result}\n` +
    `☩  ⏰ *${new Date().toLocaleString('fr-FR')}*\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

  await sendMessage(sock, sender, text)

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ ERREUR DÉMONIAQUE   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}