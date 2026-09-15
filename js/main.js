/* CHAMBERS REAL ESTATE — shared front-end behaviour */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initWaFloat();
});

/* ---------- Navigation ---------- */
function initNav(){
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".nav-burger");
  const links = document.querySelector(".nav-links");
  const scrim = document.querySelector(".nav-scrim");

  const onScroll = () => {
    if(!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive:true });

  if(burger && links){
    const toggle = () => {
      const open = links.classList.toggle("open");
      burger.classList.toggle("open", open);
      scrim && scrim.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", toggle);
    scrim && scrim.addEventListener("click", toggle);
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      links.classList.remove("open"); burger.classList.remove("open");
      scrim && scrim.classList.remove("open");
      document.body.style.overflow = "";
    }));
  }

  // mark active link
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a[data-nav]").forEach(a => {
    if(a.getAttribute("data-nav") === path) a.classList.add("active");
  });
}

/* ---------- Scroll reveal (single subtle pattern) ---------- */
function initReveal(){
  const items = document.querySelectorAll(".reveal:not(.in)");
  if(!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold:.12 });
  items.forEach(el => io.observe(el));
}

/* ---------- WhatsApp floating button ---------- */
function initWaFloat(){
  const el = document.querySelector(".wa-float");
  if(el) el.setAttribute("href", waLink(`Hello Chambers Real Estate, I'd like to speak with someone about a property.`));
}

/* ---------- Rendering: property cards ---------- */
function propertyCardHTML(p){
  const statusClass = (p.availability || "").toLowerCase().replace(/\s+/g,"-");
  return `
  <article class="p-card reveal">
    <a href="property.html?id=${p.id}" class="p-media" aria-label="View ${p.name}">
      <img src="${p.image}" alt="${p.name}, ${p.type} in ${p.location}" loading="lazy">
      <div class="p-badges">
        <span class="tag">${p.purpose}</span>
        <span class="tag status-${statusClass}">${p.availability}</span>
      </div>
      <div class="p-price-tag">${p.price}${p.priceSub ? " · " + p.priceSub : ""}</div>
    </a>
    <div class="p-body">
      <div class="p-type">${p.type}</div>
      <h3 class="p-name"><a href="property.html?id=${p.id}">${p.name}</a></h3>
      <div class="p-loc">${pinIcon()} ${p.location}</div>
      ${p.negotiable ? `<span class="negotiable-tag">Negotiable</span>` : ""}
      <div class="p-meta">
        ${p.bedrooms ? `<span>${bedIcon()} ${p.bedrooms} Beds</span>` : ""}
        ${p.bathrooms ? `<span>${bathIcon()} ${p.bathrooms} Baths</span>` : ""}
        ${p.parking ? `<span>${carIcon()} ${p.parking} Parking</span>` : ""}
        ${p.size ? `<span>${sizeIcon()} ${p.size}</span>` : ""}
      </div>
      <div class="p-actions">
        <a class="btn btn-ghost btn-sm" href="property.html?id=${p.id}">View property</a>
        <a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="${waPropertyLink(p.name)}">WhatsApp</a>
      </div>
    </div>
  </article>`;
}

function renderProperties(targetSelector, list){
  const el = document.querySelector(targetSelector);
  if(!el) return;
  if(!list.length){
    el.innerHTML = `<div class="empty-state">No properties match these filters yet. Try adjusting your search.</div>`;
    return;
  }
  el.innerHTML = list.map(propertyCardHTML).join("");
  initReveal();
}

/* ---------- Rendering: development cards ---------- */
function developmentCardHTML(d){
  return `
  <a href="development.html?id=${d.id}" class="dev-card reveal">
    <div class="dev-media"><img src="${d.image}" alt="${d.name}, development in ${d.location}" loading="lazy"></div>
    <div class="dev-info">
      <span class="dev-status">${d.status}</span>
      <h3>${d.name}</h3>
      <div class="loc">${d.location}</div>
      <span class="btn btn-ghost btn-sm">View project</span>
    </div>
  </a>`;
}
function renderDevelopments(targetSelector, list){
  const el = document.querySelector(targetSelector);
  if(!el) return;
  if(!list.length){
    el.innerHTML = `<div class="empty-state">No developments listed yet. Check back soon.</div>`;
    return;
  }
  el.innerHTML = list.map(developmentCardHTML).join("");
  initReveal();
}

