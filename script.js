
async function predictPrice() {
   
    const carName      = document.getElementById("car-name").value;
    const modelYear    = parseInt(document.getElementById("model-year").value);
    const mileage      = parseInt(document.getElementById("mileage").value);
    const engine       = parseInt(document.getElementById("engine").value);
    const fuel         = document.getElementById("fuel").value;
    const transmission = document.getElementById("transmission").value;
    const city         = document.getElementById("city").value;

   
  const data = {
    Name:           carName,
    model:          modelYear,        
    Mileage:        mileage,
    EngineCapacity: engine,
    FuelType:       fuel,      
    Transmission:   transmission,     
    City:           city
};

   
    const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

   
    const result = await response.json();

     console.log(result.response.lower)
    
    document.getElementById("result-range").textContent =
        `Range: ${result.response.lower} To ${result.response.upper} Lacs `;
    document.getElementById("result-box").style.display = "block";
}


document.getElementById("predict-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    await predictPrice();
});