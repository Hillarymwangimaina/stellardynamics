// FAQ Toggle
let activeFaq = null;

function toggleFaq(index) {
  const answer = document.getElementById(`faq-answer-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);

  if (activeFaq === index) {
    answer.classList.toggle("hidden");
    icon.style.transform = "rotate(0deg)";
    activeFaq = null;
  } else {
    document.querySelectorAll('[id^="faq-answer"]').forEach(el => el.classList.add("hidden"));
    document.querySelectorAll('[id^="faq-icon"]').forEach(el => el.style.transform = "rotate(0deg)");
    answer.classList.remove("hidden");
    icon.style.transform = "rotate(180deg)";
    activeFaq = index;
  }
}

// Partner Logos scrolling
const partners = [
  { name: "NASA", logo: "https://th.bing.com/th/id/OIP.YJmEL9qiP7yqMmD3PFKFRQHaDt?w=350&h=175&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" },
  { name: "ESA", logo: "https://th.bing.com/th/id/OIP.E04CGX1tOMELMxdq-gBlowHaHa?w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" },
  { name: "ISRO", logo: "https://th.bing.com/th/id/OIP.G7geNTd5nf_KJ3uTJd29IwHaEy?w=245&h=180&c=7&r=0&o=5&pid=1.7" },
  { name: "Blue Origin", logo: "https://th.bing.com/th/id/OIP.lk8u4m1S1I_SgdLWY7mH2QHaFj?w=213&h=180&c=7&r=0&o=5&pid=1.7" },
  { name: "SpaceX", logo: "https://th.bing.com/th?q=Neon+Green+SpaceX+Logo&w=120&h=120&c=1&rs=1&qlt=90&r=0&cb=1&pid=InlineBlock&mkt=en-WW&cc=KE&setlang=en&adlt=moderate&t=1&mw=247" }
];

// duplicate partners to scroll infinitely
const duplicatedPartners = [...partners, ...partners, ...partners];
const partnerScroll = document.getElementById('partnerScroll');

if (partnerScroll) {
  duplicatedPartners.forEach((partner) => {
    const div = document.createElement('div');
    div.className = 'mx-6 inline-block';
    div.innerHTML = `
      <div class="bg-white text-black px-6 py-3 rounded-full shadow-lg flex items-center justify-center hover:shadow-blue-400/20 hover:scale-105 transition-all h-16 min-w-[180px]">
        <img src="${partner.logo}" alt="${partner.name}" class="h-10 max-w-[160px] object-contain" />
      </div>`;
    partnerScroll.appendChild(div);
  });
} else {
  console.warn("Partner scroll container (#partnerScroll) not found.");
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const errorEmail = document.getElementById('error-email');
const errorRequest = document.getElementById('error-request');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const request = document.getElementById('request').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    errorEmail.classList.add('hidden');
    errorRequest.classList.add('hidden');

    if (!email || !emailRegex.test(email)) {
      errorEmail.classList.remove('hidden');
      valid = false;
    }
    if (!request) {
      errorRequest.classList.remove('hidden');
      valid = false;
    }

    if (valid) {
      successMessage.classList.remove('hidden');
      errorMessage.classList.add('hidden');
      setTimeout(() => {
        contactForm.reset();
        successMessage.classList.add('hidden');
      }, 5000);
    } else {
      errorMessage.classList.remove('hidden');
      successMessage.classList.add('hidden');
    }
  });
}


// Smooth anchor scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
    window.scrollTo({
      top: targetElement.offsetTop - navbarHeight,
      behavior: 'smooth'
    });
  });
});

// Testimonial carousel logic with disabled buttons at edges
const testimonialCarousel = document.getElementById('testimonialCarousel');
const nextBtn = document.getElementById('nextTestimonial');
const prevBtn = document.getElementById('prevTestimonial');

if (testimonialCarousel && nextBtn && prevBtn) {
  const cards = testimonialCarousel.querySelectorAll('.testimonial-card');
  let currentIndex = 0;

  function scrollToCard(index) {
    if (index < 0 || index >= cards.length) return;
    const card = cards[index];
    testimonialCarousel.scrollTo({
      left: card.offsetLeft,
      behavior: 'smooth'
    });
  }

  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;

    prevBtn.classList.toggle('opacity-50', prevBtn.disabled);
    prevBtn.classList.toggle('cursor-not-allowed', prevBtn.disabled);

    nextBtn.classList.toggle('opacity-50', nextBtn.disabled);
    nextBtn.classList.toggle('cursor-not-allowed', nextBtn.disabled);
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      scrollToCard(currentIndex);
      updateButtons();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      scrollToCard(currentIndex);
      updateButtons();
    }
  });

  testimonialCarousel.addEventListener('scroll', () => {
    const scrollLeft = testimonialCarousel.scrollLeft;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    if (closestIndex !== currentIndex) {
      currentIndex = closestIndex;
      updateButtons();
    }
  });

  scrollToCard(0);
  updateButtons();
} else {
  console.warn("Testimonial carousel or navigation buttons missing");
}
