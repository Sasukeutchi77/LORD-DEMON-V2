// †┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†
// ║   .pairing — Lier une âme WhatsApp via code       ║
// ║   Usage: .pairing +226XXXXXXXX                    ║
// ║   Accès : OWNER UNIQUEMENT                        ║
// †┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†

import {
  createBotInstance,
  getBotInstance,
  isOnCooldown,
  getCooldownRemaining,
  sessionExists,
} from '../lib/sessionManager.js'
import { isOwner } from '../lib/ownerSystem.js'

export default async function pairing(sock, sender, args, msg, ctx) {
  const { senderJid } = ctx
  const senderNumber = senderJid.replace('@s.whatsapp.net', '').replace(/[^0-9]/g, '')
  const prefix = process.env.PREFIX || '.'

  const send = (text) => sock.sendMessage(sender, { text })

  // ── Vérification accès : OWNER UNIQUEMENT ────────────
  if (!isOwner(senderJid)) {
    return send(
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `   ⛧ *LORD DEMON — PAIRING* ⛧\n` +
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n\n` +
      `☩━━━〔 ⛔ *ACCÈS REFUSÉ* 〕━━━☩\n` +
      `☠\n` +
      `✝ 🔒 sort réservée au *Seigneur* (Owner).\n\n` +
      `⛧ Seul le maître du Démon peut\n` +
      `☩ lier une âme via ce rituel.\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── Vérifier le numéro fourni ─────────────────────────
  const rawNumber = args[0]
  if (!rawNumber) {
    return send(
      `☩━━━〔 ☠ *INVOCATION* 〕━━━☩\n\n` +
      `⛧ *Sort :* .pairing +226XXXXXXXX\n\n` +
      `☩ *Exemple :* .pairing +22670123456\n\n` +
      `✝ Fournissez le numéro avec l'indicatif du pays.\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const sanitized = rawNumber.replace(/[^0-9]/g, '')
  if (sanitized.length < 7 || sanitized.length > 15) {
    return send(
      `☩━━━〔 ☠ *ÂME INVALIDE* 〕━━━☩\n\n` +
      `⛧ Numéro invalide. Exemple : .pairing +22670000000\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── Vérifier le cooldown ──────────────────────────────
  if (isOnCooldown(senderNumber)) {
    const remaining = getCooldownRemaining(senderNumber)
    return send(
      `☩━━━〔 ⏳ *PACTE EN COURS* 〕━━━☩\n\n` +
      `⛧ Patientez *${remaining} secondes* avant de réinvoquer.\n` +
      `☠ Bouclier anti-spam actif.\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  // ── Vérifier session existante ────────────────────────
  if (getBotInstance(sanitized)?.status === 'connected') {
    return send(
      `☩━━━〔 👁️ *ÂME DÉJÀ LIÉE* 〕━━━☩\n\n` +
      `⛧ Le numéro *+${sanitized}* possède déjà un pacte actif.\n` +
      `☩ Utilisez *${prefix}mypair* pour voir les détails.\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  await send(
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `   ⛧ *LORD DEMON — PAIRING* ⛧\n` +
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n\n` +
    `☩ ⏳ _Gravure du sceau pour_\n` +
    `⛧ *+${sanitized}*...\n\n` +
    `✝ _Patientez, le rituel s'accomplit..._`
  )

  try {
    await createBotInstance(sanitized, async (code) => {
      const formatted = code?.match(/.{1,4}/g)?.join('-') || code
      await sock.sendMessage(sender, {
        text:
          `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
          `   ⛧ *LORD DEMON — PAIRING* ⛧\n` +
          `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n\n` +
          `☩━━━〔 🩸 *SCEAU GRAVÉ* 〕━━━☩\n` +
          `☠\n` +
          `⛧ 📞 Âme : *+${sanitized}*\n` +
          `☠\n` +
          `✝ 🔑 *Code du pacte :*\n\n` +
          `        *${formatted}*\n\n` +
          `☩━━━〔 📜 *RITUEL D'ENTRÉE* 〕━━━☩\n` +
          `☠\n` +
          `⛧ 1️⃣  Ouvrez WhatsApp sur votre téléphone\n` +
          `☩ 2️⃣  Paramètres › Appareils liés\n` +
          `✝ 3️⃣  Appuyez "Lier un appareil"\n` +
          `⛧ 4️⃣  Choisissez "Lier avec numéro de téléphone"\n` +
          `☩ 5️⃣  Entrez le code ci-dessus\n` +
          `☠\n` +
          `✝ ⏱️  Ce sceau expire dans ~60 secondes\n` +
          `⛧ ☠  Le Démon se lie automatiquement après validation.\n` +
          `☠\n` +
          `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      })
    })
  } catch (err) {
    await send(
      `☩━━━〔 ☠ *RITUEL ÉCHOUÉ* 〕━━━☩\n\n` +
      `⛧ ${err.message}\n\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}
