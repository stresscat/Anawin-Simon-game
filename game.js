var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern = [];
var level = 0;
var started = false;



function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    started = true;

    level++;
    $("h1").text("Level " + level);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}


$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenColour);
    console.log(userClickedPattern);
})


function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}


$(document).keydown(function() {
    if (!started) {
        started = true
        nextSequence();
    } else {
        return
    }
});

// when started game
var answerChecker = false;

function checkAnswer(currentLevel) {
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] === gamePattern[i]) {
            console.log("right");
            if (i === (gamePattern.length-1)) {
                userClickedPattern = [] ;

                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        } else {
            console.log("wrong");
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();

            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);

            $("h1").text("Game Over, Press Any Key to Restart");

            startOver();
        }
    }

}

function startOver() {
    level = 0
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}