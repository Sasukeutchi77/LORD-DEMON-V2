import { sendMessage } from '../lib/sendMessage.js'
export default async function converttemp(sock, sender, args, msg, ctx) {
  const prefix = process.env.PREFIX||'.'
  const val = parseFloat(args[0]), unit = args[1]?.toLowerCase()
  if (isNaN(val)||!unit) return await sendMessage(sock, sender, `☩━━━〔 🌡️ *TEMP* 〕━━━☩\n☠\n⛧  ${prefix}converttemp <val> <C|F|K>\n☠  Ex: ${prefix}converttemp 100 C\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
  let c,f,k
  if(unit==='c'||unit==='celsius'){c=val;f=c*9/5+32;k=c+273.15}
  else if(unit==='f'||unit==='fahrenheit'){f=val;c=(f-32)*5/9;k=c+273.15}
  else if(unit==='k'||unit==='kelvin'){k=val;c=k-273.15;f=c*9/5+32}
  else return await sendMessage(sock,sender,'☠ Unité invalide: C, F ou K')
  await sendMessage(sock, sender, `☩━━━〔 🌡️ *TEMPÉRATURE* 〕━━━☩\n☠\n⛧  °C: *${c.toFixed(2)}*\n☠  °F: *${f.toFixed(2)}*\n✝  K: *${k.toFixed(2)}*\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`)
}