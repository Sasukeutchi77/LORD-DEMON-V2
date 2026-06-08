// ╔══════════════════════════════════════════════════════════════╗
// ║                    ✦ 𝗟𝗢𝗥𝗗 𝗗𝗘𝗠𝗢𝗡 𝗠𝗘𝗡𝗨 ✦                      ║
// ║                         𝗣𝗿𝗲𝗺𝗶𝘂𝗺 𝗘𝗱𝗶𝘁𝗶𝗼𝗻                          ║
// ╚══════════════════════════════════════════════════════════════╝

import { config } from "../config.js"
import fs   from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const IMAGES_DIR = path.join(__dirname, "../assets")
const COMMANDS_DIR = __dirname
const CHANNEL_LINK = "https://whatsapp.com/channel/0029VbCRcEJLdQeYxw5g3m2o"
const CHANNEL_INVITE = "0029VbCRcEJLdQeYxw5g3m2o"
const FALLBACK_CHANNEL_JID = "1203631999978746@newsletter"
let channelJidCache = null

// ═════════════════════════════════════════════════════════════════
//  CATÉGORIES & ICÔNES - STYLE GOTHIQUE DÉMONIAQUE
// ═════════════════════════════════════════════════════════════════

const CATEGORIES = {
  "☩ 𝗚𝗘́𝗡𝗘́𝗥𝗔𝗟 ⛧"          : ["menu","help","ping","info","uptime","whoami","vv","url","style","partager"],
  "𖤐 𝗠𝗘́𝗗𝗜𝗔𝗦 ♱"             : ["song","image","sticker","ytmp4","lyrics","download"],
  "🜏 𝗨𝗧𝗜𝗟𝗜𝗧𝗔𝗜𝗥𝗘𝗦 ⸸"         : ["weather","translate","calc","quote","joke","horoscope","qrcode","tts","remind","schedule","poll","summarize","ocr","transcribe","ascii"],
  "☠ 𝗝𝗘𝗨𝗫 𝗗𝗘 𝗟'𝗘𝗡𝗙𝗘𝗥 ✞"    : ["coinflip","dice","rps","tictactoe","quiz","dare"],
  "🩸 𝗙𝗨𝗡 & 𝗣𝗜𝗘̀𝗚𝗘𝗦 ⚰"       : ["ship","gay","nitro","fakereac"],
  "⛧ 𝗢𝗨𝗧𝗜𝗟𝗦 𝗔𝗥𝗖𝗔𝗡𝗘𝗦 🜲"      : ["apkinfo"],
  "💀 𝗠𝗘𝗠𝗕𝗥𝗘𝗦 ☩"             : ["kick","add","promote","demote","mute","unmute","kickall","kickallv2","ban","unban"],
  "🔱 𝗦𝗘𝗖𝗧𝗘 𝗗𝗨 𝗚𝗥𝗢𝗨𝗣𝗘 ⸸"    : ["group","groupconfig","setdesc","setppgc","link","tagall","hidetag","domination","group-tm","pseudo","pp","role","modlog","lock","approve","whitelist","blacklist"],
  "🛡️ 𝗣𝗔𝗖𝗧𝗘𝗦 𝗗𝗘 𝗦𝗔𝗡𝗚 ⛧"     : ["antipurge","antidemote","antipromote","antitag","antilink","antichannel","antispam","antimention","antisuppression","antiword","antiflood"],
  "🕯️ 𝗥𝗜𝗧𝗨𝗘𝗟𝗦 𝗗'𝗔𝗖𝗖𝗨𝗘𝗜𝗟 ✞"  : ["welcome","goodbye","rules","notes","afk"],
  "⚔️ 𝗜𝗡𝗤𝗨𝗜𝗦𝗜𝗧𝗜𝗢𝗡 ☠"          : ["warn","unwarn","warnlist","clearwarns"],
  "📿 𝗚𝗥𝗜𝗠𝗢𝗜𝗥𝗘 𝗩𝟮 ⸸"         : ["status","stats","logs","backup","restore","maintenance","shutdown","profile","rank","leaderboard","daily","cmdinfo"],
  "🩸 𝗔𝗠𝗘𝗦 𝗗𝗨 𝗕𝗢𝗧 ☩"         : ["public","private","prefix"],
  "👁️ 𝗢𝗘𝗜𝗟 𝗗𝗨 𝗗𝗘𝗠𝗢𝗡 ⛧"       : ["sudo","setsudo","addsudo","delsudo","removesudo","listsudo","broadcast","reload","restart","stop","eval","exec","dit","pack","addpremium","removepremium"]
}

