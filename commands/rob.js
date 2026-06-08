// commands/rob.js — LORD DEMON
import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'
import { ecoDb, ECONOMY } from '../lib/economySystem.js'
import { cleanNumber } from '../lib/ownerSystem.js'

const ROB_FAILS = [
  '🚓 La police t\'a attrapé ! Tu as perdu des coins.',
  '🐕 Un chien de garde t\'a mordu. Mission échouée.',
  '📸 Une caméra t\'a filmé. Tu t\'es enfui les mains vides.',
  '🔫 La cible était armée ! Tu es parti en courant.',
  '🕵️ C\'était un piège ! Tu as perdu des coins.',
  '😤 La cible t\'a reconnu et appelé ses amis.',
  '🧱 Tu as trébuché et déclenché l\'alarme.',
  '💀 Mauvais timing — la cible venait de partir.',
]

export default async function rob(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'
  const robber    = ecoDb.ensure(senderJid)
  const now       = Date.now()

  // Cooldown
  if (now - (robber.last_rob || 0) < ECONOMY.ROB_COOLDOWN) {
    const remaining = ECONOMY.ROB_COOLDOWN - (now - robber.last_rob)
    const m = Math.floor(remaining / 60000)
    return await sendMessage(sock, sender,
      `☩━━━〔 🔫 *VOL* 〕━━━☩\n☠\n⛧  😤 Tu es trop connu des flics !\n☠  ⏳ Attends encore: *${m} min*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // Cible
  const mentions = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid
  const quoted   = msg.message?.extendedTextMessage?.contextInfo?.participant
  let targetJid  = mentions?.[0] || quoted
  if (!targetJid && args[0]) {
    const num = cleanNumber(args[0])
    if (num) targetJid = `${num}@s.whatsapp.net`
  }
  if (!targetJid) {
    return await sendMessage(sock, sender,
      `☩━━━〔 🔫 *VOL — USAGE* 〕━━━☩\n☠\n⛧  ${prefix}rob @user\n☠  (ou reply sur son message)\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
  if (targetJid === senderJid) return await sendMessage(sock, sender, `☠ Tu ne peux pas te voler toi-même. 🤦`)

  const victim = ecoDb.ensure(targetJid)

  if (victim.coins < ECONOMY.ROB_MIN_WALLET) {
    return await sendMessage(sock, sender,
      `☩━━━〔 🔫 *VOL ANNULÉ* 〕━━━☩\n☠\n⛧  💸 @${cleanNumber(targetJid)} n'a pas assez de coins en poche.\n☠  (minimum ${ECONOMY.ROB_MIN_WALLET} ${ECONOMY.SYMBOL} requis)\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  let loadKey = null
  try {
    loadKey = await showProgressLoader(sock, sender, '🔫 VOL EN COURS...')
    ecoDb.setRob(senderJid)
    const success = Math.random() < ECONOMY.ROB_SUCCESS_RATE

    await deleteLoader(sock, sender, loadKey); loadKey = null

    if (success) {
      const pct    = 0.10 + Math.random() * 0.20
      const stolen = Math.floor(victim.coins * pct)
      ecoDb.removeCoins(targetJid, stolen, `robbed by ${senderJid}`)
      ecoDb.addCoins(senderJid, stolen, `robbed ${targetJid}`)
      const u2 = ecoDb.get(senderJid)
      await sendMessage(sock, sender,
        `☩━━━〔 🔫 *VOL RÉUSSI !* 〕━━━☩\n` +
        `☠\n` +
        `⛧  😈 *Succès !* Tu as volé @${cleanNumber(targetJid)}\n` +
        `☠\n` +
        `☩  💰 *Volé:* +${stolen} ${ECONOMY.SYMBOL} (${Math.round(pct*100)}%)\n` +
        `✝  💰 *Poche:* ${u2.coins} ${ECONOMY.SYMBOL}\n` +
        `☠\n` +
        `⛧  ⏰ Tu dois te cacher pendant 1h\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    } else {
      const penalty = Math.floor(robber.coins * (0.05 + Math.random() * 0.10))
      const failMsg = ROB_FAILS[Math.floor(Math.random() * ROB_FAILS.length)]
      if (penalty > 0) ecoDb.removeCoins(senderJid, penalty, 'rob failed penalty')
      const u2 = ecoDb.get(senderJid)
      await sendMessage(sock, sender,
        `☩━━━〔 🔫 *VOL RATÉ !* 〕━━━☩\n` +
        `☠\n` +
        `⛧  ${failMsg}\n` +
        `☠\n` +
        `☩  💸 *Pénalité:* -${penalty} ${ECONOMY.SYMBOL}\n` +
        `✝  💰 *Poche:* ${u2.coins} ${ECONOMY.SYMBOL}\n` +
        `☠\n` +
        `⛧  ⏰ Tu dois te cacher pendant 1h\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
  } catch(e) {
    if (loadKey) await deleteLoader(sock, sender, loadKey)
    await sendMessage(sock, sender, `☠ Erreur rob: ${e.message.slice(0,100)}`)
  }
}
