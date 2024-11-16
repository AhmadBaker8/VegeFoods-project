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
  }
  
  /////////////////////////////


// for css 
function hoverIt(n) {
    let i;
    let s = document.querySelectorAll(".cat");
    for (i = 0; i < s.length; i++) {
      s[i].classList.remove("active");
    }
    s[n].classList.add("active");
}
/////////////////////

const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const cart = JSON.parse(localStorage.getItem('cart')) || [];
//api
const getProduct = async (page) => {
    const skip = (page - 1) * 8;
    const {data} = await axios.get(`https://dummyjson.com/products/category/groceries?limit=8&skip=${skip}`);
    return data;

};
const displayProducts = async (page=1) =>{

    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');
    hoverIt(0);
    document.querySelector('.pagination-container').classList.remove('d-none');
    try{
        const products = await getProduct(page);
        const numberOfPages = Math.ceil(products.total / 8);
        const result = products.products.map((element) => {
            return `
                <div class="products col-md-6 col-lg-3 border py-3">
                    <div class="product d-flex flex-column gap-3">
                        <div class="img-product">
                            <img src="${element.thumbnail}" class="img-fluid" alt="">
                        </div>
                        <div class="title-product text-center">
                            <h3>${element.title}</h3>
                            <span class="fs-4">${element.price}$</span>
                        </div>
                    </div>
                    <div class=" buttons d-flex justify-content-center gap-3">
                        <a onclick=addToWishlist(this,${element.id}) ><i  class="${favorites.includes(element.id)?'fa-solid':'fa-regular'} fa-heart heart "></i></a>
                        <a onclick=addToCart(this,${element.id})><i class="${cart.includes(element.id)?'fa-cart-shopping':'fa-cart-plus'} fa-solid"></i></a>
                        <a ><i class="fa-brands fa-buffer"></i></a>
                    </div>
                </div>
            `;            
        }).join(" ");
        
        document.querySelector('.product').innerHTML = result;

        let paginationLink = ``;
        if(page!=1){
           paginationLink+= `<li class="page-item"><button class="page-link" onclick=displayProducts(${page-1}) >&laquo;</button></li>`;
        }else{
            paginationLink+= `<li class="page-item disabled"><button class="page-link">&laquo;</button></li>`;
        }

        for(let i=1;i<=numberOfPages;i++){
            paginationLink+=`<li class="page-item ${page==i?'active':''}"><button class="page-link" onclick=displayProducts(${i}) >${i}</button></li>`;
        }

        if(page==numberOfPages){
            paginationLink+= `<li class="page-item disabled"><button class="page-link" >&raquo;</button></li>`;
        }
        else{
            paginationLink+= `<li class="page-item"><button class="page-link" onclick="displayProducts(${page+1})">&raquo;</button></li>`;
        } 

        document.querySelector('.pagination').innerHTML = paginationLink;
    }
    catch{
        document.querySelector('.product').innerHTML = `<p style="color: #fff;">"error during display data</p>`;
    }
    finally{
        loader.classList.remove('active');
    }
}
displayProducts();

/////////////////////////////////////////



//api
const getVegetables = async () => {
    const {data} = await axios.get(`https://dummyjson.com/products/category/groceries`);
    console.log(data);
    return data;
};
const displayVegetables = async () =>{
    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');
    hoverIt(1);
    document.querySelector('.pagination-container').classList.add('d-none');
    try{
        const vegetables = await getVegetables();
        
        const result = vegetables.products.map((element) => {
            if(element.tags[0]=='vegetables')
            return `
                <div class="products col-md-6 col-lg-3 border py-3">
                    <div class="product d-flex flex-column gap-3">
                        <div class="img-product">
                            <img src="${element.thumbnail}" class="img-fluid" alt="">
                        </div>
                        <div class="title-product text-center">
                            <h3>${element.title}</h3>
                            <span class="fs-4">${element.price}$</span>
                        </div>
                    </div>
                    <div class=" buttons d-flex justify-content-center gap-3">
                        <a onclick=addToWishlist(this,${element.id}) ><i  class="${favorites.includes(element.id)?'fa-solid':'fa-regular'} fa-heart heart "></i></a>
                        <a onclick=addToCart(this,${element.id})><i class="${cart.includes(element.id)?'fa-cart-shopping':'fa-cart-plus'} fa-solid"></i></a>
                        <a ><i class="fa-brands fa-buffer"></i></a>
                    </div>
                </div>
            `;
            
        }).join(" ");
        document.querySelector('.product').innerHTML = result;

        
    }
    catch{
        document.querySelector('.product').innerHTML = `<p style="color: #fff;">"error during display data</p>`;
    }
    finally{
        loader.classList.remove('active');
    }
}
/////////////////////////////////////////




