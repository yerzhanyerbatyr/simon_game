var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(".btn").click(function(){
    if (gameStarted === true) {
        var userChosenColour = $(this).attr("id");
        playSound(userChosenColour);
        animatePress(userChosenColour);
        userClickedPattern.push(userChosenColour);
        console.log("This is the user:" + userClickedPattern);
        checkAnswer(userClickedPattern.length);
    } else {
        var userChosenColour = $(this).attr("id");
        playSound(userChosenColour);
        animatePress(userChosenColour);
    }
});

$(document).keypress(function(){
    if (gameStarted === false){
        next();
        gameStarted = true;
    }
});

function next(){
    level++;
    $("h1").text("Level "+level);
    var newE = Math.floor(Math.random()*3);
    playSound(buttonColors[newE]);
    gamePattern.push(buttonColors[newE]);
    $("."+buttonColors[newE]).fadeOut(80).fadeIn(80);
    console.log("This is the game pattern:" + gamePattern);
}

function playSound(name){
    var audio = new Audio("./sounds/" + name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel-1]!=gamePattern[currentLevel-1]){
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        level = 0;
        gameStarted = false;
        gamePattern = [];
        userClickedPattern = [];
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
    } else {
        if (currentLevel === gamePattern.length){
            setTimeout(next, 1000);
            userClickedPattern = [];
        }
    }
}