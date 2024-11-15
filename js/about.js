// counter set in about page
let counterInterval;
let count1 = 0, count2 = 0, count3 = 0, count4 = 0;

const target1 = 10000, target2 = 1000, target3 = 100, target4 = 100;

const duration = 5000;

const step1 = target1 / (duration / 10);
const step2 = target2 / (duration / 10);
const step3 = target3 / (duration / 10);
const step4 = target4 / (duration / 10);

function updateCounters() {
    let completed = true;

    if (count1 < target1) {
        count1 += step1;
        document.getElementById('number1').textContent = Math.floor(count1);
        completed = false;
    } else {
        count1 = target1;
    }

    if (count2 < target2) {
        count2 += step2;
        document.getElementById('number2').textContent = Math.floor(count2);
        completed = false;
    } else {
        count2 = target2;
    }

    if (count3 < target3) {
        count3 += step3;
        document.getElementById('number3').textContent = Math.floor(count3);
        completed = false;
    } else {
        count3 = target3;
    }

    if (count4 < target4) {
        count4 += step4;
        document.getElementById('number4').textContent = Math.floor(count4);
        completed = false;
    } else {
        count4 = target4;
    }

    if (completed) {
        clearInterval(counterInterval);
    }
}
//////////////////////////////




// loading sections while scrolling
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
            const myCounter = document.querySelector('.counter');
            if(entry.target==myCounter){
              counterInterval = setInterval(updateCounters, 10);//for counting
            }
        }
    });
  }, {
    threshold: 0.3 
  });
  const sections = document.querySelectorAll('.section');
  console.log(sections)
  sections.forEach(section => {
    observer.observe(section);
  });
  //////////////////////////////



  // for navbar
window.onscroll = ()=>{
    const navBar = document.querySelector('.navbar');
    const myCart = document.querySelector('.cart');
    if(window.scrollY>400){
        navBar.classList.add('nav-nav');
        myCart.classList.add('my-cart');
    }
    else{
        navBar.classList.remove('nav-nav');
        myCart.classList.remove('my-cart');

    }
}

function plusUnderline(n) {
  showUnderline(n);
}

function showUnderline(n) {
  let i;
  let s = document.querySelectorAll(".nav-link");
  for (i = 0; i < s.length; i++) {
    s[i].classList.remove("active");
  }
  s[n].classList.add("active");
  console.log(s)
}

/////////////////////////////




// swiper for section6 testimonial
var swiper = new Swiper(".section6 .mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      1000: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
  ////////////////////////////






