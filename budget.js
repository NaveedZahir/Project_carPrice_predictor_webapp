async function searchByBudget() {
    const min = document.getElementById("min-price").value;
    const max = document.getElementById("max-price").value;
    const city = document.getElementById("budget-city").value;
    const transmission = document.getElementById("budget-transmission").value;

    if (!min || !max) {
        alert("Please enter both min and max price.");
        return;
    }
    if (parseInt(min) >= parseInt(max)) {
        alert("Max price must be greater than min price.");
        return;
    }

   
    document.getElementById("results-section").style.display = "block";
    document.getElementById("loading").style.display = "block";
    document.getElementById("cars-grid").innerHTML = "";
    document.getElementById("no-results").style.display = "none";
    document.getElementById("results-count").textContent = "";

    let url = `http://127.0.0.1:8000/budget/${min}/${max}`;
    const params = new URLSearchParams();
    if (city) params.append("city", city);
    if (transmission) params.append("transmission", transmission);
    if (params.toString()) url += `?${params.toString()}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const cars = data.budget;

        document.getElementById("loading").style.display = "none";

        if (!cars || cars.length === 0) {
            document.getElementById("no-results").style.display = "block";
            return;
        }

        document.getElementById("results-count").textContent = `${cars.length} cars found`;
        displayCars(cars);

    } catch (error) {
        document.getElementById("loading").style.display = "none";
        alert("Error fetching cars. Make sure the server is running.");
        console.error(error);
    }
}

function displayCars(cars) {
    const grid = document.getElementById("cars-grid");
    grid.innerHTML = "";

    cars.forEach(car => {
        const card = document.createElement("div");
        card.className = "car-card";
        card.innerHTML = `
            <div class="car-card-header">
                <div>
                    <div class="car-name">${car.Name}</div>
                    <div class="car-year">${car.Model}</div>
                </div>
                <div class="car-price">${car.Amount} L</div>
            </div>
            <div class="car-details">
                <div class="car-detail-item"><span>📍</span> ${car.City}</div>
                <div class="car-detail-item"><span>⚙️</span> ${car.Transmission}</div>
                <div class="car-detail-item"><span>⛽</span> ${car["Fuel Type"]}</div>
                <div class="car-detail-item"><span>🛣️</span> ${car.Mileage.toLocaleString()} km</div>
                <div class="car-detail-item"><span>🔧</span> ${car.Engine} cc</div>
            </div>
        `;
        grid.appendChild(card);
    });
}