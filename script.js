var questionBtns = document.querySelector(".buttonQuestions .col-sm-3");
startBtn = document.querySelector(".startBtn");
questionDiv = document.getElementById("questionDiv");
questionIndex = 0;

startBtn.addEventListener("click", function (event) {
    event.preventDefault()
    startBtn.classList.add("hideClass")
    questionBtns.parentElement.classList.remove("hideClass")
    createBtns();
    return
});

questionBtns.addEventListener("click", function(event) {
    event.stopPropagation();
    checkAnswer(event);

    if (questionIndex == questions.length) {
        alert("no more question");

    } else {
        createBtns(event);
    }
    return
});

function createBtns(event) {
    questionBtns.innerHTML = "";
    questionDiv.innerHTML = "";
    if (questionIndex !== 0) {
        checkAnswer(event);
    }
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
    } else {
        key = "wrong";
    }
    listItem.innerHTML = "<hr> <span>You got it " + key + "!!</span>";
    document.getElementById("answerCheckDiv").appendChild(listItem);
    return
};