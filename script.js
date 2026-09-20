document.querySelectorAll(".nav-links a").forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const section = document.querySelector(
            this.getAttribute("href")
        );

        section.scrollIntoView({
            behavior: "smooth"
        });

    });

});

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const response = await fetch("contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    });

    const result = await response.json();

    alert(result.message);

    contactForm.reset();
});
