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

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let fav = document.querySelector('.cart-items');
    fav.innerHTML = '';
  
    if (cart.length === 0) {
      fav.innerHTML = '<li class="py-5 fw-bold fs-5">No items in your cart.</li>';
      return;
    }
  
    async function renderCart() {
      fav.innerHTML = '';
      for (const productId of cart) {
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
            <td><input type="text" name="quantity" class="quantity form-control input-number text-center" value="1" min="1" max="100"></td>

            <td class="total-price">${product.price}$</td>
          `;
  
          fav.appendChild(productRow);
        } catch {
          console.log("Error fetching product");
        }
      }
  
      document.querySelectorAll('.remove-icon').forEach(icon => {
        icon.addEventListener('click', removeFromCart);
      });

      document.querySelectorAll('.quantity').forEach(input => {
        input.addEventListener('input', updateTotal);
      });

      updateGrandTotal();
    }


    function updateTotal(event) {
        const quantityInput = event.target;
        const productRow = quantityInput.closest('tr');
        const price = parseFloat(productRow.querySelector('td:nth-child(4)').innerText.replace('$', ''));
        const quantity = parseInt(quantityInput.value) || 1;
    
        // Calculate the total for this product row
        const totalPrice = price * quantity;
        productRow.querySelector('.total-price').innerText = `${totalPrice.toFixed(2)}$`;
    
        updateGrandTotal(); // Update the grand total after each change
    }
    //update the grant total
    function updateGrandTotal() {
      let grandTotal = 0;
      document.querySelectorAll('.total-price').forEach(totalPriceElement => {
        const total = parseFloat(totalPriceElement.innerText.replace('$', ''));
        grandTotal += total;
      });
        
      // Display the grand total below the cart (you can add this element in your HTML)
      let grandTotalElement = document.querySelectorAll('.total-for-pay');
      grandTotalElement[0].innerText = `${grandTotal.toFixed(2)}$`;
      grandTotalElement[1].innerText = `${grandTotal.toFixed(2)}$`;
    }



  
    function removeFromCart(event) {
      const productId = event.target.getAttribute('data-product-id');
      cart = cart.filter(id => Number(id) !== Number(productId));
      localStorage.setItem('cart', JSON.stringify(cart));
  
      const productRow = document.querySelector(`tr[data-product-id="${productId}"]`);
      if (productRow) {
        productRow.remove();
      }
    }
    await renderCart();
  });
  