const controls = document.querySelectorAll(".control");
let currentItem = 0;
const items = document.querySelectorAll(".item");
const maxItems = items.length;

controls.forEach((control) => {
  control.addEventListener("click", () => {
    const isLeft = control.classList.contains("arrow-left");

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxItems) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxItems - 1;
    }

    items.forEach((item) => item.classList.remove("current-item"));

    items[currentItem].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });

    items[currentItem].classList.add("current-item");
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => {
      slide.classList.remove('active');
    });

    indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });

    document.documentElement.classList.remove('slide1-bg', 'slide2-bg', 'slide3-bg', 'slide4-bg', 'slide5-bg');

    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    document.documentElement.classList.add(`slide${index + 1}-bg`);

    currentSlide = index;
  }

  prevBtn.addEventListener('click', function () {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
      newIndex = slides.length - 1;
    }
    showSlide(newIndex);
  });

  nextBtn.addEventListener('click', function () {
    let newIndex = currentSlide + 1;
    if (newIndex >= slides.length) {
      newIndex = 0;
    }
    showSlide(newIndex);
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function () {
      showSlide(index);
    });
  });

  showSlide(0);
});


const carousel = document.getElementById('carousel');
const images = document.querySelectorAll('.item');
const popupOverlay = document.getElementById('popupOverlay');
const popupImage = document.getElementById('popupImage');
const popupClose = document.getElementById('popupClose');

let currentIndex = 0;
const totalImages = images.length;

function updateCarousel() {
  const translateX = -currentIndex * (100 / totalImages);
  carousel.style.transform = `translateX(${translateX}%)`;

  rightArrow.addEventListener('click', () => {
    currentIndex = currentIndex < totalImages - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  });
};

images.forEach((image) => {
  image.addEventListener('click', () => {
    popupImage.src = image.src;
    popupImage.alt = image.alt;
    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closePopup() {
  popupOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

popupClose.addEventListener('click', closePopup);

popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    closePopup();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
    closePopup();
  }
});