const CMD_ICONS = {
  menu:"📋", help:"☩", ping:"⚡", info:"🜏", uptime:"⏱️", vv:"👁️",
  url:"🔗", song:"🎵", image:"🖼️", style:"⛧", sticker:"🎭", partager:"📤",
  prefix:"🔧", reload:"♻️", whoami:"🔍", lyrics:"🎤", ytmp4:"🎬", download:"⬇️",
  weather:"🌑", translate:"🌍", calc:"🧮", quote:"💬", joke:"💀",
  horoscope:"⭐", qrcode:"🔳", tts:"🔊",
  remind:"⏰", schedule:"📆", poll:"📊", summarize:"📝", ocr:"🔎", transcribe:"🎙️",
  coinflip:"🪙", dice:"🎲", rps:"✊", tictactoe:"☠", quiz:"🧠",
  kick:"⚰️", add:"➕", promote:"⬆️", demote:"⬇️",
  mute:"🔇", unmute:"🔊", kickall:"💥", kickallv2:"💣",
  ban:"🚫", unban:"🩸",
  group:"⚙️", setdesc:"📝", setppgc:"🖼️", link:"🔗",
  tagall:"📢", hidetag:"👻", domination:"🔥", "group-tm":"⏰",
  pseudo:"✏️", pp:"🖼️", role:"🎭",
  groupconfig:"🗂️", modlog:"📓", lock:"🔒", approve:"🩸", whitelist:"📃", blacklist:"☠️",
  antipurge:"🛡️", antidemote:"⛧", antipromote:"⛧",
  antitag:"☩", antilink:"🔗", antispam:"📵", antimention:"📵", antisuppression:"🗑️",
  antiword:"🚫", antiflood:"🌊",
  welcome:"🕯️", goodbye:"⚰️", rules:"📜", notes:"📝", afk:"💀",
  warn:"⚠️", unwarn:"🩸", warnlist:"📋", clearwarns:"🧹",
  public:"🩸", private:"🔒",
  sudo:"👁️", setsudo:"⭐", addsudo:"⭐", delsudo:"☠",
  removesudo:"☠", listsudo:"📋",
  broadcast:"📡", sendmsg:"📨", restart:"🔄", stop:"⏹️",
  eval:"💻", exec:"⌨️", dit:"💬", send:"📤", pack:"📦",
  addpremium:"💎", removepremium:"💎",
  ship:"🔥", gay:"🌈", ascii:"🔤", nitro:"💎", apkinfo:"📦", dare:"🎲",
  antichannel:"📡", fakereac:"🎭"
}

