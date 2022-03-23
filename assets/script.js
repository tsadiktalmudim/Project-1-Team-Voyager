var apiKey = 'C3Y2n0r4MS4rDGTcmc2tBopQ0tq65lTPdkk9aVS2'


// Astronomy picture of the day
var apod = function () {
    var apodApi = 'https://api.nasa.gov/planetary/apod?api_key=' + apiKey;
    fetch(apodApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                $('.apodImg').attr('src', data.url)
                console.log(data)
                console.log(data.url)
            })
        }
    })
}

apod();
var infoContainerElement = document.querySelector('#infoContainer')
 
   
 // FETCH API FOR UPCOMING LAUNCHES
function upcomingLaunchData() {
    var apiURL = `https://lldev.thespacedevs.com/2.2.0/launch/upcoming/`

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            console.log(response)
            response.json().then(function (data) {
                console.log(data)
                displayLaunchInfo(data)
            })
        } else {
            alert('ERROR!')
        }
    })
}

var displayLaunchInfo = function (upcomingLaunch) {
    // loop through response
    for (var i = 0; i < upcomingLaunch.results.length; i++) {
        // format information from api fetch
        var upcomingLaunchName = upcomingLaunch.results[i].name
        var upcomingLaunchMission =""
        if (upcomingLaunch.results[i].mission) {
        upcomingLaunchMission = upcomingLaunch.results[i].mission.description
        }        
        var upcomingLaunchTimer = upcomingLaunch.results[i].window_end
        var upcomingLaunchImage = upcomingLaunch.results[i].image

        // create container card for upcomingLaunch info
        var infoDivElement = document.createElement('div')
        infoDivElement.classList = 'w3-container w3-center w3-border w3-border-orange w3-dark-gray w3-round-xxlarge'
        // append div to parent container
        document.getElementById("launchInfoContainer").appendChild(infoDivElement)

        //  create element to hold image
        var upcomingImageElement = document.createElement('img')
        upcomingImageElement.src = upcomingLaunchImage
        upcomingImageElement.classList = 'w3-round w3-image'
        upcomingImageElement.height = 400
        upcomingImageElement.width = 400
        infoDivElement.appendChild(upcomingImageElement)

        // create element to hold formated information (name) 
        var upcomingNameElement = document.createElement('h2')
        upcomingNameElement.textContent = upcomingLaunchName
        // append name headline to parent div
        infoDivElement.appendChild(upcomingNameElement)

        // create element to hold formated information (mission discription)
        var upcomingMissionElement = document.createElement('p')
        upcomingMissionElement.textContent = upcomingLaunchMission
        upcomingMissionElement.classList = 'w3-padding-16'
        // append mission description to parent div
        infoDivElement.appendChild(upcomingMissionElement)

        // create element to hold formated information (countdown)
        var upcomingTimerElement = document.createElement('p')
        upcomingTimerElement.textContent = upcomingLaunchTimer
        // append countdown to parent div
        infoDivElement.appendChild(upcomingTimerElement)
    }
}
     
 
 // FETCH API FOR ASTRONAUT INFO
function astronautData() {
    var apiURL = `https://lldev.thespacedevs.com/2.2.0/astronaut/`

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            console.log(response)
            response.json().then(function (data) {
                console.log(data)
                displayAstronautData(data)
            })
        } else {
            alert('ERROR!')
        }
    })
}

function fetchData() {
    //check to if document contains a div with the specified ID and display the correct js to the HTML page
    if(document.getElementById("astronautInfoContainer")) {
        astronautData()
    }
    if(document.getElementById("launchInfoContainer")) {
        upcomingLaunchData()
    }
}



var displayAstronautData = function (astronauts) {
    // loop through astronaut info
    for (var i = 0; i < astronauts.results.length; i++) {
        //format information from api fetch
        var astronautName = astronauts.results[i].name 
        var astronautNationality = astronauts.results[i].nationality        
        var agencyName = astronauts.results[i].agency_name 
        var astronautImageaddress = astronauts.results[i].profile_image
        var astronautBio = astronauts.results[i].bio

        // create container for astronaut info
        var infoDivElement = document.createElement("div")
        infoDivElement.classList = "w3-container w3-center w3-border w3-border-orange w3-dark-gray w3-round-xxlarge"
        //append div to parent container
        var infoContainerElement = document.getElementById("astronautInfoContainer")
        infoContainerElement.appendChild(infoDivElement)


        // element to hold image
        var astronautElement = document.createElement("img")
        astronautElement.src = astronautImageaddress
        astronautElement.classList = 'w3-round w3-image'
        // correct display if no mission data available
        astronautElement.classList = ""
        astronautElement.height = 400
        astronautElement.width = 400
        infoDivElement.append(astronautElement)

        // create element to hold formated information (name)
        var astroNameElement = document.createElement("h2")
        astroNameElement.textContent = astronautName
        // append name to parent div
        infoDivElement.appendChild(astroNameElement)

        // create element to hold formated information (astronaut info)
        var astronautInfoElement = document.createElement("p")
        astronautInfoElement.innerHTML = astronautBio
        astronautInfoElement.classList = "w3 padding-16"
        // append astronaut info to parent
        infoDivElement.appendChild(astronautInfoElement)

    
    }
}

fetchData()

// function fetchData() {
//     //check to if document contains a div with the specified ID
//     if(document.getElementById("spaceStationInfoContainer")) {
//          // code for astronautData() goes here
//     }
// }

// function fetchData() {
//     //check to if document contains a div with the specified ID
//     if(document.getElementById("dockingEventInfoContainer")) {
//          // code for astronautData() goes here
//      }
// }