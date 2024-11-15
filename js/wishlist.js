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





  const getProduct = async (productId) => {
    const { data } = await axios.get(`https://dummyjson.com/products/${productId}`);
    return data;
  };
  
  document.addEventListener('DOMContentLoaded', async () => {

    let wishlist = JSON.parse(localStorage.getItem('favorites')) || [];
    const fav = document.querySelector('.wishlist-items');
    fav.innerHTML = '';
  
    if (wishlist.length === 0) {
      fav.innerHTML = '<li class="py-5 fw-bold fs-5">No items in your wishlist.</li>';
      return;
    }
  
    async function renderWishlist() {
      fav.innerHTML = ''; // Clear existing items
      for (const productId of wishlist) {
        try {
          const product = await getProduct(productId);
  
          const productRow = document.createElement('tr');
          productRow.dataset.productId = productId;
  
          productRow.innerHTML = `
            <td><span data-product-id="${productId}" class="remove-icon">&times;</span></td>
            <td><img src="${product.thumbnail}" class="product-image"></td>
            <td>
              <strong>${product.title}</strong>
              <p>${product.description}</p>
            </td>
            <td>${product.price}$</td>
            <td><a href="#" class="btn">ADD</a></td>
          `;
  
          fav.appendChild(productRow);
        } catch {
          console.log("Error fetching product");
        }
      }
  
      document.querySelectorAll('.remove-icon').forEach(icon => {
        icon.addEventListener('click', removeFromWishlist);
      });
    }
  
    function removeFromWishlist(event) {
      const productId = event.target.getAttribute('data-product-id');
      wishlist = wishlist.filter(id => Number(id) !== Number(productId));
      localStorage.setItem('favorites', JSON.stringify(wishlist));
  
      const productRow = document.querySelector(`tr[data-product-id="${productId}"]`);
      if (productRow) {
        productRow.remove();
      }
    }
    await renderWishlist();
  });
  




