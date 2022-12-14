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
            console.log(saasList.data)
        } else {
            console.log("Error: " + req.statusText);
        }
    }
};
req.send(null);

// Updates SaaS list with extra information and converts price/year
function updateSaaS(saasList) {
    saasList.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    });
    saasList.forEach(saas => {
        saas.acquired = false
        saas.priceAnnual = saas.price * 11
    })
}


function displayStore(saasList) {
    let marketplaceGrid = document.getElementById("marketplace-grid");
    let mySaasGrid = document.getElementById("my-saas-grid");
    let unavDivs = []

    saasList.forEach(saas => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        let name = document.createElement("p")
        name.textContent = saas.name
        name.classList.add("saas-name")
        img.src = 'img/logos/' + saas.logo;
        div.appendChild(img);
        div.appendChild(name)
        if (saas.acquired == false && saas.price <= player.budget) {
            marketplaceGrid.appendChild(div);
        }
        else if (saas.acquired == false && saas.price > player.budget) {
            div.classList.add("unavailable")
            unavDivs.push(div)
        }
        else if (saas.acquired == true) {
            mySaasGrid.appendChild(div);
        }
    });

    // Push unavailable divs at the end
    unavDivs.forEach(div => {
        marketplaceGrid.appendChild(div);
    })

}



//Timer 

let timer = 59;
      let countDown = setInterval(function() {
        if (timer === 0) {
          clearInterval(countDown);
          gameOver();
        } else {
          document.getElementById("timer").innerHTML = Math.floor(timer/60) + ':' + (timer%60);
        }
        timer--;
      }, 1000);

      function gameOver() {
        alert("Game Over!");
      }