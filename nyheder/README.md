# Nyheder-mappe

Tekstfiler i denne mappe vises automatisk som rigtige nyhedsindlæg på forsiden — teksten vises direkte på hjemmesiden, nyeste øverst. Det sker helt automatisk, så snart filen er lagt op her; ingen andre steder skal opdateres.

**Bemærk:** Det er kun `.md`- og `.txt`-filer, der vises. Andre filtyper (fx PDF, Word) i denne mappe bliver ignoreret af hjemmesiden.

## Sådan skriver du en nyhed

1. Klik **"Add file" → "Create new file"** øverst i denne mappe på GitHub (ikke "Upload files" — du skal skrive direkte i browseren, ikke uploade et dokument).
2. Navngiv filen med **dato foran**, i formatet:

   ```
   ÅÅÅÅ-MM-DD Kort titel.md
   ```

   Eksempel: `2026-08-24 Ny legeplads sat i gang.md`

3. Skriv nyhedsteksten i tekstfeltet. Almindelig tekst med tomme linjer mellem afsnit er nok — det bliver vist pænt som rigtige afsnit. Du kan også bruge simpel formatering hvis du vil:

   ```
   **fed tekst**
   [et link](https://example.com)
   - punktopstilling
   ```

   Skriv IKKE titlen igen øverst i selve teksten — den bliver allerede vist ud fra filnavnet.

4. Scroll ned, skriv en kort commit-besked og klik **"Commit changes"** (direkte til `main`).

Nyheden dukker op øverst på forsiden, så snart nogen indlæser siden bagefter.
