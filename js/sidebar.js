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
