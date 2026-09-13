---
title: WG5 - Dissemination and Communication
---

## WG5: Dissemination and Communication

WG5 ensures that the outcomes of the Action are visible, accessible, and impactful. This Working Group coordinates the communication and dissemination of guidelines, tools, training materials, and scientific results to the research community, stakeholders, and the public. By maintaining a strong online presence, engaging with key conferences and platforms, and supporting open access publication, WG5 plays a central role in building a vibrant network and encouraging the widespread adoption of the Action's outputs across Europe and beyond.

### Coordination

<div class="narrow-grid">
{% assign coordinators = site.data.members | where_exp: "member", "member.coordination contains 'WG5 leader' or member.coordination contains 'WG5 co-leader'" | sort: "coordination_order" %}
{% for person in coordinators %}
  <div class="narrow-card person-card">
    {% include person coordination="no" institution="no" %}
  </div>
{% endfor %}
</div>
