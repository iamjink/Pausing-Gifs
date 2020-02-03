$(document).ready(function () {
    //buttons array to display on page load
    var scienceArr = ["asteroids", "engineering", "nuclear", "astronomy", "nasa", "magnet", "computer", "mathematics", "space", "robot", "diy"];

    //buttons appear on page load
    function showButtons() {
        for (var i = 0; i < scienceArr.length; i++) {
            var button = $("<button>");
            button.attr("data-science", scienceArr[i]);
            button.text(scienceArr[i]);
            $("#buttonsList").append(button);
        };
    };

    //showGifts on button click
    function showGifs() {
        $("button").on("click", function () {
            var science = $(this).attr("data-science");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                science + "&api_key=chDuK3TIQSCJCXwnaOChRtivwgMr2alW&limit=10";
            console.log(queryURL);

            $("#gifsList").empty();

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                console.log(response);


                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var scienceImage = $("<img>");
                    scienceImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(scienceImage);

                    $("#gifsList").prepend(gifDiv);
                }


            });
        });
    }

    showButtons();
    showGifs();


});