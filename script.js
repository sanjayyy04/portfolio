
let more_internship = document.getElementById("Internship_more");
let Experience_more = document.getElementById("Experience_more");
let Experience_container = document.getElementById("Experience_container");
let detail_container = document.getElementById("detail-container");
let BrainCraft_more = document.getElementById("BrainCraft_more");
let project_container = document.getElementById("project-container");
let menu_btn = document.getElementById("menu-btn");
let close_btn = document.getElementById("close-btn");
let menu = document.getElementById("ul");

// Scroll Spy: Highlight active nav link on scroll
const sections = document.querySelectorAll("section"); // all sections
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150; // adjust for header height
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



// Experiance read more toggle
Experience_more.addEventListener("click", function () {
    if (Experience_container.style.display == "none") {
        Experience_container.style.display = "block";
        Experience_more.innerText = "<";
        Experience_more.style.background = "red";

    } else {
        Experience_container.style.display = "none";
        Experience_more.innerText = ">";
        // more_internship.style.background = " #292929";

       
    }
});


// Internship read more toggle
more_internship.addEventListener("click", function () {
    if (detail_container.style.display == "none") {
        detail_container.style.display = "block";
        more_internship.innerText = "<";
        more_internship.style.background = "red";

    } else {
        detail_container.style.display = "none";
        more_internship.innerText = ">";
        // more_internship.style.background = " #292929";

       
    }
});

// Project read more toggle
BrainCraft_more.addEventListener("click", function () {
    if (project_container.style.display == "none") {
        project_container.style.display = "block";
        BrainCraft_more.style.background = "red";
        BrainCraft_more.innerText = "<";
    } else {
        project_container.style.display = "none";
        // BrainCraft_more.style.background = " #292929";
        BrainCraft_more.innerText = ">";
    }
});

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