const CMD_DESCRIPTIONS = {
  partager:"Partager les liens dans tous les groupes",
  menu:"Menu principal avec recherche", help:"Aide détaillée sort",
  ping:"Test latence système", info:"Informations système",
  uptime:"Temps d'activité", whoami:"Voir votre rôle & permissions",
  vv:"Voir médias masqués/expirés", url:"Outils URL avancés",
  style:"Style de texte personnalisé", song:"Télécharger Musique MP3",
  image:"Recherche d'images HD", sticker:"Créer stickers animés",
  ytmp4:"Télécharger Vidéo YouTube HD", lyrics:"Paroles synchronisées",
  download:"Télécharger vidéo/audio URL",
  weather:"Météo en temps réel", translate:"Traduction multilingue",
  calc:"Calculatrice scientifique", quote:"Citations inspirantes",
  joke:"Blagues aléatoires premium", horoscope:"Horoscope détaillé",
  qrcode:"Générer QR Code personnalisé", tts:"Texte en vocal HD",
  remind:"Rappels programmables", schedule:"Planificateur messages",
  poll:"Sondages interactifs", summarize:"Résumé IA intelligent",
  ocr:"Lecture texte image", transcribe:"Transcription audio",
  coinflip:"Pile ou face animé", dice:"Dés 3D animés",
  rps:"Pierre feuille ciseaux tournoi", tictactoe:"Morpion multijoueur",
  quiz:"Quiz culture générale", kick:"Expulser membre",
  add:"Ajouter membre", promote:"Promouvoir admin",
  demote:"Rétrograder admin", mute:"Désactiver groupe",
  unmute:"Réactiver groupe", kickall:"Expulser tous (confirmation)", kickallv2:"Expulser tous V2",
  ban:"Bannir utilisateur", unban:"Débannir utilisateur",
  group:"Paramètres cercle avancés", setdesc:"Modifier description",
  setppgc:"Photo groupe HD", link:"Lien invitation",
  tagall:"Mentionner tous membres", hidetag:"Mention discrète gardien",
  domination:"Mode domination groupe", "group-tm":"Minuterie groupe",
  pseudo:"Changer nom bot", pp:"Photo profil bot",
  role:"Voir rôle membre", groupconfig:"Configuration complète",
  modlog:"Journal modération", lock:"Verrouiller fonctions",
  approve:"Approuver membre", whitelist:"Liste blanche",
  blacklist:"Liste noire",
  antipurge:"Anti-purge messages", antidemote:"Anti-rétrogradation auto",
  antipromote:"Anti-promotion non autorisée", antitag:"Anti-tag massif",
  antilink:"Suppression liens auto", antispam:"Anti-spam intelligent",
  antimention:"Anti-mention abusive", antisuppression:"Anti-suppression auto",
  antiword:"Filtre mots interdits", antiflood:"Anti-flood intelligent",
  welcome:"Message bienvenue personnalisé", goodbye:"Message au revoir",
  rules:"Règles cercle détaillées", notes:"Notes groupe", afk:"Mode absent avancé",
  warn:"Avertir membre", unwarn:"Retirer avertissement",
  warnlist:"Liste avertissements", clearwarns:"Effacer historique",
  public:"Mode public", private:"Mode privé",
  sudo:"sorts Seigneur", setsudo:"Ajouter sudo",
  addsudo:"Ajouter sudo", delsudo:"Retirer sudo",
  removesudo:"Retirer sudo", listsudo:"Lister sudos",
  broadcast:"Diffusion globale", sendmsg:"Envoyer message privé",
  reload:"Recharger commandes", restart:"Redémarrage système",
  stop:"Arrêt sécurisé", eval:"Exécution JavaScript", exec:"Exécution système",
  dit:"Faire parler bot", send:"Envoyer fichier", pack:"Pack stickers",
  addpremium:"Ajouter premium", removepremium:"Retirer premium",
  ship:"Test compatibilité amour", gay:"Compteur aléatoire",
  ascii:"Art ASCII premium", nitro:"Générateur Nitro fake",
  apkinfo:"Analyseur APK détaillé", dare:"Défi du Démon",
  antichannel:"Bloquer transferts de chaînes",
  fakereac:"Réactions emoji fake sur chaîne"
}

// ═════════════════════════════════════════════════════════════════
//  FONCTIONS UTILITAIRES
// ═════════════════════════════════════════════════════════════════

