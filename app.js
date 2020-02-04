$(document).ready(function () {
    //buttons array to display on page load
    var scienceArr = ["asteroids", "engineering", "nuclear", "astronomy", "nasa", "magnet", "computer", "mathematics", "space", "robot", "diy"];

    //buttons appear on page load
    function showButtons() {
        $("#buttonsList").empty();
        for (var i = 0; i < scienceArr.length; i++) {
            var button = $("<button>");
            button.attr("data-science", scienceArr[i]);
            button.attr("id", "buttons");
            button.text(scienceArr[i]);
            $("#buttonsList").append(button);
        };
    };

    //user input button addition function
    function userInputButton() {
        $("#submit").on("click", function () {
            var scienceKeyword = $("#addition").val().trim();

            if (scienceKeyword == "") {
                return false;
            };

            scienceArr.push(scienceKeyword);
            showButtons();
            //improvement to make: have gifs show up according to keyword
            showGifs(scienceKeyword);
            $("#gifsList").empty();
            return false;




        });
    }

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

                    var p = $("<p>").text(" " + "RATING: " + rating + " ");

                    var scienceImage = $("<img>");
                    scienceImage.attr("src", results[i].images.fixed_height_still.url);
                    scienceImage.attr("data-still", results[i].images.fixed_height_still.url);
                    scienceImage.attr("data-animate", results[i].images.fixed_height.url);
                    scienceImage.attr("data-state", "still");
                    scienceImage.attr("id", "gifDiv");
                    scienceImage.addClass("gifImage");
                    gifDiv.prepend(p);
                    p.addClass("ratingText");
                    gifDiv.prepend(scienceImage);
                    $("#gifsList").prepend(gifDiv);


                }


            });
        });
    }

    //run functions
    showButtons();
    userInputButton();
    showGifs();


    // $(document).on("click", "#buttons", showGifs);
    $(document).on("click", ".gifImage", function () {
        var state = $(this).attr("data-state");
        var urlName = $(this).attr("src");


        console.log(state);
        console.log(urlName);

        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
            console.log(urlName);

        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            console.log(urlName);

        }
    });

});