let cart = [];

function addToCart(event) {
    const button = event.target;
    const itemName = button.getAttribute('data-name');
    const itemPrice = button.getAttribute('data-price');

    const item = {
        name: itemName,
        price: parseInt(itemPrice)
    };
    cart.push(item);
    console.log(`Added ${itemName} (Ksh ${itemPrice}) to cart`);
    console.log('Current cart:', cart);
    updateCartCount();
    displayCart();
    showNotification(`${itemName} added to cart!`);
}

function showNotification(message) {
    // Remove existing notification if present
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

function removeFromCart(index) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    console.log(`Removed ${removedItem.name} from cart`);
    updateCartCount();
    displayCart();
}

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const totalPriceSpan = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalPriceSpan.textContent = '0';
        return;
    }

    let groupedCart = [];
    let totalPrice = 0;

    for (let i = 0; i < cart.length; i++) {
        let currentItem = cart[i];
        let existingItem = groupedCart.find(item => item.name === currentItem.name);

        if (existingItem) {
            existingItem.quantity++;
            existingItem.totalPrice += currentItem.price;
        } else {
            groupedCart.push({
                name: currentItem.name,
                price: currentItem.price,
                quantity: 1,
                totalPrice: currentItem.price,
                index: i
            });
        }
        totalPrice += currentItem.price;
    }

    let cartHTML = '';
    groupedCart.forEach((item, idx) => {
        cartHTML += `
            <div class="cart-item">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Ksh ${item.price} x ${item.quantity} = Ksh ${item.totalPrice}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.index})">Remove</button>
            </div>
        `;
    });

    cartItemsDiv.innerHTML = cartHTML;
    totalPriceSpan.textContent = totalPrice;
    console.log('Cart displayed:', groupedCart);
}

function toggleFullMenu() {
    const fullMenuModal = document.getElementById('fullMenuModal');
    if (fullMenuModal) {
        fullMenuModal.classList.toggle('active');
    }
}

const menuData = {
    mains: [
        { name: 'Tilapia & Sauce', price: 2500 },
        { name: 'Beef & Chips', price: 1800 },
        { name: 'Chicken Stew', price: 1400 },
        { name: 'Mutton Stir Fry', price: 2200 },
        { name: 'Wheat Flour Chapati & Mandazis', price: 60 },
        { name: 'Grilled Salmon', price: 2600 },
        { name: 'Fried Chicken', price: 700 },
        { name: 'Grilled Chicken', price: 900 },
        { name: 'Roast Beef', price: 2400 },
        { name: 'Steak', price: 3200 },
        { name: 'Spaghetti Bolognese', price: 650 },
        { name: 'Lasagna', price: 720 },
        { name: 'Mac and Cheese', price: 520 },
        { name: 'Chicken Alfredo', price: 780 },
        { name: 'Fish and Chips', price: 620 },
        { name: 'Sushi', price: 1500 },
        { name: 'Tacos', price: 450 },
        { name: 'Burrito', price: 550 },
        { name: 'Quesadilla', price: 520 },
        { name: 'Shawarma', price: 420 },
        { name: 'Caesar Salad', price: 350 },
        { name: 'Greek Salad', price: 340 },
        { name: 'Coleslaw', price: 200 },
        { name: 'Mashed Potatoes', price: 220 },
        { name: 'Fried Rice', price: 300 },
        { name: 'Noodles', price: 280 },
        { name: 'Ramen', price: 380 },
        { name: 'Dumplings', price: 330 },
        { name: 'Spring Rolls', price: 250 },
        { name: 'Omelette', price: 180 },
        { name: 'Scrambled Eggs', price: 160 },
        { name: 'Grilled Cheese Sandwich', price: 240 },
        { name: 'Club Sandwich', price: 280 },
        { name: 'Chicken Wings', price: 520 },
        { name: 'BBQ Ribs', price: 1900 },
        { name: 'Nachos', price: 390 },
        { name: 'Tomato Soup', price: 250 },
        { name: 'Chicken Soup', price: 270 }
    ],
    snacks: [
        { name: 'Pizza', price: 900 },
        { name: 'French Fries', price: 220 },
        { name: 'Onion Rings', price: 240 },
        { name: 'Samosas', price: 180 },
        { name: 'Pancakes', price: 320 },
        { name: 'Waffles', price: 350 },
        { name: 'Sausages', price: 280 },
        { name: 'Sliders', price: 380 },
        { name: 'Toasties', price: 260 },
        { name: 'Ice Cream', price: 320 },
        { name: 'Kebabs', price: 400 },
        { name: 'Salads', price: 330 }
    ],
    drinks: [
        { name: 'Smoothies', price: 500 },
        { name: 'Lemonades', price: 250 },
        { name: 'Sodas', price: 180 },
        { name: 'Iced Tea', price: 220 },
        { name: 'Milkshakes', price: 550 },
        { name: 'Fresh Juices', price: 320 }
    ],
    hotDrinks: [
        { name: 'Coffee (Black, Espresso, Latte, Cappuccino)', price: 260 },
        { name: 'Tea (Black, Green, Herbal)', price: 220 },
        { name: 'Hot Chocolate', price: 280 }
    ],
    alcoholic: [
        { name: 'Beer', price: 650 },
        { name: 'Wine', price: 1800 },
        { name: 'Cocktails', price: 1250 }
    ]
};

function buildFullMenu() {
    const sections = [
        { id: 'fullMenuMains', items: menuData.mains },
        { id: 'fullMenuSnacks', items: menuData.snacks },
        { id: 'fullMenuDrinks', items: menuData.drinks },
        { id: 'fullMenuHotDrinks', items: menuData.hotDrinks },
        { id: 'fullMenuAlcoholic', items: menuData.alcoholic }
    ];

    sections.forEach(section => {
        const container = document.getElementById(section.id);
        if (!container) return;

        container.innerHTML = section.items.map(item => `
            <li class="full-menu-item" data-name="${item.name}" data-price="${item.price}">
                <span>${item.name}</span>
                <strong>Ksh ${item.price}</strong>
            </li>
        `).join('');
    });
}

function addMenuItem(event) {
    const itemElement = event.target.closest('.full-menu-item');
    if (!itemElement) return;

    const itemName = itemElement.dataset.name;
    const itemPrice = itemElement.dataset.price;

    const item = {
        name: itemName,
        price: parseInt(itemPrice)
    };
    cart.push(item);
    updateCartCount();
    displayCart();
    showNotification(`${itemName} added to cart!`);
}

function addCustomOrder() {
    const input = document.getElementById('customOrderInput');
    const description = input ? input.value.trim() : '';

    if (!description) {
        showNotification('Please describe your custom order!');
        return;
    }

    const item = {
        name: `Custom order: ${description}`,
        price: 0
    };
    cart.push(item);
    updateCartCount();
    displayCart();
    if (input) input.value = '';
    showNotification('Custom order added to cart!');
}

function setOrderStatus(message, isError = false) {
    const status = document.getElementById('orderStatus');
    if (!status) return;
    status.textContent = message;
    status.style.color = isError ? '#d9534f' : '#235b2a';
    status.style.opacity = '1';
    setTimeout(() => {
        if (status.textContent === message) {
            status.style.opacity = '0.75';
        }
    }, 3000);
}

function closeFullMenu(event) {
    const fullMenuModal = document.getElementById('fullMenuModal');
    if (event.target === fullMenuModal) {
        fullMenuModal.classList.remove('active');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    }

    const fullMenuModal = document.getElementById('fullMenuModal');
    if (fullMenuModal) {
        fullMenuModal.addEventListener('click', closeFullMenu);
    }

    buildFullMenu();
});