/* ---------- Icons (inline, no external icon library) ---------- */
function pinIcon(){ return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg>`; }
function bedIcon(){ return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 19v-5.5A1.5 1.5 0 0 1 4 12h16a1.5 1.5 0 0 1 1.5 1.5V19"/><path d="M2.5 19v2M21.5 19v2M2.5 12V8.5A1.5 1.5 0 0 1 4 7h4a1.5 1.5 0 0 1 1.5 1.5V12"/></svg>`; }
function bathIcon(){ return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16v2A5.5 5.5 0 0 1 14.5 19.5h-5A5.5 5.5 0 0 1 4 14V12Z"/><path d="M7 12V7.6A2.1 2.1 0 0 1 10.4 6"/></svg>`; }
function sizeIcon(){ return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8V3h5M21 8V3h-5M3 16v5h5M21 16v5h-5"/></svg>`; }
function carIcon(){ return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11 6.3 6.9A2 2 0 0 1 8.2 5.5h7.6a2 2 0 0 1 1.9 1.4L19 11"/><rect x="2.5" y="11" width="19" height="5.5" rx="2"/><circle cx="7" cy="17" r="1.3"/><circle cx="17" cy="17" r="1.3"/></svg>`; }
function flagIcon(){ return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 21V3.5"/><path d="M5.5 4.5h11.3l-2.7 3.7 2.7 3.7H5.5"/></svg>`; }
function buildingIcon(){ return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16"/><path d="M12 10.5h6.5a1 1 0 0 1 1 1V21"/><path d="M7 7.5h1M7 10.5h1M7 13.5h1M7 16.5h1M15 13.5h1M15 16.5h1"/></svg>`; }
function toiletIcon(){ return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 10V5.5A2.5 2.5 0 0 1 9 3h1a2.5 2.5 0 0 1 2.5 2.5V10"/><path d="M4.5 10h11a1 1 0 0 1 1 1.2l-.9 4.6a3 3 0 0 1-2.94 2.4h-4.32a3 3 0 0 1-2.94-2.4l-.9-4.6A1 1 0 0 1 4.5 10Z"/><path d="M8.5 21v-2.8M11.5 21v-2.8"/></svg>`; }
function tagIcon(){ return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m20.6 12.9-7.7 7.7a2 2 0 0 1-2.8 0l-6.7-6.7a2 2 0 0 1-.6-1.4V5.5a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l6.7 6.7a2 2 0 0 1 0 2.1Z"/><circle cx="8" cy="8" r="1.2"/></svg>`; }
function checkIcon(){ return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.3 2.4 2.4 4.8-4.8"/></svg>`; }
function galleryIcon(){ return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10.5" r="1.5"/><path d="m21 15-5-5-9 9"/></svg>`; }

/* ---------- Property photo lightbox ---------- */
let _lbImages = [];
let _lbIndex = 0;
function initLightbox(images, name){
  _lbImages = images;
  _lbIndex = 0;
  document.getElementById("lightbox-img").alt = name + " photo";
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev").addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lightbox-next").addEventListener("click", () => stepLightbox(1));
  document.getElementById("lightbox").addEventListener("click", (e) => { if(e.target.id === "lightbox") closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if(!document.getElementById("lightbox").classList.contains("open")) return;
    if(e.key === "Escape") closeLightbox();
    if(e.key === "ArrowLeft") stepLightbox(-1);
    if(e.key === "ArrowRight") stepLightbox(1);
  });
}
function openLightbox(index){
  _lbIndex = index;
  renderLightbox();
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox(){
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}
function stepLightbox(dir){
  _lbIndex = (_lbIndex + dir + _lbImages.length) % _lbImages.length;
  renderLightbox();
}
function renderLightbox(){
  document.getElementById("lightbox-img").src = _lbImages[_lbIndex];
  document.getElementById("lightbox-count").textContent = `${_lbIndex + 1} / ${_lbImages.length}`;
}

/* ---------- Category cards (browse by property type) ---------- */
function categoryIconFor(type){
  const icons = {
    Apartment: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16"/><path d="M12 9.5h7a1 1 0 0 1 1 1V21"/><path d="M7 7.5h1M7 10.5h1M7 13.5h1M7 16.5h1M15.5 13h1M15.5 16.5h1"/></svg>`,
    House: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12 12 4.7 20.5 12"/><path d="M6 10.3V19a1 1 0 0 0 1 1h3.2v-5.3a1.8 1.8 0 0 1 3.6 0V20H17a1 1 0 0 0 1-1v-8.7"/><path d="M15 6.3V4.3h2.2v3.9"/></svg>`,
    Land: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/></svg>`,
    Commercial: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="14" rx="1"/><path d="M8 7V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3"/><path d="M8 12h1M8 16h1M12 12h1M12 16h1M16 12h1M16 16h1"/></svg>`,
    Development: `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V10l6-4 6 4v11"/><path d="M15 21v-7l6-3v10"/><path d="M3 21h18"/></svg>`,
  };
  return icons[type] || icons.House;
}
function categoryCardHTML(type, count){
  return `
  <a class="cat-card" href="properties.html?type=${encodeURIComponent(type)}">
    <div class="cat-icon">${categoryIconFor(type)}</div>
    <div class="cat-name">${type}</div>
    <div class="cat-count">${count} listing${count === 1 ? "" : "s"}</div>
    <span class="cat-arrow">&rarr;</span>
  </a>`;
}
function renderCategoryCards(targetSelector, types){
  const el = document.querySelector(targetSelector);
  if(!el) return;
  const counts = {};
  PROPERTIES.forEach(p => { counts[p.type] = (counts[p.type] || 0) + 1; });
  el.innerHTML = types.map(t => categoryCardHTML(t, counts[t] || 0)).join("");
}
function applyPropertyFilters(){
  const loc = document.getElementById("f-location")?.value || "";
  const type = document.getElementById("f-type")?.value || "";
  const purpose = document.getElementById("f-purpose")?.value || "";
  const price = document.getElementById("f-price")?.value || "";

  let list = PROPERTIES.filter(p => {
    if(loc && p.location !== loc) return false;
    if(type && p.type !== type) return false;
    if(purpose && p.purpose !== purpose) return false;
    if(price){
      const n = parseFloat(p.price.replace(/[^\d]/g,""));
      if(price === "low" && !(n < 5000000)) return false;
      if(price === "mid" && !(n >= 5000000 && n <= 30000000)) return false;
      if(price === "high" && !(n > 30000000)) return false;
    }
    return true;
  });
  renderProperties("#property-grid", list);
  const countEl = document.getElementById("result-count");
  if(countEl) countEl.textContent = `${list.length} propert${list.length === 1 ? "y" : "ies"}`;
}

/* Reads querystring filters from the hero search on index.html and applies them on properties.html */
function hydrateFiltersFromQuery(){
  const params = new URLSearchParams(location.search);
  ["location","type","purpose","price"].forEach(key => {
    const el = document.getElementById("f-" + key);
    if(el && params.get(key)) el.value = params.get(key);
  });
}

function submitHeroSearch(e){
  e.preventDefault();
  const loc = document.getElementById("h-location")?.value || "";
  const type = document.getElementById("h-type")?.value || "";
  const purpose = document.getElementById("h-purpose")?.value || "";
  const price = document.getElementById("h-price")?.value || "";
  const params = new URLSearchParams();
  if(loc) params.set("location", loc);
  if(type) params.set("type", type);
  if(purpose) params.set("purpose", purpose);
  if(price) params.set("price", price);
  window.location.href = "properties.html" + (params.toString() ? "?" + params.toString() : "");
}

/* ---------- Contact form ---------- */
async function handleContactSubmit(e){
  e.preventDefault();
  const btn = e.target.querySelector("button[type=submit]");
  const original = btn.textContent;
  btn.textContent = "Sending…";
  btn.disabled = true;

  const enquiry = {
    name: document.getElementById("c-name").value,
    phone: document.getElementById("c-tel").value,
    email: document.getElementById("c-mail2").value,
    purpose: document.getElementById("c-purpose").value,
    property: document.getElementById("c-prop").value,
    message: document.getElementById("c-msg").value,
  };

  const { error } = await chambersDB.from("enquiries").insert(enquiry);

  if(error){
    console.error(error);
    btn.textContent = "Couldn't send, try WhatsApp instead";
    setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3000);
    return;
  }

  chambersDB.functions.invoke("send-alert-email", { body: { table: "enquiries", record: enquiry } }).catch(err => console.warn("Alert email did not send:", err));

  btn.textContent = "Message sent";
  e.target.reset();
  setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 2200);
}
