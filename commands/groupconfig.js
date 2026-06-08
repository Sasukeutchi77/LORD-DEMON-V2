// commands/groupconfig.js — LORD DEMON
// ✅ Configuration complète du groupe avec design amélioré

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isSudo } from '../lib/ownerSystem.js'
import { getGroupConfig } from '../lib/groupConfig.js'

export default async function groupconfig(sock, sender, args, msg, ctx = {}) {
  try {
    if (!sender.endsWith('@g.us')) {
      return await sendMessage(sock, sender,
        `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
        `⛧  ⚠️ *CERCLE UNIQUEMENT*\n` +
        `☩  Cette sort est réservée\n` +
        `✝  aux cercles WhatsApp.\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const c = getGroupConfig(sender)

    const onOff = (v) => v ? '🩸 ON' : '💀 OFF'
    const locks  = Object.entries(c.locks || {}).filter(x => x[1]).map(x => x[0])

    await sendMessage(sock, sender,
      `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
      `☠   🗂️  CONFIG CERCLE COMPLÈTE   ⛧\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☩━━━〔 🔧 *PROTECTION & MODÉRATION* 〕━━━☩\n` +
      `☩\n` +
      `✝  🔧  Maintenance  : ${onOff(c.maintenance)}\n` +
      `☠  📓  Modlog       : ${onOff(c.modlog)}\n` +
      `⛧  🚨  Raidmode     : ${onOff(c.raid?.enabled)}\n` +
      `☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☩━━━〔 🛡️ *ANTI-FONCTIONS* 〕━━━☩\n` +
      `✝\n` +
      `☠  🔗  Antilink    : ${onOff(c.antilink)}\n` +
      `⛧  📵  Antispam    : ${onOff(c.antispam?.enabled)}\n` +
      `☩  📵  Antimention : ${onOff(c.antimention?.enabled)}\n` +
      `✝  🗑️  Antisuppr.  : ${onOff(c.antisuppression?.enabled)}\n` +
      `☠  🌊  Antiflood   : ${onOff(c.antiflood?.enabled)}\n` +
      `⛧  🚫  Antiword    : ${onOff(c.antiword?.enabled)} (${(c.antiword?.words || []).length} mots)\n` +
      `☩  🛡️  Antipurge   : ${onOff(c.antipurge)}\n` +
      `✝  🛡️  Antidemote  : ${onOff(c.antidemote)}\n` +
      `☠  🛡️  Antipromote : ${onOff(c.antipromote)}\n` +
      `⛧  🛡️  Antitag     : ${onOff(c.antitag?.enabled)}\n` +
      `☩\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☩━━━〔 📋 *LISTES* 〕━━━☩\n` +
      `✝\n` +
      `☠  📃  domaines bénis   : ${(c.domaines bénis || []).length} âme(s)\n` +
      `⛧  🚷  Blacklist   : ${(c.blacklist || []).length} âme(s)\n` +
      `☩  🩸  Approuvés   : ${(c.approved || []).length} âme(s)\n` +
      `✝\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `☩━━━〔 🔒 *VERROUS ACTIFS* 〕━━━☩\n` +
      `☠\n` +
      `⛧  ${locks.length === 0 ? '🔓 Aucun verrou actif' : locks.map(l => `  🔒 ${l}`).join('\n☩  ')}\n` +
      `✝\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
      `_💡 Modifiez avec \`.lock\`, \`.antipurge on\`, etc._`
    )

  } catch (e) {
    console.error('❌ groupconfig.js:', e)
    await sendMessage(sock, sender, `☠ rituel échoué config: ${e.message}`)
  }
}
