var apiKey = 'C3Y2n0r4MS4rDGTcmc2tBopQ0tq65lTPdkk9aVS2'

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