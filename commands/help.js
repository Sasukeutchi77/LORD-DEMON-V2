import { sendMessage } from '../lib/sendMessage.js'
import { config } from '../config.js'
import {
  getCommandFiles,
  getCommandMeta,
  searchCommands,
  permissionLabel,
  scopeLabel,
  listCategories
} from '../lib/commandRegistry.js'

function buildGeneralHelp(prefix) {
  const categories = listCategories()
  const total = getCommandFiles().length

  let text =
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `⛧   ❓ AIDE LORD DEMON\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☩━━━〔 📝 *INVOCATION* 〕━━━☩\n` +
    `☩  \`${prefix}help <sort>\`\n` +
    `✝  \`${prefix}menu <catégorie>\`\n` +
    `☠  \`${prefix}menu <recherche>\`\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☩━━━〔 📂 *CATÉGORIES* 〕━━━☩\n`

  for (const category of categories) {
    text += `⛧  • \`${prefix}menu ${category.id}\` — ${category.title}\n`
  }

  text +=
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `📦 *${total} sorts disponibles*\n` +
    `💡 Exemples : \`${prefix}help ping\`, \`${prefix}help antilink\`, \`${prefix}menu ia\``

  return text
}

function buildCommandHelp(meta, prefix) {
  return (
    `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
    `☩   ❓ AIDE: ${meta.command.toUpperCase()}\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☩━━━〔 📖 *DESCRIPTION* 〕━━━☩\n` +
    `✝  ${meta.description}\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☩━━━〔 📝 *SYNTAXE* 〕━━━☩\n` +
    `☠  \`${prefix}${meta.command} ${meta.command === 'menu' ? '[catégorie|recherche]' : '[arguments]'}\`\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `☩━━━〔 🔐 *ACCÈS* 〕━━━☩\n` +
    `⛧  Permission : *${permissionLabel(meta.permission)}*\n` +
    `☩  Portée : *${scopeLabel(meta.scope)}*\n` +
    `✝  Cooldown : *${meta.cooldown}s*\n` +
    `☠  Catégorie : *${meta.categoryTitle}*\n` +
    `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
    `💡 Voir la catégorie : \`${prefix}menu ${meta.categoryId}\``
  )
}

export default async function help(sock, sender, args) {
  try {
    const prefix = config.prefix || '.'
    const query = args[0]?.toLowerCase()

    if (!query) {
      return await sendMessage(sock, sender, buildGeneralHelp(prefix))
    }

    const files = new Set(getCommandFiles())
    if (!files.has(query)) {
      const suggestions = searchCommands(query).slice(0, 5)
      const text =
        `☩━━━〔 ❓ *SORT INTROUVABLE* 〕━━━☩\n\n` +
        `⛧ Aucune sort nommée *${query}*.\n` +
        (suggestions.length
          ? `☠\n☩ Suggestions :\n${suggestions.map(meta => `✝ • \`${prefix}${meta.command}\``).join('\n')}\n`
          : '') +
        `☠\n☠ Menu : \`${prefix}menu\`\n` +
        `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

      return await sendMessage(sock, sender, text)
    }

    await sendMessage(sock, sender, buildCommandHelp(getCommandMeta(query), prefix))
  } catch (error) {
    console.error('❌ help.js:', error)
    await sendMessage(sock, sender, `☠ rituel échoué help: ${error.message}`)
  }
}