//api
const getFruits = async () => {
    const {data} = await axios.get(`https://dummyjson.com/products/category/groceries`);
    return data;
};
const displayFruits = async () =>{
    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');
    hoverIt(2);
    document.querySelector('.pagination-container').classList.add('d-none');
    try{
        const fruits = await getFruits();
        
        const result = fruits.products.map((element) => {
            if(element.tags[0]=='fruits')
            return `
                <div class="products col-md-6 col-lg-3 border py-3">
                    <div class="product d-flex flex-column gap-3">
                        <div class="img-product">
                            <img src="${element.thumbnail}" class="img-fluid" alt="">
                        </div>
                        <div class="title-product text-center">
                            <h3>${element.title}</h3>
                            <span class="fs-4">${element.price}$</span>
                        </div>
                    </div>
                    <div class=" buttons d-flex justify-content-center gap-3">
                        <a onclick=addToWishlist(this,${element.id}) ><i  class="${favorites.includes(element.id)?'fa-solid':'fa-regular'} fa-heart heart "></i></a>
                        <a onclick=addToCart(this,${element.id})><i class="${cart.includes(element.id)?'fa-cart-shopping':'fa-cart-plus'} fa-solid"></i></a>
                        <a ><i class="fa-brands fa-buffer"></i></a>
                    </div>
                </div>
            `;
            
        }).join(" ");
        document.querySelector('.product').innerHTML = result;

        
    }
    catch{
        document.querySelector('.product').innerHTML = `<p style="color: #fff;">"error during display data</p>`;
    }
    finally{
        loader.classList.remove('active');
    }
}
/////////////////////////////////////////


//api
const getDrinks = async () => {
    const {data} = await axios.get(`https://dummyjson.com/products/category/groceries`);
    console.log(data);
    return data;
};
const displayDrinks = async () =>{
    const loader = document.querySelector('.loader-container');
    loader.classList.add('active');
    hoverIt(1);
    document.querySelector('.pagination-container').classList.add('d-none');
    try{
        const drink = await getDrinks();
        
        const result = drink.products.map((element) => {
            if(element.tags[0]=='beverages')
            return `
                <div class="products col-md-6 col-lg-3 border py-3">
                    <div class="product d-flex flex-column gap-3">
                        <div class="img-product">
                            <img src="${element.thumbnail}" class="img-fluid" alt="">
                        </div>
                        <div class="title-product text-center">
                            <h3>${element.title}</h3>
                            <span class="fs-4">${element.price}$</span>
                        </div>
                    </div>
                    <div class=" buttons d-flex justify-content-center gap-3">
                        <a onclick=addToWishlist(this,${element.id}) ><i  class="${favorites.includes(element.id)?'fa-solid':'fa-regular'} fa-heart heart "></i></a>
                        <a onclick=addToCart(this,${element.id})><i class="${cart.includes(element.id)?'fa-cart-shopping':'fa-cart-plus'} fa-solid"></i></a>
                        <a ><i class="fa-brands fa-buffer"></i></a>
                    </div>
                </div>
            `;
            
        }).join(" ");
        document.querySelector('.product').innerHTML = result;

        
    }
    catch{
        document.querySelector('.product').innerHTML = `<p style="color: #fff;">"error during display data</p>`;
    }
    finally{
        loader.classList.remove('active');
    }
}
/////////////////////////////////////////


// add the products to wishlist
function addToWishlist(getHeart,id){
    heartIcon = getHeart.children[0];
    heartIcon.dataset.productId = id;
    
    heartIcon.classList.toggle("fa-solid");
    heartIcon.classList.toggle("fa-regular");
    const productId = parseInt(heartIcon.dataset.productId);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (heartIcon.classList.contains("fa-solid")) {
        favorites.push(productId);
    } else {
        favorites = favorites.filter(id => id !== productId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addToCart(getCart,id){
    cartIcon = getCart.children[0];
    cartIcon.dataset.productId = id;
    
    cartIcon.classList.toggle("fa-cart-shopping");
    cartIcon.classList.toggle("fa-cart-plus");
    const productId = parseInt(cartIcon.dataset.productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    if (cartIcon.classList.contains("fa-cart-shopping")) {
        cart.push(productId);
    } else {
        cart = cart.filter(id => id !== productId);
    }
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
}
