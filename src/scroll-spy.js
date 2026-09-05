(function () {
  var SECTION_TO_NAV_HREF = {
    hero: "/",
    "blog-preview": "/blog/",
    projects: "/#projects",
    contact: "/#contact",
    about: "/#about",
  };

  var navLinks = document.querySelectorAll(".sidebar__link");
  if (!navLinks.length) return;

  var sections = Object.keys(SECTION_TO_NAV_HREF)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if (!sections.length) return;

  function setActive(href) {
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === href);
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActive(SECTION_TO_NAV_HREF[entry.target.id]);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach(function (section) { observer.observe(section); });
})();
