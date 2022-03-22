// This is for the launch countdown
var apiKey = "C3Y2n0r4MS4rDGTcmc2tBopQ0tq65lTPdkk9aVS2";

var apod = function () {
  var apodApi = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;
  fetch(apodApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        $(".apodImg").attr("src", data.url);
        console.log(data);
        console.log(data.url);
      });
    }
  });
};

apod();
var infoContainerElement = document.querySelector("#infoContainer");

// FETCH API FOR UPCOMING LAUNCHES
function upcomingLaunchData() {
  var apiURL = `https://lldev.thespacedevs.com/2.2.0/launch/upcoming/`;

  fetch(apiURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        displayLaunchInfo(data);
      });
    } else {
      alert("ERROR!");
    }
  });
}

var displayLaunchInfo = function (upcomingLaunch) {
  // loop through response
  for (var i = 0; i < upcomingLaunch.results.length; i++) {
    // format information from api fetch
    var upcomingLaunchName = upcomingLaunch.results[i].name;
    var upcomingLaunchMission = upcomingLaunch.results[i].mission.description;

    var upcomingLaunchImage = upcomingLaunch.results[i].image;
    var launch = upcomingLaunch.results[i].window_end;
    var launchFormat = launch.substring(0, 10);
    var endDate = new Date(launchFormat).getTime();
    var countDownTimer = setInterval(() => {
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
      console.log(daysLeft, hoursLeft, minutesLeft, secondsLeft);

      // create element to hold formated information (countdown)
    }, 10000);

    console.log();

    // create container card for upcomingLaunch info
    var infoDivElement = document.createElement("div");
    infoDivElement.classList =
      "w3-container w3-center w3-border w3-border-orange w3-dark-gray w3-round-xxlarge";
    // append div to parent container
    infoContainerElement.appendChild(infoDivElement);

    //  create element to hold image
    var upcomingImageElement = document.createElement("img");
    upcomingImageElement.src = upcomingLaunchImage;
    upcomingImageElement.classList = "w3-round w3-image";
    upcomingImageElement.height = 400;
    upcomingImageElement.width = 400;
    infoDivElement.appendChild(upcomingImageElement);

    // create element to hold formated information (name)
    var upcomingNameElement = document.createElement("h2");
    upcomingNameElement.textContent = upcomingLaunchName;
    // append name headline to parent div
    infoDivElement.appendChild(upcomingNameElement);

    // create element to hold formated information (mission discription)
    var upcomingMissionElement = document.createElement("p");
    upcomingMissionElement.textContent = upcomingLaunchMission;
    upcomingMissionElement.classList = "w3-padding-16";
    // append mission description to parent div
    infoDivElement.appendChild(upcomingMissionElement);

    // create element to hold formated information (countdown)
    var upcomingTimerElement = document.createElement("p");
    upcomingTimerElement.textContent =
      "Launch Countdown  " + countDownTimer.toString;
    console.log(launch);
    // append countdown to parent div
    infoDivElement.appendChild(upcomingTimerElement);
  }
};
countDownTimer;
upcomingLaunchData();
// displayLaunchInfo()
