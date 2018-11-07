var cartoonArray = ["Bugs Bunny", "Daffy Duck", "Animaniacs", "Scooby Doo"];

var cartoonChar = cartoonArray[0];
var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoonChar + "&api_key=cHxD8VJ2oLDyoYjoZMvpLblY4LTo6SJF&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    console.log(response.data[0].images.original.url);
    console.log(response.data[0].images.original_still.url)
    console.log(response.data[0].rating)
});

