let vehicles = [];

const imageURL = "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png";


// Add Fleet
function addFleet() {

    const regNo = document.getElementById("regNo").value.trim();
    const category = document.getElementById("category").value;
    const driver = document.getElementById("driver").value.trim();
    const status = document.getElementById("status").value;

    if (!regNo || !category || !driver || !status) {
        alert("All fields are required");
        return;
    }

    const vehicle = {
        id: Date.now(),
        regNo,
        category,
        driver,
        status
    };

    vehicles.push(vehicle);

    clearForm();
    renderCards(vehicles);
}


// Clear Form
function clearForm() {
    document.getElementById("regNo").value = "";
    document.getElementById("category").value = "";
    document.getElementById("driver").value = "";
    document.getElementById("status").value = "";
}


// Render Cards
function renderCards(data) {

    const container = document.getElementById("cardsContainer");
    container.innerHTML = "";

    data.forEach(vehicle => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${imageURL}" style="height:auto; width:25%;"/>

            <h4>${vehicle.regNo}</h4>
            <p>Category: ${vehicle.category}</p>
            <p class="driver">Driver: ${vehicle.driver}</p>
            <p class="status">Status: ${vehicle.status}</p>

            <button onclick="updateDriver(${vehicle.id})">Update Driver</button>
            <button onclick="changeStatus(${vehicle.id})">Change Availability</button>
            <button onclick="deleteVehicle(${vehicle.id})">Delete</button>
        `;

        container.appendChild(card);
    });
}


// Update Driver
function updateDriver(id) {

    const newDriver = prompt("Enter new driver name");

    if (!newDriver || newDriver.trim() === "") {
        alert("Driver name cannot be empty");
        return;
    }

    vehicles = vehicles.map(v => {
        if (v.id === id) {
            return { ...v, driver: newDriver.trim() };
        }
        return v;
    });

    renderCards(vehicles);
}


// Change Availability
function changeStatus(id) {

    vehicles = vehicles.map(v => {

        if (v.id === id) {

            let newStatus = v.status === "Available"
                ? "Unavailable"
                : "Available";

            return { ...v, status: newStatus };
        }

        return v;
    });

    renderCards(vehicles);
}


// Delete Vehicle
function deleteVehicle(id) {

    const confirmDelete = confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    vehicles = vehicles.filter(v => v.id !== id);

    renderCards(vehicles);
}


// Filters
document.getElementById("filterCategory").addEventListener("change", applyFilter);
document.getElementById("filterStatus").addEventListener("change", applyFilter);


function applyFilter() {

    const cat = document.getElementById("filterCategory").value;
    const stat = document.getElementById("filterStatus").value;

    let filtered = vehicles;

    if (cat !== "All") {
        filtered = filtered.filter(v => v.category === cat);
    }

    if (stat !== "All") {
        filtered = filtered.filter(v => v.status === stat);
    }

    renderCards(filtered);
}


// Clear Filter
function clearFilter() {

    document.getElementById("filterCategory").value = "All";
    document.getElementById("filterStatus").value = "All";

    renderCards(vehicles);
}
