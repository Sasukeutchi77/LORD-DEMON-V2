import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const COMMANDS_DIR = path.join(__dirname, '..', 'commands')

const cooldowns = new Map()

export const COMMAND_CATEGORIES = [
  { id: 'general', title: '🔥 Général', aliases: ['general','général','base','main'],
    commands: ['menu','help','help2','ping','info','uptime','whoami','vv','url','style','profile','status','pairing','mypair','stoppair','sessionsudo','version','newfeature','suggestion','debug','pinstat'] },
  { id: 'ia', title: '🤖 Intelligence artificielle', aliases: ['ia','ai','intelligence'],
    commands: ['ai','demon','summarize','ocr','transcribe','oracle','prediction','destin'] },
  { id: 'media', title: '🎵 Médias', aliases: ['media','médias','musique','video'],
    commands: ['song','image','sticker','ytmp4','lyrics','download','qrcode','tts','insta','film','serie','ideefilm','musique','ideerap','ideehistoire'] },
  { id: 'utilitaires', title: '🌍 Utilitaires', aliases: ['utilitaires','utils','tools','outil'],
    commands: ['weather','translate','calc','quote','joke','horoscope','remind','schedule','poll','ascii','apkinfo','convertir','google','stackoverflow','base64','bmi','camelcase','cesar','charcount','crc32','date2','decodurl','encodurl','factorielle','fibonacci','haiku','hashtag','heure','heuredec','ip','kglivre','kmmi','leet','longueur','lower','md5','mock','morse','nombre','password2','pgcd','pile','pile2','poids','pourcentage','ppcm','premier','puissance','racine','romannum','rot13','sha256','snakecase','kebabcase','titlecase','timestamp','upper','uuid','uwu','zalgo','reverse','binaire','acronyme','acrostiche','mot','prenom','slogan','idee','username','username2','signature','surface','volume2','vitesse','vitesse2','temperature','semaine','jour','pin','countdown','age','bio','base','iq'] },
  { id: 'horoscope', title: '🔮 Horoscope & Mysticisme', aliases: ['horoscope','astrologie','zodiac','mystique'],
    commands: ['horoscope-belier','horoscope-taureau','horoscope-gemeaux','horoscope-cancer','horoscope-lion','horoscope-vierge','horoscope-balance','horoscope-scorpion','horoscope-sagittaire','horoscope-capricorne','horoscope-verseau','horoscope-poissons','signe','moon','rune','magie','sort','rituel','invocation','benediction2','malediction2','maudit','priere','prophete','animalspirit','aura'] },
  { id: 'faits', title: '📚 Culture & Faits', aliases: ['faits','culture','science','histoire','trivia'],
    commands: ['fait-animal','fait-espace','fait-histoire','fait-science','fun_fact','philosophie','sagesse','proverbe','citation2','citation3','lecon','recette','boomer','zoomer','motivation2'] },
  { id: 'jeux', title: '🎮 Jeux & Fun', aliases: ['jeux','game','games','fun'],
    commands: ['coinflip','dice','rps','tictactoe','quiz','dare','ship','gay','nitro','daily','rank','leaderboard','blackjack','pendu','slot','defi','vraifaux','mathrapide','anagramme','bingo','quiz-anim','quiz-cinema','quiz-foot','quiz-geo','quiz-histoire','quiz-jv','quiz-manga','quiz-musique','quiz-musique2','quiz-pays','quiz-science','quiz-sport','quiz-tech','grattage','jackpot2','loto','pari','roulette','roue','spinner2','tirage','tournoi','would','duel2','chance','luck','des2','enigme','chanter','dance','roast2','roast3','cringe','rizz','sigma','swag','vibe2','toxicite','chad','simp','charisme','beaute','blague'] },
  { id: 'social_fun', title: '💕 Social & Interactions', aliases: ['social_fun','interactions','emotions'],
    commands: ['hug','kiss','pat','highfive','slap','wave','wink','clap','complimenter','compliment2','compliment3','beni','gratitude','insulter','ignorer','taquiner','pardon','seduire','menace','trahison','rival','alliance','accepter','refuser','boire','manger','dormir','reveiller','marcher','marche','meditation2','mediter','penser','rire2','pleurer','cheer','humeur','energie','courage','punch','combo','challenger','streakbattle','serment','serment2','badge','reputation','aider','alerte','announce','don'] },
  { id: 'economie', title: '🪙 Économie', aliases: ['economie','economy','coins','argent','money'],
    commands: ['coins','bank','shop','job','pay','rob','bourse','crypto2','eurusd','investir','minage','richesse','taxe','travailler2','recompense','peche','chasse','voyage'] },
  { id: 'rpg', title: '⚔️ RPG & Aventure', aliases: ['rpg','aventure','dungeon','donjon'],
    commands: ['rpg','arcane','arene','arme','ascension','awakening','boss','classerpg','competences','element2','entrainer','evolution','faction','fight','force','fouiller','fusion','genere','karma','lore','mana','monstre','mystere','niveau2','npc','objectif','observer','ouvrir','fermer','potion2','pouvoir','pouvoirmax','pouvoirspecial','protagoniste','quete2','rangdemoniaque','rapidite','redemption','resurrection','sacrifice','sauvegarde','superpouvoire','taverne','temple','transformation','typeperso','vilain','weakness','background','backstory','caracteristique','startup2','lire','protect','espionner2','furtivite','mission','evenement','inventaire2','tresortrouve','rejoindre','abandonner','demotiontous','revoke'] },
  { id: 'social', title: '💒 Communauté', aliases: ['social','mariage','guild','communaute'],
    commands: ['mariage','guild','pet','card','groupstats','grouplink','membercount','listadmins','topuser'] },
  { id: 'admin', title: '👥 Administration groupe', aliases: ['admin','admins','groupe','moderation'],
    commands: ['kick','add','promote','demote','mute','unmute','kickall','ban','unban','warn','unwarn','warnlist','clearwarns','slowmode','setnom','setdesc','setrules','mentionall'] },
  { id: 'groupe', title: '⚙️ Configuration groupe', aliases: ['config','configuration','parametres'],
    commands: ['group','groupconfig','setdesc','setppgc','link','tagall','hidetag','group-tm','pseudo','pp','role','modlog','lock','approve','whitelist','blacklist','welcome','goodbye','rules','notes','afk','regles','tendance'] },
  { id: 'protection', title: '🛡️ Protections', aliases: ['protection','security','anti'],
    commands: ['antipurge','antidemote','antipromote','antitag','antilink','antispam','antimention','antisuppression','antiword','antiflood'] },
    { id: 'nouveautes', title: '🆕 Nouvelles Invocations', aliases: ['nouveautes','nouveau','new'],
    commands: ['bibliotheque','meteo2','blason','combat2','numerologie','tarot','oracle2','devinette','compteur','dicepoker','lancement','confiance','element3','portebonheur','dicton','planete','poeme','mythologie','grimoire2','monstre2','cryptage','generateur','sondagerapide','rappelsemaine','identite','challenge2','speedtest','citation4','destinsombre','planaction','karma2','enigme2','heritage','contrat','annonce2','tonpouvoir','totem','legendaire','futur','passe','tresormystique','demonday','sondage2','vote2','reaction2','emoji2','palette2','couleur2','typobold','typeitalic','typeflip','symbole2','monnaie2','temperature2','solarsystem','arcane2','lore2','clan2','badge2','talisman2'] },
  { id: 'owner', title: '👑 Owner & système', aliases: ['owner','sudo','system','supreme'],
    commands: ['sudo','setsudo','addsudo','delsudo','removesudo','listsudo','broadcast','reload','restart','stop','shutdown','eval','exec','dit','pack','addpremium','removepremium','public','private','prefix','maintenance','logs','backup','restore','cmdinfo','kickallv2','domination','statistiques2','memoire'] }
]

