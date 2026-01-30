
let more_internship = document.getElementById("Internship_more");
let Experience_more = document.getElementById("Experience_more");
let Experience_container = document.getElementById("Experience_container");
let detail_container = document.getElementById("detail-container");
let BrainCraft_more = document.getElementById("BrainCraft_more");
let project_container = document.getElementById("project-container");
let menu_btn = document.getElementById("menu-btn");
let close_btn = document.getElementById("close-btn");
let menu = document.getElementById("ul");
let control_close = document.getElementById("control-close");

const braincraft = document.querySelector(".braincraft");
const internship = document.querySelector(".internship");
const internship_div = document.querySelector(".internship-div");

// ------------------------------------------------ Scroll Spy ----------------------------------------------------------
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// ------------------------------------------------ Lazy Load ------------------------------------------------
var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy",
    threshold: 300,
    callback_loaded: function (el) {
        el.classList.add("loaded");
    },
    callback_error: function (el) {
        console.error("Error loading", el.getAttribute("data-src"));
    }
});

// ------------------------------------------------ Experience Toggle ------------------------------------------------
Experience_more.addEventListener("click", function () {
    if (Experience_container.style.display === "none" || Experience_container.style.display === "") {
        Experience_container.style.display = "block";
        Experience_more.innerText = "<";
        Experience_more.style.background = "red";
        internship.style.animation = "none";

    } else {
        Experience_container.style.display = "none";
        Experience_more.innerText = ">";
        internship.style.animation = "cards";

    }
});

// ------------------------------------------------ Internship Toggle ------------------------------------------------
more_internship.addEventListener("click", function () {
    if (detail_container.style.display === "none" || detail_container.style.display === "") {
        detail_container.style.display = "block";
        more_internship.innerText = "<";
        more_internship.style.background = "red";
        internship_div.style.animation = "none";
    } else {
        detail_container.style.display = "none";
        more_internship.innerText = ">";
        internship_div.style.animation = "cards";
    }
});

// ------------------------------------------------ Project Toggle ----------------------------------------------------------
BrainCraft_more.addEventListener("click", function () {
    if (project_container.style.display === "none" || project_container.style.display === "") {
        project_container.style.display = "block";
        BrainCraft_more.style.background = "red";
        BrainCraft_more.innerText = "<";
        braincraft.style.animation = "none";
    } else {
        project_container.style.display = "none";
        BrainCraft_more.innerText = ">";
        braincraft.style.animation = "cards";
    }
});

// ------------------------------------------------ Menu Toggle ----------------------------------------------------------
menu_btn.addEventListener("click", function () {
    menu.classList.add("open");
    menu_btn.style.display = "none";
    close_btn.style.display = "block";
});

close_btn.addEventListener("click", function () {
    menu.classList.remove("open");
    menu_btn.style.display = "block";
    close_btn.style.display = "none";
});

document.addEventListener("click", function (e) {
    if (
        menu.classList.contains("open") &&
        !menu.contains(e.target) &&
        !menu_btn.contains(e.target) &&
        !close_btn.contains(e.target)
    ) {
        menu.classList.remove("open");
        menu_btn.style.display = "block";
        close_btn.style.display = "none";
    }
});

// --------------------------------------- Anti Inspect / DevTools Detection --------------------------------------

// // Disable right-click
// document.addEventListener("contextmenu", e => e.preventDefault());

// Disable common inspect shortcuts
// document.onkeydown = function (e) {
//     if (
//         e.keyCode === 123 || // F12
//         (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
//         (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
//         (e.ctrlKey && e.keyCode === 85) // Ctrl+U
//     ) {
//         e.preventDefault();
//     }
// };

// // Detect if DevTools are open (for casual users)
// setInterval(function () {
//     const threshold = 160;
//     if (
//         window.outerWidth - window.innerWidth > threshold ||
//         window.outerHeight - window.innerHeight > threshold
//     ) {
//         document.body.innerHTML = "";
//         alert("Developer tools are disabled on this site.");
//         window.location.reload();
//     }
// }, 1000);

