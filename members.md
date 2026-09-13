---
title: Members
---

<link rel="stylesheet" href="{{ '/assets/leaflet/leaflet.css' | relative_url }}" />
<script src="{{ '/assets/leaflet/leaflet.js' | relative_url }}"></script>
<link rel="stylesheet" href="{{ '/assets/css/members.css' | relative_url }}">

<p>
  Explore the members and institutions that are part of the INDoS network. Search and filter the member list below by name, institution, or country.
</p>

<div id="members-map" class="members-map"></div>

<div class="members-filters">
  <div class="members-search">
    <label for="members-search">Search</label>
    <input type="search" id="members-search" placeholder="Member name, institution, or country" />
  </div>
  <div class="members-filter">
    <label for="members-filter-institution">Institution</label>
    <select id="members-filter-institution">
      <option value="">All</option>
    </select>
  </div>
  <div class="members-filter">
    <label for="members-filter-country">Country</label>
    <select id="members-filter-country">
      <option value="">All</option>
    </select>
  </div>
  <button id="members-fit" class="ts-cta__button" type="button" style="font-size:0.85rem; padding:0.4rem 0.9rem;">
    Fit map to selection
  </button>
  <span id="members-count" class="members-count"></span>
</div>

<div id="members-grid" class="members-grid"></div>

<script>
window.MEMBERS_DATA = [
{% for member in site.data.members %}
  {% assign email_parts = member.email | split: "@" %}
  {
    "name": {{ member.name | jsonify }},
    "title": {{ member.title | jsonify }},
    "emailName": {{ email_parts[0] | jsonify }},
    "emailDomain": {{ email_parts[1] | jsonify }},
    "institution": {{ member.institution | jsonify }},
    "country": {{ member.country | jsonify }}
  }{% unless forloop.last %},{% endunless %}
{% endfor %}
];
window.INSTITUTIONS_DATA = {{ site.data.institutions | jsonify }};
</script>
<script src="{{ '/assets/script/members.js' | relative_url }}"></script>
