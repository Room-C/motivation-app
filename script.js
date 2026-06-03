const header = document.querySelector("[data-site-header]");
const year = document.querySelector("[data-year]");

const routeLegacyHash = () => {
  if (window.location.hash === "#privacy") {
    window.location.replace("privacy.html");
  }

  if (window.location.hash === "#eula" || window.location.hash === "#terms") {
    window.location.replace("eula.html");
  }
};

routeLegacyHash();
window.addEventListener("hashchange", routeLegacyHash);

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}
