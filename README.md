# Qnapper Huiswerkbegeleiding

Responsive one-page website op basis van de aangeleverde Qnapper-pdf.

## Lokaal openen

Dubbelklik op `start.command`. De eerste keer worden de benodigde pakketten geïnstalleerd. Daarna opent de website automatisch op `http://127.0.0.1:5173`.

Handmatig starten kan ook:

```bash
cd /Users/m/Desktop/qnapper-website
npm install
npm run dev
```

## Inhoud en assets

- Alle zichtbare teksten zijn gebaseerd op `Qnapper_huiswerkbegeleiding_Plesk_AI.pdf`.
- Het aangeleverde horizontale Qnapper-logo staat lokaal met transparante achtergrond in `public/assets` en wordt in de bovenbalk gebruikt.
- De drie leerlingbeelden zijn speciaal voor deze website gegenereerd en lokaal opgeslagen.
- Het contactformulier gebruikt op Plesk `public/api/contact.php` en bezorgt aanvragen bij `info@qnapper.nl`.
- De PHP-mailhandler gebruikt de lokale mailvoorziening van Plesk. Er staat geen mailboxwachtwoord in de openbare repository.

## Publicatie

Een push naar `main` bouwt automatisch GitHub Pages en werkt daarnaast de kant-en-klare `plesk`-branch bij. Plesk moet de document root publiceren vanuit die `plesk`-branch, zodat ook `api/contact.php` beschikbaar is.
