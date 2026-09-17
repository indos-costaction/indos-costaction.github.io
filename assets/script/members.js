/* Members page — Leaflet institution map plus a filterable member list. */
(function () {
  "use strict";

  var members = window.MEMBERS_DATA || [];
  var institutions = window.INSTITUTIONS_DATA || [];
  if (!members.length || !institutions.length) return;

  var membersByInstitution = {};
  members.forEach(function (member) {
    membersByInstitution[member.institution] =
      (membersByInstitution[member.institution] || 0) + 1;
  });

  var map = L.map("members-map", { scrollWheelZoom: false }).setView([50.5, 10], 4);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  function makeIcon() {
    return L.divIcon({
      className: "",
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -10],
      html:
        '<svg width="16" height="16"><circle cx="8" cy="8" r="7" fill="#122B62" stroke="#fff" stroke-width="2"/></svg>',
    });
  }

  var markers = {};
  var institutionIcon = makeIcon();

  institutions.forEach(function (institution) {
    var memberCount = membersByInstitution[institution.name] || 0;
    var popupContent = document.createElement("div");
    popupContent.className = "members-popup";
    var name = document.createElement("h4");
    name.textContent = institution.name;
    var country = document.createElement("p");
    country.textContent = institution.country;
    var count = document.createElement(memberCount ? "button" : "p");
    count.textContent = memberCount + (memberCount === 1 ? " member" : " members");
    if (memberCount) {
      count.type = "button";
      count.className = "members-popup__count";
      count.addEventListener("click", function () {
        searchInput.value = "";
        countrySelect.value = institution.country;
        updateInstitutionOptions();
        institutionSelect.value = institution.name;
        applyFilters();
        gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    popupContent.appendChild(name);
    popupContent.appendChild(country);
    popupContent.appendChild(count);

    var marker = L.marker([institution.latitude, institution.longitude], { icon: institutionIcon })
      .bindPopup(popupContent)
      .addTo(map);
    markers[institution.name] = marker;
  });
  map.fitBounds(L.featureGroup(Object.keys(markers).map(function (name) {
    return markers[name];
  })).getBounds().pad(0.1));

  var searchInput = document.getElementById("members-search");
  var countrySelect = document.getElementById("members-filter-country");
  var institutionSelect = document.getElementById("members-filter-institution");
  var gridEl = document.getElementById("members-grid");
  var countEl = document.getElementById("members-count");
  var cards = [];

  members.forEach(function (member) {
    var card = document.createElement("div");
    card.className = "member-card";
    card.setAttribute("data-country", member.country);
    card.setAttribute("data-institution", member.institution);
    card.setAttribute("data-search", [member.name, member.institution, member.country].join(" ").toLowerCase());
    var name = document.createElement("h4");
    name.textContent = (member.title ? member.title + " " : "") + member.name;
    var email = document.createElement("p");
    email.className = "member-card__email";
    var emailLink = document.createElement("a");
    /* Email protection adapted from https://joemaller.com/js-mailer.shtml by Joe Maller. */
    var emailAddress = member.emailName + "@" + member.emailDomain;
    emailLink.href = "mailto:" + emailAddress;
    emailLink.textContent = emailAddress;
    email.appendChild(emailLink);
    var institution = document.createElement("p");
    institution.className = "member-card__institution";
    institution.textContent = member.institution;
    var country = document.createElement("p");
    country.className = "member-card__country";
    country.textContent = member.country;
    var workingGroups = document.createElement("p");
    workingGroups.className = "member-card__working-groups";
    workingGroups.textContent = (member.workingGroups || []).map(function (group) {
      return group.replace(" ", "");
    }).join(", ");
    card.appendChild(name);
    card.appendChild(email);
    card.appendChild(institution);
    card.appendChild(country);
    if (workingGroups.textContent) {
      card.appendChild(workingGroups);
    }
    gridEl.appendChild(card);
    cards.push(card);
  });

  function addOptions(select, values) {
    values.sort().forEach(function (value) {
      var option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  var countries = members.map(function (member) { return member.country; }).filter(function (value, index, values) {
    return values.indexOf(value) === index;
  });
  addOptions(countrySelect, countries);

  function updateInstitutionOptions() {
    var selectedInstitution = institutionSelect.value;
    var selectedCountry = countrySelect.value;
    var institutions = members
      .filter(function (member) {
        return !selectedCountry || member.country === selectedCountry;
      })
      .map(function (member) {
        return member.institution;
      })
      .filter(function (value, index, values) {
        return values.indexOf(value) === index;
      });

    institutionSelect.length = 1;
    addOptions(institutionSelect, institutions);
    if (institutions.indexOf(selectedInstitution) !== -1) {
      institutionSelect.value = selectedInstitution;
    }
  }

  updateInstitutionOptions();

  function applyFilters() {
    var query = searchInput.value.toLowerCase();
    var country = countrySelect.value;
    var institution = institutionSelect.value;
    var visible = 0;
    var visibleInstitutions = {};

    cards.forEach(function (card) {
      var matchSearch = !query || card.getAttribute("data-search").indexOf(query) !== -1;
      var matchCountry = !country || card.getAttribute("data-country") === country;
      var matchInstitution = !institution || card.getAttribute("data-institution") === institution;
      if (matchSearch && matchCountry && matchInstitution) {
        card.classList.remove("hidden");
        visible++;
        visibleInstitutions[card.getAttribute("data-institution")] = true;
      } else {
        card.classList.add("hidden");
      }
    });

    Object.keys(markers).forEach(function (name) {
      if (visible === members.length || visibleInstitutions[name]) {
        markers[name].addTo(map);
      } else {
        map.removeLayer(markers[name]);
      }
    });
    countEl.textContent = visible + " of " + members.length + " members";
  }

  searchInput.addEventListener("input", applyFilters);
  countrySelect.addEventListener("change", function () {
    updateInstitutionOptions();
    applyFilters();
  });
  institutionSelect.addEventListener("change", applyFilters);

  document.getElementById("members-fit").addEventListener("click", function () {
    var visibleMarkers = Object.keys(markers).filter(function (name) {
      return map.hasLayer(markers[name]);
    }).map(function (name) {
      return markers[name];
    });
    if (visibleMarkers.length) {
      map.fitBounds(L.featureGroup(visibleMarkers).getBounds().pad(0.1));
    }
  });

  applyFilters();
})();
