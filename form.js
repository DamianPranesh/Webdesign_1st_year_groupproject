document.addEventListener("DOMContentLoaded", function() {

    

    const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));

  
    function getOrderSummary() {
      let totalPrice = 0;
      let items = '';
  
      cartItems.forEach(item => {
        totalPrice += parseFloat(item.price.replace('Rs.', '') * item.quantity);
        items += `<div class="order-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div>
                      <p class="item-name">${item.title}</p>
                      <p>Quantity: ${item.quantity}</p>
                      <p>Price: Rs. ${item.price.replace('Rs.', '') * item.quantity}</p>
                    </div>
                  </div>`;
      });
  
      return {
        totalPrice: `Rs. ${totalPrice.toFixed(2)}`,
        items: items
        
      };
    }

    displayOrderSummary();  
  
    function displayOrderSummary() {
      const orderSummary = getOrderSummary();
  
      const orderCart = document.getElementById('orderCart');
      orderCart.innerHTML = `
        <div class="order-summary">
          <h3 class="form-h3">Order Summary</h3>
          ${orderSummary.items}
          <div class="order-total">
            <p>Total:</p>
            <p class="order-total-value">${orderSummary.totalPrice}</p>
          </div>
        </div>
      `;
      
    }
  
    displayOrderSummary();


    


  });

  
