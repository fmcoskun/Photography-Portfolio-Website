// CHANGE NAV STYLE ON SCROLL
window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('window-scrolled', window.scrollY > 0);
})


// CONTACT BUTTONS (CIRCULAR TEXT BUTTONS)
const textButtons = document.querySelectorAll('.contact_btn');

textButtons.forEach(textButton => {
    let text = textButton.querySelector('p');

    text.innerHTML = text.innerHTML.split('').map((character, index) => `<span style="transform: rotate(${index * 12}deg)">${character}</span>`).join('')
})



// SWIPER JS (GALLERY SECTION)
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        599: {
            slidesPerView: 2,
            spaceBetween: 40
        },
        1023: {
            slidesPerView: 3,
            spaceBetween: 60
        }
    }
  });



  const nav = document.querySelector('.nav_links');
  const openNavBtn = document.querySelector('#nav_toggle-open');
  const closeNavBtn = document.querySelector
  ('#nav_toggle-close');

  const openNav = () => {
    nav.style.display = 'flex';
    openNavBtn.style.display = 'none';
    closeNavBtn.style.display = 'inline-block';
  }

  openNavBtn.addEventListener('click', openNav);


  const closeNav = () => {
    nav.style.display = 'none';
    openNavBtn.style.display = 'inline-block';
    closeNavBtn.style.display = 'none';
  }

  closeNavBtn.addEventListener('click', closeNav);



  // CLOSE NAV MENU ON CLICK OF MENU LINK
  if(document.body.clientWidth < 1024) {
    nav.querySelectorAll('li a').forEach(navLink => {
        navLink.addEventListener('click', closeNav);
      })
  }


// LIGHTBOX (GALLERY SECTION)
const galleryImages = [...document.querySelectorAll('.mySwiper .swiper-slide img')];
const lightbox = document.querySelector('#lightbox');
const lightboxImg = lightbox.querySelector('img');
let lightboxIndex = 0;

const showLightboxImage = index => {
  lightboxIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[lightboxIndex].src;
  lightboxImg.alt = galleryImages[lightboxIndex].alt;
}

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => {
    showLightboxImage(index);
    lightbox.showModal();
  });
});

lightbox.querySelector('.lightbox_prev').addEventListener('click', () => showLightboxImage(lightboxIndex - 1));
lightbox.querySelector('.lightbox_next').addEventListener('click', () => showLightboxImage(lightboxIndex + 1));
lightbox.querySelector('.lightbox_close').addEventListener('click', () => lightbox.close());

// Close when clicking the dark backdrop (outside the image box)
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener('keydown', event => {
  if (!lightbox.open) return;
  if (event.key === 'ArrowLeft') showLightboxImage(lightboxIndex - 1);
  if (event.key === 'ArrowRight') showLightboxImage(lightboxIndex + 1);
});


// CONTACT FORM (OPENS MODAL, SENDS VIA THE VISITOR'S MAIL CLIENT)
const contactModal = document.querySelector('#contact_modal');
const contactForm = contactModal.querySelector('form');
const CONTACT_EMAIL = 'fmcoskun@gmail.com';

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  // Keep the footer and nav email links as plain mailto links
  if (link.classList.contains('footer_btn')) return;
  link.addEventListener('click', event => {
    event.preventDefault();
    contactModal.showModal();
  });
});

contactModal.querySelector('.contact_close').addEventListener('click', () => contactModal.close());

contactModal.addEventListener('click', event => {
  if (event.target === contactModal) contactModal.close();
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  contactForm.reset();
  contactModal.close();
});