import { sendMessage } from '../lib/sendMessage.js'

const WEATHER_ICONS = {
    '113': '☀️', '116': '⛅', '119': '☁️', '122': '🌫️',
    '143': '🌫️', '176': '🌦️', '179': '🌨️', '182': '🌧️',
    '185': '🌧️', '200': '⛈️', '227': '🌨️', '230': '❄️',
    '248': '🌫️', '260': '🌫️', '263': '🌧️', '266': '🌧️',
    '281': '🌧️', '284': '🌧️', '293': '🌦️', '296': '🌦️',
    '299': '🌧️', '302': '🌧️', '305': '🌧️', '308': '🌧️',
    '311': '🌧️', '314': '🌧️', '317': '🌨️', '320': '🌨️',
    '323': '🌨️', '326': '🌨️', '329': '❄️', '332': '❄️',
    '335': '❄️', '338': '❄️', '350': '🌧️', '353': '🌦️',
    '356': '🌧️', '359': '🌧️', '362': '🌨️', '365': '🌨️',
    '368': '🌨️', '371': '❄️', '374': '🌧️', '377': '🌧️',
    '386': '⛈️', '389': '⛈️', '392': '⛈️', '395': '❄️'
}

function getWeatherIcon(code) {
    return WEATHER_ICONS[String(code)] || '🌡️'
}

function getWindDirection(degree) {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']
    return dirs[Math.round(degree / 45) % 8]
}

export default async function weather(sock, sender, args, msg) {
    try {
        const city = args.join(' ').trim()

        if (!city) {
            return await sendMessage(sock, sender,
                `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
                `⛧  🌤️ *MÉTÉO*  \n` +
                `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
                `☠ invocation: *.weather <ville>*\n\n` +
                `*Exemples:*\n` +
                `• \`.weather Paris\`\n` +
                `• \`.weather Abidjan\`\n` +
                `• \`.weather New York\`\n` +
                `• \`.weather Dakar\``
            )
        }

        const loadMsg = await sock.sendMessage(sender, {
            text: `🌤️ *Recherche météo pour "${city}"...*\n⏳ Patientez...`
        })

        // Utiliser wttr.in JSON API (gratuit, sans clé)
        const encodedCity = encodeURIComponent(city)
        const url = `https://wttr.in/${encodedCity}?format=j1`

        const response = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (curl/7.0)' },
            signal: AbortSignal.timeout(12000)
        })

        await sock.sendMessage(sender, { delete: loadMsg.key }).catch(() => {})

        if (!response.ok) {
            return await sendMessage(sock, sender,
                `☠ Ville *"${city}"* introuvable ou service indisponible.`
            )
        }

        const data = await response.json()
        const current = data.current_condition?.[0]
        const location = data.nearest_area?.[0]
        const tomorrow = data.weather?.[1]

        if (!current) {
            return await sendMessage(sock, sender, `☠ Aucune donnée météo pour *"${city}"*.`)
        }

        const cityName = location?.areaName?.[0]?.value || city
        const country  = location?.country?.[0]?.value || ''
        const region   = location?.region?.[0]?.value || ''

        const temp        = current.temp_C
        const feels       = current.FeelsLikeC
        const humidity    = current.humidity
        const windSpeed   = current.windspeedKmph
        const windDir     = getWindDirection(parseInt(current.winddirDegree))
        const visibility  = current.visibility
        const condition   = current.weatherDesc?.[0]?.value || 'N/A'
        const weatherIcon = getWeatherIcon(current.weatherCode)
        const uvIndex     = current.uvIndex || 'N/A'
        const pressure    = current.pressure

        // Demain
        let tomorrowText = ''
        if (tomorrow) {
            const tMaxC = tomorrow.maxtempC
            const tMinC = tomorrow.mintempC
            const tDesc = tomorrow.hourly?.[4]?.weatherDesc?.[0]?.value || 'N/A'
            const tIcon = getWeatherIcon(tomorrow.hourly?.[4]?.weatherCode)
            tomorrowText = `\n\n☩━━━〔 📅 *DEMAIN* 〕━━━☩\n☠\n☩ ${tIcon} ${tDesc}\n✝ 🌡️ Min: ${tMinC}°C | Max: ${tMaxC}°C\n☠\n⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸`
        }

        // Qualité de l'air (indicative)
        let tempEmoji = '🌡️'
        const tempNum = parseInt(temp)
        if (tempNum <= 0)  tempEmoji = '🥶'
        else if (tempNum <= 10) tempEmoji = '🧥'
        else if (tempNum <= 20) tempEmoji = '😊'
        else if (tempNum <= 30) tempEmoji = '😎'
        else tempEmoji = '🥵'

        await sendMessage(sock, sender,
            `†┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈†\n` +
            `☠  🌤️ *MÉTÉO EN DIRECT*  \n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
            `☩━━━〔 📍 *LOCALISATION* 〕━━━☩\n` +
            `☠\n` +
            `⛧ 🏙️ ${cityName}${region ? ', ' + region : ''}\n` +
            `☩ 🌍 ${country}\n` +
            `☠\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
            `☩━━━〔 ${weatherIcon} *CONDITIONS* 〕━━━☩\n` +
            `☠\n` +
            `✝ ${tempEmoji} Température: *${temp}°C*\n` +
            `☠ 🌡️ Ressenti: *${feels}°C*\n` +
            `⛧ ☁️ Ciel: *${condition}*\n` +
            `☠\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸\n\n` +
            `☩━━━〔 💨 *DÉTAILS* 〕━━━☩\n` +
            `☠\n` +
            `☩ 💧 Humidité: *${humidity}%*\n` +
            `✝ 💨 Vent: *${windSpeed} km/h ${windDir}*\n` +
            `☠ 👁️ Visibilité: *${visibility} km*\n` +
            `⛧ ⚡ UV: *${uvIndex}*\n` +
            `☩ 🔧 Pression: *${pressure} hPa*\n` +
            `☠\n` +
            `⸸━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⸸` +
            tomorrowText
        )

        console.log(`🌤️ weather | ${cityName} | ${temp}°C`)

    } catch (e) {
        console.error("❌ Erreur weather:", e)
        await sendMessage(sock, sender,
            `☠ *Service météo indisponible*\n\n${e.message}\n\n💡 Réessayez dans quelques instants.`
        )
    }
}
