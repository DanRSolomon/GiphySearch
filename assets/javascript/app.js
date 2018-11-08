
var cartoonArray = ["Bugs Bunny", "Daffy Duck", "Animaniacs", "Scooby Doo"];

function displayCartoonGifs() {

    var cartoonChar = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + cartoonChar + "&api_key=cHxD8VJ2oLDyoYjoZMvpLblY4LTo6SJF&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.data[0].images.original.url);
        $("#cartoon-view").empty();
        for (var i = 0; i < 10; i++) {
            $(`
                <figure>
                    <img src="${response.data[i].images.fixed_height_still.url}">
                    <figcaption>Rating: ${response.data[i].rating}</figcaption>
                </figure>
            `).appendTo("#cartoon-view");
        };

        // console.log(response.data[0].images.original_still.url)
        // console.log(response.data[0].rating)

        // use figure tags to display gif and rating
    });

};

function addButtons() {
    $("#button-list").empty();
    for (var i = 0; i < cartoonArray.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("cartoon-btn");
        newButton.attr("data-name", cartoonArray[i]);
        newButton.text(cartoonArray[i]);
        $("#button-list").append(newButton);
    }
}

$("#add-cartoon").on("click", function (event) {
    event.preventDefault();
    var userCartoon = $("#cartoon-input").val().trim();
    cartoonArray.push(userCartoon);
    addButtons();
});

addButtons();

$(document).on("click", ".cartoon-btn", displayCartoonGifs);



