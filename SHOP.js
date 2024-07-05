document.addEventListener("DOMContentLoaded", function() {
    const viewCartButton = document.querySelector("#viewcart-button");
    const cartPage = document.querySelector(".cart-page");
    const closeCart = document.querySelector(".close");
    



    viewCartButton.addEventListener("click", () => {
        cartPage.classList.add("active");

    });

    closeCart.addEventListener("click", () => {
        cartPage.classList.remove("active");

    });


    let previewContainer = document.querySelector('.product-preview');
    let previewBox = previewContainer.querySelectorAll('.preview');

    document.querySelectorAll('.products-container .productSet').forEach(productSet => {
        productSet.onclick = () => {

            previewContainer.style.display = 'flex';
            let name = productSet.getAttribute('data-name');
            previewBox.forEach(preview => {
                let target = preview.getAttribute('data-target');
                if(name == target){
                    preview.classList.add('active');
                } else {
                    preview.classList.remove('active');
                }
            });
        };
    });


    previewBox.forEach(close =>{
        close.querySelector('.preview-close').onclick = () =>{
            close.classList.remove('active');
            previewContainer.style.display = 'none';
        };

    });

    var addToCartButtons = document.getElementsByClassName('preview-button')
    for (var i=0; i <addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        if(!button.hasAttribute('data-clicked')){
            button.setAttribute('data-clicked' , true);
            button.addEventListener('click', addToCartClicked)

        }

    }

    function addToCartClicked(event) {
        var button = event.target;
        var shopItem = button.parentElement;
        var title = shopItem.getElementsByClassName('preview-h3')[0].innerText;
        var price = shopItem.getElementsByClassName('preview-price')[0].innerText;
        var imageSrc = shopItem.getElementsByClassName('preview-img')[0].src;

        console.log(title,price, imageSrc);
        addItemToCart(title,price, imageSrc);

        const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];


        
        const cartItem = {
            title: title,
            price: price,
            image: imageSrc,
            quantity: 1 
        };




        cartItems.push(cartItem);

      
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      
        updateCartTotal();
        updateCount(1);
        displayOrderSummary();
    }
    function funcQtyChange(event) {
        const button = event.target;
        const isIncrease = button.classList.contains('increase');
        const quantityElement = button.parentElement.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);

        if (isIncrease) {
            quantity++;
        } else {
            if (quantity > 1) {
                quantity--;
            }
        }

        quantityElement.textContent = quantity;

        updateCartTotal();
    }
    
    function addItemToCart(title, price, imageSrc){
        var cartRow = document.createElement('div')
        var cartItems = document.getElementsByClassName('listCart')[0]

        var cartRowContents = `
            <div class="item">
            <img class="listImg1"src="${imageSrc}" alt="img1">         
            <div class="cart-details">
                <div class="name">${title}</div>
                <div class="totalPrice">${price}</div>
                <div class="quantity-box">
                    <span class="decrease">-</span>
                    <span class="quantity">1</span>
                    <span class="increase">+</span>
                </div>
                <img class="trash" src="Images/bin.png">
            </div>    
            </div>`
        cartRow.innerHTML = cartRowContents       
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('trash')[0].addEventListener('click',
        removeCartItem)
        cartRow.querySelector('.increase').addEventListener('click', funcQtyChange);
        cartRow.querySelector('.decrease').addEventListener('click', funcQtyChange);
        var cartItems= document.getElementsByClassName('listCart')[0];

    }



    var removeCartButtons = document.getElementsByClassName('trash')
    for (var i=0;  i<removeCartButtons.length; i++){
        var removeButton = removeCartButtons[i]
        removeButton.addEventListener('click' , removeCartItem)

    }
    function removeCartItem(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal();
        updateCount(-1);
        displayOrderSummary();
    }
    function updateCount(count){
        var cartCount = document.querySelector('.cart-span');
        var currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + count;

    }

    function updateCartTotal(){

        var cartItemContainer = document.getElementsByClassName('listCart')[0]
        var cartRows = cartItemContainer.getElementsByClassName('item')
        var total = 0
        for(var i = 0; i< cartRows.length; i++){
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('totalPrice')[0]
            var quantityElement = cartRow.getElementsByClassName('quantity')[0]
            var price = parseFloat(priceElement.innerText.replace('Rs.',''))
            var quantity = parseInt(quantityElement.textContent);
            total = total +(price * quantity)
        }

        document.getElementsByClassName('cart-total')[0].innerText = 'Rs.' + total

    }

});
