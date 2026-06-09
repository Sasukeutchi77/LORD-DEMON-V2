import { sendMessage } from '../lib/sendMessage.js'
import fs from 'fs'
import { getSenderJid } from '../lib/ownerSystem.js'
const AFK_FILE = '/tmp/afk_status.json'
function loadAfk() { try { return JSON.parse(fs.readFileSync(AFK_FILE, 'utf8')) } catch { return {} } }
function saveAfk(d) { fs.writeFileSync(AFK_FILE, JSON.stringify(d, null, 2)) }
export default async function afk(sock, sender, args, msg, ctx = {}) {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const data = loadAfk()
  const raison = args.join(' ') || 'Absent pour le moment'
  if (data[jid]) {
    const since = new Date(data[jid].since)
    const mins = Math.floor((Date.now() - since) / 60000)
    delete data[jid]; saveAfk(data)
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `⛧   👋 *RETOUR EN LIGNE*   ☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☠  ✅ Bienvenue de retour, @${jid.split('@')[0]} !\n` +
      `⛧  ⏱️ Tu étais absent depuis *${mins} minutes*\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`, { mentions: [jid] })
  }
  data[jid] = { raison, since: Date.now() }; saveAfk(data)
  await sendMessage(sock, sender,
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   💤 *STATUT AFK*   ☩\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☠  👤 @${jid.split('@')[0]} est maintenant AFK\n` +
    `⛧  💬 *Raison:* _${raison}_\n\n` +
    `✝  _Réponds à .afk pour revenir en ligne._\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`, { mentions: [jid] })
}
