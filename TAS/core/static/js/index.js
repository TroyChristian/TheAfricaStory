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
