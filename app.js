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
            displayStore(saasList.data)
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

function displayStore(saasList) {
    let availableGrid = document.getElementById("available-grid");
    let notAvailableGrid = document.getElementById("not-available-grid");
    let mySaasGrid = document.getElementById("my-saas-grid");

    saasList.forEach(saas => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = 'img/logos/' + saas.logo;
        div.appendChild(img);
        if (saas.acquired == false && saas.price <= player.budget) {
            availableGrid.appendChild(div);
        } 
        else if (saas.acquired == false && saas.price > player.budget) {
            notAvailableGrid.appendChild(div);
        } 
        else if (saas.acquired == true) {
            mySaasGrid.appendChild(div);
        }
    });
}