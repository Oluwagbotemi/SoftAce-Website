/* ========================================
   FILES SECTION
======================================== */

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

let activeFileSlide = -1;

function updateFilesSection(index) {
  if (!filesTitle || !filesPreviewMedia) return;
  if (index === activeFileSlide) return;

  activeFileSlide = index;

  const slide = filesSlides[index];
  const nextMediaUrl = new URL(slide.media, window.location.href).href;

  filesTitle.innerHTML = slide.title;

  if (filesPreviewMedia.src !== nextMediaUrl) {
    filesPreviewMedia.src = slide.media;
    filesPreviewMedia.load();
    filesPreviewMedia.play().catch(() => {});
  }
}

function updateFilesProgress(overallProgress) {
  const scaledProgress = overallProgress * filesSlides.length;

  progressBars.forEach((bar, index) => {
    const localProgress = Math.min(
      Math.max(scaledProgress - index, 0),
      1,
    );

    bar.style.setProperty(
      "--progress-value",
      localProgress.toFixed(3),
    );

    bar.classList.toggle("completed", localProgress >= 1);
    bar.classList.toggle(
      "active",
      localProgress > 0 && localProgress < 1,
    );
  });
}

function handleFilesScroll() {
  if (!filesSection) return;

  // Tablet and mobile use the stacked file previews.
  if (window.innerWidth <= 1024) {
    updateFilesSection(0);
    updateFilesProgress(0);
    return;
  }

  const rect = filesSection.getBoundingClientRect();
  const scrollableDistance =
    filesSection.offsetHeight - window.innerHeight;

  if (scrollableDistance <= 0) return;

  const overallProgress = Math.min(
    Math.max(-rect.top / scrollableDistance, 0),
    1,
  );

  const slideIndex = Math.min(
    Math.floor(overallProgress * filesSlides.length),
    filesSlides.length - 1,
  );

  updateFilesSection(slideIndex);
  updateFilesProgress(overallProgress);
}

window.addEventListener("scroll", handleFilesScroll, {
  passive: true,
});

window.addEventListener("resize", handleFilesScroll);

updateFilesSection(0);
updateFilesProgress(0);
handleFilesScroll();

/* ========================================
   FAQ
======================================== */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  if (!question) return;

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

const revealSections =
  document.querySelectorAll(".reveal-section");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(
          "in-view",
          entry.isIntersecting,
        );
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  revealSections.forEach((section) => {
    revealObserver.observe(section);
  });
} else {
  revealSections.forEach((section) => {
    section.classList.add("in-view");
  });
}

/* ========================================
   HERO LOAD REVEAL
======================================== */

window.addEventListener("load", () => {
  document.body.classList.add("hero-loaded");
});

/* ========================================
   HERO BLUR ON SCROLL
======================================== */

const heroSection = document.querySelector("#heroSection");

function updateHeroBlur() {
  if (!heroSection) return;

  const rect = heroSection.getBoundingClientRect();
  const sectionHeight = rect.height;

  if (sectionHeight <= 0) return;

  const scrolled = Math.max(0, -rect.top);
  const progress = Math.min(scrolled / sectionHeight, 1);

  const blurStart = 0.45;
  const blurEnd = 1;

  let blurProgress = 0;

  if (progress > blurStart) {
    blurProgress =
      (progress - blurStart) / (blurEnd - blurStart);

    blurProgress = Math.min(
      Math.max(blurProgress, 0),
      1,
    );
  }

  const blurValue = blurProgress * 10;
  const opacityValue = 1 - blurProgress * 0.18;
  const scaleValue = 1 - blurProgress * 0.015;

  heroSection.style.setProperty(
    "--section-blur",
    `${blurValue}px`,
  );

  heroSection.style.setProperty(
    "--section-opacity",
    opacityValue,
  );

  heroSection.style.setProperty(
    "--section-scale",
    scaleValue,
  );
}

window.addEventListener("scroll", updateHeroBlur, {
  passive: true,
});

window.addEventListener("resize", updateHeroBlur);

updateHeroBlur();