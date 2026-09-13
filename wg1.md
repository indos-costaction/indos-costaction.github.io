---
title: WG1 - Quality Assessment and Quality Control
---

## WG1: Quality Assessment and Quality Control

This Working Group focuses on improving the reliability and usability of neuroimaging data by developing shared standards and guidelines for quality assessment (QA) and quality control (QC) across different imaging modalities, including MRI, MEG, EEG, and fNIRS. By bringing together experts and existing initiatives, WG1 aims to establish clear, transparent, and interoperable QA/QC practices that make it easier for researchers to evaluate data quality before use. These efforts will reduce duplication of work, enhance reproducibility, and support the use of neuroimaging data in advanced applications such as AI.

### Coordination

<div class="person-cards">
{% assign coordinators = site.data.members | where_exp: "member", "member.coordination contains 'WG1 leader' or member.coordination contains 'WG1 co-leader'" | sort: "coordination_order" %}
{% for person in coordinators %}
  {% include person person=person coordination="no" institution="no" %}
{% endfor %}
</div>

### Task forces

- Existing practices in neuroimaging
- Practices in other domains
- EEG quality assessment
- MEG quality assessment
- MRI quality assessment
