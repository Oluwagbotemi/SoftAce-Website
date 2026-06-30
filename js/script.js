const filesSection = document.querySelector(".files-section");
const filesTitle = document.querySelector("#filesTitle");
const filesPreviewImage = document.querySelector("#filesPreviewImage");
const testimonialCard = document.querySelector("#testimonialCard");
const progressBars = document.querySelectorAll(".files-progress span");

const filesSlides = [
  {
    title: "INTERACT WITH ORGANIZED<br />FILES & FOLDERS",
    image: "./assets/images/files-preview-1.png",
    label: "Library",
    text: `The library has become our single source of truth. <strong>Everyone knows where documents belong.</strong>`,
    person: "./assets/images/testimonial-1.png",
    name: "JEREMIAH FOLORUNSO",
    role: "UX Consultant, Soft Alliance",
  },
  {
    title: "REVIEW DOCUMENTS<br />WITHOUT CONFUSION",
    image: "./assets/images/files-preview-2.png",
    label: "Approvals",
    text: `Approvals are now easier to track. <strong>Teams know what needs attention and what has been completed.</strong>`,
    person: "./assets/images/testimonial-2.png",
    name: "ESEOSA BELO-OSAGIE",
    role: "Product Designer, Soft Alliance",
  },
  {
    title: "KEEP WORKFLOWS<br />MOVING FASTER",
    image: "./assets/images/files-preview-3.png",
    label: "Workflow",
    text: `We spend less time chasing updates. <strong>SoftAce helps everyone stay aligned.</strong>`,
    person: "./assets/images/testimonial-3.png",
    name: "SOFTACE USER",
    role: "Operations Team",
  },
];

let activeFileSlide = 0;

function updateFilesSection(index) {
  if (index === activeFileSlide) return;

  activeFileSlide = index;
  const slide = filesSlides[index];

  filesTitle.innerHTML = slide.title;
  filesPreviewImage.src = slide.image;

  testimonialCard.innerHTML = `
    <p class="testimonial-label">${slide.label}</p>

    <p class="testimonial-text">${slide.text}</p>

    <img src="${slide.person}" alt="" class="testimonial-person" />

    <div class="testimonial-info">
      <h3>${slide.name}</h3>
      <p>${slide.role}</p>
    </div>
  `;

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