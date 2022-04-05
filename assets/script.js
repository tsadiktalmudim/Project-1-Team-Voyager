//apod date-picker
var apodDate = $("#apodDatePicker").datepicker({
  maxDate: "0",
  dateFormat: "yy-mm-dd",
});
//set the placeholder and
$(document).ready(function () {
  //today gives us a date with more info then needed
  var today = new Date();
  //d will give of the day
  var dd = String(today.getDate()).padStart(2, "0");
  //m will give us month
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  //y will give us the year
  var yyyy = today.getFullYear();
  //push the simple date value to today
  today = yyyy + "-" + mm + "-" + dd;
  //append today as a placeholder for our input
  $("#apodDatePicker").attr("placeholder", today);
  //push value of today to apod
  apod(today);
});
//apod sumbit date to api
$("#apod-submit").on("click", function () {
  //value of the date the user choses
  var usersubmit = apodDate.val();
  if (usersubmit) {
    //pushes the value to the apod function
    apod(usersubmit);
    console.log(usersubmit);
  }
});
//apod history
function apodHistory() {
  $(".apod-form").empty();
  for (i = 0; i < localStorage.length; i++) {
    //getting the date from local storage
    var apodImg = localStorage.getItem(localStorage.key(i));
    //creating a div container
    var apodDiv = $("<div>").addClass("apod-form w3-col m2 s12");
    //creating a button for the date selected
    var apodBtn = $("<button>")
      .addClass("apod-button w3-button w3-medium w3-gray")
      .html(apodImg);
    //creating a delete button
    var apodDeleteBtn = $("<button>")
      .addClass("apod-delete-btn w3-button w3-medium w3-red")
      .html("X");
    //where the div and btn's will be placed
    var recentSearch = $("#apodHistory");
    //appends apodbtn and deletebtn to the div
    apodDiv.append(apodBtn, apodDeleteBtn);
    //appends the div and everything connected to the html
    recentSearch.append(apodDiv);
  }
}

//apod api
var apod = function (date) {
  var apiKey = "C3Y2n0r4MS4rDGTcmc2tBopQ0tq65lTPdkk9aVS2";
  var apodApi =
    "https://api.nasa.gov/planetary/apod?api_key=" + apiKey + "&date=" + date;
  fetch(apodApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        //variables for localstorage
        var apodDate = data.date;
        var apodTitle = data.title;
        //append the img to the html
        $(".apodImg").attr("src", data.url);
        $(".apodImg").attr("alt", data.explanation);
        //save data to localstorage
        localStorage.setItem(apodTitle, apodDate);
        apodHistory();
      });
    }
  });
};
//clicking apod-btn
$("#apodHistory").on("click", ".apod-button", function (event) {
  //this variable will target the value of the specific button that is clicked
  var apodStoredDate = event.target.innerHTML;
  if (apodStoredDate) {
    //push that button value to the apod function
    apod(apodStoredDate);
  }
});
//clicking the delete-btn
$("#apodHistory").on("click", ".apod-delete-btn", function (event) {
  //variable will select the div of the target deletebtn clicked
  var apodDivSelect = event.target.closest("div");
  //variable will grab the value of the apodbtn from the targeted div
  var apodBtnSleect = apodDivSelect.querySelector(".apod-button").innerHTML;
  //deletes the div of the targeted button
  $(this).closest("div").remove();
  //removes the targeted value we found earlier from the localstorage
  localStorage.removeItem(localStorage.key(apodBtnSleect));
});
apod();

function fetchData() {
  //check to if document contains a div with the specified ID and display the correct js to the HTML page
  if (document.getElementById("astronautInfoContainer")) {
    astronautData();
  }
  if (document.getElementById("launchInfoContainer")) {
    upcomingLaunchData();
  }
  if (document.getElementById("stationInfoContainer")) {
    fetchIssData();
  }
}

// $('#launchCard').click(upcomingLaunchData())
// $('#stationCard').click(fetchIssData())

var infoContainerElement = document.querySelector("#launchInfoContainer");

// FETCH API FOR UPCOMING LAUNCHES
function upcomingLaunchData() {
  var apiURL = `https://lldev.thespacedevs.com/2.2.0/launch/upcoming/`;

  fetch(apiURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayLaunchInfo(data);
      });
    } else {
    
    }
  });
}

