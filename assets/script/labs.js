/**
 * Labs page — Leaflet map + searchable/filterable card list.
 *
 * Expects a global `window.LABS_DATA` array (injected by the page) with
 * objects shaped like { id, name, university, city, country, lat, lon,
 *   contact_name, contact_email, website, research_areas }.
 */
(function () {
  "use strict";

  var labs = window.LABS_DATA || [];
  if (!labs.length) return;

  /* ── Collect unique values for filter dropdowns ────────────────────── */

  var countries = [];
  var areaSet = {};
  var countryCount = {};

  labs.forEach(function (lab) {
    countryCount[lab.country] = (countryCount[lab.country] || 0) + 1;
    lab.research_areas.forEach(function (a) {
      areaSet[a] = true;
    });
  });

  Object.keys(countryCount)
    .sort()
    .forEach(function (c) {
      countries.push(c);
    });

  var areas = Object.keys(areaSet).sort();

  /* ── Populate dropdowns ────────────────────────────────────────────── */

  var selCountry = document.getElementById("labs-filter-country");
  var selArea = document.getElementById("labs-filter-area");

  countries.forEach(function (c) {
    var opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c + " (" + countryCount[c] + ")";
    selCountry.appendChild(opt);
  });

  areas.forEach(function (a) {
    var opt = document.createElement("option");
    opt.value = a;
    opt.textContent = a;
    selArea.appendChild(opt);
  });

  /* ── Init Leaflet map ──────────────────────────────────────────────── */

  var map = L.map("labs-map", { scrollWheelZoom: false }).setView([50.5, 10], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  /* ── Custom circle marker icon ─────────────────────────────────────── */

  function makeIcon(highlight) {
    return L.divIcon({
      className: "",
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -10],
      html:
        '<svg width="16" height="16"><circle cx="8" cy="8" r="7" fill="' +
        (highlight ? "#5D288F" : "#60BFAF") +
        '" stroke="#fff" stroke-width="2"/></svg>',
    });
  }

  /* ── Create markers & build lookup ─────────────────────────────────── */

  var markers = {}; /* id → L.marker */
  var defaultIcon = makeIcon(false);
  var highlightIcon = makeIcon(true);

  labs.forEach(function (lab) {
    var popupHtml =
      '<div class="labs-popup">' +
      "<h4>" + lab.name + "</h4>" +
      "<p><em>" + lab.university + "</em></p>" +
      "<p>" + lab.city + ", " + lab.country + "</p>" +
      "<p>Contact: " + lab.contact_name + "</p>" +
      '<p><a href="mailto:' + lab.contact_email + '">' + lab.contact_email + "</a></p>" +
      (lab.website
        ? '<p><a href="' + lab.website + '" target="_blank" rel="noopener">Website</a></p>'
        : "") +
      "</div>";

    var marker = L.marker([lab.lat, lab.lon], { icon: defaultIcon })
      .bindPopup(popupHtml)
      .addTo(map);

    marker.on("click", function () {
      highlightCard(lab.id);
    });

    markers[lab.id] = marker;
  });

  /* ── Build card list ───────────────────────────────────────────────── */

  var gridEl = document.getElementById("labs-grid");
  var cards = {}; /* id → DOM element */

  labs.forEach(function (lab) {
    var card = document.createElement("div");
    card.className = "labs-card";
    card.setAttribute("data-id", lab.id);
    card.setAttribute("data-country", lab.country);
    card.setAttribute(
      "data-areas",
      lab.research_areas.join("|").toLowerCase()
    );
    card.setAttribute(
      "data-search",
      [
        lab.name,
        lab.university,
        lab.city,
        lab.country,
        lab.contact_name,
        lab.contact_email,
      ]
        .join(" ")
        .toLowerCase()
    );

    var areasHtml = lab.research_areas
      .map(function (a) {
        return '<span class="labs-tag">' + a + "</span>";
      })
      .join("");

    card.innerHTML =
      "<h4>" + lab.name + "</h4>" +
      '<p class="labs-card__university">' + lab.university + "</p>" +
      '<p class="labs-card__location">' + lab.city + ", " + lab.country + "</p>" +
      '<p class="labs-card__contact">Contact: <strong>' + lab.contact_name + "</strong></p>" +
      '<p class="labs-card__contact"><a href="mailto:' + lab.contact_email + '">' +
      lab.contact_email + "</a></p>" +
      (lab.website
        ? '<p class="labs-card__contact"><a href="' + lab.website + '" target="_blank" rel="noopener">Website</a></p>'
        : "") +
      '<div class="labs-card__areas">' + areasHtml + "</div>";

    card.addEventListener("click", function () {
      map.setView([lab.lat, lab.lon], 10);
      markers[lab.id].openPopup();
      highlightCard(lab.id);
    });

    gridEl.appendChild(card);
    cards[lab.id] = card;
  });

  /* ── Highlight / sync ──────────────────────────────────────────────── */

  var highlighted = null;

  function highlightCard(id) {
    if (highlighted && cards[highlighted]) {
      cards[highlighted].classList.remove("highlight");
      markers[highlighted].setIcon(defaultIcon);
    }
    highlighted = id;
    if (cards[id]) {
      cards[id].classList.add("highlight");
      cards[id].scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    markers[id].setIcon(highlightIcon);
  }

  /* ── Filtering logic ───────────────────────────────────────────────── */

  var countEl = document.getElementById("labs-count");

  function applyFilters() {
    var query = document.getElementById("labs-search").value.toLowerCase();
    var country = selCountry.value;
    var area = selArea.value.toLowerCase();
    var visible = 0;

    labs.forEach(function (lab) {
      var card = cards[lab.id];
      var matchSearch =
        !query || card.getAttribute("data-search").indexOf(query) !== -1;
      var matchCountry = !country || lab.country === country;
      var matchArea =
        !area || card.getAttribute("data-areas").indexOf(area) !== -1;

      if (matchSearch && matchCountry && matchArea) {
        card.classList.remove("hidden");
        markers[lab.id].addTo(map);
        visible++;
      } else {
        card.classList.add("hidden");
        map.removeLayer(markers[lab.id]);
      }
    });

    countEl.textContent = visible + " of " + labs.length + " labs";
  }

  document.getElementById("labs-search").addEventListener("input", applyFilters);
  selCountry.addEventListener("change", applyFilters);
  selArea.addEventListener("change", applyFilters);

  /* ── Fit map to visible markers ────────────────────────────────────── */

  document.getElementById("labs-fit").addEventListener("click", function () {
    var group = L.featureGroup(
      Object.keys(markers)
        .filter(function (id) {
          return map.hasLayer(markers[id]);
        })
        .map(function (id) {
          return markers[id];
        })
    );
    if (group.getLayers().length) {
      map.fitBounds(group.getBounds().pad(0.1));
    }
  });

  /* ── Initial count ─────────────────────────────────────────────────── */

  countEl.textContent = labs.length + " of " + labs.length + " labs";
})();
