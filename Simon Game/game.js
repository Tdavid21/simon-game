var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; 
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function()
    {
        if (!started) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }
    });

function nextSequence() {
    userClickedPattern = [];
   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $('#' + buttonColours[randomNumber]).fadeOut("fast"); 
   $('#' + buttonColours[randomNumber]).fadeIn("fast");

   var audio = new Audio('sounds/' + randomChosenColour + '.mp3');
    audio.play();
    playSound(randomChosenColour);
    /*animatePress(userChosenColour);*/
    level++;
    console.log(level);
    $("#level-title").text("Level " + level);
};

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    var audio = new Audio('sounds/' + userChosenColour + '.mp3');
    audio.play();
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // setTimeout(nextSequence, 1000);
    checkAnswer(userClickedPattern.length - 1); 
});

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#' + currentColour).addClass("pressed");
    setTimeout(function() {
        $('#' + currentColour).removeClass("pressed");
    }, 100);
};

function checkAnswer(currentLevel) {

if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
     console.log("success");

     if (userClickedPattern.length === gamePattern.length) {
        setTimeout(nextSequence, 1000);
     }
} else {
    console.log("wrong");
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    //console.log(level);
    startOver();
}
    
    };

function startOver() {
   level = 0;
   started = false;
   gamePattern = [];
};
