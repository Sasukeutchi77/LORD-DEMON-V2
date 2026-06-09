// commands/plugin.js — LORD DEMON V2
// Gestion des plugins hot-reload

import { sendMessage } from '../lib/sendMessage.js'
import { getSenderJid, isDeployer, isSuperAdmin } from '../lib/ownerSystem.js'
import {
  loadPlugin, unloadPlugin, reloadPlugin,
  listAvailablePlugins, listLoadedPlugins,
  executePlugin, createPluginTemplate, autoLoadPlugins
} from '../lib/pluginManager.js'

export default async function plugin(sock, sender, args, msg, ctx = {}) {
  try {
    const userId = ctx.senderJid || getSenderJid(msg, sock)

    if (!isDeployer(userId) && !isSuperAdmin(userId)) {
      return await sendMessage(sock, sender,
☩━━━〔  ⛔ *ACCÈS REFUSÉ*  〕━━━☩━━━☩\n\n⛧  Réservé à l'Owner principal.\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    const action = args[0]?.toLowerCase()

    // ── LISTE ──────────────────────────────────────
    if (!action || action === 'list' || action === 'liste') {
      const available = listAvailablePlugins()
      const loaded    = listLoadedPlugins()
      const loadedNames = loaded.map(p => p.name)

      return await sendMessage(sock, sender,
        `☩━━━〔 🔌 *PLUGINS* 〕━━━☩\n\n` +
        `⛧  *Disponibles (${available.length}) :*\n` +
        (available.length
          ? available.map(n => `⛧  ${loadedNames.includes(n) ? '🟢' : '🔴'} ${n}`).join('\n')
          : `⛧  _Aucun plugin dans /plugins/_`
        ) +
        `\n\n⛧  *Chargés (${loaded.length}) :*\n` +
        (loaded.length
          ? loaded.map(p => `⛧  ✅ ${p.name} (chargé à ${p.loadedAt})`).join('\n')
          : `⛧  _Aucun plugin chargé_`
        ) +
        `\n\n⛧  *Commandes :*\n` +
        `⛧  • *.plugin load <nom>*\n` +
        `⛧  • *.plugin unload <nom>*\n` +
        `⛧  • *.plugin reload <nom>*\n` +
        `⛧  • *.plugin loadall* — Charger tous\n` +
        `⛧  • *.plugin create <nom>* — Créer template\n` +
        `⛧  • *.plugin run <nom> [args]* — Exécuter\n\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── CHARGER ──────────────────────────────────
    if (action === 'load' || action === 'charger') {
      const name = args[1]
      if (!name) return await sendMessage(sock, sender, `☠ Usage : *.plugin load <nom>*`)

      const result = await loadPlugin(name)
      return await sendMessage(sock, sender,
        result.ok
          ? `✅ Plugin *${name}* chargé avec succès !`
          : `❌ Erreur : ${result.reason}`
      )
    }

    // ── DÉCHARGER ──────────────────────────────
    if (action === 'unload' || action === 'décharger') {
      const name = args[1]
      if (!name) return await sendMessage(sock, sender, `☠ Usage : *.plugin unload <nom>*`)

      const done = unloadPlugin(name)
      return await sendMessage(sock, sender,
        done ? `✅ Plugin *${name}* déchargé.` : `❌ Plugin *${name}* n'était pas chargé.`
      )
    }

    // ── RECHARGER ──────────────────────────────
    if (action === 'reload' || action === 'recharger') {
      const name = args[1]
      if (!name) return await sendMessage(sock, sender, `☠ Usage : *.plugin reload <nom>*`)

      const result = await reloadPlugin(name)
      return await sendMessage(sock, sender,
        result.ok
          ? `✅ Plugin *${name}* rechargé !`
          : `❌ Erreur : ${result.reason}`
      )
    }

    // ── CHARGER TOUS ──────────────────────────
    if (action === 'loadall') {
      const results = await autoLoadPlugins()
      if (!results.length) return await sendMessage(sock, sender, `ℹ️ Aucun plugin à charger dans /plugins/`)

      const text = results.map(r => `${r.ok ? '✅' : '❌'} ${r.name}${r.ok ? '' : ` — ${r.reason}`}`).join('\n')
      return await sendMessage(sock, sender,
        `☩━━━〔 🔌 *CHARGEMENT AUTO* 〕━━━☩\n\n${text}\n\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }

    // ── CRÉER TEMPLATE ──────────────────────────
    if (action === 'create' || action === 'créer') {
      const name = args[1]?.replace(/[^a-zA-Z0-9_-]/g, '')
      if (!name) return await sendMessage(sock, sender, `☠ Usage : *.plugin create <nom>* (lettres/chiffres uniquement)`)

      const result = createPluginTemplate(name)
      return await sendMessage(sock, sender,
        result.ok
          ? `✅ Template créé : *plugins/${name}.js*\n\nModifiez ce fichier, puis : *.plugin load ${name}*`
          : `❌ ${result.reason}`
      )
    }

    // ── EXÉCUTER ──────────────────────────────
    if (action === 'run' || action === 'exec') {
      const name   = args[1]
      const pArgs  = args.slice(2)
      if (!name) return await sendMessage(sock, sender, `☠ Usage : *.plugin run <nom> [args]*`)

      const result = await executePlugin(name, sock, sender, pArgs, msg, ctx)
      if (!result.ok) return await sendMessage(sock, sender, `❌ ${result.reason}`)
    }

  } catch (e) {
    console.error('❌ plugin.js:', e)
    await sendMessage(sock, sender, `☠ Erreur plugin: ${e.message}`)
  }
}