// ── Conversion en caractères stylés (Unicode Mathematical Bold Sans-Serif)
// Transforme un texte ASCII normal en 𝗧𝗘𝗫𝗧𝗘 𝗦𝗧𝗬𝗟𝗘́ pour un rendu premium.
const FANCY_UPPER = "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭"
const FANCY_LOWER = "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇"
const FANCY_DIGIT = "𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵"

function fancyChar(c) {
  const code = c.codePointAt(0)
  if (code >= 65 && code <= 90)  return [...FANCY_UPPER][code - 65]
  if (code >= 97 && code <= 122) return [...FANCY_LOWER][code - 97]
  if (code >= 48 && code <= 57)  return [...FANCY_DIGIT][code - 48]
  return c
}

function toFancy(text) {
  if (!text) return text
  return [...text].map(fancyChar).join("")
}

// Italique stylé pour les descriptions/sous-titres
const ITALIC_UPPER = "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡"
const ITALIC_LOWER = "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻"

function toItalic(text) {
  if (!text) return text
  return [...text].map(c => {
    const code = c.codePointAt(0)
    if (code >= 65 && code <= 90)  return [...ITALIC_UPPER][code - 65]
    if (code >= 97 && code <= 122) return [...ITALIC_LOWER][code - 97]
    return c
  }).join("")
}

function delay(ms) { 
  return new Promise(r => setTimeout(r, ms)) 
}

function getLocalImages() {
  try {
    if (!fs.existsSync(IMAGES_DIR)) return []
    return fs.readdirSync(IMAGES_DIR)
      .filter(f => [".jpg",".jpeg",".png",".gif",".webp",".mp4"]
        .includes(path.extname(f).toLowerCase()))
      .map(f => path.join(IMAGES_DIR, f))
  } catch { return [] }
}

function getRandomImage() {
  const imgs = getLocalImages()
  if (!imgs.length) return null
  return imgs[Math.floor(Math.random() * imgs.length)]
}

function formatUptime() {
  const s   = Math.floor(process.uptime())
  const h   = Math.floor(s / 3600)
  const m   = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}h ${m}m ${sec}s`
  if (m > 0) return `${m}m ${sec}s`
  return `${sec}s`
}

async function getChannelContextInfo(sock, botName) {
  if (!channelJidCache && typeof sock.newsletterMetadata === "function") {
    try {
      const metadata = await sock.newsletterMetadata("invite", CHANNEL_INVITE)
      channelJidCache = metadata?.id || metadata?.jid || metadata?.newsletterJid || null
    } catch {}
  }

  return {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelJidCache || FALLBACK_CHANNEL_JID,
      newsletterName: botName,
      serverMessageId: -1
    },
    externalAdReply: {
      title: botName,
      body: "✨ Rejoindre la chaîne officielle premium",
      sourceUrl: CHANNEL_LINK,
      mediaType: 1,
      renderLargerThumbnail: true,
      showAdAttribution: true
    }
  }
}

function getRamUsage() {
  return Math.round(process.memoryUsage().rss / 1024 / 1024)
}

function getCommandFiles() {
  try {
    return fs.readdirSync(COMMANDS_DIR)
      .filter(file => file.endsWith('.js'))
      .map(file => path.basename(file, '.js'))
      .sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}

function getSyncedCategories() {
  const commandFiles = getCommandFiles()
  const realCommands = new Set(commandFiles)
  const usedCommands = new Set()
  const synced = {}

  for (const [category, commands] of Object.entries(CATEGORIES)) {
    const filtered = commands.filter(cmd => realCommands.has(cmd))
    if (filtered.length > 0) {
      synced[category] = filtered
      filtered.forEach(cmd => usedCommands.add(cmd))
    }
  }

  const missingCommands = commandFiles.filter(cmd => !usedCommands.has(cmd))
  if (missingCommands.length > 0) {
    synced["⛧ AUTRES RITES ☩"] = missingCommands
  }

  return synced
}

// ═════════════════════════════════════════════════════════════════
//  RECHERCHE INTELLIGENTE
// ═════════════════════════════════════════════════════════════════

function searchCommands(query) {
  if (!query || query.length < 1) return []
  const searchTerm = query.toLowerCase().trim()
  const results    = []
  const categories = getSyncedCategories()
  const allCmds    = Object.values(categories).flat()

  for (const cmd of allCmds) {
    let score = 0
    const cl  = cmd.toLowerCase()
    const desc= (CMD_DESCRIPTIONS[cmd] || "").toLowerCase()

    if (cl === searchTerm)              score += 100
    else if (cl.startsWith(searchTerm)) score += 80
    else if (cl.includes(searchTerm))   score += 60
    if (desc.includes(searchTerm))      score += 40

    if (score > 0) {
      results.push({
        command: cmd,
        icon: CMD_ICONS[cmd] || "⛧",
        description: CMD_DESCRIPTIONS[cmd] || "Pas de description",
        category: findCategory(cmd),
        score
      })
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 10)
}

function findCategory(cmd) {
  for (const [cat, cmds] of Object.entries(getSyncedCategories())) {
    if (cmds.includes(cmd)) return cat
  }
  return "☠ INCONNU ⛧"
}

function formatSearchResults(results, prefix, query) {
  if (results.length === 0) {
    return `
☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩
        💀  ${toFancy("AUCUNE AME TROUVEE")}  💀
☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸
  ☠  ${toItalic("Aucun sort trouvé pour")} :
  *"${query}"*

  ⛧  ${toFancy("INVOCATIONS SUGGÉRÉES")} :
   › *${prefix}menu*           ${toItalic("Grimoire complet")}
   › *${prefix}menu fun*       ${toItalic("Sorts du fun")}
   › *${prefix}menu gardien*     ${toItalic("Rites gardien")}
⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
  }

  let text = `
☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩
     🔍  ${toFancy("INVOCATION DE RECHERCHE")}
☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸
  ⛧  ${toFancy("Sort")} : *"${toFancy(query.toUpperCase())}"*
  ☩  ${toFancy(String(results.length))} ${toItalic("sort(s) invoqué(s)")}
⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

  results.forEach((res, i) => {
    const num = (i + 1).toString().padStart(2, '0')
    text += `

✝━━ ⛧  ${toFancy(num)}. ${res.icon} *${prefix}${res.command}*
⛧   📝  ${toItalic(res.description)}
☩   📂  ${res.category}
✝   🩸  ${toFancy("Puissance")} : ${toFancy(String(res.score))}%
☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
  })

  text += `

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸
  ☩  *${prefix}help <sort>*  ⇝  ${toItalic("Rituel détaillé")}
  ⛧  *${prefix}menu*          ⇝  ${toItalic("Grimoire complet")}
⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`

  return text
}

// ═════════════════════════════════════════════════════════════════
//  ANIMATION LOADER GOTHIQUE DÉMONIAQUE
// ═════════════════════════════════════════════════════════════════

async function showFastLoader(sock, sender, botName) {
  const frames = [
    { bar: "🩸░░░░░░░░░░░░░░", pct: "  0%", icon: "☠", status: "Ouverture du grimoire..." },
    { bar: "🩸🩸🩸░░░░░░░░░░░", pct:" 25%", icon: "⛧", status: "Invocation des sorts..." },
    { bar: "🩸🩸🩸🩸🩸░░░░░░░", pct:" 50%", icon: "✝", status: "Gravure des runes..." },
    { bar: "🩸🩸🩸🩸🩸🩸🩸░░░", pct:" 75%", icon: "☩", status: "Scellement du pacte..." },
    { bar: "🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸🩸", pct:"100%", icon: "💀", status: "Le Démon s'éveille !" }
  ]

  const makeText = (f) =>
`☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩
   💀  *${toFancy(botName.toUpperCase())}*  💀
   ⛧  ${toFancy("RITUEL D'INVOCATION")}  ⛧
☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩

   ${f.icon}  ${f.bar}  ${toFancy(f.pct.trim())}

   _${toItalic(f.status)}_`

  const msg = await sock.sendMessage(sender, { text: makeText(frames[0]) })

  for (let i = 1; i < frames.length; i++) {
    await delay(200)
    await sock.sendMessage(sender, { text: makeText(frames[i]), edit: msg.key }).catch(() => {})
  }

  await delay(150)
  return msg.key
}

