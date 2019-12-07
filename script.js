var questionBtns = document.querySelector(".buttonQuestions .col-sm-3");
listOfScoresDiv = document.querySelector(".listOfScores");
startBtn = document.querySelector(".startBtn");
questionDiv = document.getElementById("questionDiv");
addInitialsId = document.getElementById("addInitialsId");
highScoresDiv = document.getElementById("highScoreWrapper");
scoreWrapper = document.getElementById("scoreWrapper");
goBackBtn = document.getElementById("goBackBtn");
clearBtn = document.getElementById("clearBtn");
viewHighscoreBtn = document.getElementById("viewHighscoreBtn");
timerSpan = document.getElementById("timerSpan");
answerCheckDiv = document.getElementById("answerCheckDiv")
highScoreItemsDiv = document.querySelector(".listOfScores");

var highScores = [];
questionIndex = 0;
correctAnswers = 0;
timerTotal = 90;
timeElapsed = 0;
var time;


//-------------------------------------------------------------all event listeners

startBtn.addEventListener("click", function (event) {
    event.preventDefault()
    startBtn.classList.add("hideClass")
    questionBtns.parentElement.classList.remove("hideClass")
    createBtns();
    startTimer();
});

questionBtns.addEventListener("click", function (event) {
    event.stopPropagation();
    checkAnswer(event);

    if (questionIndex == questions.length) {
        displayScore();
    } else {
        createBtns(event);
    }
    return
});

addInitialsId.addEventListener("click", function (e) {
    e.preventDefault();
    storeScores();
    viewHighScores();
});

goBackBtn.addEventListener("click", function (e) {
    location.reload();
});

clearBtn.addEventListener("click", function (e) {
    highScoreItemsDiv.innerHTML = "";
    localStorage.clear();
    highScores = [];
});

viewHighscoreBtn.addEventListener("click", function (e) {
    startBtn.classList.add("hideClass")
    viewHighScores();
});



//--------------------------------------------------------button functionality

function createBtns(event) {
    questionBtns.innerHTML = "";
    questionDiv.innerHTML = "";

    questionDiv.innerHTML = "<h5>" + questions[questionIndex].title + "</h5>";

    for (var i = 0; i < questions[questionIndex].choices.length; i++) {
        var listItem = document.createElement('span');
        listItem.innerHTML = "<button type='button' class='btn btn-primary btn-block mb-2' >" + questions[questionIndex].choices[i] + "</button>";
        questionBtns.appendChild(listItem);
    }
    questionIndex++;
    return
};

function checkAnswer(event) {
    answerCheckDiv.innerHTML = "";
    
    var listItem = "";
    var listItem = document.createElement('div');
    var key;

    if (event.target.innerHTML === questions[questionIndex - 1].answer) {
        key = "right :)";
        correctAnswers++;
        console.log(correctAnswers, "checkanswer");
    } else {
        key = "wrong!! -5 seconds";
        timeElapsed = timeElapsed + 5;
    }

    answerCheckDiv.style.display = "block";
    var op = 1;
    var timerFade = setInterval(function(){
        if(op <= 0.1){
            clearInterval(timerFade);
            answerCheckDiv.style.display = "none";
        }
        answerCheckDiv.style.opacity = op;
        answerCheckDiv.style.filter = "alpha(opacity=" + op * 100 + ")";
        op-= op * 0.1;
    }, 50);


    listItem.innerHTML = "<hr> <span>You got it " + key + "</span>";
    answerCheckDiv.appendChild(listItem);
    return
};




// ---------------------------------------------------- creating scores functions
function displayScore() {
    document.getElementById("questionsWrapper").classList.add("hideClass");
    document.getElementById("scoreWrapper").classList.remove("hideClass");
    document.getElementById("answerId").innerHTML = " " + correctAnswers + " ";
    clearInterval(time);

}

function viewHighScores() {
    scoreWrapper.classList.add("hideClass");
    highScoresDiv.classList.remove("hideClass");
    document.getElementById("questionsWrapper").classList.add("hideClass");
    clearInterval(time);
    timerSpan.innerHTML = "00:00"
    highScoreItemsDiv.innerHTML = "";

    highScores = JSON.parse(localStorage.getItem("scores"));
    if (localStorage.getItem("scores") !== null) {
        for (var i = 0; i < highScores.length; i++) {
            var item = document.createElement("p");
            item.innerHTML = highScores[i].name + " - " + highScores[i].score + " points";
            highScoreItemsDiv.appendChild(item);
        }
    }


}

function storeScores() {
    var intialsInput = document.getElementById("intialsInput").value;
    var scores;
    var calculatedScore = Math.max(0, timerTotal - timeElapsed) * correctAnswers;
    var temp = { "name": intialsInput, "score": calculatedScore };

    if (localStorage.getItem("scores") !== null) {
        highScores = JSON.parse(localStorage.getItem("scores"));
    }
    highScores.push(temp);

    scores = JSON.stringify(highScores);
    localStorage.setItem("scores", scores);
    //highScores = [];
    return
}


//-------------------------------------------------------------timer functions
function startTimer() {
    time = setInterval(function () {
        var totalSecondsLeft = timerTotal - timeElapsed;
        var minutesLeft = Math.floor(totalSecondsLeft / 60);
        var secondsLeft = totalSecondsLeft % 60;
        var formattedSeconds;
        var formattedMinutes;

        if (timeElapsed > timerTotal) {
            clearInterval(time);
            timerSpan.innerHTML = "No more time left!"
            displayScore();
            return
        }
        timeElapsed++;
        if (secondsLeft < 10) {
            formattedSeconds = "0" + secondsLeft;
        } else {
            formattedSeconds = secondsLeft;
        }

        if (minutesLeft < 10) {
            formattedMinutes = "0" + minutesLeft;
        } else {
            formattedMinutes = minutesLeft;
        }

        timerSpan.innerHTML = formattedMinutes + ":" + formattedSeconds;
    }, 1000)
}