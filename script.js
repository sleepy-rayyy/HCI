'use strict';

// Data source: map top 10 items to actual files in Trailer folder
// Titles based on filenames; you can reorder to preference.
const TOP10 = [
  { title: "Stranger Things 5", file: "Trailer/Stranger Things 5.mp4", desc: "The final chapter brings new mysteries, old foes, and a fight to end all fights in Hawkins.", genres: ["Sci‑Fi","Mystery","Thriller"], tag: "Most Viewed" },
  { title: "Avatar: Fire and Ash", file: "Trailer/Avatar Fire and Ash.mp4", desc: "Pandora faces a new elemental threat as ancient forces awaken beneath the surface.", genres: ["Sci‑Fi","Adventure"], tag: "Recommended" },
  { title: "Mortal Kombat 2", file: "Trailer/Mortal Combat 2.mp4", desc: "Champions return, alliances shift, and the Outworld tournament ignites once more.", genres: ["Action","Fantasy"], tag: "Most Viewed" },
  { title: "Five Nights at Freddy's 2", file: "Trailer/Five Nights at Freddy's 2.mp4", desc: "The pizzeria reopens with darker secrets—survive the night, again.", genres: ["Horror","Thriller"], tag: "Recommended" },
  { title: "IT: Welcome to Derry", file: "Trailer/IT Welcome to Derry.mp4", desc: "Before the Losers' Club, there was Derry—where nightmares found their home.", genres: ["Horror","Drama"], tag: "Most Viewed" },
  { title: "Now You See Me: Now You Don't", file: "Trailer/Now You See Me - Now You Don’t.mp4", desc: "The Horsemen pull their greatest illusion yet in a globe‑spanning heist.", genres: ["Crime","Thriller"], tag: "Recommended" },
  { title: "The Conjuring: Last Rites", file: "Trailer/The Conjuring Last Rites.mp4", desc: "The Warrens confront a malevolent force unlike anything they've seen.", genres: ["Horror","Supernatural"], tag: "Most Viewed" },
  { title: "Black Phone 2", file: "Trailer/Black Phone 2.mp4", desc: "A disturbing call from the past rings again—and the clock is ticking.", genres: ["Horror","Mystery"], tag: "Recommended" },
  { title: "The Nun II", file: "Trailer/THE NUN II.mp4", desc: "An unholy terror returns; faith and fear collide once more.", genres: ["Horror"], tag: "Most Viewed" },
  { title: "Final Destination: Bloodlines", file: "Trailer/Final Destination Bloodlines.mp4", desc: "You can't cheat Death—history repeats with blood‑curdling precision.", genres: ["Horror","Thriller"], tag: "Recommended" }
];

// Images for Top 10 posters aligned by index
const TOP10_IMAGES = [
  "Picture of Trailer/stranger 5.webp",
  "Picture of Trailer/AVATAR.jfif",
  "Picture of Trailer/mortal combat 2.jfif",
  "Picture of Trailer/Five nights at freddy 2.jfif",
  "Picture of Trailer/IT.jfif",
  "Picture of Trailer/now you see me.jfif",
  "Picture of Trailer/Conjuring.webp",
  "Picture of Trailer/BLACK PHONE 2.jfif",
  "Picture of Trailer/The nun 2.jfif",
  "Picture of Trailer/Final destination.jfif"
];

// Fallback titles for dynamic rows
const titles = [
  'Starlight Divide','Crimson Dunes','Echoes of Orion','Neon Abyss','Quantum Drift','Silent Meridian','Ashfall','Polar Night','Iron Veil','Hollow Tide','Vector','Afterglow','Midnight Relay','Red Circuit','Celestial','Overclock','Nebulae','Ghost Signal','Dark Current','Night Run','Zero Day','Prism','Low Orbit','Blackout','Vanguard'
];

