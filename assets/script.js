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

function fetchData() {
    //check to if document contains a div with the specified ID and display the correct js to the HTML page
    if(document.getElementById("astronautInfoContainer")) {
        astronautData()
    }
    if(document.getElementById("launchInfoContainer")) {
        upcomingLaunchData()
    }
    if(document.getElementById("stationInfoContainer")) {
        fetchIssData()
    }
}

// $('#launchCard').click(upcomingLaunchData())
// $('#stationCard').click(fetchIssData())


var infoContainerElement = document.querySelector('#launchInfoContainer')
 
   
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
        infoDivElement.classList = 'w3-container w3-center w3-border w3-border-orange w3-dark-gray w3-round-xxlarge w3-margin'
        // append div to parent container
        infoContainerElement.appendChild(infoDivElement)
        

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


// ISS SECTION
var stationContainerEl = document.querySelector('#stationInfoContainer')
var issLiveStreamEl = document.querySelector('#liveStream')


function fetchIssData() {
    var apiURL = `https://lldev.thespacedevs.com/2.2.0/spacestation/4/`

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            console.log(response)
            response.json().then(function (data) {
                console.log(data)
                displayIssInfo(data)
            })
        } else {
            alert('ERROR!')
        }
    })
}


var displayIssInfo = function(issData) {
    issLiveStreamEl.classList.remove('hide')
    // formatt data form api fetch
    var issImage = issData.image_url
    var issName = issData.name
    var issDescription = issData.description
    var issOrbit = issData.orbit
    var issCrew = issData.onboard_crew
    var issHeight = issData.height
    var isswidth = issData.width

    // create dive and append to stationContainer
    var issDivEl = document.createElement('div')
    issDivEl.classList = 'w3-container w3-center w3-border w3-border-orange w3-dark-gray w3-round-xxlarge' 
   stationContainerEl.appendChild(issDivEl)
    stationContainerEl.classList = 'w3-container w3-center'
    

    // create and append station headline
    var issNameEl = document.createElement('h2')
    issNameEl.textContent = issName
    issDivEl.appendChild(issNameEl)

    // create and append station image
    var issImageEl = document.createElement('img')
    issImageEl.src = issImage
    issImageEl.classList = 'w3-round w3-image'
    issImageEl.height = 700
    issImageEl.width = 700
    issDivEl.appendChild(issImageEl)

    // create and append station discription 
    var issDescriptionEl = document.createElement('p')
    issDescriptionEl.textContent = issDescription
    issDivEl.appendChild(issDescriptionEl)

    // append live stream
    issDivEl.appendChild(issLiveStreamEl)

    // create new div for ISS info
    var issInfoDiv = document.createElement('div')
    issInfoDiv.classList = 'w3-container w3-center'
    stationContainerEl.appendChild(issInfoDiv)

    // create and append orbit button
    var issOrbitEl = document.createElement('btn')
    issOrbitEl.textContent = `Orbit: ${issOrbit}`
    issOrbitEl.classList = 'w3-button w3-round w3-orange'
    issInfoDiv.appendChild(issOrbitEl)

    // create and append crew button
    var issCrewEl = document.createElement('btn')
    issCrewEl.textContent = `Onboard Crew: ${issCrew}`
    issCrewEl.classList = 'w3-button w3-round w3-blue'
    issInfoDiv.appendChild(issCrewEl)

    // create and append height button
    var issHeightEl = document.createElement('btn')
    issHeightEl.textContent = `Height: ${issHeight}ft`
    issHeightEl.classList = 'w3-button w3-round w3-red'
    issInfoDiv.appendChild(issHeightEl)

    // create and append width button
    var issWidthEl = document.createElement('btn')
    issWidthEl.textContent = `Width: ${isswidth}ft`
    issWidthEl.classList = 'w3-button w3-round w3-red'
    issInfoDiv.appendChild(issWidthEl)

}

fetchData()


