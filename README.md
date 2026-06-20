# VvE Meander1 webapp

Moderne PWA voor VvE Meander1 met publieke website en beveiligde bewonersomgeving.

## Inhoud

- Publieke pagina's: home, over, nieuws, contact, parkeergarage, Parqy, historie, FAQ, inloggen
- Loginomgeving voor bewoners/eigenaren
- Rollen: `admin`, `bestuur`, `bewoner`
- Besloten onderdelen: nieuws, documenten, ALV-informatie, notulen, reglement, onderhoudsmeldingen, mededelingen, downloads, profiel
- Beheerfunctionaliteit voor admin/bestuur (nieuws, documenten, gebruikers, categorieën)
- Zoekfunctie op nieuws/documenten + filter op documentcategorie
- Dashboard met laatste nieuws en documenten
- Veilige backend met JWT, validatie, RBAC en afgeschermde privébestanden

## Tech stack

- Frontend: React + Vite + React Router + PWA plugin
- Backend: Node.js + Express
- Database: MySQL/MariaDB

## Mappen

- `/frontend` React PWA
- `/backend` Express API
- `/database/schema.sql` database + seed-data

## Installatie

### 1) Database

Voer SQL uit:

```bash
mysql -u root -p < /absolute/path/naar/database/schema.sql
```

### 2) Backend

```bash
cd /home/runner/work/tech-nl-VvE-meander1/tech-nl-VvE-meander1/backend
cp .env.example .env
npm install
npm run start
```

API draait standaard op `http://localhost:4000`.

### 3) Frontend

```bash
cd /home/runner/work/tech-nl-VvE-meander1/tech-nl-VvE-meander1/frontend
cp .env.example .env
npm install
npm run dev
```

Frontend draait standaard op `http://localhost:5173`.

## Voorbeeldaccounts (seed)

- admin: `admin@meander1.nl` / `Admin123!`
- bestuur: `bestuur@meander1.nl` / `Bestuur123!`
- bewoner: `bewoner@meander1.nl` / `Bewoner123!`

## Scripts

### Frontend

- `npm run dev`
- `npm run lint`
- `npm run build`

### Backend

- `npm run start`
- `npm run dev`
- `npm test`

## Veiligheid

- bcrypt password hashing
- JWT-authenticatie
- role-based access control
- inputvalidatie (`express-validator`)
- veilige upload met MIME/type + bestandsgrootte limiet
- privébestanden alleen via beveiligde download-route
- foutmeldingen zonder gevoelige details
