var time = document.querySelector("#time")
var questions = document.querySelector("#questions")
var questionTitles = document.querySelector("#question-title")
var choices = document.querySelector("#choices")
var endScreen = document.querySelector("#end-screen")
var submit = document.querySelector("#submit")
var finalScore = document.querySelector("#final-score")
var initials = document.querySelector("#initials")
var startScreen = document.querySelector("#start-screen")
var startBtn = document.querySelector("#startBtn")
var timeLeft = 60
var questionIndex = 0
var timerState;
var finalScoreScreen = document.querySelector("#score-screen")



var quizQuestions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    }
  ]





  function startQuiz () {
    startScreen.setAttribute("class", "hide");
    questions.removeAttribute("class", "hide");
    timerState = setInterval(function (){
        timeLeft=timeLeft-1;
        time.textContent=timeLeft;
        if (timeLeft <= 0){
            console.log("Game Over");
            clearInterval(timerState);
        }
        // run display question function here
        
    },1000
    )
    displayQuestions();
}

function displayQuestions (){
    var currentQuestion = quizQuestions[questionIndex];
    questionTitles.textContent = currentQuestion.title;
    choices.innerHTML = "";
    currentQuestion.choices.forEach(function(choice){
        var newButton = document.createElement("button");
        newButton.textContent = choice;
        newButton.setAttribute("value", choice);
        // add eventListener to check if right or wrong
        newButton.onclick= checkAnswer;
        choices.append(newButton);
    })
}

function checkAnswer () {
    if (this.value === quizQuestions [questionIndex].answer){
        console.log("Correct");
    }else {
    console.log("incorrect");
    timeLeft=timeLeft-10
    time.textContent= timeLeft;
    }
    questionIndex++
    if(questionIndex === quizQuestions.length){
        endQuiz();
    } else {
         displayQuestions();
    }
   
}

function endQuiz(){
    questions.setAttribute("class", "hide");
    endScreen.removeAttribute("class", "hide");
    clearInterval(timerState);
    finalScore.textContent= timeLeft
}

function saveScore(){
    var scoreArray = JSON.parse( localStorage.getItem("newScores")) || []

    var userScore = {
        score: timeLeft,
        user: initials.value
    }

    scoreArray.push(userScore)
    localStorage.setItem("newScores", JSON.stringify(scoreArray))
    
    showScores()
}
submit.onclick = saveScore;

function showScores(){
    endScreen.setAttribute("class", "hide");
    finalScoreScreen.removeAttribute("class", "hide");
    var newButton = document.createElement("button");
    newButton.textContent= "Clear"
    var standings = JSON.parse(localStorage.getItem("newScores"))
    standings.sort((a,b)=>{
        if (a.score > b.score){
            return -1
        } else {
            return 1
        }
    })
    var standingsList= document.querySelector("#standings")
        
    for (var i = 0; i < standings.length; i++){
        var pEle = document.createElement("p")
        pEle.innerText = standings[i].user + ":" + standings[i].score
        standingsList.appendChild(pEle)

    }
    standingsList.appendChild(newButton);
    newButton.addEventListener("click", clearScores);
    
    var newButton2 = document.createElement("button");
    newButton2.textContent= "Go Back";
    newButton2.addEventListener("click", reload );
    standingsList.appendChild(newButton2)


}

function clearScores(){
    var standingsList= document.querySelector("#standings")
    localStorage.removeItem("newScores");
    standingsList.innerHTML = "";
}

function reload(){
    window.location = "";
}
startBtn.onclick= startQuiz