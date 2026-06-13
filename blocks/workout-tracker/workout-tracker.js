const SUPABASE_URL = 'https://frxmpbzzllwvrsalufat.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_9O28CaiVXWuD26zL5w2s5A_I6Q_iu4g';
const EXERCISES = ['Curls', 'Bench Press', 'Squats'];

// ── Supabase helpers ───────────────────────────────────────────────────────

async function fetchLastWorkout(email) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/goodlifeworkouts?user_email=eq.${encodeURIComponent(email)}&order=logged_at.desc&limit=50`,
    { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } },
  );
  if (!res.ok) return [];
  const rows = await res.json();
  if (!rows.length) return [];
  const mostRecentDate = rows[0].logged_at.slice(0, 10);
  return rows.filter(r => r.logged_at.slice(0, 10) === mostRecentDate);
}

async function writeWorkout(email, sets) {
  const rows = sets.map(s => ({
    user_email: email,
    exercise: s.exercise,
    reps: Number(s.reps),
    weight: Number(s.weight),
  }));
  const res = await fetch(`${SUPABASE_URL}/rest/v1/goodlifeworkouts`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(rows),
  });
  if (!res.ok) throw new Error(`Failed to log workout: ${res.status}`);
}

// ── Rendering ──────────────────────────────────────────────────────────────

function renderLastWorkout(container, lastWorkout) {
  container.innerHTML = '';
  if (!lastWorkout.length) {
    container.innerHTML = '<p class="wt-empty">No previous workout on record — this will be your first!</p>';
    return;
  }
  const date = new Date(lastWorkout[0].logged_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  const heading = document.createElement('div');
  heading.className = 'wt-section-label';
  heading.textContent = `Last workout · ${date}`;
  container.appendChild(heading);

  const byEx = {};
  lastWorkout.forEach(r => { (byEx[r.exercise] = byEx[r.exercise] || []).push(r); });

  Object.entries(byEx).forEach(([exercise, rows]) => {
    const group = document.createElement('div');
    group.className = 'wt-last-group';
    group.innerHTML = `<span class="wt-ex-name">${exercise}</span>`;
    rows.forEach(r => {
      const pill = document.createElement('span');
      pill.className = 'wt-set-pill';
      pill.textContent = `${r.reps}×${r.weight}lbs`;
      group.appendChild(pill);
    });
    container.appendChild(group);
  });
}

function renderSetList(container, sets, onRemove) {
  container.innerHTML = '';
  sets.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'wt-set-item';
    el.innerHTML = `
      <div>
        <span class="wt-set-name">${s.exercise}</span>
        <span class="wt-set-detail">${s.reps} reps · ${s.weight} lbs</span>
      </div>
      <button class="wt-remove" data-i="${i}" aria-label="Remove set">✕</button>`;
    el.querySelector('.wt-remove').addEventListener('click', () => onRemove(i));
    container.appendChild(el);
  });
}

function renderSuccess(block, loggedCount) {
  block.innerHTML = `
    <div class="wt-success">
      <div class="wt-success-icon">✓</div>
      <p class="wt-success-msg">${loggedCount} set${loggedCount !== 1 ? 's' : ''} logged — check the chat for your progress report.</p>
    </div>`;
}

// ── Main widget ────────────────────────────────────────────────────────────

async function mountWidget(block, email, lastWorkout, bridge) {
  block.innerHTML = '';

  const pendingSets = [];

  // Header
  const header = document.createElement('div');
  header.className = 'wt-header';
  header.innerHTML = `
    <span class="wt-logo">GoodLife Fitness</span>
    <span class="wt-user">${email}</span>`;
  block.appendChild(header);

  // Last workout
  const lastSection = document.createElement('div');
  lastSection.className = 'wt-last-section';
  renderLastWorkout(lastSection, lastWorkout);
  block.appendChild(lastSection);

  const divider = document.createElement('hr');
  divider.className = 'wt-divider';
  block.appendChild(divider);

  // New workout section
  const newSection = document.createElement('div');
  newSection.innerHTML = '<div class="wt-section-label">New workout</div>';

  const setList = document.createElement('div');
  setList.className = 'wt-set-list';

  const refresh = () => {
    renderSetList(setList, pendingSets, (i) => {
      pendingSets.splice(i, 1);
      refresh();
      submitBtn.disabled = pendingSets.length === 0;
    });
    submitBtn.disabled = pendingSets.length === 0;
  };

  // Add set form
  const form = document.createElement('div');
  form.className = 'wt-form';
  form.style.display = 'none';
  form.innerHTML = `
    <select class="wt-select">
      <option value="">Select exercise</option>
      ${EXERCISES.map(e => `<option value="${e}">${e}</option>`).join('')}
    </select>
    <div class="wt-row2">
      <input class="wt-input" type="number" placeholder="Reps" min="1" />
      <input class="wt-input" type="number" placeholder="Weight (lbs)" min="0" step="2.5" />
    </div>
    <button class="wt-btn wt-btn-primary wt-btn-add">Add Set</button>`;

  const addSetBtn = document.createElement('button');
  addSetBtn.className = 'wt-btn wt-btn-outline';
  addSetBtn.textContent = '+ Add Set';
  addSetBtn.addEventListener('click', () => {
    form.style.display = 'block';
    addSetBtn.style.display = 'none';
    form.querySelector('.wt-select').value = '';
    form.querySelectorAll('.wt-input').forEach(i => { i.value = ''; });
  });

  form.querySelector('.wt-btn-add').addEventListener('click', () => {
    const exercise = form.querySelector('.wt-select').value;
    const [repsEl, weightEl] = form.querySelectorAll('.wt-input');
    const reps = parseInt(repsEl.value, 10);
    const weight = parseFloat(weightEl.value);
    if (!exercise || !reps || isNaN(weight) || weight < 0) return;
    pendingSets.push({ exercise, reps, weight });
    form.style.display = 'none';
    addSetBtn.style.display = 'block';
    refresh();
  });

  const submitBtn = document.createElement('button');
  submitBtn.className = 'wt-btn wt-btn-primary';
  submitBtn.textContent = 'Log Workout';
  submitBtn.disabled = true;

  submitBtn.addEventListener('click', async () => {
    if (!pendingSets.length) return;
    submitBtn.textContent = 'Logging…';
    submitBtn.disabled = true;

    try {
      if (bridge) {
        await bridge.callTool('log_workout', { user_email: email, sets: pendingSets });
      } else {
        await writeWorkout(email, pendingSets);
      }
      renderSuccess(block, pendingSets.length);
    } catch (err) {
      submitBtn.textContent = 'Log Workout';
      submitBtn.disabled = false;
      console.error('log_workout failed', err);
    }
  });

  newSection.appendChild(setList);
  newSection.appendChild(form);
  newSection.appendChild(addSetBtn);
  newSection.appendChild(submitBtn);
  block.appendChild(newSection);

  if (bridge) {
    bridge.reportSize(block.offsetWidth, block.offsetHeight);
    const ro = new ResizeObserver(() => bridge.reportSize(block.offsetWidth, block.offsetHeight));
    ro.observe(block);
  }
}

// ── Entry point ────────────────────────────────────────────────────────────

export default async function decorate(block, bridge) {
  if (bridge) {
    bridge.applyHostStyles();
    const isPreview = bridge.hostContext?.preview === true;

    if (isPreview) {
      const previewEmail = 'preview@goodlife.com';
      const lastWorkout = await fetchLastWorkout(previewEmail);
      await mountWidget(block, previewEmail, lastWorkout, bridge);
    } else {
      const result = await bridge.toolResult;
      const data = result?.structuredContent ?? result;
      await mountWidget(block, data?.userEmail || '', data?.lastWorkout || [], bridge);
    }
  } else {
    // Standalone EDS page — prompt for email via URL param first
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');

    if (emailParam) {
      const lastWorkout = await fetchLastWorkout(emailParam);
      await mountWidget(block, emailParam, lastWorkout, null);
    } else {
      // Render email prompt
      block.innerHTML = `
        <div class="wt-email-prompt">
          <div class="wt-logo">GoodLife Fitness</div>
          <h2 class="wt-title">Workout Tracker</h2>
          <input class="wt-input" type="email" id="wt-email-field" placeholder="your@email.com" />
          <button class="wt-btn wt-btn-primary" id="wt-email-go">Get Started</button>
        </div>`;
      block.querySelector('#wt-email-go').addEventListener('click', async () => {
        const val = block.querySelector('#wt-email-field').value.trim();
        if (!val || !val.includes('@')) return;
        const lastWorkout = await fetchLastWorkout(val);
        await mountWidget(block, val, lastWorkout, null);
      });
    }
  }
}
