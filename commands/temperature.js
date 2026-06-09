// commands/temperature.js
import { sendMessage } from '../lib/sendMessage.js'
export default async function temperature(sock, sender, args, msg) {
  const val = parseFloat(args[0]), from = args[1]?.toUpperCase()
  if (!val||!from) return sendMessage(sock, sender, '☠ Usage: .temperature <valeur> <C/F/K>\nEx: .temperature 100 C')
  let c,f,k
  if(from==='C'){c=val;f=c*9/5+32;k=c+273.15}
  else if(from==='F'){f=val;c=(f-32)*5/9;k=c+273.15}
  else if(from==='K'){k=val;c=k-273.15;f=c*9/5+32}
  else return sendMessage(sock, sender, '☠ Unité inconnue (C/F/K)')
  await sendMessage(sock, sender,
    `🌡️ *Conversion température:*\n🔵 ${c.toFixed(2)}°C\n🔴 ${f.toFixed(2)}°F\n⚪ ${k.toFixed(2)}K`
  )
}
