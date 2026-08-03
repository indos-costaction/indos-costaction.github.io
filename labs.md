---
title: Participating Labs
---

<link rel="stylesheet" href="{{ '/assets/leaflet/leaflet.css' | relative_url }}" />
<script src="{{ '/assets/leaflet/leaflet.js' | relative_url }}"></script>
<link rel="stylesheet" href="{{ '/assets/css/labs.css' | relative_url }}">

<p>
  Explore the network of European university labs participating in INDoS.
  Use the map to find labs near you, or search and filter using the controls below.
</p>

<div id="labs-map" class="labs-map"></div>

<div class="labs-filters">
  <div class="labs-search">
    <label for="labs-search-input">Search</label>
    <input type="text" id="labs-search" placeholder="Name, university, city, contact..." />
  </div>
  <div class="labs-filter-country">
    <label for="labs-filter-country-select">Country</label>
    <select id="labs-filter-country">
      <option value="">All countries</option>
    </select>
  </div>
  <div class="labs-filter-area">
    <label for="labs-filter-area-select">Research area</label>
    <select id="labs-filter-area">
      <option value="">All areas</option>
    </select>
  </div>
  <button id="labs-fit" class="ts-cta__button" style="font-size:0.85rem; padding:0.4rem 0.9rem;">
    Fit map to results
  </button>
  <span id="labs-count" class="labs-count"></span>
</div>

<div id="labs-grid" class="labs-grid"></div>

<script>
window.LABS_DATA = {{ site.data.labs | jsonify }};
</script>
<script src="{{ '/assets/script/labs.js' | relative_url }}"></script>
