# Teknisk Dokumentation – Landrup Dans

---

## React

**React** er et JavaScript-bibliotek til at bygge brugergrænseflader. Det er komponent-baseret, hvilket betyder, at man opdeler sin applikation i små, genbrugelige stykker kode kaldet komponenter. Hvert komponent har sit eget ansvar og kan genbruges på tværs af applikationen.

React bruger **JSX** – en syntaks, der blander HTML og JavaScript, så man kan beskrive brugergrænsefladen direkte i koden. React opdaterer kun de dele af siden, der har ændret sig, takket være en virtuel DOM.

Jeg har valgt React, fordi det er et meget udbredt bibliotek med et stort community og god dokumentation. Det giver mig friheden til selv at vælge, hvordan jeg vil strukturere min applikation, og det er velegnet til at bygge single-page applications (SPA) som dette projekt.

---

## Vite

**Vite** er et build-værktøj og udviklingsserver til moderne JavaScript-projekter. Det giver en meget hurtig opstartstid og hot module replacement (HMR), som betyder, at siden opdateres øjeblikkeligt i browseren, når man ændrer i koden, uden at genindlæse siden.

I dette projekt bruges Vite som erstatning for den ældre Create React App. Jeg starter projektet med kommandoen `npm run dev`, som starter Vites udviklingsserver.

---

## React Router

**React Router** er et bibliotek til klient-baseret routing i React. Da React i sig selv ikke har et routingsystem, bruges React Router til at styre, hvilken side der vises ud fra URL-stien.

I projektet er routing sat op i [App.jsx](landrup-dans-frontend/src/App.jsx):

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<IntroPage />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/aktiviteter" element={<ActivitiesPage />} />
    <Route path="/aktiviteter/:id" element={<ActivityDetailPage />} />
    <Route path="/profil" element={<ProfilePage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</BrowserRouter>
```

Routeren er **klient-baseret**, hvilket betyder, at det er browseren (ikke serveren), der håndterer skift mellem sider. Det giver en hurtig og flydende brugeroplevelse uden fuldstændige genindlæsninger.

---

## Web API – Fetch API

Et **web API** (Application Programming Interface) er et sæt regler for, hvordan to systemer kommunikerer med hinanden over netværket. I dette projekt kommunikerer frontenden med en Express.js backend via HTTP-requests.

Til at sende disse requests bruges browserens indbyggede **Fetch API**. Alle API-kald er samlet i [services/api.js](landrup-dans-frontend/src/services/api.js), som fungerer som et centralt servicelag.

Backenden kører på `http://localhost:4000` og eksponerer endpoints som:

| Method | Endpoint | Beskrivelse |
|--------|----------|-------------|
| GET | `/api/v1/activities` | Hent alle aktiviteter |
| GET | `/api/v1/activities/:id` | Hent én aktivitet |
| POST | `/api/v1/activities/:id/roster/:userId` | Tilmeld bruger |
| DELETE | `/api/v1/activities/:id/roster/:userId` | Frameld bruger |
| POST | `/auth/token` | Login og få JWT-token |

---

## CSS

Til styling bruges **vanilla CSS** med komponent-specifikke filer. Hvert komponent og hver side har sin egen `.css`-fil, som importeres direkte i komponenten:

```jsx
import './ActivitiesPage.css';
```

Dette sikrer, at stilarter er tæt knyttet til det komponent, de tilhører, og gør det nemmere at overskue og vedligeholde koden. Der er sat en global reset i `index.css`, der fjerner standard margin og padding fra alle elementer:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

---

## Kodeeksempel

[landrup-dans-frontend/src/services/api.js – linje 76-94](landrup-dans-frontend/src/services/api.js#L76)

```js
export const enrollInActivity = async (activityId, userId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/activities/${activityId}/roster/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Kunne ikke tilmelde til aktivitet');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fejl ved tilmelding til aktivitet:', error);
    throw error;
  }
};
```

**(Hvad er det?)** `enrollInActivity` er en asynkron funktion, der eksporteres fra servicelagets API-fil. Den tager tre parametre: `activityId`, `userId` og `token`.

**(Hvad er formålet?)** Formålet er at tilmelde en bruger til en specifik aktivitet ved at sende en HTTP-request til backenden. Resultatet returneres til den komponent, som kalder funktionen.

**(Hvordan sker det?)** Funktionen bruger det indbyggede `fetch`-API til at lave en `POST`-request til endpointet `/activities/:activityId/roster/:userId`. I request-headeren sendes brugerens JWT-token som en `Bearer`-token i `Authorization`-feltet, så backenden kan verificere, at brugeren er logget ind og har ret til at tilmelde sig. Funktionen er pakket i en `try/catch`-blok for at håndtere fejl, og der er en guard clause med `response.ok`, som kaster en fejl, hvis serveren returnerer en fejlkode.

---

### Dybdegående: `Authorization: Bearer ${token}`

Linjen `'Authorization': \`Bearer ${token}\`` er en del af HTTP-headeren og er central for sikkerheden i applikationen.

Når en bruger logger ind via `loginUser()`, returnerer backenden et **JWT (JSON Web Token)** – en krypteret streng, som indeholder information om brugeren (fx bruger-id og rolle). Dette token gemmes i browserens `localStorage`:

```js
localStorage.setItem('token', data.token);
```

Hver gang en beskyttet handling skal udføres – som tilmelding til et hold – hentes tokenet fra `localStorage` og sendes med i requestens header. Formatet `Bearer <token>` er en HTTP-autentificeringsstandard. Backenden modtager tokenet, verificerer det med sin hemmelige nøgle (`JWT_SECRET`), og giver kun adgang, hvis tokenet er gyldigt og ikke udløbet.

Uden et gyldigt token returnerer backenden statuskode `401 Unauthorized` eller `403 Forbidden`, og handlingen afvises. Dette sikrer, at kun indloggede brugere kan tilmelde sig aktiviteter.

---

## Perspektivering

I udviklingsprocessen har jeg lagt vægt på følgende principper:

**Kodestruktur**
Projektet er opdelt i klare lag: sider (`pages/`), genbrugelige komponenter (`components/`) og API-kald (`services/api.js`). Dette gør det nemmere at finde og vedligeholde koden, da hvert lag har ét tydeligt ansvar.

**Små, genbrugelige komponenter og funktioner**
Ved at lave komponenter som `HoldtypeCard`, `Header` og `Footer` undgår jeg at gentage den samme kode på tværs af sider. På samme måde er alle API-funktioner samlet i ét servicelag, så de kan genbruges fra hvilken som helst side i applikationen.

**Navngivningskonventioner**
Komponentfiler er navngivet med PascalCase (`ActivityDetailPage.jsx`), mens CSS-klasser er navngivet med kebab-case (`kalender-kort`, `holdtype-card`). Funktioner er navngivet beskrivende med camelCase (`enrollInActivity`, `getUserWithActivities`), så det er tydeligt, hvad de gør, uden at man behøver at læse implementationen.

**Platform til produktionsmiljøet**
Projektet kan bygges til produktion med kommandoen `npm run build`, som Vite bruger til at kompilere og optimere koden. Frontenden kan deployes til statiske hosting-platforme som **Vercel** eller **Netlify**, mens backenden (Express.js) kan deployes til serverplatforme som **Railway** eller **Render**. Databasen (SQLite) ville i et rigtigt produktionsmiljø blive erstattet af en mere skalerbar løsning som **PostgreSQL**.
