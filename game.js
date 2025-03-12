let score = 0;
let timeLeft = 30;
let gameInterval;
let customerOrder = {};
const cakes = ['chocolate', 'vanilla', 'fruit', 'strawberry'];
const toppings = ['chocolate-chips', 'sprinkles', 'nuts'];
const creams = ['whipped-cream', 'buttercream', 'cream-cheese'];

// DOM elements
const customerOrderElement = document.getElementById('customer-order');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const cakeButtons = document.querySelectorAll('.cake-option');
const toppingButtons = document.querySelectorAll('.topping-option');
const creamButtons = document.querySelectorAll('.cream-option');

// Start the game
function startGame() {
    gameInterval = setInterval(updateTimer, 1000);
    generateOrder();
}

// Update timer and check for game over
function updateTimer() {
    timeLeft--;
    timerElement.textContent = `Time: ${timeLeft}`;

    if (timeLeft <= 0) {
        clearInterval(gameInterval);
        alert('Game Over! Your final score is: ' + score);
        resetGame();
    }
}

// Generate a random customer order
function generateOrder() {
    const randomCakeIndex = Math.floor(Math.random() * cakes.length);
    const randomToppingIndex = Math.floor(Math.random() * toppings.length);
    const randomCreamIndex = Math.floor(Math.random() * creams.length);

    customerOrder = {
        cake: cakes[randomCakeIndex],
        topping: toppings[randomToppingIndex],
        cream: creams[randomCreamIndex],
    };

    customerOrderElement.textContent = `Customer wants a ${customerOrder.cake} cake with ${customerOrder.topping} and ${customerOrder.cream}.`;
}

// Handle cake selection
cakeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const selectedCake = e.target.getAttribute('data-cake');
        checkOrder('cake', selectedCake);
    });
});

// Handle topping selection
toppingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const selectedTopping = e.target.getAttribute('data-topping');
        checkOrder('topping', selectedTopping);
    });
});

// Handle cream selection
creamButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const selectedCream = e.target.getAttribute('data-cream');
        checkOrder('cream', selectedCream);
    });
});

// Check if the selected ingredient matches the customer's order
function checkOrder(type, selected) {
    if (customerOrder[type] === selected) {
        customerOrder[type] = null; // Mark this ingredient as done
        if (customerOrder.cake === null && customerOrder.topping === null && customerOrder.cream === null) {
            // All ingredients are correct, customer is served!
            score++;
            scoreElement.textContent = `Score: ${score}`;
            generateOrder();
        }
    } else {
        alert(`Wrong ${type}! Try again.`);
    }
}

// Reset game when over
function resetGame() {
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Time: ${timeLeft}`;
    generateOrder();
    startGame();
}

// Initialize the game
startGame();

