# LOGBOG

Brug denne logbog til at holde styr på dine commits.

Udfyld hver dag. Det er vigtigt at du overholder denne logbog - du kan risikere at dumpe, hvis du ikke bruger den.  
Skriv tidspunkt for dit commit ud for hver dag, både morgen og aften.  
Husk, at du ikke må arbejde på din opgave mellem kl. 16:00 og kl. 8:00.



## Dag 1

Morgen - (kl. 13:06)  
 "Opret React projekt og grundlæggende struktur"

Eftermiddag - (kl. 14:57)  
 "Opret intro side, homepage og login side med styling. Hero sektion med baggrundsbillede, header med logoer, holdtype sektioner, newsletter, testimonials, kontaktform og footer. Alle tekster hvide på mørkeblå baggrund (#003147)"

## Dag 2

Morgen - (kl. 13.45)  
 "Opret genbrugelige Header, Footer og HoldtypeCard komponenter. Refaktorer HomePage til at bruge disse komponenter for bedre kodestruktur"

Eftermiddag - (kl. 15:30)
 "Implementer API service til aktiviteter med funktioner til hentning, tilmelding og framelding. Opret ActivitiesPage med API integration, aktivitetskort med overlay styling (360x344px, afrundede hjørner, translucent info overlay). Opdater IntroPage design med velkommen tekst, centreret logo og login knap. Tilføj søgefunktionalitet med React Icons og real-time filtrering af aktiviteter"


## Dag 3

Morgen - (kl. 10,42)  
 "Opret SignupPage med registreringsformular (fornavn, efternavn, brugernavn, alder, adgangskode, gentag adgangskode).

Eftermiddag - (kl. 13:45)
 "Opret ActivityDetailPage med dynamisk data fra API.Fix aktivitetskort text overlay positioning. Implementer detail-visning med billede, Tilmeld knap, titel, alder og beskrivelse"

## Dag 4

Morgen - (kl. 10:11)  
 "Implementer login og signup funktionalitet med validering og API integration. Opret ProfilePage med brugerinfo og tilmeldte aktiviteter. Opdater HomePage knap til dynamisk at vise 'Min Profil' for indloggede brugere. Tilføj authentication token håndtering i localStorage"

Eftermiddag - (kl. 15:23)
 "Implementer komplet tilmeldings-system: Tilmeld/Frameld funktionalitet på ActivityDetailPage med automatisk redirect til profil. Opret kalender kort komponenter (362x160px) på ProfilePage med unikke class names (kalender-kort, kalender-kort-titel, kalender-kort-tid, kalender-vis-knap). Tilføj deltagerliste på 'Vis hold' side med antal tilmeldte. Fiks backend model associations med aliases (Activities, Users, Instructor, TaughtActivities). Implementer footer navigation med React Icons (IoHome, IoGrid, IoPerson) der vises på alle sider undtagen home (410x66px, #E9E9E9 baggrund). Tilføj logout funktionalitet. Løs class name konflikt mellem footer og testimonial navigation"

## Dag 5

Eftermiddag - (kl. 15:00)
 "Implementeret de to sidste Figma-sider: LoginPage opdateret med LANDRUP DANS logo og divider linje. Oprettet OpretHoldPage (instruktør only) med formular til oprettelse af nye hold (navn, beskrivelse, ugedag, tidspunkt, max deltagere, alder, billede). Oprettet RedigerHoldPage med pre-udfyldt formular og PATCH til API. Tilføjet slet-funktionalitet på ProfilePage med bekræftelsesmodal ('Er du sikker?'). Oprettet DeltagerlistePage (instruktør only) med deltagerliste for et hold. Instruktørers 'Vis hold' knap ændret til 'Deltagerliste'. Søgefunktion udvidet til at inkludere ugedag og instruktørnavn. No-results tekst opdateret til at matche kravsspecifikationen. Tilmeldings-knap på ActivityDetailPage skjult for ikke-indloggede brugere. Knaptekst ændret fra 'Frameld' til 'Forlad'. Tilføjet aldersbegrænsning- og samme-ugedag-validering ved tilmelding. Nyhedsbrev, testimonials og kontaktformular forbundet til API. Cookies implementeret med 'Husk mig' funktion på LoginPage. Brugerrolle ændret fra 'member' til 'default' ved oprettelse. Alle CSS-stilarter gennemgået og fejl rettet (ProfilePage layout fikset til flexbox, responsiv bredde, fejlplacerede knapper). Footer med logo og adresse tilføjet på HomePage."
   
   -Username: user1 → user6, Password: 1234
  - Ages: user1=14, user2=17, user3=21, user4=24, user5=52, user6=51