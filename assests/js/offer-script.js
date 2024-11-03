class Slider {
  constructor(sliderElement, intervalTime = 5000) {
    this.sliderElement = sliderElement;
    this.slides = sliderElement.querySelectorAll(".slide");
    this.currentSlideIndex = 0;
    this.totalSlides = this.slides.length;
    this.intervalTime = intervalTime;
    this.interval = null;

    // Inicializa o primeiro slide como ativo
    this.slides[this.currentSlideIndex].classList.add("active");

    // Vincula os eventos de clique nas setas
    this.sliderElement
      .querySelector(".prev")
      .addEventListener("click", () => this.prevSlide());
    this.sliderElement
      .querySelector(".next")
      .addEventListener("click", () => this.nextSlide());

    // Inicia o autoplay do slider
    this.startAutoPlay();
  }

  nextSlide() {
    this.changeSlide(this.currentSlideIndex + 1);
  }

  prevSlide() {
    this.changeSlide(this.currentSlideIndex - 1);
  }

  changeSlide(newIndex) {
    this.slides[this.currentSlideIndex].classList.remove("active");
    this.currentSlideIndex = (newIndex + this.totalSlides) % this.totalSlides;
    this.slides[this.currentSlideIndex].classList.add("active");
  }

  startAutoPlay() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, this.intervalTime);
  }

  stopAutoPlay() {
    clearInterval(this.interval);
  }
}

// Inicializa o slider para o elemento com o ID 'slider1'
document.addEventListener("DOMContentLoaded", () => {
  const slider1 = new Slider(document.getElementById("slider1"), 5000);
});
