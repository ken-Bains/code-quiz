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
highScoreItemsDiv = document.querySelector(".listOfScores");

var highScores = [];
questionIndex = 0;
correctAnswers = 0;
timerTotal = 90;
timeElapsed = 0;


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

function createBtns(event) {
    questionBtns.innerHTML = "";
    questionDiv.innerHTML = "";

    questionDiv.innerHTML = "<h5>" + questions[questionIndex].title + "</h5>";

    for (var i = 0; i < questions[questionIndex].choices.length; i++) {
        // var listItem = "";
        var listItem = document.createElement('span');
        listItem.innerHTML = "<button type='button' class='btn btn-primary btn-block mb-2' >" + questions[questionIndex].choices[i] + "</button>";
        questionBtns.appendChild(listItem);
    }
    questionIndex++;
    return
};

function checkAnswer(event) {
    document.getElementById("answerCheckDiv").innerHTML = "";
    var listItem = "";
    var listItem = document.createElement('div');
    var key;

    if (event.target.innerHTML === questions[questionIndex - 1].answer) {
        key = "right";
        correctAnswers++;
        console.log(correctAnswers, "checkanswer");
    } else {
        key = "wrong";
    }
    // var fadeTarget = document.getElementById("answerCheckDiv");
    // console.log(fadeTarget.style.opacity);

    // var fadeEffect = setInterval(function () {      
    //     document.getElementById("answerCheckDiv").innerHTML = "";
    //     if (!fadeTarget.style.opacity || fadeTarget.style.opacity == 0) {
    //         fadeTarget.style.opacity = 1;
    //     }
    //     if (fadeTarget.style.opacity > 0) {
    //         fadeTarget.style.opacity -= 0.1;
    //     } else {
    //         clearInterval(fadeEffect);
    //         return
    //     }
    // }, 200);

    listItem.innerHTML = "<hr> <span>You got it " + key + "!!</span>";
    document.getElementById("answerCheckDiv").appendChild(listItem);
    return
};

function displayScore() {
    document.getElementById("questionsWrapper").classList.add("hideClass");
    document.getElementById("scoreWrapper").classList.remove("hideClass");
    document.getElementById("answerId").innerHTML = " " + correctAnswers + " ";

}

function viewHighScores() {
    scoreWrapper.classList.add("hideClass");
    highScoresDiv.classList.remove("hideClass");
    highScores = JSON.parse(localStorage.getItem("scores"));

    for (var i = 0; i < highScores.length; i++) {
        var item = document.createElement("p");
        item.innerHTML = highScores[i].name + " " + highScores[i].score;
        highScoreItemsDiv.appendChild(item);
    }
}

function storeScores() {
    var intialsInput = document.getElementById("intialsInput").value;
    var scores;
    var temp = { "name": intialsInput, "score": correctAnswers };

    if (localStorage.getItem("scores") !== null) {
        highScores = JSON.parse(localStorage.getItem("scores"));
    }
    highScores.push(temp);

    scores = JSON.stringify(highScores);
    localStorage.setItem("scores", scores);
    return
}
function startTimer() {
    var time = setInterval(function () {
        var totalSecondsLeft = timerTotal - timeElapsed;
        var minutesLeft = Math.floor(totalSecondsLeft / 60);
        var secondsLeft = totalSecondsLeft % 60;
        var formattedSeconds;
        var formattedMinutes;

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

        timerSpan.innerHTML = formattedMinutes + " : " + formattedSeconds;
    }, 1000)
}