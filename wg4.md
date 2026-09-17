---
title: WG4 - Ethics, Practices, and Regulations
---

## WG4: Ethics, Practices, and Regulations

Sharing human neuroimaging data raises important ethical and legal questions, particularly regarding privacy and compliance with regulations such as the GDPR. WG4 will clarify and address these challenges by developing guidelines, tools, and training that help researchers navigate legal frameworks while maximizing the scientific and societal benefits of data sharing. It will also foster ethical discussions within the community, balancing openness and transparency with respect for participants' rights and researchers' concerns, ultimately supporting responsible and sustainable data sharing practices.

### Coordination

<div class="person-cards">
{% assign leaders = site.data.members | where_exp: "member", "member.coordination contains 'WG4 leader'" %}
{% assign co_leaders = site.data.members | where_exp: "member", "member.coordination contains 'WG4 co-leader'" %}
{% assign coordinators = leaders | concat: co_leaders | sort: "coordination_order" %}
{% for person in coordinators %}
  {% include person person=person coordination="no" institution="no" %}
{% endfor %}
</div>

### Task forces

- Anonymity and reidentification
- Ethics open-science and data sharing
- Clinical and non-clinical aspects
- Legal aspects
