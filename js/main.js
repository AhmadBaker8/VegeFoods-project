

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
  threshold: 0.2 
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


// swiper for section 1
var swiper1 = new Swiper(".section1.mySwiper", {
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
  });
///////////////////////////


// count down
const countDown = ()=>{

    const countDownDate = new Date("2026-01-01T00:00:00").getTime();
    const now = new Date().getTime();
    let distance = countDownDate - now;
  
    let days = Math.floor(distance / (1000*24*60*60));
  
    distance = distance%(1000*24*60*60);
    let hours = Math.floor(distance / (1000*60*60));
  
    distance = distance%(1000*60*60);
    let minutes = Math.floor(distance / (1000*60));
  
    distance = distance%(1000*60);
    let seconds = Math.floor(distance / (1000));
  
    document.getElementById('days').textContent = days;
    document.querySelector('#hours').textContent = hours;
    document.querySelector('#minutes').textContent = minutes;
    document.querySelector('#seconds').textContent = seconds;
}
setInterval(()=>{
  countDown();
},1000);
/////////////////////



// swiper for section6 testimonial
var swiper = new Swiper(".section6 .mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: false,
  },
  breakpoints:{
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










