// Fælles nyheder-feed for hjemmesiden.
//
// Henter tekstfiler (.md/.txt) fra /nyheder-mappen i repoet via GitHub's API
// og viser dem som rigtige indlæg direkte på siden. Ny nyhed = ny tekstfil i
// mappen, intet andet skal opdateres.
//
// Elementet der skal fyldes ud skal se sådan ud:
//   <div class="news-feed" id="nyheder-liste"></div>
// Sæt data-limit="5" på elementet for kun at vise de 5 seneste (bruges på
// forsiden) — udelad attributten (eller sæt den til 0) for at vise alle
// (bruges på arkivsiden). Sæt data-archive-link="/nyheder-arkiv" for at få
// et "Se alle nyheder"-link nederst, når der er flere nyheder end grænsen.
// Sæt data-collapse="true" for at vise hvert indlæg som en fold-ud-boks
// (kun titel + dato synlig, indtil man klikker).

(function () {
  const NEWS_API_URL = 'https://api.github.com/repos/christianthusgaard/bellingefaelledost/contents/nyheder';
  const MAANEDER = ['januar','februar','marts','april','maj','juni','juli','august','september','oktober','november','december'];
  const container = document.getElementById('nyheder-liste');
  if (!container) return;

  const limit = Number(container.dataset.limit || 0);
  const archiveLink = container.dataset.archiveLink || '';
  const collapse = container.dataset.collapse === 'true';

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(d) {
    return d.getDate() + '. ' + MAANEDER[d.getMonth()] + ' ' + d.getFullYear();
  }

  function toExcerpt(bodyHtml, maxLen) {
    const div = document.createElement('div');
    div.innerHTML = bodyHtml;
    const text = (div.textContent || '').replace(/\s+/g, ' ').trim();
    if (text.length <= maxLen) return text;
    return text.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
  }

  function toHtml(raw, baseUrl) {
    const html = window.marked && typeof window.marked.parse === 'function' ? window.marked.parse(raw)
      : window.marked ? window.marked(raw)
      : raw.split(/\n{2,}/).map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; }).join('');

    // Tillad simple, relative billed-navne i markdown (fx "billede.jpg"),
    // og gør dem automatisk om til det korrekte link til filen i repoet —
    // så man ikke skal skrive et langt teknisk link i teksten.
    return html.replace(/(<img[^>]+src=")([^"]+)(")/gi, function (m, pre, src, post) {
      if (/^(https?:)?\/\//i.test(src)) return pre + src + post;
      const resolved = baseUrl + src.split('/').map(encodeURIComponent).join('/');
      return pre + resolved + post;
    });
  }

  function folderUrl(fileUrl) {
    return fileUrl.slice(0, fileUrl.lastIndexOf('/') + 1);
  }

  function parseMeta(file) {
    if (file.type !== 'file') return null;
    if (/^readme\.md$/i.test(file.name)) return null;
    if (!/\.(md|txt)$/i.test(file.name)) return null;

    const withoutExt = file.name.replace(/\.[^./]+$/, '');
    const match = withoutExt.match(/^(\d{4})-(\d{2})-(\d{2})[\s_-]+(.+)$/);

    let dato = null;
    let titel = withoutExt;

    if (match) {
      const [, aar, mnd, dag, rest] = match;
      dato = new Date(Number(aar), Number(mnd) - 1, Number(dag));
      titel = rest;
    }

    titel = titel.replace(/[_-]+/g, ' ').trim();

    return { titel: titel, dato: dato, url: file.download_url };
  }

  fetch(NEWS_API_URL)
    .then(function (res) {
      if (res.status === 403 || res.status === 429) {
        throw new Error('rate-limit');
      }
      if (!res.ok) throw new Error('generic');
      return res.json();
    })
    .then(function (files) {
      let metas = files.map(parseMeta).filter(Boolean);

      metas.sort(function (a, b) {
        if (a.dato && b.dato) return b.dato - a.dato;
        if (a.dato) return -1;
        if (b.dato) return 1;
        return a.titel.localeCompare(b.titel, 'da');
      });

      if (metas.length === 0) {
        container.innerHTML = '<p class="news-empty">Der er endnu ikke lagt nyheder op.</p>';
        return;
      }

      const totalCount = metas.length;
      const vises = limit > 0 ? metas.slice(0, limit) : metas;

      return Promise.all(vises.map(function (item) {
        return fetch(item.url)
          .then(function (res) { return res.text(); })
          .then(function (raw) { item.bodyHtml = toHtml(raw, folderUrl(item.url)); return item; })
          .catch(function () { item.bodyHtml = '<p><em>Indholdet kunne ikke indlæses.</em></p>'; return item; });
      })).then(function (items) {
        let html = items.map(function (item) {
          const dateHtml = '<span class="news-date">' + (item.dato ? formatDate(item.dato) : '') + '</span>';

          if (collapse) {
            const excerpt = toExcerpt(item.bodyHtml, 140);
            return '<details class="news-post news-post--collapsible">' +
              '<summary>' + dateHtml + '<span class="news-title">' + escapeHtml(item.titel) + '</span>' +
              '<p class="news-excerpt">' + escapeHtml(excerpt) + '</p></summary>' +
              '<div class="news-body">' + item.bodyHtml + '</div>' +
            '</details>';
          }

          return '<article class="news-post">' +
            dateHtml +
            '<h3 class="news-title">' + escapeHtml(item.titel) + '</h3>' +
            '<div class="news-body">' + item.bodyHtml + '</div>' +
          '</article>';
        }).join('');

        if (archiveLink && limit > 0 && totalCount > limit) {
          html += '<a class="news-archive-link" href="' + archiveLink + '">Se alle nyheder (' + totalCount + ') &rarr;</a>';
        }

        container.innerHTML = html;
      });
    })
    .catch(function (err) {
      if (err && err.message === 'rate-limit') {
        container.innerHTML = '<p class="news-empty">Nyhederne kan ikke hentes lige nu, fordi der er kommet for mange forespørgsler på kort tid. Prøv igen om lidt.</p>';
      } else {
        container.innerHTML = '<p class="news-empty">Nyhederne kunne ikke indlæses lige nu. Prøv at genindlæse siden.</p>';
      }
    });
})();
