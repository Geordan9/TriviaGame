var question1 = {
    q: "Who am I?",
    a1: "Geordan",
    a2: "Jordan",
    a3: "Billy",
    a4: "Jeffrey"
}

var question2 = {
    q: "Where am I?",
    a1: "Everywhere",
    a2: "At home",
    a3: "In class",
    a4: "On the sun"
}

var question3 = {
    q: "Did I procrastinate on this assignment?",
    a1: "Yes",
    a2: "No",
    a3: "Maybe",
    a4: "What is procrastinating?"
}

var questions = [
    question1,
    question2,
    question3
]

var currentQuestion = 0;

var gameDiv;

var remainingTime = 5;

var timeInterval;

var stats = {
    right: 0,
    wrong: 0
}

function shuffleArray(array) {
    for (let i = 0; i < array.length; i++) {
        var index = i + Math.floor(Math.random() * (array.length - i));

        var tmp = array[i];
        array[i] = array[index];
        array[index] = tmp;
    }
}

function showQuestion(question) {
    gameDiv.append($("<div>").text(question.q));
    var answerArray = [question.a1, question.a2, question.a3, question.a4];
    shuffleArray(answerArray);
    for (let i = 0; i < answerArray.length; i++) {
        let questionButton = $('<button class="question-button">');
        gameDiv.append(questionButton.text(answerArray[i]));
    }
    createTimer();
    $(".question-button").on("click", function () {
        gameDiv.empty();
        chooseAnswer(question, $(this).text());
    });
}

function chooseAnswer(question, answer) {
    currentQuestion++;
    gameDiv.empty();
    $("#timer").empty();
    clearInterval(timeInterval);
    if (question.a1 == answer) {
        stats.right++;
        gameDiv.append($(`<img src="http://media.giphy.com/media/pBevuxpD4Tq4U/giphy.gif" alt="win-image">`));
    } else {
        stats.wrong++;
        gameDiv.append($('<div id="right-answer">').text(`Right Answer: ${question.a1}`));
        gameDiv.append($('<div id="wrong-answer">').text(`Wrong Answer: ${answer}`));
    }
    setTimeout(function () {
        gameDiv.empty();
        if (currentQuestion < questions.length) {
            showQuestion(questions[currentQuestion]);
        } else {
            showResults()
        }

    }, 5000);
}

function questionTimer() {
    if (remainingTime > 0) {
        remainingTime--;
        $("#timeRemaining").text(remainingTime);
    } else {
        chooseAnswer(questions[currentQuestion], "Time Ran Out");
    }

}

function createTimer() {
    clearInterval(timeInterval);
    remainingTime = 30;
    var timeRemainingDiv = $("<div>").attr("id", "timeRemaining").text(remainingTime);

    $("#timer").append(timeRemainingDiv);
    timeInterval = setInterval(questionTimer, 1000);
}

function showResults() {
    clearInterval(timeInterval);

    gameDiv.append($("<div>").text(`Correct Answers: ${stats.right}`));
    gameDiv.append($("<div>").text(`Incorrect Answers: ${stats.wrong}`));
    gameDiv.append($('<button id="restart-button">').text("Restart"));
    $("#restart-button").on("click", function () {
        currentQuestion = 0;
        remainingTime = 30;
        stats.right = stats.wrong = 0;
        gameDiv.empty();
        $("#startButton").show();
    });
}

$(document).ready(function () {
    gameDiv = $("#gameDiv");
    $("#startButton").on("click", function () {
        shuffleArray(questions);
        showQuestion(questions[currentQuestion]);
        $(this).hide();
    });
});