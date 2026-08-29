/* ============================================================
   RENDER LOGIC
   ============================================================ */
function goHome(){
  document.getElementById('view-home').classList.remove('hidden');
  document.getElementById('view-subject').classList.add('hidden');
  document.getElementById('topbar-kicker').textContent = "Study hub";
  document.getElementById('topbar-title').textContent = "Home";
  document.getElementById('topbar-code').textContent = "4 SUBJECTS";
  document.querySelectorAll('.rail-btn').forEach(b=>b.classList.remove('active'));
  document.querySelector('.rail-btn[data-subj="home"]').classList.add('active');
}

function openSubject(key){
  const s = SUBJECTS[key];
  document.getElementById('view-home').classList.add('hidden');
  document.getElementById('view-subject').classList.remove('hidden');
  document.getElementById('topbar-kicker').textContent = s.title + " · " + s.years;
  document.getElementById('topbar-title').textContent = s.title + " — Revision Notes";
  document.getElementById('topbar-code').textContent = s.code;
  document.documentElement.style.setProperty('--accent', s.color);
  document.documentElement.style.setProperty('--accent-soft', s.soft);
  document.querySelectorAll('.rail-btn').forEach(b=>b.classList.remove('active'));
  document.querySelector('.rail-btn[data-subj="'+key+'"]').classList.add('active');

  const list = document.getElementById('topic-list');
  let html = '';
  s.units.forEach(u=>{
    html += `<div class="unit-label">${u.title}</div>`;
    u.topics.forEach(t=>{
      html += `<button class="topic-btn" id="topicbtn-${key}-${t.id}" onclick="showTopic('${key}','${t.id}')">
        <span>${t.title}</span>
        <span><span class="tag">${t.id}</span><span class="lvl">${t.level}</span></span>
      </button>`;
    });
  });
  list.innerHTML = html;
  showTopic(key, s.units[0].topics[0].id);
}

function findTopic(s, topicId){
  for(const u of s.units){
    const t = u.topics.find(t=>t.id===topicId);
    if(t) return {topic:t, unit:u};
  }
  return null;
}

function showTopic(subjKey, topicId){
  const s = SUBJECTS[subjKey];
  const found = findTopic(s, topicId);
  const topic = found.topic, unit = found.unit;

  document.querySelectorAll('.topic-btn').forEach(b=>b.classList.remove('active'));
  const btn = document.getElementById('topicbtn-'+subjKey+'-'+topicId);
  if(btn) btn.classList.add('active');

  const deepKey = subjKey+':'+topicId;
  const hasDeep = DEEP.hasOwnProperty(deepKey);

  let body;
  if(hasDeep){
    body = DEEP[deepKey];
  } else {
    const pts = topic.points.map(p=>`<li>${p}</li>`).join('');
    body = `<p>${topic.blurb || 'Core focus points for this topic:'}</p><ul class="focus-points">${pts}</ul>`;
  }

  const resHtml = s.resources.map(r=>
    `<a class="res-card" href="${r.url}" target="_blank" rel="noopener">
      <div class="src">${r.src}</div><div class="ttl">${r.ttl}</div><div class="desc">${r.desc}</div>
    </a>`
  ).join('');

  document.getElementById('notes-pane').innerHTML = `
    <div class="paper-stamp">${s.code} · ${unit.id} · ${topic.id}</div>
    <span class="depth-flag">${hasDeep ? 'IN DEPTH' : 'QUICK REFERENCE'}</span>
    <h2>${topic.title}</h2>
    <div class="notes-body">${body}</div>
    <div class="resources">
      <h4>${s.title} (${s.code}) — Past papers, mark schemes & further reading</h4>
      <div class="res-grid">${resHtml}</div>
      <p class="res-note">These link to external sites for the actual question papers, mark schemes and deeper written notes. RocketRevise/ZNotes coverage can vary by topic — if a direct link is thin, search "${s.code}" plus the topic name once you're on the site.</p>
    </div>
  `;
}
