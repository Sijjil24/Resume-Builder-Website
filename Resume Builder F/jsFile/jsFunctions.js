/* ── DARK MODE ──────────────────────────────── */
function initDarkMode() {
  const toggle = document.getElementById('darkToggle');
  if (!toggle) return;
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
}

/* ── ACTIVE NAV LINK ────────────────────────── */
function setActiveNav() {
  const page = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page || a.getAttribute('href') === '../' + page) {
      a.classList.add('active');
    }
  });
}

/* ── LOGIN FORM ─────────────────────────────── */
function initLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.email.value.trim();
    const pass  = form.password.value;
    if (!email || !pass) return alert('Please fill all fields.');
    localStorage.setItem('loggedUser', email);
    window.location.href = 'dashboard.html';
  });
}

/* ── SIGNUP FORM ────────────────────────────── */
function initSignup() {
  const form = document.getElementById('signupForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name  = form.fullname.value.trim();
    const email = form.email.value.trim();
    const pass  = form.password.value;
    const conf  = form.confirm.value;
    if (!name || !email || !pass) return alert('Please fill all fields.');
    if (pass !== conf) return alert('Passwords do not match.');
    localStorage.setItem('loggedUser', email);
    window.location.href = 'dashboard.html';
  });
}

/* ── CONTACT FORM ───────────────────────────── */
function initContact() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = document.getElementById('formMsg');
    msg.textContent = '✅ Message sent! We\'ll get back to you shortly.';
    msg.style.color = '#27ae60';
    form.reset();
  });
}

/* ── DASHBOARD RESUME TABLE ─────────────────── */
function initDashboard() {
  const tbody = document.getElementById('resumeBody');
  if (!tbody) return;

  const resumes = [
    { name: 'Software Engineer CV', template: 'Modern', date: '2025-04-10', status: 'Published' },
    { name: 'Frontend Developer',   template: 'Classic', date: '2025-04-18', status: 'Draft'     },
    { name: 'UI/UX Designer',       template: 'Elegant', date: '2025-04-22', status: 'Published' },
  ];

  tbody.innerHTML = resumes.map((r, i) => `
    <tr>
      <td>${r.name}</td>
      <td>${r.template}</td>
      <td>${r.date}</td>
      <td><span class="badge ${r.status === 'Published' ? 'badge-green' : 'badge-orange'}">${r.status}</span></td>
      <td>
        <button class="btn btn-ghost" style="padding:0.3rem 0.8rem;font-size:0.82rem;" onclick="editResume(${i})">Edit</button>
        <button class="btn btn-ghost" style="padding:0.3rem 0.8rem;font-size:0.82rem;margin-left:0.4rem;color:var(--clr-danger);" onclick="deleteResume(this,${i})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function editResume(i) { alert('Opening resume editor for entry ' + (i + 1) + '...'); }
function deleteResume(btn, i) {
  if (confirm('Delete this resume?')) btn.closest('tr').remove();
}

/* ── INIT ALL ───────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  setActiveNav();
  initLogin();
  initSignup();
  initContact();
  initDashboard();
});