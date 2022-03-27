function astronautData() {
    var apiURL = `https://lldev.thespacedevs.com/2.2.0/astronaut/`;

    fetch(apiURL).then(function(response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayAstronautData(data);
            });
        } else {
            alert("ERROR!");
        }
    });
}

function fetchData() {
    //check to if document contains a div with the specified ID and display the correct js to the HTML page
    if (document.getElementById("astronautInfoContainer")) {
        astronautData();
    }
    if (document.getElementById("launchInfoContainer")) {
        upcomingLaunchData();
    }
}

var displayAstronautData = function(astronauts) {
    // loop through astronaut info
    for (var i = 0; i < astronauts.results.length; i++) {
        //format information from api fetch
        var astronautName = astronauts.results[i].name;
        var astronautNationality = astronauts.results[i].nationality;
        var agencyName = astronauts.results[i].agency_name;
        var astronautImageaddress = astronauts.results[i].profile_image;
        var astronautBio = astronauts.results[i].bio;

        var infoDivElement = document.createElement("div");
        infoDivElement.classList =
            "astro-div astro-border w3-center w3-dark-gray w3-round-xxlarge w3-margin";
        //append div to parent container
        var infoContainerElement = document.getElementById(
            "astronautInfoContainer"
        );
        infoContainerElement.appendChild(infoDivElement);

        // element to hold image
        var astronautElement = document.createElement("img");
        astronautElement.src = astronautImageaddress;
        astronautElement.classList = "w3-round w3-image w3-margin-top w3-mobile";
        // correct display if no mission data available
        astronautElement.height = 400;
        astronautElement.width = 400;
        infoDivElement.append(astronautElement);

        // create element to hold formated information (name)
        var astroNameElement = document.createElement("h2");
        astroNameElement.textContent = astronautName;
        // append name to parent div
        infoDivElement.appendChild(astroNameElement);

        // create element to hold formated information (astronaut info)
        var astronautInfoElement = document.createElement("p");
        astronautInfoElement.innerHTML = astronautBio;
        astronautInfoElement.classList = "w3-padding-16";
        // append astronaut info to parent
        infoDivElement.appendChild(astronautInfoElement);
    }
};

fetchData();
