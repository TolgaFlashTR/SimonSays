buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 1;

function nextSequence() {
    userClickedPattern = [];
    for (var i = level; i < level + 1; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        animateBot();
    }
}

function animateBot() {
    let delay = 400;
    gamePattern.forEach(element => {
        setTimeout(function () {
            animatePress(element);
        }, delay);
        delay += 400;
    });

}

function animatePress(currentColour) {
    $("#" + currentColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("" + currentColour + ".mp3");
    audio.play();
}

$(document).keypress(function (event) {
    event.key = event.key.toLowerCase();
    if (event.key === "a") {
        nextSequence();
        $("h1").text("Press A Key to Start");
    }
});

$(".btn").click(function () {
    var userChosenColour = this.id;
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    if (userClickedPattern.length === gamePattern.length) {
        checkAnswer();
    }
})

function checkAnswer() {
    var userArray = userClickedPattern.toString();
    var gameArray = gamePattern.toString();
    if (userArray === gameArray) {
        level++;
        nextSequence();
        $("h1").text("Level " + level);
    } else {
        userClickedPattern = [];
        gamePattern = [];
        level = 1;
        $("h1").text("Game Over, Press A Key to Restart");
    }
}
