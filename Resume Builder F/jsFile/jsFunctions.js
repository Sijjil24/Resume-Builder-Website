document.addEventListener("DOMContentLoaded", () => {
  const darkToggle = document.getElementById("darkToggle");
  const navBurger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");
  const body = document.body;

  // 1. Dark Mode Logic
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    if(darkToggle) darkToggle.textContent = "☀️";
  }

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        darkToggle.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        darkToggle.textContent = "🌙";
      }
    });
  }

  // 2. Mobile Navbar Menu Logic
  if (navBurger && navLinks) {
    navBurger.addEventListener("click", () => {
      navLinks.classList.toggle("nav-open");
    });
  }

  // 3. Modal Open & Close Logic (Natively replacing React useState)
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalCloses = document.querySelectorAll('.modal-close');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('active'); // No inline styles used!
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });

  // 4. Stock Table Search Filter Logic (Natively replacing React filter)
  const searchInput = document.getElementById('searchInput');
  const stockRows = document.querySelectorAll('#stockTable tbody tr');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      
      stockRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        // Uses class toggle instead of inline style row.style.display
        if (text.includes(term)) {
          row.classList.remove('hidden-row');
        } else {
          row.classList.add('hidden-row');
        }
      });
    });
  }
});
