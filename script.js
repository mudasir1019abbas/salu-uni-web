// ================= MOBILE MENU =================

function toggleMenu() {

    const nav = document.querySelector("nav");

    nav.classList.toggle("active");

}


// ================= PERSONALITY CAROUSEL =================

const people = [

    {
        image: "images/person1.jpg",
        name: "Shah Abdul Latif Bhittai",
        description:
            "A great Sindhi Sufi poet and the name behind Shah Abdul Latif University."
    },

    {
        image: "images/person2.jpg",
        name: "University Personality",
        description:
            "A notable personality associated with education and academic development."
    },

    {
        image: "images/person3.jpg",
        name: "Academic Personality",
        description:
            "A respected personality connected with the academic community."
    }

];


let currentSlide = 0;


function showSlide() {

    const image = document.getElementById("person-image");

    const name = document.getElementById("person-name");

    const description =
        document.getElementById("person-description");


    image.src = people[currentSlide].image;

    name.textContent = people[currentSlide].name;

    description.textContent =
        people[currentSlide].description;

}


function nextSlide() {
    currentSlide++;
    if (currentSlide >= people.length) {
        currentSlide = 0;
    }

    showSlide();

}


function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = people.length - 1;
    }

    showSlide();

}


// Automatically change slide every 4 seconds

setInterval(nextSlide, 4000);


// ================= AUTHENTICATION =================

const authOverlay = document.getElementById("auth-overlay");
const authModal = authOverlay ? authOverlay.querySelector(".auth-modal") : null;
const successModal = document.getElementById("success-modal");

function setAuthView(view) {
    authOverlay.classList.add("is-open");
    authOverlay.setAttribute("aria-hidden", "false");
    authModal.classList.toggle("show-register", view === "register");
    document.body.classList.add("auth-open");
}

function closeAuth() {
    authOverlay.classList.remove("is-open");
    authOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("auth-open");
}

function showSuccess(message) {
    document.getElementById("success-message").textContent = message;
    successModal.classList.add("is-open");
    successModal.setAttribute("aria-hidden", "false");
}

function closeSuccess() {
    successModal.classList.remove("is-open");
    successModal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-auth-view]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
        event.preventDefault();
        setAuthView(trigger.dataset.authView);
    });
});

document.querySelector(".auth-close").addEventListener("click", closeAuth);
document.getElementById("success-close").addEventListener("click", closeSuccess);

authOverlay.addEventListener("click", (event) => {
    if (event.target === authOverlay) closeAuth();
});

successModal.addEventListener("click", (event) => {
    if (event.target === successModal) closeSuccess();
});

document.getElementById("register-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);
    localStorage.setItem("saluAccount", JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email").toLowerCase(),
        password: formData.get("password")
    }));

    form.reset();
    closeAuth();
    showSuccess("Your SALU account has been registered successfully.");
});

document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const account = JSON.parse(localStorage.getItem("saluAccount") || "null");
    const email = form.elements.email.value.toLowerCase();
    const password = form.elements.password.value;

    if (!account || account.email !== email || account.password !== password) {
        form.elements.email.classList.add("input-error");
        form.elements.password.classList.add("input-error");
        alert("Please check your email and password, or register a new account first.");
        return;
    }

    form.reset();
    closeAuth();
    showSuccess(`Welcome back, ${account.name}. You have logged in successfully.`);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeAuth();
        closeSuccess();
    }
});