const DESCRIPTIONS = {
  menu:'Affiche le menu dynamique par catégorie',help:'Aide détaillée d\'une commande',help2:'Menu d\'aide avancé avec recherche',ping:'Teste la latence du bot',info:'Infos du bot',uptime:'Temps d\'activité',whoami:'Votre rôle et permissions',vv:'Récupère les médias à vue unique',url:'Analyse et manipule des liens',style:'Transforme le texte en styles spéciaux',profile:'Profil utilisateur',status:'État du bot',pairing:'Connecter votre compte WhatsApp',mypair:'État de votre session',stoppair:'Déconnecter votre session',sessionsudo:'Gérer les sudos de session',version:'Version actuelle du bot',newfeature:'Nouvelles fonctionnalités',suggestion:'Envoyer une suggestion',debug:'Informations de debug système',pinstat:'Statistiques des commandes épinglées',
  ai:'Discute avec l\'IA Groq',demon:'IA technique avancée',summarize:'Résume un texte long',ocr:'Lit le texte dans une image',transcribe:'Transcrit un vocal ou une vidéo',oracle:'L\'Oracle répond aux questions mystiques',prediction:'Prédit l\'avenir selon les astres',destin:'Révèle votre destinée démoniaque',
  song:'Télécharge une musique',image:'Recherche une image',sticker:'Crée un sticker',ytmp4:'Télécharge une vidéo YouTube',lyrics:'Paroles d\'une chanson',download:'Télécharge un média depuis une URL',qrcode:'Génère un QR code',tts:'Convertit un texte en vocal',insta:'Télécharge depuis Instagram',film:'Infos sur un film',serie:'Infos sur une série TV',ideefilm:'Idée aléatoire de film à voir',musique:'Recommandation musicale',ideerap:'Génère une idée de texte rap',ideehistoire:'Génère une idée d\'histoire',
  weather:'Météo',translate:'Traduit un texte',calc:'Calcule une expression',quote:'Citation',joke:'Blague',horoscope:'Horoscope',remind:'Rappel',schedule:'Message programmé',poll:'Sondage',ascii:'ASCII art',apkinfo:'Analyse un APK',convertir:'Convertisseur universel',google:'Recherche web DuckDuckGo',stackoverflow:'Recherche StackOverflow',base64:'Encode/décode Base64',bmi:'Calcule l\'IMC',camelcase:'Convertit en camelCase',cesar:'Chiffrement de César',charcount:'Compte les caractères',crc32:'Checksum CRC32',date2:'Informations sur une date',decodurl:'Décode une URL',encodurl:'Encode une URL',factorielle:'Factorielle d\'un nombre',fibonacci:'Suite de Fibonacci',haiku:'Génère un haïku',hashtag:'Génère des hashtags',heure:'Heure actuelle mondiale',heuredec:'Heure décimale',ip:'Infos sur une IP',iq:'Test de QI humoristique',kglivre:'Conversion kg ↔ livres',kmmi:'Conversion km ↔ miles',leet:'Convertit en leet speak',longueur:'Conversion de longueurs',lower:'Convertit en minuscules',md5:'Hash MD5',mock:'Texte en mOcKsTyLe',morse:'Encode/décode en morse',nombre:'Infos sur un nombre',password2:'Mot de passe sécurisé',pgcd:'PGCD de deux nombres',pile:'Pile ou face',pile2:'Double pile ou face',poids:'Conversion de poids',pourcentage:'Calcule un pourcentage',ppcm:'PPCM de deux nombres',premier:'Nombre premier ?',puissance:'Calcule une puissance',racine:'Racine carrée',romannum:'Chiffres romains',rot13:'Chiffrement ROT13',sha256:'Hash SHA-256',snakecase:'Convertit en snake_case',kebabcase:'Convertit en kebab-case',titlecase:'Convertit en Title Case',timestamp:'Timestamp Unix',upper:'MAJUSCULES',uuid:'UUID v4 aléatoire',uwu:'Convertit en uwu',zalgo:'Texte Zalgo glitché',reverse:'Inverse un texte',binaire:'Convertit en binaire',acronyme:'Acronyme créatif',acrostiche:'Crée un acrostiche',mot:'Mot avec définition',prenom:'Signification d\'un prénom',slogan:'Slogan accrocheur',idee:'Idée créative aléatoire',username:'Pseudo original',username2:'Pseudo gaming',signature:'Signature stylée',surface:'Calcule une surface',volume2:'Calcule un volume',vitesse:'Calcule une vitesse',vitesse2:'Conversion de vitesses',temperature:'Conversion de températures',semaine:'Jour de la semaine d\'une date',jour:'Infos sur un jour',pin:'Épingle un message',countdown:'Compte à rebours',age:'Calculer un âge',bio:'Biographie de personnage',base:'Base de données commandes',
  'horoscope-belier':'Horoscope du Bélier ♈','horoscope-taureau':'Horoscope du Taureau ♉','horoscope-gemeaux':'Horoscope des Gémeaux ♊','horoscope-cancer':'Horoscope du Cancer ♋','horoscope-lion':'Horoscope du Lion ♌','horoscope-vierge':'Horoscope de la Vierge ♍','horoscope-balance':'Horoscope de la Balance ♎','horoscope-scorpion':'Horoscope du Scorpion ♏','horoscope-sagittaire':'Horoscope du Sagittaire ♐','horoscope-capricorne':'Horoscope du Capricorne ♑','horoscope-verseau':'Horoscope du Verseau ♒','horoscope-poissons':'Horoscope des Poissons ♓',signe:'Votre signe astrologique',moon:'Phase de la lune 🌙',rune:'Tire une rune nordique',magie:'Sort magique aléatoire',sort:'Lance un sort',rituel:'Rituel démoniaque',invocation:'Invoque une entité',benediction2:'Bénédiction divine',malediction2:'Lance une malédiction',maudit:'Êtes-vous maudit ?',priere:'Prière au Démon',prophete:'Le prophète prédit l\'avenir',animalspirit:'Votre animal spirituel',aura:'Couleur de votre aura',
  'fait-animal':'Fait incroyable sur les animaux 🦊','fait-espace':'Fait hallucinant sur l\'espace 🚀','fait-histoire':'Fait historique surprenant 📜','fait-science':'Fait scientifique fascinant 🔬',fun_fact:'Fait amusant aléatoire',philosophie:'Citation philosophique',sagesse:'Parole de sagesse démoniaque',proverbe:'Proverbe du monde',citation2:'Citation inspirante célèbre',citation3:'Citation démoniaque exclusive',lecon:'Leçon de vie aléatoire',recette:'Recette de cuisine rapide',boomer:'Es-tu un boomer ?',zoomer:'Quiz culture zoomer',motivation2:'Message de motivation démoniaque',
  coinflip:'Pile ou face',dice:'Lance des dés',rps:'Pierre-feuille-ciseaux',tictactoe:'Morpion interactif',quiz:'Quiz culture générale',dare:'Action ou vérité',ship:'Compatible avec quelqu\'un ?',gay:'Gay-mètre humoristique',nitro:'Faux nitro Discord',daily:'Récompense quotidienne',rank:'Votre classement',leaderboard:'Classement général',blackjack:'Blackjack contre le Démon',pendu:'Jeu du pendu',slot:'Machine à sous démoniaque',defi:'Défis (maths, culture, vitesse)',vraifaux:'Vrai ou faux avec explications',mathrapide:'Calculs rapides contre la montre',anagramme:'Reconstitue le mot mélangé',bingo:'Bingo démoniaque 🎱','quiz-anim':'Quiz animaux 🦊','quiz-cinema':'Quiz cinéma 🎬','quiz-foot':'Quiz football ⚽','quiz-geo':'Quiz géographie 🌍','quiz-histoire':'Quiz histoire 📜','quiz-jv':'Quiz jeux vidéo 🎮','quiz-manga':'Quiz manga/anime 🇯🇵','quiz-musique':'Quiz musique 🎵','quiz-musique2':'Quiz musique avancé 🎸','quiz-pays':'Quiz capitales et pays 🗺️','quiz-science':'Quiz sciences 🔬','quiz-sport':'Quiz sport 🏆','quiz-tech':'Quiz technologie 💻',grattage:'Grattage virtuel',jackpot2:'Jackpot démoniaque 🎰',loto:'Loterie démoniaque 🎲',pari:'Parie sur un événement',roulette:'Roulette russe virtuelle',roue:'Roue du destin',spinner2:'Spinner de décision',tirage:'Tirage au sort',tournoi:'Tournoi entre membres',would:'Would you rather ?',duel2:'Duel de stats',chance:'Niveau de chance du jour',luck:'Tirages chanceux',des2:'Dés spéciaux multiples',enigme:'Énigme à résoudre',chanter:'Style de chant démoniaque',dance:'Danse aléatoire !',roast2:'Roast humoristique avancé',roast3:'Roast extrême',cringe:'Niveau de cringe',rizz:'Score de rizz',sigma:'Niveau sigma',swag:'Score de swag',vibe2:'Votre vibe du moment',toxicite:'Niveau de toxicité',chad:'Êtes-vous un chad ?',simp:'Niveau de simp',charisme:'Score de charisme',beaute:'Score de beauté',blague:'Blague aléatoire 😂',
  hug:'Câlin à quelqu\'un 🤗',kiss:'Embrasse quelqu\'un 💋',pat:'Caresse la tête',highfive:'Tape dans la main',slap:'Gifle quelqu\'un',wave:'Signe de la main 👋',wink:'Clin d\'oeil',clap:'Applaudit quelqu\'un 👏',complimenter:'Complimente quelqu\'un',compliment2:'Compliment romantique',compliment3:'Super compliment démoniaque',beni:'Bénit quelqu\'un',gratitude:'Exprimer votre gratitude',insulter:'Insulte humoristique',ignorer:'Ignore quelqu\'un publiquement',taquiner:'Taquine quelqu\'un',pardon:'Demande pardon',seduire:'Tentative de séduction',menace:'Menace dramatique',trahison:'Dénonce une trahison',rival:'Déclare un rival',alliance:'Propose une alliance',accepter:'Accepte une proposition',refuser:'Refuse une proposition',boire:'Boire ensemble',manger:'Manger ensemble',dormir:'Endors quelqu\'un',reveiller:'Réveille quelqu\'un',marcher:'Se balade avec quelqu\'un',marche:'Compte tes pas du jour',meditation2:'Méditation guidée',mediter:'Méditez en silence',penser:'Pensée philosophique du jour',rire2:'Éclater de rire',pleurer:'Pleurer dramatiquement',cheer:'Encourager quelqu\'un',humeur:'Humeur du moment',energie:'Niveau d\'énergie',courage:'Niveau de courage',punch:'Coup de poing symbolique',combo:'Combo d\'actions',challenger:'Lancer un défi',streakbattle:'Battle de streak',serment:'Serment solennel',serment2:'Serment de sang démoniaque',badge:'Voir vos badges',reputation:'Voir votre réputation',aider:'Aider quelqu\'un',alerte:'Envoyer une alerte',announce:'Annonce officielle',don:'Don de coins',
  coins:'Solde de coins 🪙',bank:'Gérer votre banque',shop:'Boutique démoniaque',job:'Choisir un métier',pay:'Payer quelqu\'un 💸',rob:'Voler des coins 🥷',bourse:'Simulateur boursier 📈',crypto2:'Cours des cryptos simulé',eurusd:'Taux EUR/USD simulé',investir:'Investir dans un actif',minage:'Minage de DemonCoin',richesse:'Classement des plus riches',taxe:'Payer ses taxes démoniaques',travailler2:'Travailler pour des coins',recompense:'Récompenses journalières',peche:'Pêcher pour des coins',chasse:'Chasser pour des ressources',voyage:'Expédition lucrative',
  rpg:'RPG textuel — donjons & boss ⚔️',arcane:'Apprentissage d\'arcanes magiques',arene:'Combat en arène classée',arme:'Gérer votre armement',ascension:'Montée en puissance',awakening:'Éveil de pouvoir suprême',boss:'Combattre un boss légendaire',classerpg:'Classe RPG aléatoire',competences:'Vos compétences RPG',element2:'Votre élément RPG',entrainer:'S\'entraîner pour progresser',evolution:'Évoluer vers la forme suivante',faction:'Rejoindre/créer une faction',fight:'Combat PvP contre un membre',force:'Votre force actuelle',fouiller:'Fouiller pour des objets',fusion:'Fusionner deux objets',genere:'Générer un personnage RPG',karma:'Votre karma total',lore:'Lore de l\'univers LORD DEMON',mana:'Voir votre mana',monstre:'Rencontrer un monstre',mystere:'Coffre mystérieux',niveau2:'Votre niveau RPG',npc:'Parler à un PNJ',objectif:'Objectifs RPG du moment',observer:'Observer l\'environnement',ouvrir:'Ouvrir un coffre',fermer:'Fermer une session RPG',potion2:'Utiliser une potion',pouvoir:'Votre pouvoir spécial',pouvoirmax:'Pouvoir maximum déchaîné',pouvoirspecial:'Activer le pouvoir spécial',protagoniste:'Être le protagoniste',quete2:'Lancer une quête épique',rangdemoniaque:'Votre rang démoniaque',rapidite:'Rapidité de combat',redemption:'Chemin de rédemption',resurrection:'Ressusciter après défaite',sacrifice:'Sacrifier pour des bonus',sauvegarde:'Sauvegarder la progression',superpouvoire:'Pouvoir absolu démoniaque',taverne:'La taverne du Démon',temple:'Le temple des anciens',transformation:'Se transformer en monstre',typeperso:'Type de personnage',vilain:'Devenir le grand méchant',weakness:'Découvrir votre faiblesse',background:'Backstory de votre personnage',backstory:'Histoire de votre héros',caracteristique:'Stats de votre personnage',startup2:'Lancer une startup RPG',lire:'Lire un grimoire ancien',protect:'Se protéger d\'une attaque',espionner2:'Espionner un membre',furtivite:'Mode furtif activé',mission:'Accepter une mission secrète',evenement:'Événement aléatoire mondial',inventaire2:'Voir votre inventaire',tresortrouve:'Trésor découvert !',rejoindre:'Rejoindre une quête de groupe',abandonner:'Abandonner une quête',demotiontous:'Révolution de guild',revoke:'Révoquer un accord',
  mariage:'Système de mariage 💒',guild:'Créer/rejoindre une guilde 🏰',pet:'Animal virtuel 🐾',card:'Cartes démoniaques 🃏',groupstats:'Statistiques du groupe',grouplink:'Lien du groupe',membercount:'Nombre de membres',listadmins:'Liste des admins',topuser:'Top utilisateurs actifs',
  kick:'Expulse un membre',add:'Ajoute un membre',promote:'Promouvoit un membre',demote:'Rétrograde un admin',mute:'Ferme le groupe',unmute:'Ouvre le groupe',kickall:'Expulsion avec confirmation',ban:'Bannit un utilisateur',unban:'Débannit un utilisateur',warn:'Avertit un membre',unwarn:'Retire un avertissement',warnlist:'Liste des avertissements',clearwarns:'Efface les avertissements',slowmode:'Mode lent — limite messages',setnom:'Changer le nom du groupe',setdesc:'Change la description',setrules:'Définir les règles',mentionall:'Mentionner tous les membres',
  group:'Gère le groupe',groupconfig:'Configuration du groupe',setppgc:'Change la photo du groupe',link:'Lien du groupe',tagall:'Mentionne tous les membres',hidetag:'Mention discrète','group-tm':'Programme ouverture/fermeture',pseudo:'Change le pseudo du bot',pp:'Change la photo du bot',role:'Rôle d\'un membre',modlog:'Journal de modération',lock:'Verrouille des éléments',approve:'Approuve un membre',whitelist:'Liste blanche',blacklist:'Liste noire',welcome:'Message de bienvenue',goodbye:'Message de départ',rules:'Règles du groupe',notes:'Notes du groupe',afk:'Mode absent',regles:'Règles simplifiées',tendance:'Tendances dans le groupe',
  antipurge:'Protection contre expulsions massives',antidemote:'Bloque rétrogradations abusives',antipromote:'Bloque promotions non autorisées',antitag:'Bloque les tags massifs',antilink:'Bloque les liens',antispam:'Bloque le spam',antimention:'Bloque les mentions abusives',antisuppression:'Surveille les suppressions',antiword:'Filtre les mots interdits',antiflood:'Bloque le flood',
  sudo:'Gère les accès sudo',addsudo:'Ajoute un sudo',setsudo:'Ajoute un sudo',delsudo:'Retire un sudo',removesudo:'Retire un sudo',listsudo:'Liste les sudos',broadcast:'Diffuse un message global',reload:'Recharge les commandes',restart:'Redémarre le bot',stop:'Arrête le bot',shutdown:'Arrête proprement',eval:'Exécute du JavaScript',exec:'Exécute une commande système',dit:'Fait parler le bot',pack:'Gère les packs de stickers',addpremium:'Ajoute un membre premium',removepremium:'Retire le premium',public:'Mode public',private:'Mode privé',prefix:'Change le préfixe',maintenance:'Mode maintenance',logs:'Affiche les logs',backup:'Crée une sauvegarde',restore:'Restaure une sauvegarde',cmdinfo:'Infos d\'une commande',kickallv2:'Expulsion massive avancée',domination:'Contrôle avancé du groupe',statistiques2:'Statistiques globales du bot',memoire:'Mémoire système du bot',
    bibliotheque:'Livre aleatoire a decouvrir',meteo2:'Meteo amelioree par ville',blason:'Blason de votre maison',combat2:'Combat demoniaque rapide',numerologie:'Votre nombre de vie',tarot:'Tirage de carte de tarot',oracle2:'Oracle des tenebres II',devinette:'Devinette demoniaque',compteur:'Compteur personnel',dicepoker:'Poker aux des',lancement:'Choisir parmi des options',confiance:'Indice de confiance',element3:'Votre element primordial',portebonheur:'Porte-bonheur du Demon',dicton:'Dicton du jour',planete:'Infos sur une planete',poeme:'Poeme demoniaque',mythologie:'Dieu mythologique aleatoire',grimoire2:'Sort du grimoire II',monstre2:'Combat contre un monstre',cryptage:'Encoder/decoder un texte',generateur:'Generateur demoniaque',sondagerapide:'Sondage rapide',rappelsemaine:'Info semaine actuelle',identite:'Identite demoniaque aleatoire',challenge2:'Defi quotidien demoniaque',speedtest:'Test de vitesse du bot',citation4:'Citation premium inspirante',destinsombre:'Destin sombre revele',planaction:"Plan d'action en 5 etapes",karma2:'Votre karma cosmique',enigme2:'Enigme demoniaque II',heritage:'Heritage legendaire',contrat:'Pacte avec le Demon',annonce2:'Annonce officielle stylee',tonpouvoir:'Votre pouvoir demoniaque',totem:'Votre animal totem',legendaire:'Statut legendaire',futur:'Voir votre futur',passe:'Explorer votre passe',tresormystique:'Tresor mysterieux',demonday:'Journee demoniaque',sondage2:'Sondage II avance',vote2:'Vote II demoniaque',reaction2:'Reaction demoniaque',emoji2:'Emoji personnalise',palette2:'Palette de couleurs',couleur2:'Couleur aleatoire',typobold:'Texte en gras stylee',typeitalic:'Texte en italique stylee',typeflip:'Texte renverse',symbole2:'Symbole demoniaque',monnaie2:'Monnaie du monde',temperature2:'Conversion temperature',solarsystem:'Systeme solaire',arcane2:'Arcane demoniaque II',lore2:'Lore II univers',clan2:'Clan demoniaque',badge2:'Badge demoniaque',talisman2:'Talisman protecteur'
}

