---
title: WG2 - Metadata
---

## WG2: Metadata

WG2 is dedicated to improving the way neuroimaging data and experimental information are described and annotated. Metadata plays a crucial role in making data findable, interoperable, and reusable, but current practices are often inconsistent or incomplete. This Working Group will extend and refine existing standards, such as BIDS, and foster collaboration between metadata developers, software tool creators, and researchers. By improving metadata practices, WG2 will make it easier to discover, understand, and reuse neuroimaging datasets across research groups and disciplines.

### Coordination

<div class="narrow-grid">
{% assign coordinators = site.data.members | where_exp: "member", "member.coordination contains 'WG2 leader' or member.coordination contains 'WG2 co-leader'" | sort: "coordination_order" %}
{% for person in coordinators %}
  <div class="narrow-card person-card">
    {% include person coordination="no" institution="no" %}
  </div>
{% endfor %}
</div>

### Task forces

- BIDS outreach and augmentation
- Creation of guidelines on how to best make use of BIDS
- Tool alignment - primarily tools that support creation of BIDS-compliant datasets or that work with BIDS-compliant datasets
- Demonstrator datasets
- Training materials
