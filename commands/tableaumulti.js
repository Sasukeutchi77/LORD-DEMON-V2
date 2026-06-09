import { sendMessage } from '../lib/sendMessage.js'
export default async function tableaumulti(sock, sender, args, msg, ctx = {}) {
  try {
    const n = parseInt(args[0])
    if (isNaN(n) || n < 1 || n > 100) return await sendMessage(sock, sender, '☠ Usage: .tableaumulti <nombre>\nEx: .tableaumulti 7')
    let table = ''
    for (let i = 1; i <= 12; i++) table += `${n} × ${i} = ${n * i}\n`
    await sendMessage(sock, sender, `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧  ✖️ *TABLE DE ${n}*  ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n${table}\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON — Puissance des Ténèbres ☠`)
  } catch(e) { await sendMessage(sock, sender, `☠ Erreur: ${e.message}`) }
}
