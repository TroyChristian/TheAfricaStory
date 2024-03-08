document.querySelectorAll(".carousel").forEach((carousel) => {
    const items = carousel.querySelectorAll(".carousel__item");
    const buttonsHtml = Array.from(items, () => {
        return `<span class="carousel__button"></span>`;
    });

    carousel.insertAdjacentHTML(
        "beforeend",
        `
          <div class="carousel__nav">
              ${buttonsHtml.join("")}
          </div>
      `
    );

    const buttons = carousel.querySelectorAll(".carousel__button");

    buttons.forEach((button, i) => {
        button.addEventListener("click", () => {
            // un-select all the items
            items.forEach((item) =>
                item.classList.remove("carousel__item--selected")
            );
            buttons.forEach((button) =>
                button.classList.remove("carousel__button--selected")
            );

            items[i].classList.add("carousel__item--selected");
            button.classList.add("carousel__button--selected");
        });
    });

    // Select the first item on page load
    items[0].classList.add("carousel__item--selected");
    buttons[0].classList.add("carousel__button--selected");
});



// this code below is for the timed carousel

document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const images = document.querySelectorAll(".img_div .author_pic");
    const totalImages = images.length;
    const textSection = document.querySelector('.fade'); // Get the text container

    // Function to update the carousel
    function updateCarousel() {
        images.forEach((img, index) => {
            img.style.display = 'none'; // Hide all images
            img.classList.remove('active');
        });
        images[currentIndex].style.display = 'block'; // Show current image
        images[currentIndex].classList.add('active');

        currentIndex = (currentIndex + 1) % totalImages; // Update index
    }

    // Initial call and set interval for updating carousel
    updateCarousel(); // Show first image immediately
    setInterval(updateCarousel, 5500); // Update every 5.5 seconds

    // Intersection Observer for the text fade-in effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the item is in view

    observer.observe(textSection); // Start observing the text container
});



document.addEventListener('DOMContentLoaded', () => {
    const footerLinks = document.querySelectorAll('.micro-footer .link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default anchor behavior
            const popupContainer = document.getElementById('popupContainer');
            const popupBody = document.getElementById('popupBody');
            popupBody.innerHTML = `<h2>${this.textContent}</h2><p>Content for ${this.textContent}...</p>`; // Example content
            popupContainer.style.display = 'flex'; // Show the popup
        });
    });
});

function closePopup() {
    document.getElementById('popupContainer').style.display = 'none';
}

const popupContent = {
    "FAQ": "<h2>FAQ</h2><h3>Who is the intended audience for this book?</h3><p>This book is young adult non-fiction intended for readers 13 years old and up.</p>",
    "Downloads & Refunds": "<h2>Downloads & Refunds</h2><p>Your download should complete automatically after a succesful payment. If you encounter an issue please email us at ReadTheAfricaStory@gmail.com. All sales are final.</p>",
    "File Type Advice": "<h2>File Type Advice</h2><p>The PDF file type is widely compatible with all systems. If you are using an Apple device EPUB is an excellent choice, and if you are using a kindle you should select the AZW3 checkout button for the best experience.</p>",
    "Payment Methods": "<h2>Payment Methods</h2><p>All payments are processed through Stripe, an industry leader for online payments. We do not store or recieve any of your financial details.</p>"
};


document.addEventListener('DOMContentLoaded', () => {
    const footerLinks = document.querySelectorAll('.micro-footer .link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default anchor behavior
            const popupContainer = document.getElementById('popupContainer');
            const popupBody = document.getElementById('popupBody');
            // Use the link text to determine which content to display
            const linkText = this.textContent.trim(); // Trim to ensure no extra whitespace
            const content = popupContent[linkText] || "Content not found."; // Fallback content
            popupBody.innerHTML = content; // Set the content
            popupContainer.style.display = 'flex'; // Show the popup
        });
    });
});

function closePopup() {
    document.getElementById('popupContainer').style.display = 'none';
}