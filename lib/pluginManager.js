// lib/pluginManager.js — LORD DEMON V2
// Système de plugins : charger/décharger des commandes sans redémarrer

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname   = path.dirname(fileURLToPath(import.meta.url))
const PLUGINS_DIR = path.join(__dirname, '..', 'plugins')
const CMDS_DIR    = path.join(__dirname, '..', 'commands')

// Assurer que le dossier plugins existe
if (!fs.existsSync(PLUGINS_DIR)) fs.mkdirSync(PLUGINS_DIR, { recursive: true })

const loadedPlugins = new Map() // pluginName → { handler, loadedAt, file }

// ══════════════════════════════════════════════════
// CHARGEMENT
// ══════════════════════════════════════════════════

export async function loadPlugin(name) {
  const filePath = path.join(PLUGINS_DIR, `${name}.js`)
  if (!fs.existsSync(filePath)) {
    return { ok: false, reason: `Plugin "${name}" introuvable dans /plugins/` }
  }

  try {
    // Cache busting pour forcer rechargement
    const mod = await import(`${filePath}?v=${Date.now()}`)
    if (typeof mod.default !== 'function') {
      return { ok: false, reason: `Plugin "${name}" n'exporte pas de fonction par défaut.` }
    }
    loadedPlugins.set(name, { handler: mod.default, loadedAt: Date.now(), file: filePath })
    return { ok: true }
  } catch (e) {
    return { ok: false, reason: `Erreur chargement : ${e.message}` }
  }
}

export function unloadPlugin(name) {
  if (!loadedPlugins.has(name)) return false
  loadedPlugins.delete(name)
  return true
}

export async function reloadPlugin(name) {
  unloadPlugin(name)
  return loadPlugin(name)
}

// ══════════════════════════════════════════════════
// EXÉCUTION
// ══════════════════════════════════════════════════

export async function executePlugin(name, sock, sender, args, msg, ctx) {
  const plugin = loadedPlugins.get(name)
  if (!plugin) return { ok: false, reason: `Plugin "${name}" non chargé.` }

  try {
    await plugin.handler(sock, sender, args, msg, ctx)
    return { ok: true }
  } catch (e) {
    return { ok: false, reason: e.message }
  }
}

export function isPluginLoaded(name) {
  return loadedPlugins.has(name)
}

// ══════════════════════════════════════════════════
// LISTE
// ══════════════════════════════════════════════════

export function listAvailablePlugins() {
  if (!fs.existsSync(PLUGINS_DIR)) return []
  return fs.readdirSync(PLUGINS_DIR)
    .filter(f => f.endsWith('.js'))
    .map(f => path.basename(f, '.js'))
}

export function listLoadedPlugins() {
  return [...loadedPlugins.entries()].map(([name, info]) => ({
    name,
    loadedAt: new Date(info.loadedAt).toLocaleTimeString('fr-FR')
  }))
}

// ══════════════════════════════════════════════════
// AUTO-CHARGEMENT AU DÉMARRAGE
// ══════════════════════════════════════════════════

export async function autoLoadPlugins() {
  const available = listAvailablePlugins()
  const results   = []
  for (const name of available) {
    const r = await loadPlugin(name)
    results.push({ name, ...r })
  }
  return results
}

// ══════════════════════════════════════════════════
// CRÉER UN PLUGIN TEMPLATE
// ══════════════════════════════════════════════════

export function createPluginTemplate(name) {
  const filePath = path.join(PLUGINS_DIR, `${name}.js`)
  if (fs.existsSync(filePath)) return { ok: false, reason: 'Plugin déjà existant.' }

  const template = `// plugins/${name}.js — LORD DEMON V2 Plugin
// Créé le ${new Date().toLocaleDateString('fr-FR')}

import { sendMessage } from '../lib/sendMessage.js'

/**
 * Plugin : ${name}
 * Usage : .${name} [args]
 * Description : Décrivez votre plugin ici
 */
export default async function ${name}(sock, sender, args, msg, ctx = {}) {
  try {
    await sendMessage(sock, sender, '🔌 Plugin *${name}* actif !\\n\\n_Modifiez /plugins/${name}.js pour personnaliser._')
  } catch (e) {
    await sendMessage(sock, sender, \`❌ Erreur plugin ${name}: \${e.message}\`)
  }
}
`
  fs.writeFileSync(filePath, template)
  return { ok: true, path: filePath }
}
