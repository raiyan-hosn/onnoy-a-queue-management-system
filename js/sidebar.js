let openMenu = document.getElementById("sb-bar");
let sidebar = document.getElementById("sidebar");
let closeMenu = document.getElementById("sb-cancel");

openMenu.addEventListener("click", function () {
  openMenu.classList.add("hide");
  sidebar.classList.add("show");
  closeMenu.classList.remove("hide");
});

closeMenu.addEventListener("click", function () {
  openMenu.classList.remove("hide");
  sidebar.classList.remove("show");
  closeMenu.classList.add("hide");
});

document.addEventListener("click", (e) => {
  if (
    !(
      e.target.id === "sb-bar" ||
      e.target.id === "sidebar" ||
      e.target.id === "sb-cancel" ||
      e.target.id === "sidebar-title" ||
      e.target.id === "home-menu" ||
      e.target.id === "profile-menu" ||
      e.target.id === "create-menu" ||
      e.target.id === "join-menu" ||
      e.target.id === "prev-menu" ||
      e.target.id === "invited-menu" ||
      e.target.id === "report-menu" ||
      e.target.id === "about-menu"
    )
  ) {
    openMenu.classList.remove("hide");
    sidebar.classList.remove("show");
    closeMenu.classList.add("hide");
  }
});