// ═════════════════════════════════════════════════════════════════
//  CONSTRUCTION DU MENU - DESIGN GOTHIQUE DÉMONIAQUE
// ═════════════════════════════════════════════════════════════════

function buildMenuText(prefix, botName, searchQuery = null) {
  if (searchQuery) {
    return formatSearchResults(searchCommands(searchQuery), prefix, searchQuery)
  }

  const now        = new Date()
  const time       = now.toLocaleTimeString("fr-FR", { hour:"2-digit", minute:"2-digit" })
  const date       = now.toLocaleDateString("fr-FR", { weekday:"long", day:"2-digit", month:"long", year:"numeric" })
  const categories = getSyncedCategories()
  const totalCmd   = Object.values(categories).flat().length
  const totalCat   = Object.keys(categories).length
  const uptime     = formatUptime()
  const ram        = getRamUsage()

  const dateCap = date.charAt(0).toUpperCase() + date.slice(1)

  // ── HEADER GOTHIQUE ────────────────────────────────────────────
  let text =
`
†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†
         ☠  *${toFancy(botName.toUpperCase())}*  ☠
      ⛧  ${toFancy("GRIMOIRE SUPRÊME")}  ⛧
†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†

☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩
   🩸  ${toFancy("TABLEAU DE L'ENFER")}
☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩
  🗓️  ${toItalic(dateCap)}
  ☠  ${toFancy("Heure")}     : ${toFancy(time)}
  ⛧  ${toFancy("Sorts")}     : ${toFancy(String(totalCmd))} ${toItalic("invocations")}
  ✝  ${toFancy("Cercles")}   : ${toFancy(String(totalCat))}
  ⏱️  ${toFancy("Eveil")}    : ${toFancy(uptime)}
  💀  ${toFancy("Ame")}      : ${toFancy(String(ram))} ${toItalic("MB")}
  🩸  ${toFancy("Statut")}   : ${toFancy("DECHAINE")} & ${toFancy("INVOQUE")}
☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩`

  // ── CATÉGORIES GOTHIQUES ────────────────────────────────────────
  for (const [catName, commands] of Object.entries(categories)) {
    const count = commands.length

    text += `

⸸┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⸸
   ${catName}
⸸┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⸸`

    commands.forEach((cmd, index) => {
      const icon = CMD_ICONS[cmd] || "⛧"
      const desc = (CMD_DESCRIPTIONS[cmd] || "").substring(0, 35)
      const num  = (index + 1).toString().padStart(2, '0')

      text += `\n☩ ${toFancy(num)} ${icon} *${prefix}${cmd}*  ⇝  ${toItalic(desc)}`
    })

    text += `\n☠\n✝━━ ⛧  ${toFancy(String(count))} ${toItalic(count > 1 ? "sorts" : "sort")}  ⛧`
  }

  // ── GUIDE RAPIDE GOTHIQUE ──────────────────────────────────────
  text += `

☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩
   🩸  ${toFancy("PARCHEMIN DU DÉMON")}
☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩
  ☩  *${prefix}help <sort>*   ⇝  ${toItalic("Rituel détaillé")}
  ⛧  *${prefix}ping*           ⇝  ${toItalic("Latence du Démon")}
  👁️  *${prefix}whoami*         ⇝  ${toItalic("Ton rang & pouvoirs")}
  🔗  *${prefix}pairing +XX*    ⇝  ${toItalic("Lier ton âme")}
  💀  *${prefix}sessionsudo*    ⇝  ${toItalic("Gérer tes disciples")}
  🎵  *${prefix}song <titre>*   ⇝  ${toItalic("Invoquer une musique")}
  📊  *${prefix}poll Q|A|B*     ⇝  ${toItalic("Rituel de vote")}
☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩`

  // ── FOOTER GOTHIQUE ───────────────────────────────────────────
  text += `

⛧ ✝ ☠ ✝ ⛧ ✝ ☠ ✝ ⛧ ✝ ☠ ✝ ⛧ ✝ ☠ ✝ ⛧ ✝ ☠ ✝ ⛧

      💀  *${toFancy(botName)}*  💀
   ☩  ${toItalic("Système des Ténèbres v2.0")}
   ⛧  ${toItalic("Forgé par LORD-DEMON Technology")}

⛧ ✝ ☠ ✝ ⛧ ✝ ☠ ✝ ⛧ ✝ ☠ ✝ ⛧ ✝ ☠ ✝ ⛧ ✝ ☠ ✝ ⛧`

  return text
}

