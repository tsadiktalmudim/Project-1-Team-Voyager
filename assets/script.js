var apiKey = 'C3Y2n0r4MS4rDGTcmc2tBopQ0tq65lTPdkk9aVS2'

//apod date-picker
var apodDate = $("#apodDatePicker").datepicker({
    maxDate: '0',
    dateFormat: 'yy-mm-dd',
});

//set the placeholder and 
$(document).ready(function () {
    //today gives us a date with more info then needed
    var today = new Date();
    //d will give of the day  
    var dd = String(today.getDate()).padStart(2, '0');
    //m will give us month
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    //y will give us the year
    var yyyy = today.getFullYear();
    //push the simple date value to today
    today = yyyy + '-' + mm + '-' + dd;
    //append today as a placeholder for our input
    $('#apodDatePicker').attr('placeholder', today)
    //push value of today to apod
    apod(today)
});

//apod sumbit date to api
$('#apod-submit').on('click', function () {
    var usersubmit = apodDate.val()
    if (usersubmit) {
        apod(usersubmit);
    }
});

//apod api
var apod = function (date) {
    var apodApi = 'https://api.nasa.gov/planetary/apod?api_key=' + apiKey + '&date=' + date;
    fetch(apodApi).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                $('.apodImg').attr('src', data.url)

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
            response.json().then(function (data) {
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
        var upcomingLaunchMission = upcomingLaunch.results[i].mission.description
        var upcomingLaunchTimer = upcomingLaunch.results[i].window_end
        var upcomingLaunchImage = upcomingLaunch.results[i].image

        // create container card for upcomingLaunch info
        var infoDivElement = document.createElement('div')
        infoDivElement.classList = 'w3-container w3-center w3-border w3-border-orange w3-dark-gray w3-round-xxlarge'
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


upcomingLaunchData()
    // displayLaunchInfo()

