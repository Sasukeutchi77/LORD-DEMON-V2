// launcher.cjs — Installe les dépendances si besoin, puis démarre le bot
// avec redémarrage automatique en cas de crash (adapté bot hosting 24/7)
const { execSync, spawn } = require('child_process')
const fs   = require('fs')
const path = require('path')

const ROOT           = __dirname
const MAX_CRASHES    = 10        // Arrêt définitif après trop de crashes rapides
const CRASH_RESET_MS = 60_000   // Reset le compteur si le bot tourne plus de 60s
const MIN_UPTIME_MS  = 10_000   // Crash rapide = moins de 10s de fonctionnement

let crashCount = 0
let startTime  = 0

function check(pkg) {
  try { require.resolve(path.join(ROOT, 'node_modules', pkg)); return true } catch { return false }
}

console.log('\n╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮')
console.log('┃  ⚡ LORD DEMON V2 LAUNCHER  ┃')
console.log('╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n')

if (!check('dotenv') || !fs.existsSync(path.join(ROOT, 'node_modules'))) {
  console.log('📦 Installation des dépendances (première fois)...')
  try {
    execSync('npm install --prefix ' + JSON.stringify(ROOT), { stdio: 'inherit', cwd: ROOT })
    console.log('✅ Dépendances installées avec succès!\n')
  } catch (e) {
    console.error('❌ Erreur npm install:', e.message)
    process.exit(1)
  }
} else {
  console.log('✅ Dépendances déjà installées.\n')
}

function startBot() {
  console.log(`🚀 Démarrage du bot... [crash count: ${crashCount}/${MAX_CRASHES}]\n`)
  startTime = Date.now()

  const bot = spawn(process.execPath, ['index.js'], {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env
  })

  // Propager les signaux d'arrêt au processus enfant
  const forwardSignal = (sig) => () => { try { bot.kill(sig) } catch {} ; process.exit(0) }
  process.once('SIGTERM', forwardSignal('SIGTERM'))
  process.once('SIGINT',  forwardSignal('SIGINT'))

  bot.on('exit', (code, signal) => {
    const uptime = Date.now() - startTime

    // Si le bot a tourné suffisamment longtemps, réinitialiser le compteur
    if (uptime > CRASH_RESET_MS) crashCount = 0

    // Sortie propre sur code 0 → pas de redémarrage
    if (code === 0) {
      console.log('\n✅ Bot arrêté proprement (code 0). Fin du launcher.')
      process.exit(0)
    }

    crashCount++
    console.log(`\n🔴 Bot arrêté (code: ${code}, signal: ${signal}, uptime: ${Math.round(uptime / 1000)}s)`)

    if (crashCount >= MAX_CRASHES) {
      console.error(`🛑 TROP DE CRASHES (${crashCount}/${MAX_CRASHES}). Arrêt définitif.`)
      console.error('   Consultez les logs ci-dessus pour diagnostiquer le problème.')
      process.exit(1)
    }

    // Backoff exponentiel : 5s → 10s → 20s → 40s → 60s max
    const delay = Math.min(5000 * Math.pow(2, crashCount - 1), 60000)
    console.log(`🔄 Redémarrage dans ${delay / 1000}s... [tentative ${crashCount}/${MAX_CRASHES}]`)
    setTimeout(startBot, delay)
  })
}

startBot()