// ═════════════════════════════════════════════════════════════════
//  HANDLER PRINCIPAL
// ═════════════════════════════════════════════════════════════════

export default async function menu(sock, sender, args, msg) {
  let loadingKey = null

  try {
    const botName    = config.botName || "𝐋𝐎𝐑𝐃 ✘ 𝐃𝐄𝐌𝐎𝐍"
    const prefix     = config.prefix  || "."
    const searchQuery= args?.length > 0 ? args.join(" ") : null

    // ── LOADER ANIMÉ ───────────────────────────────────────────
    loadingKey = await showFastLoader(sock, sender, botName)

    // ── CONSTRUIRE LE MENU ────────────────────────────────────────
    const menuText = buildMenuText(prefix, botName, searchQuery)

    // ── SUPPRIMER LE LOADER ───────────────────────────────────────
    if (loadingKey) {
      await sock.sendMessage(sender, { delete: loadingKey }).catch(() => {})
      loadingKey = null
    }

    // ── ENVOYER LE MENU ───────────────────────────────────────────
    const randomImage = getRandomImage()

    if (randomImage && fs.existsSync(randomImage)) {
      await sock.sendMessage(sender, {
        image:   fs.readFileSync(randomImage),
        caption: menuText
      })
    } else {
      await sock.sendMessage(sender, { text: menuText })
    }

    // ── BOUTON "VOIR LA CHAÎNE" ───────────────────────────────────
    // Envoi d'un message séparé avec le lien de la chaîne officielle
    // Cela génère le bouton cliquable "Voir la chaîne" dans WhatsApp
    if (!searchQuery) {
      try {
        const channelCtx = await getChannelContextInfo(sock, botName)
        await sock.sendMessage(sender, {
          text:
            `_💀 *${botName}* — Système des Ténèbres v2.0_\n` +
            `_⛧ Forgé par LORD-DEMON Technology_`,
          contextInfo: channelCtx
        })
      } catch {}
    }

    const totalCmds = Object.values(getSyncedCategories()).flat().length
    console.log(`✅ [MENU] Envoyé → ${searchQuery ? "Recherche: " + searchQuery : totalCmds + " commandes"}`)

  } catch (error) {
    console.error("❌ [MENU] ERREUR:", error)
    try {
      if (loadingKey) {
        await sock.sendMessage(sender, { delete: loadingKey }).catch(() => {})
      }
      await sock.sendMessage(sender, {
        text:
`☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩
   ☠  ${toFancy("LE RITUEL A ECHOUE")}
☩━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━☩

⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸
  ⛧  ${error.message}
  ☩  ${toItalic("Réinvoque avec")} : *${config.prefix || "."}menu*
⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
      })
    } catch {}
  }
}
