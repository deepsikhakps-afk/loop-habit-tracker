const $ = id => document.getElementById(id);
const KEY = 'loop-habits';
const todayStr = () => new Date().toISOString().slice(0, 10);
const dayBefore = d => { const t = new Date(d); t.setDate(t.getDate() - 1); return t.toISOString().slice(0, 10); };

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}
function save(habits) {
  try { localStorage.setItem(KEY, JSON.stringify(habits)); } catch {}
}

let habits = load();

function streakFor(h) {
  if (!h.dates.length) return 0;
  const set = new Set(h.dates);
  let d = set.has(todayStr()) ? todayStr() : dayBefore(todayStr());
  if (!set.has(d)) return 0;
  let n = 0;
  while (set.has(d)) { n++; d = dayBefore(d); }
  return n;
}

function render() {
  const list = $('habit-list');
  list.innerHTML = '';
  $('empty').hidden = habits.length > 0;

  habits.forEach((h, i) => {
    const li = document.createElement('li');
    const doneToday = h.dates.includes(todayStr());
    const streak = streakFor(h);

    const check = document.createElement('button');
    check.className = 'check' + (doneToday ? ' done' : '');
    check.setAttribute('aria-label', doneToday ? `Mark ${h.name} not done today` : `Mark ${h.name} done today`);
    check.textContent = doneToday ? '✓' : '';
    check.onclick = () => toggle(i);

    const info = document.createElement('div');
    info.className = 'info';
    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = h.name;
    const streakEl = document.createElement('div');
    streakEl.className = 'streak';
    streakEl.innerHTML = streak > 0 ? `<span class="flame">●</span> ${streak}-day streak` : 'No streak yet';
    info.append(name, streakEl);

    const del = document.createElement('button');
    del.className = 'del';
    del.setAttribute('aria-label', `Delete ${h.name}`);
    del.textContent = '✕';
    del.onclick = () => remove(i);

    li.append(check, info, del);
    list.appendChild(li);
  });
}

function toggle(i) {
  const h = habits[i];
  const t = todayStr();
  const idx = h.dates.indexOf(t);
  if (idx === -1) h.dates.push(t); else h.dates.splice(idx, 1);
  save(habits);
  render();
}
function remove(i) {
  habits.splice(i, 1);
  save(habits);
  render();
}

$('add-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = $('habit-name');
  const name = input.value.trim();
  if (!name) return;
  habits.push({ name, dates: [] });
  save(habits);
  input.value = '';
  render();
});

render();
