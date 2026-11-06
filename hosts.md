---
title: Potential STSM hosts
---

A Short-Term Scientific Mission (STSM) is a visit to a host organization in another country to carry out a specific piece of work. INDoS provides [grants](/grants) to funancially support STSMs. The organizations listed below explicitly indicated that they welcome STSM visitors to work on specific projects. You can contact the host to discuss a possible project prior to applying for a grant.

STSMs visits are in principle possible to all INDoS [member](/members) organizations. If you would like your organization and/or project to be listed on this page, please submit a pull request to the [GitHub repository](https://github.com/indos-costaction/indos-costaction.github.io/) or contact Mathew Abrams (<mathew@incf.org>).

<div class="hosts-list">
{% for host in site.data.hosts %}
  <div class="wide-card">
    <h4>{{ host.organization }}</h4>
    {% if host.department or host.location %}
      <p class="host-meta">
        {% if host.department %}{{ host.department }}{% endif %}{% if host.department and host.location %} &middot; {% endif %}{% if host.location %}{{ host.location }}{% endif %}
      </p>
    {% endif %}
    {% if host.contact %}
      {% assign contact_member = site.data.members | where: "name", host.contact | first %}
      <p class="host-contact">
        Contact: {{ host.contact }}{% if contact_member.email %} (<a href="mailto:{{ contact_member.email }}">{{ contact_member.email }}</a>){% endif %}
      </p>
    {% endif %}
    {% if host.description %}
      <p>{{ host.description }}</p>
    {% endif %}
  </div>
{% endfor %}
</div>
