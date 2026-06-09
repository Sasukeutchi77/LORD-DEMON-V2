import { sendMessage } from '../lib/sendMessage.js'
export default async function passwordgen(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX || '.'
  const len = Math.min(64, Math.max(8, parseInt(args[0]) || 16))
  const type = args[1]?.toLowerCase() || 'fort'
  const sets = { lettres: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', chiffres: '0123456789', symboles: '!@#$%^&*()_+-=[]{}|;:,.<>?', fort: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*' }
  const charset = sets[type] || sets.fort
  let pwd = ''
  for (let i = 0; i < len; i++) pwd += charset[Math.floor(Math.random() * charset.length)]
  await sendMessage(sock, sender,
    `☩━━━〔 🔑 *GÉNÉRATEUR MOT DE PASSE* 〕━━━☩\n☠\n⛧  🔐 *Mot de passe (${len} chars):*\n☠  \`${pwd}\`\n☠\n☩  💪 Type: ${type}\n✝  📊 Force: ${len >= 16 ? '🟢 Fort' : len >= 12 ? '🟡 Moyen' : '🔴 Faible'}\n☠\n⛧  ⚠️ Ne partage JAMAIS ton vrai mot de passe!\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
