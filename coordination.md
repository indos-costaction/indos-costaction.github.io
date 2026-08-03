---
title: Coordination
---

In 2024 a group of researchers gathered to write a proposal for a COST Action, which was awarded in 2025 and subsequently officially started in November 2025. The [Memorandum of Understanding](https://e-services.cost.eu/files/domain_files/CA/Action_CA24161/mou/CA24161-e.pdf) (MoU) details the plans as set out at the start of the action. During the course of the action these plans will be implemented and updated.

Here you can find the names and contact details of the people with a leading, coordinating or managing role in INDoS. Use the buttons to filter by role.

<div class="filter-buttons" role="group" aria-label="Filter coordination members">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="Core Group">Core Group</button>
  <button class="filter-btn" data-filter="WG1">WG1</button>
  <button class="filter-btn" data-filter="WG2">WG2</button>
  <button class="filter-btn" data-filter="WG3">WG3</button>
  <button class="filter-btn" data-filter="WG4">WG4</button>
  <button class="filter-btn" data-filter="WG5">WG5</button>
  <button class="filter-btn" data-filter="Management Committee">Management Committee</button>
</div>

<div class="narrow-grid">
{% for person in site.data.people %}
  <div class="narrow-card person-card" data-roles="{{ person.roles | join: ',' }}">
    {% include person id=person.id roles="yes" %}
  </div>
{% endfor %}
</div>

<script>
  const filterButtons = document.querySelectorAll('.filter-btn');
  const personCards = document.querySelectorAll('.person-card');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const filterWord = filter.split(' ')[0].toLowerCase();
      personCards.forEach((card) => {
        const roles = (card.dataset.roles || '').split(',').map((r) => r.trim().toLowerCase());
        const show = filter === 'all' || roles.some((role) => role.split(' ')[0] === filterWord);
        card.style.display = show ? '' : 'none';
      });
    });
  });
</script>
