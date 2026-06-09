import { sendMessage } from '../lib/sendMessage.js'
export default async function budget2(sock, sender, args, msg, ctx = {}) {
  const income = parseFloat(args[0])
  const expenses = args.slice(1).map(Number).filter(n => !isNaN(n) && n > 0)
  if (!income || !expenses.length) {
    return sendMessage(sock, sender, `☠ Usage: .budget2 <revenu> <dép1> <dép2> ...\nEx: .budget2 50000 15000 8000 5000`)
  }
  const total = expenses.reduce((a,b) => a+b, 0)
  const balance = income - total
  const ratio = ((total/income)*100).toFixed(1)
  const savings = ((balance/income)*100).toFixed(1)
  const status = balance >= 0 ? '✅ Budget sain' : '⚠️ Déficit budgétaire !'
  const text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💰 *BUDGET PERSONNEL*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  💵 *Revenus:* ${income.toLocaleString()}\n` +
    `⛧  📊 *Dépenses:* ${total.toLocaleString()} (${ratio}%)\n` +
    `✝  ${balance >= 0 ? '💰' : '💸'} *Solde:* ${balance >= 0 ? '+' : ''}${balance.toLocaleString()}\n` +
    `☩  📈 *Épargne:* ${balance >= 0 ? savings+'%' : '0%'}\n\n` +
    `☠  ${status}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
