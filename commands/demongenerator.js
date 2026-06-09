import { sendMessage } from '../lib/sendMessage.js'
const PREFIXES = ['Lord','Dark','Shadow','Eternal','Blood','Soul','Void','Abyssal','Infernal','Chaos']
const NAMES = ['Marduk','Keres','Zephael','Malphas','Valefar','Agares','Phenex','Sitri','Belias','Raum']
const TITLES = ['of Shadows','the Destroyer','of Fire','the Eternal','of Abyss','the Fallen','of Darkness','the Undying']
const DOMAINS = ['Manipulation','War','Deception','Chaos','Knowledge','Fear','Madness','Death']
export default async function demongenerator(sock, sender, args, msg, ctx) {
  const pref = PREFIXES[Math.floor(Math.random()*PREFIXES.length)]
  const name = NAMES[Math.floor(Math.random()*NAMES.length)]
  const title = TITLES[Math.floor(Math.random()*TITLES.length)]
  const domain = DOMAINS[Math.floor(Math.random()*DOMAINS.length)]
  const power = Math.floor(Math.random()*9000)+1000
  const rank = ['Minion','Soldier','Knight','Lord','Archfiend','Demon Prince'][Math.floor(Math.random()*6)]
  await sendMessage(sock, sender, `☩━━━〔 ☠️ *DEMON GENERATOR* 〕━━━☩\n☠\n⛧  Nom: *${pref} ${name} ${title}*\n☠  Rang: *${rank}*\n✝  Domaine: *${domain}*\n☠  Puissance: *${power.toLocaleString()}*\n☠\n✝  _Généré par les ténèbres de LORD DEMON V2_\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}