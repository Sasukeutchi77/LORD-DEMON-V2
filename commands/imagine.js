// commands/imagine.js — LORD DEMON
// ╔══════════════════════════════════════════════════════╗
// ║  GÉNÉRATION D'IMAGES PAR IA — Pollinations.ai       ║
// ║  Gratuit, sans clé API — 5 styles disponibles       ║
// ║  Accès: Owner/Sudo/Premium illimité | Autres: usage ║
// ╚══════════════════════════════════════════════════════╝

import { sendMessage } from '../lib/sendMessage.js'
import { showProgressLoader, deleteLoader } from '../lib/animLoader.js'
import { isOwner, isSudo, isPremium } from '../lib/ownerSystem.js'
import { checkUsage, consumeUsage } from '../lib/usageSystem.js'

const STYLES = {
  realistic: 'photorealistic, ultra detailed, 8k, professional photography, sharp focus',
  anime:     'anime style, manga, vibrant colors, studio ghibli, highly detailed',
  fantasy:   'fantasy art, epic scene, magical, detailed digital illustration, artstation',
  dark:      'dark fantasy, gothic, dramatic lighting, ominous, highly detailed, cinematic',
  cyberpunk: 'cyberpunk, neon lights, futuristic city, blade runner style, rain, ultra detailed',
}

function parseArgs(args) {
  const styleKey = Object.keys(STYLES).find(k => args.includes('--' + k))
  const style    = styleKey || 'realistic'
  const prompt   = args.filter(a => a !== '--' + style).join(' ').trim()
  return { prompt, style, suffix: STYLES[style] }
}

export default async function imagine(sock, sender, args, msg, ctx) {
  const senderJid = ctx?.senderJid || msg.key.participant || msg.key.remoteJid
  const prefix    = process.env.PREFIX || '.'

  if (!args.length) {
    return await sendMessage(sock, sender,
      `☩━━━〔 🎨 *LORD DEMON IMAGE AI* 〕━━━☩\n` +
      `☠\n` +
      `⛧  💡 *Usage:* ${prefix}imagine <description>\n` +
      `☠\n` +
      `✝  🎭 *Styles disponibles:*\n` +
      `☠  --realistic (défaut) • --anime\n` +
      `⛧  --fantasy • --dark • --cyberpunk\n` +
      `☠\n` +
      `☩  📌 *Exemples:*\n` +
      `✝  ${prefix}imagine un dragon de feu --fantasy\n` +
      `☠  ${prefix}imagine une ville futuriste --cyberpunk\n` +
      `⛧  ${prefix}imagine un samourai dans la brume\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  const privileged = isOwner(senderJid) || isSudo(senderJid) || isPremium(senderJid)
  if (!privileged) {
    const { allowed } = checkUsage(senderJid)
    if (!allowed) {
      return await sendMessage(sock, sender,
        `☩━━━〔 ☠ *ACCÈS REFUSÉ* 〕━━━☩\n` +
        `☠\n` +
        `⛧  🔒 Utilise *${prefix}partager* pour débloquer\n` +
        `☩  cette commande (10 utilisations offertes).\n` +
        `☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      )
    }
  }

  const { prompt, style, suffix } = parseArgs(args)
  if (!prompt) {
    return await sendMessage(sock, sender,
      `☩━━━〔 ☠ *PROMPT MANQUANT* 〕━━━☩\n☠\n⛧  Décris ce que tu veux générer.\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }

  let loadKey = null
  try {
    loadKey = await showProgressLoader(sock, sender, '🎨 GÉNÉRATION EN COURS')

    const fullPrompt  = `${prompt}, ${suffix}`
    const seed        = Math.floor(Math.random() * 999999)
    const encoded     = encodeURIComponent(fullPrompt)
    const imageUrl    = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=1024&seed=${seed}&nologo=true&enhance=true`

    const response = await fetch(imageUrl, { signal: AbortSignal.timeout(30000) })
    if (!response.ok) throw new Error(`Pollinations error: ${response.status}`)

    const buffer      = await response.arrayBuffer()
    const imageBuffer = Buffer.from(buffer)

    if (!privileged) consumeUsage(senderJid)

    await deleteLoader(sock, sender, loadKey)
    loadKey = null

    await sock.sendMessage(sender, {
      image: imageBuffer,
      caption:
        `☩━━━〔 🎨 *IMAGE GÉNÉRÉE* 〕━━━☩\n` +
        `☠\n` +
        `⛧  📝 *Prompt:* ${prompt.slice(0, 100)}${prompt.length > 100 ? '...' : ''}\n` +
        `☠  🎭 *Style:* ${style}\n` +
        `☩  🎲 *Seed:* ${seed}\n` +
        `☠\n` +
        `✝  🔮 Propulsé par Pollinations AI\n` +
        `☠  💡 ${prefix}imagine <desc> --${style}\n` +
        `☠\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    })

  } catch (e) {
    if (loadKey) await deleteLoader(sock, sender, loadKey)
    await sendMessage(sock, sender,
      `☩━━━〔 ☠ *GÉNÉRATION ÉCHOUÉE* 〕━━━☩\n` +
      `☠\n` +
      `⛧  ⚠️ ${e.message.slice(0, 120)}\n` +
      `☠  💡 Essaie un prompt différent ou réessaie.\n` +
      `☠\n` +
      `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
    )
  }
}
