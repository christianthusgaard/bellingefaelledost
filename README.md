# Grundejerforeningen Bellinge Fælled Øst (Odense SV)

Dette repository indeholder kildekoden til den officielle, statiske hjemmeside for **Grundejerforeningen Bellinge Fælled Øst**. Hjemmesiden er opbygget i ren HTML/CSS og hostes direkte via GitHub Pages.

Projektet er fuldt optimeret til både traditionel søgemaskineoptimering (**SEO**) og AI-baserede søgninger (**GEO** - *Generative Engine Optimization*).

---

## 🌐 Live Website
Hjemmesiden kan besøges live på:  
👉 [https://christianthusgaard.github.io/bellingefaelledost/](https://christianthusgaard.github.io/bellingefaelledost/)

---

## 🛠️ Teknisk Struktur og Sider
Hjemmesiden benytter "Pretty URLs" (URL'er uden `.html`-endelse for et renere udtryk og bedre indeksering).

* **`index.html`** – Forsiden og introduktion til kvarterets bæredygtige DNA.
* **`foreningen`** – Landingsside om foreningens formalia, stamdata, bestyrelse, økonomi, lokalplan og vedtægter.
* **`grundejer`** – Information om grundejernes forpligtelser (snerydning, hækklipning, renholdelse) samt parkeringsregler i Odense Kommune.
* **`bellinge`** – Beskrivelse af lokalområdet Bellinge, herunder skoler, institutioner, fritidsfaciliteter og foreningsliv.

### SEO- & GEO-infrastruktur
* **`sitemap.xml`** – Dynamisk køreplan for søgemaskiner og AI-crawlere, der sikrer fuld indeksering af alle fire sider.
* **Schema-markup (JSON-LD)** – Strukturerede data indlejret i koden, der fodrer AI-sprogmodeller (ChatGPT, Gemini, Perplexity) med validerede foreningsdata (CVR, adresse, formand).

---

## 📄 Stamdata for Foreningen (2026)
Når der sker ændringer i foreningen, skal koden opdateres med udgangspunkt i følgende officielle data:
* **Navn:** Grundejerforeningen Bellinge Fælled Øst
* **CVR-nummer:** 41001429
* **Officiel adresse:** c/o Hjortetakken 47, 5250 Odense SV
* **Kontingent (2026):** 1.500 kr. årligt (Opkræves i maj / Reguleres på generalforsamling i april).
* **Lokalplan:** Reguleret under Odense Kommunes Lokalplan nr. 6-1034 (Etape 4).
* **Kontakt:** bestyrelsen5250@outlook.dk

---

## 🚀 Sådan opdaterer du hjemmesiden

### 1. Ret i eksisterende sider
Hvis du skal opdatere tekst, kontingentsatser eller bestyrelsesmedlemmer:
1. Klik på den specifikke fil her på GitHub (f.eks. `foreningen` eller `index.html`).
2. Klik på **blyant-ikonet** (*Edit this file*) øverst til højre.
3. Lav dine ændringer i HTML-koden.
4. Scroll ned til bunden, tilføj en kort beskrivelse af din ændring (f.eks. "Opdateret kontingent for 2026") under *Commit changes*, og klik på den grønne **Commit changes**-knap.

### 2. Tilføjelse af nye dokumenter (Referater/Vedtægter)
Hvis du vil linke til PDF-filer:
1. Upload PDF-filen til dit repository ved at vælge **Add file** -> **Upload files**.
2. Kopier filstien og indsæt den som et link i din HTML-kode på den relevante side:  
   `<a href="dit-dokument.pdf" target="_blank">Læs dokumentet her</a>`

---

## ⚖️ Lovgrundlag og Tilsyn på siden
Siden refererer direkte til gældende lovgivning for at sikre korrekt information til beboerne:
* **Vejlovens § 68** (Renholdelse, ukrudtsbekæmpelse og vedligeholdelse af private fællesveje).
* **Odense Kommunes Vinterregulativ** (Regler for snerydning i tidsrummet 07.00 - 22.00).
* **Odense Kommunes Parkeringsregulativ** (Særlige regler for tunge køretøjer og campingvogne i byzonen).
