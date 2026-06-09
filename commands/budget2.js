import { sendMessage } from '../lib/sendMessage.js'
export default async function budget2(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const income = parseFloat(args[0]), expenses = args.slice(1).map(Number).filter(Boolean)
  if (!income || !expenses.length) return await sendMessage(sock, sender, `☩━━━〔 💰 *BUDGET* 〕━━━☩\n☠\n⛧  Usage: ${prefix}budget2 <revenu> <dép1> <dép2> ...\n☠  Ex: ${prefix}budget2 50000 15000 8000 5000\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const total = expenses.reduce((a,b)=>a+b,0)
  const balance = income - total
  const ratio = ((total/income)*100).toFixed(1)
  await sendMessage(sock, sender, `☩━━━〔 💰 *BUDGET PERSONNEL* 〕━━━☩\n☠\n⛧  💵 Revenus: *${income.toLocaleString()}*\n☠  📊 Dépenses: *${total.toLocaleString()}*\n✝  (${expenses.length} postes, ${ratio}% du revenu)\n☠\n⛧  ${balance>=0?'✅':'⚠️'} Solde: *${balance>=0?'+':''}+${balance.toLocaleString()}*\n☠\n${balance<0?'✝  ⚠️ ATTENTION: Tu dépenses plus que tu gagnes!\n☠':''}⛧  💡 Règle 50/30/20: Besoins/Envies/Épargne\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}