// Poster palette and generator for Top 10 (SVG -> data URI)
const PALETTE = [
  ['#0ea5e9','#111827'],
  ['#e11d48','#111827'],
  ['#14b8a6','#0b1020'],
  ['#f59e0b','#1a0b12'],
  ['#6366f1','#0a0b0f']
];
function makePosterDataURI(title, rank, colors){
  const [c1,c2] = colors || ['#e50914','#111827'];
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='900' viewBox='0 0 600 900'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stop-color='${c1}'/>
          <stop offset='1' stop-color='${c2}'/>
        </linearGradient>
      </defs>
      <rect width='600' height='900' fill='url(#g)'/>
      <g fill='rgba(255,255,255,0.12)'>
        <rect x='40' y='60' width='520' height='780' rx='24'/>
      </g>
      <text x='50%' y='48%' text-anchor='middle' font-family='Inter,system-ui,Arial' font-size='220' font-weight='900' fill='rgba(255,255,255,0.25)'>#${rank}</text>
</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Specific Top 10 lists for sections
const MARVEL_TOP10 = [
  'Avengers: Infinity War',
  'Avengers: Endgame',
  'Captain America: Civil War',
  'Avengers: Age of Ultron',
  'The Avengers',
  'Black Panther',
  'Captain Marvel',
  'Doctor Strange',
  'Thor: Ragnarok',
  'Guardians of the Galaxy'
];

// Image files aligned to MARVEL_TOP10 order
const MARVEL_IMAGES = [
  'Marvels/Infinity war.jfif',
  'Marvels/Endgame.jfif',
  'Marvels/CIVIL WAR.jfif',
  'Marvels/Age of Ultron.jfif',
  'Marvels/The Avengers.jfif',
  'Marvels/Black Panther.jfif',
  'Marvels/Captain Marvel.jfif',
  'Marvels/Doctor Strange.jfif',
  'Marvels/Thor.jfif',
  'Marvels/Guardians of the Galaxy.jfif'
];

const POPULAR_TOP10 = [
  'Wednesday',
  'The Last Goodbye',
  'K-Pop Demon Hunter',
  'Seven Sundays',
  'Stranger Things',
  'Maria Clara at Ibarra',
  "It's Okay to Not Be Okay",
  'All of Us Are Dead',
  'My Demon',
  'Un/Happy For You'
];

// Image files aligned to POPULAR_TOP10 order (fallback used if missing)
const POPULAR_IMAGES = [
  'Popular/Wednesday.jfif',
  'Popular/The Last Goodbye.jpg',
  'Popular/K-Pop Demon Hunte.jfif',
  'Popular/Seven Sundays.jfif',
  'Popular/Stranger Things.jfif',
  'Popular/Maria Clara at Ibarra.webp',
  "Popular/It's Okay to Not Be Okay.jfif",
  'Popular/All of Us Are Dead.jfif',
  'Popular/My Demon.jfif',
  'Popular/Un Happy For You.webp'
];

function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

// Populate generic content rows (placeholder posters with titles)
function populateRows(count = 18) {
  $all('[data-scroller]').forEach(scroller => {
    const section = scroller.closest('.section');
    const h2 = section ? section.querySelector('h2') : null;
    const name = h2 ? h2.textContent.trim() : '';
    // Skip specific sections we populate manually
    if (name === 'Trending Now' || name === 'Popular on Netflix') return;
    scroller.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const title = titles[(i + Math.floor(Math.random()*titles.length)) % titles.length];
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="poster">
          <span class="badge">TOP ${1 + (i % 10)}</span>
          <div class="title">${title}</div>
        </div>
        <div class="actions">
          <button class="icon-btn" title="Play" aria-label="Play">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <button class="icon-btn" title="Add to My List" aria-label="Add to My List">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      `;
      scroller.appendChild(card);
    }
  });
}

// Populate Top 10 trailer row with clickable thumbnail cards (no autoplay), include rank and title
function populateTop10() {
  const scroller = $('[data-scroller-top10]');
  if (!scroller) return;
  scroller.innerHTML = '';
  TOP10.forEach((item, idx) => {
    const imgSrc = TOP10_IMAGES[idx] || makePosterDataURI(item.title, idx+1, PALETTE[idx % PALETTE.length]);
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="poster" data-trailer-index="${idx}" role="button" tabindex="0" aria-label="Play ${item.title} trailer">
        <img class="thumb" alt="${item.title} poster" src="${imgSrc}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"/>
        <span class="badge">TOP ${idx+1}</span>
        <div class="title">${item.title}</div>
      </div>
      <div class="actions">
        <button class="icon-btn" title="Play Trailer" aria-label="Play Trailer" data-play-index="${idx}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
    `;
    scroller.appendChild(card);
  });
}

// Helpers to locate and populate specific section rows
function findSectionScrollerByTitle(title) {
  const sect = $all('.section').find(s => {
    const h2 = s.querySelector('h2');
    return h2 && h2.textContent.trim().toLowerCase() === title.trim().toLowerCase();
  });
  return sect ? sect.querySelector('[data-scroller]') : null;
}

function populateNamedList(scroller, list, images) {
  if (!scroller) return;
  scroller.innerHTML = '';
  list.slice(0, 10).forEach((title, idx) => {
    const card = document.createElement('article');
    card.className = 'card';
    const fallback = makePosterDataURI(title, idx+1, PALETTE[idx % PALETTE.length]);
    const imgSrc = images && images[idx] ? images[idx] : fallback;
    card.innerHTML = `
      <div class="poster">
        <img class="thumb" alt="${title} poster" src="${imgSrc}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"/>
        <span class="badge">TOP ${idx+1}</span>
        <div class="title">${title}</div>
      </div>
      <div class="actions">
        <button class="icon-btn" title="Add to My List" aria-label="Add to My List">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>`;
    scroller.appendChild(card);
  });
}

// Basic auto-slide for Top 10 scroller (no video autoplay). It scrolls horizontally like a slideshow.
function setupAutoSlide() {
  const scroller = $('#top10-scroller');
  if (!scroller) return;
  let dir = 1;
  function step() {
    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const atEnd = Math.abs(scroller.scrollLeft - maxScroll) < 2;
    const atStart = scroller.scrollLeft <= 2;
    if (atEnd) dir = -1;
    if (atStart) dir = 1;
    scroller.scrollBy({ left: dir * Math.max(1, Math.round(scroller.clientWidth * 0.01)), behavior: 'smooth' });
  }
  // Slide every 2 seconds to next chunk
  return setInterval(step, 2000);
}

// Ripple on buttons
function setupRipples() {
  $all('[data-ripple]').forEach(btn => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.querySelector('.r');
      if (!r) return;
      const rect = btn.getBoundingClientRect();
      r.style.setProperty('--x', (e.clientX - rect.left) + 'px');
      r.style.setProperty('--y', (e.clientY - rect.top) + 'px');
    });
  });
}

