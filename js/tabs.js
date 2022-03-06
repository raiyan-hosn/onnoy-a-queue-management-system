const sections = [
    document.getElementById("home"),
    document.getElementById("profile"),
    document.getElementById("create"),
    document.getElementById("join"),
    document.getElementById("previous"),
    document.getElementById("invitation"),
    document.getElementById("report"),
    document.getElementById("about"),
];
// TODO: complete tabs work

let indexOfMenu = -1;

const navMenu = document.getElementById("nav-menu");

navMenu.addEventListener("click", function (event) {
    if (event.target.id === "home-menu") {
        indexOfMenu = 0;
    } else if (event.target.id === "profile-menu") {
        indexOfMenu = 1;
    } else if (event.target.id === "create-menu") {
        indexOfMenu = 2;
    } else if (event.target.id === "join-menu") {
        indexOfMenu = 3;
    } else if (event.target.id === "prev-menu") {
        indexOfMenu = 4;
    } else if (event.target.id === "invited-menu") {
        indexOfMenu = 5;
    } else if (event.target.id === "report-menu") {
        indexOfMenu = 6;
    } else if (event.target.id === "about-menu") {
        indexOfMenu = 7;
    }

    displaySection(indexOfMenu);
});

document.getElementById("join-btn").addEventListener("click", () => {
    indexOfMenu = 3;
    displaySection(indexOfMenu);
});

const displaySection = (index) => {
    for (i = 0; i < sections.length; i++) {
        if (i === index) {
            sections[i].classList.remove("hide");
            sections[i].classList.add("show");
        } else {
            sections[i].classList.add("hide");
            sections[i].classList.remove("show");
        }
    }
};
