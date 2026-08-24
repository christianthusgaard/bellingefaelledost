// Fælles navigation for hele hjemmesiden.
//
// Alle sider har et tomt <nav data-site-nav></nav>-element, som denne fil
// fylder ud ved sidens load. Skal du tilføje, fjerne eller omdøbe et
// menupunkt, gør du det ÉT sted her — ikke i hver enkelt HTML-fil.
//
// Anker-links (som peger ind på en sektion på forsiden, fx "#nyheder")
// skrives altid med fuld sti ("/#nyheder"), så de virker ens uanset
// hvilken side man klikker fra.

(function () {
  var LINKS = [
    { path: '/', label: 'Forside' },
    { path: '/foreningen', label: 'Foreningen' },
    { path: '/grundejer', label: 'Grundejers Forpligtelser' },
    { path: '/bellinge', label: 'Området' },
    { path: '/bestyrelsen', label: 'Bestyrelsens arbejde' },
    { path: '/#kontakt', label: 'Kontakt' }
  ];

  function currentPath() {
    var p = window.location.pathname.replace(/\/index\.html$/, '');
    if (p.length > 1 && p.charAt(p.length - 1) === '/') p = p.slice(0, -1);
    return p === '' ? '/' : p;
  }

  var here = currentPath();

  document.querySelectorAll('nav[data-site-nav]').forEach(function (nav) {
    nav.innerHTML = LINKS.map(function (link) {
      var isAnchor = link.path.indexOf('#') !== -1;
      var isActive = !isAnchor && link.path === here;
      return '<a href="' + link.path + '"' + (isActive ? ' class="active"' : '') + '>' + link.label + '</a>';
    }).join('');
  });
})();
