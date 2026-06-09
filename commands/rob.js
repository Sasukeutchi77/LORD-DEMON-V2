// commands/rob.js — VOLER QUELQU'UN 🥷
import { sendMessage } from '../lib/sendMessage.js'
import { economyDb } from '../lib/economySystem.js'
import { getSenderJid } from '../lib/ownerSystem.js'
import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const _db = new Database(path.join(__dirname, '..', 'data', 'demon.db'))

const ROB_COOLDOWN = 3 * 3600 * 1000

export default async function rob(sock, sender, args, msg, ctx = {}) {
  try {
  const jid = ctx.senderJid || getSenderJid(msg, sock)
  const now = Date.now()
  const thief = economyDb.ensure(jid)

  if (thief.last_rob && (now - thief.last_rob) < ROB_COOLDOWN) {
    const reste = Math.ceil((ROB_COOLDOWN - (now - thief.last_rob)) / 60000)
    return sendMessage(sock, sender,
      `☩━━━〔 ⏳ *COOLDOWN VOL* 〕━━━☩\n⛧ Encore *${reste} minutes* avant de re-voler !\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const quoted = msg.message?.extendedTextMessage?.contextInfo?.participant
  const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  const targetJid = quoted || mentioned
  if (!targetJid) return sendMessage(sock, sender, `☠ Mentionnez la cible !`)
  if (targetJid === jid) return sendMessage(sock, sender, `☠ Impossible de se voler soi-même !`)

  const victim = economyDb.ensure(targetJid)
  const victimCoins = victim.coins || 0

  _db.prepare(`UPDATE economy SET last_rob = ? WHERE jid = ?`).run(now, jid)

  if (victimCoins < 50) {
    return sendMessage(sock, sender, `☠ Trop pauvre pour être volé ! (< 50 🪙)`)
  }

  const victimInv = economyDb.getInventory(targetJid)
  if (victimInv.bouclier > 0) {
    economyDb.removeItem(targetJid, 'bouclier')
    return sendMessage(sock, sender,
      `⛧━━━〔 🛡️ *VOL BLOQUÉ !* 〕━━━⛧\n☠ La victime avait un *Bouclier* ! Il s'est brisé.\n✝ Votre tentative a été repoussée !\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const success = Math.random() < 0.55

  if (success) {
    const stolen = Math.floor(victimCoins * (0.10 + Math.random() * 0.20))
    economyDb.removeCoins(targetJid, stolen)
    economyDb.addCoins(jid, stolen)
    return sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   🥷 *VOL RÉUSSI !*              ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💰 Volé *${stolen} 🪙* à @${targetJid.split('@')[0]} !\n🪙 Nouveau solde: *${economyDb.get(jid).coins} 🪙*\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`,
      { mentions: [targetJid] }
    )
  } else {
    const penalty = Math.min(Math.floor(50 + Math.random() * 100), thief.coins || 0)
    economyDb.removeCoins(jid, penalty)
    return sendMessage(sock, sender,
      `☩━━━〔 🚨 *VOL ÉCHOUÉ !* 〕━━━☩\n⛧ Vous avez été *attrapé* !\n☠ Amende: *${penalty} 🪙*\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  } catch (e) {
    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n⛧   ☠ *ERREUR DÉMONIAQUE*   ☩\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n💀 ${e.message}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n⛧ LORD DEMON ☠`
    )
  }
}