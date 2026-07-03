const filesSection = document.querySelector(".files-section");
const filesTitle = document.querySelector("#filesTitle");
const filesPreviewMedia = document.querySelector("#filesPreviewMedia");
const progressBars = document.querySelectorAll(".files-progress span");

const filesSlides = [
  {
    title: "INTERACT WITH ORGANIZED<br />FILES & FOLDERS",
    media: "./assets/videos/files-preview-1.webm",
  },
  {
    title: "WORK WITH STRUCTURED<br />CABINETS",
    media: "./assets/videos/files-preview-2.webm",
  },
  {
    title: "MANAGE DOCUMENTS<br />WITH CLARITY",
    media: "./assets/videos/files-preview-3.webm",
  },
];

let activeFileSlide = 0;

function updateFilesSection(index) {
  if (index === activeFileSlide) return;

  activeFileSlide = index;
  const slide = filesSlides[index];

  filesTitle.innerHTML = slide.title;
  filesPreviewMedia.src = slide.media;
  filesPreviewMedia.load();

  filesPreviewMedia.play().catch(() => {});

  progressBars.forEach((bar, barIndex) => {
    bar.classList.toggle("active", barIndex === index);
  });
}

window.addEventListener("scroll", () => {
  const rect = filesSection.getBoundingClientRect();
  const sectionHeight = filesSection.offsetHeight - window.innerHeight;
  const progress = Math.min(Math.max(-rect.top / sectionHeight, 0), 1);

  let index = 0;

  if (progress > 0.66) {
    index = 2;
  } else if (progress > 0.33) {
    index = 1;
  }

  updateFilesSection(index);
});

/* ========================================
   FAQ
======================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    faqItems.forEach((faq) => {
      if (faq !== item) {
        faq.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});


/* ========================================
   REVEAL SECTION
======================================== */

const revealSections = document.querySelectorAll(".reveal-section");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealSections.forEach((section) => {
  revealObserver.observe(section);
});