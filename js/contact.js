
// loading sections while scrolling
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
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




//for google map
let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"),{
    center: { lat: 32.46111, lng: 35.30000 },
    zoom: 8,
  });

}

initMap();