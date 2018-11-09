var cartoonArray = [
    "Bugs Bunny",
    "Daffy Duck",
    "Animaniacs",
    "Scooby Doo",
    "Voltron",
    "Snoopy",
    "Darkwing Duck",
    "Felix The Cat",
    "The Simpsons",
    "Transformers"
];

function displayCartoonGifs() {

    var numOfGifs = $("#number-of-gifs").val();
    var cartoonChar = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoonChar + "&api_key=cHxD8VJ2oLDyoYjoZMvpLblY4LTo6SJF&limit=" + numOfGifs;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#cartoon-view").empty();
        for (var i = 0; i < numOfGifs; i++) {
            $(`
                <figure class="cartoon-image">
                    <img src="${response.data[i].images.fixed_height_still.url}">
                    <figcaption>Rating: ${response.data[i].rating}</figcaption>
                </figure>
            `).appendTo("#cartoon-view");
        };
    });
};

var staticGifSuffix = "_s.gif";
var animatedGifSuffix = ".gif";

function animateCartoon() {
    var animate = $(this).find("img").attr("src");
    var checkIfStatic = animate.split('/')[5];
    if (checkIfStatic === "200_s.gif") {
        $(this).find("img").attr("src", animate.replace(staticGifSuffix, animatedGifSuffix));
    } else {
        $(this).find("img").attr("src", animate.replace(animatedGifSuffix, staticGifSuffix));
    };
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
};

function addCartoonCount() {
    var select = '';
    for (i=5;i<=25;i++){
        select += '<option val=' + i + '>' + i + '</option>';
    }
    $('#number-of-gifs').html(select);
};

$("#add-cartoon").on("click", function (event) {
    event.preventDefault();
    var userCartoon = $("#cartoon-input").val().trim();
    cartoonArray.push(userCartoon);
    addButtons();
    document.getElementById('cartoon-input').value=null;
});

addButtons();

addCartoonCount();

$(document).on("click", ".cartoon-btn", displayCartoonGifs);

$(document).on("click", ".cartoon-image", animateCartoon);

