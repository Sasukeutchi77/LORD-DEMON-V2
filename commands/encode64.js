import { sendMessage } from '../lib/sendMessage.js'
export default async function encode64(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const sub = args[0]?.toLowerCase()
  const text = args.slice(1).join(' ')
  if (!sub||!text||(sub!=='encode'&&sub!=='decode')) return await sendMessage(sock, sender, `☩━━━〔 🔡 *BASE64* 〕━━━☩\n☠\n⛧  ${prefix}encode64 encode <texte>\n☠  ${prefix}encode64 decode <base64>\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  let result
  try { result = sub==='encode' ? Buffer.from(text).toString('base64') : Buffer.from(text,'base64').toString('utf8') }
  catch(e) { return await sendMessage(sock, sender, '☠ Erreur de décodage.') }
  await sendMessage(sock, sender, `☩━━━〔 🔡 *BASE64 ${sub.toUpperCase()}* 〕━━━☩\n☠\n⛧  Input: _${text.slice(0,50)}_\n☠\n✝  \`${result}\`\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}