// Tilt and parallax glow on cards
function setupCardTilt() {
  const damp = (v, f=6) => Math.round(v / f) * f;
  $all('.card').forEach(card => {
    const poster = card.querySelector('.poster');
    if (!poster) return;
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = damp(((y / r.height) - .5) * -12);
      const ry = damp(((x / r.width) - .5) * 12);
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0) scale(1.02)`;
      poster.style.setProperty('--mx', (x / r.width * 100) + '%');
      poster.style.setProperty('--my', (y / r.height * 100) + '%');
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
      poster.style.removeProperty('--mx');
      poster.style.removeProperty('--my');
    });
  });
}

// Row navigation buttons
function setupRowNav() {
  $all('.row').forEach(row => {
    const scroller = row.querySelector('[data-scroller], [data-scroller-top10]');
    const prev = row.querySelector('[data-prev]');
    const next = row.querySelector('[data-next]');
    if (!scroller || !prev || !next) return;
    const step = () => Math.max(280, Math.floor(scroller.clientWidth * 0.9));
    prev.addEventListener('click', () => scroller.scrollBy({left: -step(), behavior: 'smooth'}));
    next.addEventListener('click', () => scroller.scrollBy({left: step(), behavior: 'smooth'}));
  });
}

// Intersection-based reveal
function setupReveal() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) e.target.classList.add('on');
    }
  }, { threshold: 0.12 });
  $all('.reveal').forEach(el => io.observe(el));
}

// Trailer modal
function setupTrailerModal() {
  const modal = $('#trailer-modal');
  const video = $('#modal-video');
  const title = $('#modal-title');
  const desc = $('#modal-desc');
  const btnClose = $('#modal-close');
  const modalInfo = modal.querySelector('.modal-info');
  let genreEl = $('#modal-genre');
  let tagEl = $('#modal-tag');
  let posterEl = $('#modal-poster');
  if (!genreEl && modalInfo) {
    const meta = document.createElement('div');
    meta.className = 'meta-line';
    meta.style.cssText = 'display:flex;gap:8px;align-items:center;margin:6px 0 8px;';
    genreEl = document.createElement('span');
    genreEl.id = 'modal-genre';
    genreEl.className = 'chip';
    genreEl.style.cssText = 'display:inline-flex;align-items:center;padding:4px 8px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(0,0,0,.35);font-size:12px;';
    tagEl = document.createElement('span');
    tagEl.id = 'modal-tag';
    tagEl.className = 'chip accent';
    tagEl.style.cssText = 'display:none;align-items:center;padding:4px 8px;border:1px solid rgba(229,9,20,.55);border-radius:999px;background:rgba(229,9,20,.25);font-size:12px;font-weight:700;';
    meta.appendChild(genreEl);
    meta.appendChild(tagEl);
    const descNode = $('#modal-desc');
    if (descNode) {
      modalInfo.insertBefore(meta, descNode);
    } else {
      modalInfo.appendChild(meta);
    }
  }
  if (!posterEl && modalInfo) {
    posterEl = document.createElement('img');
    posterEl.id = 'modal-poster';
    posterEl.alt = '';
    posterEl.style.cssText = 'position:absolute;right:14px;bottom:14px;width:110px;border-radius:10px;border:1px solid rgba(255,255,255,.18);box-shadow:0 10px 22px rgba(0,0,0,.5)';
    modalInfo.appendChild(posterEl);
  }
  if (!modal || !video) return;
  if (btnClose) { btnClose.style.zIndex = '10'; }
  // Toggle poster visibility based on video state
  if (!video.__posterBound) {
    const hidePoster = () => { if (posterEl) posterEl.style.display = 'none'; };
    video.addEventListener('play', hidePoster);
    video.addEventListener('pause', hidePoster);
    video.addEventListener('ended', hidePoster);
    video.__posterBound = true;
  }

  function open(index) {
    const item = TOP10[index];
    if (!item) return;
    title.textContent = item.title;
    desc.textContent = item.desc;
    if (genreEl) { genreEl.textContent = Array.isArray(item.genres) ? item.genres.join(' • ') : (item.genre || ''); }
    if (tagEl) { if (item.tag) { tagEl.textContent = item.tag; tagEl.style.display = 'inline-flex'; } else { tagEl.textContent = ''; tagEl.style.display = 'none'; } }
    if (posterEl) {
      posterEl.src = makePosterDataURI(item.title, index+1, PALETTE[index % PALETTE.length]);
      posterEl.alt = item.title + ' poster';
      posterEl.style.display = '';
    }
    video.src = item.file;
    modal.classList.add('on');
    modal.setAttribute('aria-hidden', 'false');
    video.currentTime = 0;
    video.play().catch(() => {/* likely blocked; user will click play */});
  }

  function close() {
    modal.classList.remove('on');
    modal.setAttribute('aria-hidden', 'true');
    video.pause();
    video.removeAttribute('src');
    video.load();
  }

  btnClose && btnClose.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // Bind top10 items (play button and poster click)
  function bindTop10Triggers(root=document) {
    $all('[data-play-index]', root).forEach(btn => {
      if (btn.__bound) return;
      btn.__bound = true;
      btn.addEventListener('click', () => open(parseInt(btn.getAttribute('data-play-index'))));
    });
    $all('[data-trailer-index]', root).forEach(el => {
      if (el.__bound) return;
      el.__bound = true;
      const handler = () => open(parseInt(el.getAttribute('data-trailer-index')));
      el.addEventListener('click', handler);
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
    });
  }
  bindTop10Triggers();

  // Rebind on dynamic content changes
  const mo = new MutationObserver((muts) => {
    muts.forEach(m => bindTop10Triggers(m.target));
  });
  mo.observe(document.body, { subtree: true, childList: true });

  return { open, close };
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  populateTop10();
  populateRows(20);

  // Populate specific Top 10 lists for sections
  const trendingScroller = findSectionScrollerByTitle('Trending Now');
  populateNamedList(trendingScroller, MARVEL_TOP10, MARVEL_IMAGES);
  const popularScroller = findSectionScrollerByTitle('Popular on Netflix');
  populateNamedList(popularScroller, POPULAR_TOP10, POPULAR_IMAGES);

  setupRipples();
  setupRowNav();
  setupCardTilt();
  setupReveal();
  setupTrailerModal();

  // Autoslide for Top10
  setupAutoSlide();
});

// Re-setup tilt upon resize (debounced)
window.addEventListener('resize', () => {
  clearTimeout(window.__tiltRaf);
  window.__tiltRaf = setTimeout(() => {
    setupCardTilt();
  }, 120);
});


