import { sendMessage } from '../lib/sendMessage.js'
const LANGS = {fr:'Français 🇫🇷',en:'English 🇬🇧',es:'Español 🇪🇸',de:'Deutsch 🇩🇪',it:'Italiano 🇮🇹',pt:'Português 🇵🇹',ar:'العربية 🇸🇦',zh:'中文 🇨🇳',ja:'日本語 🇯🇵',ko:'한국어 🇰🇷',ru:'Русский 🇷🇺',hi:'हिन्दी 🇮🇳',tr:'Türkçe 🇹🇷',nl:'Nederlands 🇳🇱',pl:'Polski 🇵🇱',sv:'Svenska 🇸🇪',da:'Dansk 🇩🇰',fi:'Suomi 🇫🇮',no:'Norsk 🇳🇴',vi:'Tiếng Việt 🇻🇳',th:'ภาษาไทย 🇹🇭',id:'Bahasa Indonesia 🇮🇩',ms:'Bahasa Melayu 🇲🇾',sw:'Kiswahili 🇰🇪',yo:'Yorùbá 🇳🇬',ha:'Hausa 🇳🇬',am:'አማርኛ 🇪🇹',wo:'Wolof 🇸🇳'}
export default async function languecode(sock, sender, args, msg, ctx) {
  const code = args[0]?.toLowerCase()
  if (!code) {
    const list = Object.entries(LANGS).slice(0,15).map(([k,v])=>`*${k}* — ${v}`).join('\n')
    return await sendMessage(sock, sender, `☩━━━〔 🌐 *CODES LANGUE* 〕━━━☩\n☠\n${list}\n☠\n⛧  ...et plus encore\n☠\n✝  ${process.env.PREFIX||'.'}languecode <code>\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  }
  const lang = LANGS[code]
  if (!lang) return await sendMessage(sock, sender, `☠ Code *${code}* inconnu.`)
  await sendMessage(sock, sender, `☩━━━〔 🌐 *LANGUE* 〕━━━☩\n☠\n⛧  Code: *${code}*\n☠  Langue: *${lang}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}
