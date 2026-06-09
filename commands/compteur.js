// commands/compteur.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FILE = path.join(__dirname, '../data/compteurs.json')

function load() { try { return JSON.parse(fs.readFileSync(FILE, 'utf8')) } catch { return {} } }
function save(d) { try { fs.writeFileSync(FILE, JSON.stringify(d, null, 2)) } catch {} }

export default async function compteur(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg?.key?.participant || msg?.key?.remoteJid
  const data = load()
  const key = `${sender}_${args[0] || 'default'}`
  const action = args[0]
  const nom = args[1] || 'MonCompteur'

  if (action === 'reset') {
    if (data[key]) { data[key].val = 0; save(data) }
    return await sendMessage(sock, sender, `☩━━━〔 🔢 *COMPTEUR* 〕━━━☩\n\n⛧  Compteur remis à zéro !\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  if (!data[key]) data[key] = { nom, val: 0, createdAt: Date.now() }
  data[key].val++
  save(data)
  const text =
    `☩━━━〔 🔢 *COMPTEUR DÉMONIAQUE* 〕━━━☩\n\n` +
    `☠  📛 *Nom:* ${data[key].nom}\n` +
    `⛧  🔢 *Valeur:* ${data[key].val}\n\n` +
    `✝  *.compteur reset ${args[0] || 'default'}* pour réinitialiser\n\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  await sendMessage(sock, sender, text)
}
