import { sendMessage } from '../lib/sendMessage.js'
import { createHash } from 'crypto'
export default async function hash2(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const algo = args[0]?.toLowerCase(), text = args.slice(1).join(' ')
  const algos = ['md5','sha1','sha256','sha512']
  if (!algo||!algos.includes(algo)||!text) return await sendMessage(sock, sender, `☩━━━〔 🔒 *HASH* 〕━━━☩\n☠\n⛧  ${prefix}hash2 <algo> <texte>\n☠  Algos: md5 sha1 sha256 sha512\n✝  Ex: ${prefix}hash2 sha256 hello world\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  const hash = createHash(algo).update(text).digest('hex')
  await sendMessage(sock, sender, `☩━━━〔 🔒 *${algo.toUpperCase()}* 〕━━━☩\n☠\n⛧  Texte: _${text.slice(0,50)}_\n☠\n✝  \`${hash}\`\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}