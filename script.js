// Initialize current bids and bid history
let currentBid1 = 50.00;
let currentBid2 = 100.00;
let bidHistory1 = [50.00]; // Starting bid history for product 1
let bidHistory2 = [100.00]; // Starting bid history for product 2

// Function to place a bid
function placeBid(productNumber) {
    const bidInput = document.getElementById(`bid${productNumber}`);
    const enteredBid = parseFloat(bidInput.value);

    // Check and update for product 1
    if (productNumber === 1) {
        if (enteredBid > currentBid1) {
            currentBid1 = enteredBid; // Update current bid
            document.querySelector('.product1-current-bid').innerText = `Current Bid: $${currentBid1.toFixed(2)}`;
            bidHistory1.push(enteredBid); // Add bid to history
            updateGraph(1, bidHistory1); // Update graph for product 1
        } else {
            document.getElementById(`message${productNumber}`).innerText = `Please enter a bid higher than the current bid of $${currentBid1}.`;
        }
    } 
    // Check and update for product 2
    else if (productNumber === 2) {
        if (enteredBid > currentBid2) {
            currentBid2 = enteredBid; // Update current bid
            document.querySelector('.product2-current-bid').innerText = `Current Bid: $${currentBid2.toFixed(2)}`;
            bidHistory2.push(enteredBid); // Add bid to history
            updateGraph(2, bidHistory2); // Update graph for product 2
        } else {
            document.getElementById(`message${productNumber}`).innerText = `Please enter a bid higher than the current bid of $${currentBid2}.`;
        }
    }

    bidInput.value = ''; // Clear input field
}

// Function to update the graph
function updateGraph(productNumber, bidHistory) {
    const ctx = document.getElementById(`bidHistoryChart${productNumber}`).getContext('2d');

    // Create the chart or update existing one
    if (ctx.chart) {
        ctx.chart.data.labels.push(`Bid ${bidHistory.length}`);
        ctx.chart.data.datasets[0].data = bidHistory; // Update data
        ctx.chart.update(); // Update the chart
    } else {
        // Create a new chart if it doesn't exist
        ctx.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: bidHistory.map((_, index) => `Bid ${index + 1}`),
                datasets: [{
                    label: 'Bid Price',
                    data: bidHistory,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
}

// Sample user database (for demonstration purposes)
const users = [];

// Function to show sections
function showSection(section) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach((sec) => {
        sec.style.display = "none"; // Hide all sections
    });

    // Show the selected section
    document.getElementById(section).style.display = "block";
}

// Function to login a user
function loginUser(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    // Check if the user exists
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        message.innerText = "Login successful!";
        showSection('auctions'); // Redirect to auctions
    } else {
        message.innerText = "Invalid username or password.";
    }
}

// Function to register a user
function registerUser(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const message = document.getElementById("registerMessage");

    // Check if the username is already taken
    const existingUser = users.find((u) => u.username === username);

    if (existingUser) {
        message.innerText = "Username is already taken.";
    } else {
        // Register new user
        users.push({ username, password });
        message.innerText = "Registration successful! You can now login.";
    }
}

// Show home section by default
showSection('home');