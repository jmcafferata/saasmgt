// Create player with starters
let player = {
    budget: 100
}

// Import SaaS list
var saasList;
var req = new XMLHttpRequest();
req.open("GET", 'Tycoon SaaS Master List - saas.csv', true);
req.onload = function () {
    if (req.readyState === 4) {
        if (req.status === 200) {
            saasList = Papa.parse(req.responseText, {
                header: true,
                dynamicTyping: true
            });
            updateSaaS(saasList.data)
            displayAvailable(saasList.data);
            displayNotAvailable(saasList.data);
            displayAcquired(saasList.data);
        } else {
            console.log("Error: " + req.statusText);
        }
    }
};
req.send(null);

// Updates SaaS list with extra information and converts price/year
function updateSaaS(saasList) {
    saasList.forEach(saas => {
        saas.acquired = false
        saas.priceAnnual = saas.price * 11
    })
}

// Display available SaaS as images in a div
let availableGrid = document.getElementById("available-grid");
function displayAvailable(saasList) {
    saasList.forEach(saas => {
        if (saas.acquired == false && saas.price <= player.budget) {
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.src = 'img/logos/' + saas.logo;
            div.appendChild(img);
            availableGrid.appendChild(div);
        }

    });
}

// Display not avaible SaaS as images in a div
let notAvailableGrid = document.getElementById("not-available-grid");
function displayNotAvailable(saasList) {
    saasList.forEach(saas => {
        if (saas.acquired == false && saas.price > player.budget) {
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.src = 'img/logos/' + saas.logo;
            div.appendChild(img);
            notAvailableGrid.appendChild(div);
        }

    });
}

// Display acquired SaaS as images in a div
let mySaasGrid = document.getElementById("my-saas-grid");
function displayAcquired(saasList) {
    saasList.forEach(saas => {
        if (saas.acquired == true) {
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.src = 'img/logos/' + saas.logo;
            div.appendChild(img);
            mySaasGrid.appendChild(div);
        }

    });
}
