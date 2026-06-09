import { sendMessage } from '../lib/sendMessage.js'
export default async function decryptmsg(sock, sender, args, msg, ctx = {}) {
  const input = args.join(' ').trim()
  if (!input) return sendMessage(sock, sender, `☠ Usage: .decryptmsg <message_chiffré>`)
  const methods = []
  try { methods.push({ label: 'Base64', result: Buffer.from(input, 'base64').toString('utf8') }) } catch {}
  try { methods.push({ label: 'URL', result: decodeURIComponent(input) }) } catch {}
  const rot13 = input.replace(/[a-zA-Z]/g, c => String.fromCharCode((c<='Z'?90:122)>=c.charCodeAt(0)+13 ? c.charCodeAt(0)+13 : c.charCodeAt(0)-13))
  methods.push({ label: 'ROT13', result: rot13 })
  const lines = methods.map(m => `⛧  *${m.label}:* ${m.result.slice(0,80)}`).join('\n')
  const out =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   🔓 *DÉCHIFFREMENT*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  📥 *Message:* ${input.slice(0,50)}\n\n` +
    `${lines}\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, out)
}