var displayLaunchInfo = function (upcomingLaunch) {
  //to remove all divs with .test-div then having the for loop put what needs to be put on the html. (gets rid of extra or un-needed divs)
  $(".launching-div").remove();
  // loop through response
  for (var i = 0; i < upcomingLaunch.results.length; i++) {
    // format information from api fetch
    var upcomingLaunchName = upcomingLaunch.results[i].name;
    var upcomingLaunchMission = upcomingLaunch.results[i].status.description

    // create container card for upcomingLaunch info
    var infoDivElement = document.createElement('div')
    infoDivElement.classList = 'launching-div launch-border w3-center w3-dark-gray w3-round-xxlarge w3-margin'
    // append div to parent container
    infoContainerElement.appendChild(infoDivElement)

    var upcomingLaunchImage = upcomingLaunch.results[i].image;
    var launch = upcomingLaunch.results[i].window_end;
    // Cut off the 0s in the  launch var to have the correct sytle date ex 12/12/2003 for the launch countdown
    var launchFormat = launch.substring(0, 10);
    var endDate = new Date(launchFormat).getTime();

    //  create element to hold image
    var upcomingImageElement = document.createElement("img");
    upcomingImageElement.src = upcomingLaunchImage;
    upcomingImageElement.classList = "rocketImg w3-round w3-image w3-margin-top";
    upcomingImageElement.height = 500
    upcomingImageElement.width = 500

    infoDivElement.appendChild(upcomingImageElement);

    // create element to hold formated information (name)
    var upcomingNameElement = document.createElement("h2");
    upcomingNameElement.textContent = upcomingLaunchName;
    // append name headline to parent div
    infoDivElement.appendChild(upcomingNameElement);

    var upcomingMissionEl = document.createElement('p')
    upcomingMissionEl.textContent = upcomingLaunchMission
    infoDivElement.appendChild(upcomingMissionEl)

    // create element to hold formated information (countdown)
    var upcomingTimerElement = document.createElement("p");
    upcomingTimerElement.classList = 'w3-panel w3-round w3-light-gray w3-border w3-border-orange panel'
    // need to create a unique id for each this to work 
    upcomingTimerElement.setAttribute("id", "rocketlaunches" + [i]);
    infoDivElement.appendChild(upcomingTimerElement);
    
    // Passing j, and enDate for the bind to work
    var countDownTimer = (j, endDate) => {
      var now = new Date().getTime();

      var remainingTime = endDate - now;

      const second = 1000;

      const minute = second * 60;

      const hour = minute * 60;

      const day = hour * 24;

      daysLeft = Math.trunc(remainingTime / day);

      hoursLeft = Math.trunc((remainingTime % day) / hour);

      minutesLeft = Math.trunc((remainingTime % hour) / minute);

      secondsLeft = Math.trunc((remainingTime % minute) / second);
      // console.log(daysLeft, hoursLeft, minutesLeft, secondsLeft);
      $("#rocketlaunches" + [j]).html(
        "Launch Countdown:  " +
          "Day(s):  " +
          daysLeft +
          "| Hour(s):  " +
          hoursLeft +
          "| Minute(s):  " +
          minutesLeft +
          "| Second(s):   " +
          secondsLeft
      );
      //   console.log([j]);
      // If timmer hits 0 this is what it will exicute , we can add some effects here he if we want

      if (remainingTime < 0) {
        $("#rocketlaunches" + [j]).html("We Have Liftoff!!!!!!!!!!!! ");
      }
      // create element to hold formated information (countdown)
    };
    // The last item in the loop was showing up for all of them, used a bind to take a snapshot of the code that could not be changed
    // interval is set to every second
    setInterval(countDownTimer.bind(null, i, endDate), 1000);
  }
};

// function fetchData() {
//     //check to if document contains a div with the specified ID
//     if(document.getElementById("dockingEventInfoContainer")) {
//          // code for astronautData() goes here
//      }
// }

// ISS SECTION
var stationContainerEl = document.querySelector("#stationInfoContainer");
var issLiveStreamEl = document.querySelector("#liveStream");

function fetchIssData() {
  var apiURL = `https://lldev.thespacedevs.com/2.2.0/spacestation/4/`;

  fetch(apiURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        displayIssInfo(data);
      });
    } else {
    
    }
  });
}

var displayIssInfo = function (issData) {
  issLiveStreamEl.classList.remove("hide");
  // formatt data form api fetch
  var issImage = issData.image_url;
  var issName = issData.name;
  var issDescription = issData.description;
  var issOrbit = issData.orbit;
  var issCrew = issData.onboard_crew;
  var issHeight = issData.height;
  var isswidth = issData.width;

  // create dive and append to stationContainer
  var issDivEl = document.createElement("div");
  issDivEl.classList =
    "iss-div iss-border w3-center w3-border w3-dark-gray w3-round-xlarge w3-margin-top";
  stationContainerEl.appendChild(issDivEl);
  stationContainerEl.classList = "w3-container w3-center";

  // create and append station headline
  var issNameEl = document.createElement("h2");
  issNameEl.textContent = issName;
  issDivEl.appendChild(issNameEl);

  // create and append station image
  var issImageEl = document.createElement("img");
  issImageEl.src = issImage;
  issImageEl.classList = "w3-round-xlarge w3-image";
  issImageEl.height = 700;
  issImageEl.width = 700;
  issDivEl.appendChild(issImageEl);

  // create and append station discription
  var issDescriptionEl = document.createElement("p");
  issDescriptionEl.textContent = issDescription;
  issDivEl.appendChild(issDescriptionEl);

  // append live stream
  issDivEl.appendChild(issLiveStreamEl);

  // create new div for ISS info
  var issInfoDiv = document.createElement("div");
  issInfoDiv.classList = "w3-container w3-center panel";
  stationContainerEl.appendChild(issInfoDiv);

  // create and append orbit button
  var issOrbitEl = document.createElement("btn");
  issOrbitEl.textContent = `Orbit: ${issOrbit}`;
  issOrbitEl.classList = "w3-button w3-round w3-orange";
  issInfoDiv.appendChild(issOrbitEl);

  // create and append crew button
  var issCrewEl = document.createElement("btn");
  issCrewEl.textContent = `Onboard Crew: ${issCrew}`;
  issCrewEl.classList = "w3-button w3-round w3-blue";
  issInfoDiv.appendChild(issCrewEl);

  // create and append height button
  var issHeightEl = document.createElement("btn");
  issHeightEl.textContent = `Height: ${issHeight}m`;
  issHeightEl.classList = "w3-button w3-round w3-red";
  issInfoDiv.appendChild(issHeightEl);

  // create and append width button
  var issWidthEl = document.createElement("btn");
  issWidthEl.textContent = `Width: ${isswidth}m`;
  issWidthEl.classList = "w3-button w3-round w3-red";
  issInfoDiv.appendChild(issWidthEl);
};

fetchData();