const GROUP_ONLY = new Set([
  'kick','add','promote','demote','mute','unmute','kickall','kickallv2','ban','unban',
  'warn','unwarn','warnlist','clearwarns','group','groupconfig','setdesc','setppgc',
  'link','tagall','hidetag','group-tm','modlog','lock','approve','whitelist',
  'blacklist','welcome','goodbye','rules','notes','antipurge','antidemote',
  'antipromote','antitag','antilink','antispam','antimention','antisuppression',
  'antiword','antiflood','domination','groupstats','grouplink','membercount',
  'listadmins','topuser','mentionall','slowmode','setnom','setrules','regles',
  'tendance','demotiontous','arene','fight','tournoi'
])
const ADMIN_COMMANDS = new Set([
  'kick','add','promote','demote','mute','unmute','kickall','ban','unban',
  'warn','unwarn','clearwarns','group','setdesc','setppgc','link','tagall',
  'hidetag','group-tm','modlog','lock','approve','whitelist','blacklist',
  'welcome','goodbye','rules','notes','antipurge','antidemote','antipromote',
  'antitag','antilink','antispam','antimention','antisuppression','antiword',
  'antiflood','slowmode','setnom','setrules','mentionall','demotiontous'
])
const SUDO_COMMANDS = new Set([
  'sudo','listsudo','broadcast','reload','restart','stop','shutdown','dit',
  'pack','public','private','prefix','maintenance','logs','backup','restore',
  'cmdinfo','statistiques2','memoire'
])
const OWNER_COMMANDS = new Set([
  'addsudo','setsudo','delsudo','removesudo','addpremium','removepremium',
  'eval','exec','kickallv2','domination'
])
const SUPREME_COMMANDS = new Set([
  'eval','exec','restart','stop','shutdown','reload','backup','restore',
  'maintenance','addsudo','setsudo','delsudo','removesudo','addpremium',
  'removepremium','broadcast','kickallv2','domination'
])
const PREMIUM_COMMANDS = new Set([])
const HEAVY_COOLDOWNS = {
  ai:10,demon:10,summarize:12,ocr:20,transcribe:30,song:30,ytmp4:30,
  download:30,image:12,sticker:6,qrcode:6,tts:10,insta:15,film:8,serie:8,
  oracle:15,prediction:15,bourse:10,crypto2:10,eurusd:5,investir:30,
  minage:60,rob:60,pay:10,travailler2:30,peche:20,voyage:30,boss:30,
  arene:20,fight:15,tournoi:60,quiz:5,'quiz-anim':5,'quiz-cinema':5,
  'quiz-foot':5,'quiz-geo':5,'quiz-histoire':5,'quiz-jv':5,'quiz-manga':5,
  'quiz-musique':5,'quiz-musique2':5,'quiz-pays':5,'quiz-science':5,
  'quiz-sport':5,'quiz-tech':5,grattage:30,jackpot2:20,loto:30,
  roulette:10,roue:5,tirage:5,streakbattle:60
}
const categoryByCommand = new Map()
for (const category of COMMAND_CATEGORIES) {
  for (const command of category.commands) categoryByCommand.set(command, category)
}
function normalize(value) { return String(value||'').trim().toLowerCase() }
export function getCommandFiles() {
  try {
    return fs.readdirSync(COMMANDS_DIR)
      .filter(file=>file.endsWith('.js'))
      .map(file=>path.basename(file,'.js'))
      .sort((a,b)=>a.localeCompare(b))
  } catch { return [] }
}
export function getCategoryByQuery(query) {
  const term = normalize(query)
  if (!term) return null
  return COMMAND_CATEGORIES.find(category=>
    category.id===term ||
    normalize(category.title).includes(term) ||
    category.aliases.some(alias=>normalize(alias)===term)
  )||null
}
export function getCommandMeta(commandName) {
  const command = normalize(commandName)
  const category = categoryByCommand.get(command)||{id:'autres',title:'📦 Autres commandes',aliases:['autres'],commands:[]}
  let permission='public'
  if (ADMIN_COMMANDS.has(command)) permission='admin'
  if (SUDO_COMMANDS.has(command)) permission='sudo'
  if (OWNER_COMMANDS.has(command)) permission='owner'
  if (PREMIUM_COMMANDS.has(command)) permission='premium'
  return {
    command,categoryId:category.id,categoryTitle:category.title,
    description:DESCRIPTIONS[command]||`Commande ${command}`,
    permission,scope:GROUP_ONLY.has(command)?'group':'any',
    cooldown:HEAVY_COOLDOWNS[command]??(permission==='public'?2:1)
  }
}
export function listCommandMetas() { return getCommandFiles().map(getCommandMeta) }
export function listCategories() {
  const existing = new Set(getCommandFiles())
  const used = new Set()
  const categories = COMMAND_CATEGORIES.map(category=>{
    const commands = category.commands.filter(command=>existing.has(command))
    commands.forEach(command=>used.add(command))
    return {...category,commands}
  }).filter(category=>category.commands.length>0)
  const otherCommands = [...existing].filter(command=>!used.has(command))
  if (otherCommands.length) {
    categories.push({id:'autres',title:'📦 Autres commandes',aliases:['autres'],commands:otherCommands})
  }
  return categories
}
export function searchCommands(query) {
  const term = normalize(query)
  if (!term) return []
  return listCommandMetas()
    .map(meta=>{
      let score=0
      if(meta.command===term) score+=100
      if(meta.command.startsWith(term)) score+=70
      if(meta.command.includes(term)) score+=45
      if(normalize(meta.description).includes(term)) score+=25
      if(normalize(meta.categoryTitle).includes(term)) score+=20
      return {...meta,score}
    })
    .filter(meta=>meta.score>0)
    .sort((a,b)=>b.score-a.score)
    .slice(0,12)
}
export function permissionLabel(permission) {
  return {public:'Public',premium:'Premium',admin:'Admin groupe',sudo:'Owner/Sudo',owner:'Owner principal'}[permission]||permission
}
export function scopeLabel(scope) { return scope==='group'?'Groupe uniquement':'Privé + groupe' }
export function evaluateCommandAccess(commandName,ctx={}) {
  const meta = getCommandMeta(commandName)
  if (meta.scope==='group'&&!ctx.isGroup)
    return {ok:false,meta,reason:'Cette commande fonctionne uniquement dans les groupes.'}
  if (ctx.isSecondaryBot&&SUPREME_COMMANDS.has(meta.command)&&!ctx.isGlobalMainOwner)
    return {ok:false,meta,reason:'Commande système réservée à l\'Owner principal. Indisponible depuis une session pairée.'}
  const isMainOwner=Boolean(ctx.isMainOwner),isOwner=Boolean(ctx.isOwner),isSudo=Boolean(ctx.isSudo)
  const isAdmin=Boolean(ctx.isAdmin),isPremium=Boolean(ctx.isPremium)
  if(meta.permission==='owner'&&!isMainOwner) return {ok:false,meta,reason:'Commande réservée à l\'Owner principal.'}
  if(meta.permission==='sudo'&&!isOwner&&!isSudo&&!isMainOwner) return {ok:false,meta,reason:'Commande réservée à l\'Owner et aux SUDO.'}
  if(meta.permission==='admin'&&!isAdmin&&!isOwner&&!isSudo&&!isMainOwner) return {ok:false,meta,reason:'Commande réservée aux admins du groupe.'}
  if(meta.permission==='premium'&&!isPremium&&!isOwner&&!isSudo&&!isMainOwner) return {ok:false,meta,reason:'Commande réservée aux membres Premium.'}
  return {ok:true,meta}
}
export function checkCommandCooldown(commandName,userId,ctx={}) {
  const meta = getCommandMeta(commandName)
  if(ctx.isMainOwner||ctx.isOwner||ctx.isSudo) return {ok:true,meta}
  const seconds = Math.max(0,Number(meta.cooldown||0))
  if(!seconds) return {ok:true,meta}
  const key=`${userId}:${meta.command}`,now=Date.now(),next=cooldowns.get(key)||0
  if(now<next) return {ok:false,meta,remaining:Math.ceil((next-now)/1000)}
  cooldowns.set(key,now+seconds*1000)
  return {ok:true,meta}
}
export function formatAccessDenied(result,prefix='.') {
  const meta=result.meta
  return `╭━━━〔 ⛧ *ACCÈS REFUSÉ* 〕━━━╮\n\n┃ Commande : *${prefix}${meta.command}*\n┃ Raison : ${result.reason}\n┃ Niveau requis : *${permissionLabel(meta.permission)}*\n\n┃ Aide : \`${prefix}help ${meta.command}\`\n╰━━━━━━━━━━━━━━━━━━━━━━╯`
}
export function formatCooldownDenied(result,prefix='.') {
  return `╭━━━〔 ⏳ *COOLDOWN* 〕━━━╮\n\n┃ Commande : *${prefix}${result.meta.command}*\n┃ Patiente encore *${result.remaining}s*.\n\n╰━━━━━━━━━━━━━━━━━━━━━━╯`
}
