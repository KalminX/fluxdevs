document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav a");
  const content = document.getElementById("content");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const section = this.getAttribute("data-section");
      fetch(`content-${section}.html`)
        .then((response) => response.text())
        .then((data) => {
          content.innerHTML = data;

          history.pushState({ section: section }, "", `#${section}`);
        })
        .catch((error) => console.error("Error loading content:", error));
    });
  });

  window.addEventListener("popstate", function () {
    const section = location.hash.replace("#", "") || "home";

    fetch(`content-${section}.html`)
      .then((response) => response.text())
      .then((data) => {
        content.innerHTML = data;
      })
      .catch((error) => console.error("Error loading content:", error));
  });
});
