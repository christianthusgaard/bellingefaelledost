// Beskytter mail-adresser og telefonnumre mod simple scrapere ved at
// bygge dem sammen med JavaScript, når siden indlæses, i stedet for at
// skrive dem direkte i HTML-koden. De fleste spam-scrapere læser bare
// den rå HTML og leder efter "mailto:"-mønstre — de ser aldrig en
// rigtig adresse her. Rigtige besøgende ser det som normalt, med det
// samme siden loader.
//
// Bemærk: Dette stopper almindelige bulk-scrapere, men er ikke 100%
// vandtæt mod avancerede scrapere, der selv kører JavaScript. Der
// findes ingen fuldstændig løsning, så længe informationen skal kunne
// læses af rigtige besøgende.
//
// Brug:
//   E-mail: <a class="js-mail" data-user="navn" data-domain="eksempel.dk"></a>
//   Telefon: <a class="js-tel" data-tel="12345678" data-display="12 34 56 78"></a>

(function () {
  document.querySelectorAll('.js-mail').forEach(function (el) {
    var addr = el.dataset.user + '@' + el.dataset.domain;
    el.href = 'mailto:' + addr;
    el.textContent = addr;
  });

  document.querySelectorAll('.js-tel').forEach(function (el) {
    el.href = 'tel:+45' + el.dataset.tel;
    el.textContent = 'Tlf.: ' + (el.dataset.display || el.dataset.tel);
  });
})();
