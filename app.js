var state = {
  //array of objects - each object is question for quiz
  questions: [
    {
      question: "1 of 10: Which of these was NOT one of the original lands?",
      a: "a) Adventureland", 
      b: "b) New Orleans Square",
      c: "c) Tomorrowland",
      d: "d) Main Street USA",
      correct: "b",
      details: "The correct answer is b. New Orleans Square opened in 1966."
    },
    {
      question: "2 of 10: Which ride was moved to a different land after its original opening?",
      a: "a) Matterhorn",
      b: "b) Big Thunder Mountain",
      c: "c) Splash Mountain",
      d: "d) Space Mountain",
      correct: "a",
      details: "The correct answer is a. The Matterhorn was part of Tomorrowland when it first opened. It was later changed to Fantasyland."
    },
    {
      question: "3 of 10: Which ride was the last project personally supervised by Walt Disney before his death?",
      a: "a) It’s a Small World",
      b: "b) Peter Pan’s Flight",
      c: "c) Pirates of the Caribbean",
      d: "d) Matterhorn",
      correct: "c",
      details: "The correct answer is c. This was the last project where Walt directly participated in the design, though it didn't debut until approximately 3 months after his death."
    },
    {
      question: "4 of 10: What year did Disneyland open?",
      a: "a) 1950",
      b: "b) 1955",
      c: "c) 1960",
      d: "d) 1965",
      correct: "b",
      details: "The correct answer is b. Disneyland's official opening date was July 17, 1955"
    },
    {
      question: "5 of 10: Sleeping Beauty Castle contains a functioning drawbridge. How many times has it been raised?",
      a: "a) 1",
      b: "b) 2",
      c: "c) 3",
      d: "d) 4",
      correct: "b",
      details: "The correct answer is b. It was raised in 1955 for the grand opening of Disneyland and again in 1983 for the grand re-opening of Fantasyland."
    },
    {
      question: "6 of 10: Which of these was NOT one of the original Fantasyland dark rides?",
      a: "a) Snow White",
      b: "b) Peter Pan",
      c: "c) Pinocchio",
      d: "d) Alice in Wonderland",
      correct: "d",
      details: "The correct answer is d. Alice and Wonderland did not open until 1958 due to budgetary restrictions."
    },
    {
      question: "7 of 10: Where is alcohol served in Disneyland Park?",
      a: "a) Nowhere",
      b: "b) Blue Bayou Restaurant",
      c: "c) Club 33",
      d: "d) It's a Small World queue",
      correct: "c",
      details: "The correct answer is c. While there are many locations where alcohol is served in Downtown Disney and Disney California Adventure, the only place to purchase alcohol within Disneyland Park is at this exclusive, members-only dining club."
    },
    {
      question: "8 of 10: The construction of which land was funded by the Box Office success of Mary Poppins?",
      a: "a) Critter Country",
      b: "b) Frontierland",
      c: "c) Mickey's Toon Town",
      d: "d) New Orleans Square",
      correct: "d",
      details: "The correct answer is d. This was the first major project which was not heavily funded by corporate sponsorship."
    },
    {
      question: "9 of 10: Walt Disney had a private apartment in which Main Street building?",
      a: "a) Fire Station",
      b: "b) City Hall",
      c: "c) Emporium",
      d: "d) Disneyland Railroad Station",
      correct: "a",
      details: "The correct answer is a. The next time you walk by, you'll notice that the light has been kept on for Walt."
    },
    {
      question: "10 of 10: What is the maximum speed of Space Mountain?",
      a: "a) 25-35mph",
      b: "b) 35-45mph",
      c: "c) 45-55mph",
      d: "d) 55-65mph",
      correct: "a",
      details: "The correct answer is a. Space Mountain feels much faster due to riding in the dark."
    }],	
  //counters
  totalCorrectCounter: 0,
  totalIncorrectCounter: 0,
  //counter used to control which object in questions array
  //user is currently viewing
  quizProgress: 0
};

/*function that reveals first question of quiz after
clicking "begin"*/

function beginQuiz(e) {
  e.preventDefault();
  this.style.display = 'none';
  document.getElementsByClassName('description')[0].style.display = 'none';	
  buildQuestion(currentQuestion);
  document.getElementById('question').style.display = 'block';
  document.getElementsByClassName('counter')[0].style.display = 'block';
}

function buildQuestion(question) {
  var c = document.getElementsByClassName('display-correct');
  if (c.length > 0) {
	  c[0].classList.remove('display-correct')
  }
  var i = document.getElementsByClassName('display-incorrect');
  if (i.length > 0) {
	  i[0].classList.remove('display-incorrect')
  }
  questionHTML[0].innerHTML = question.question + '<br>';
  choiceA[0].innerHTML = question.a + '<br>';
  choiceB[0].innerHTML = question.b + '<br>';
  choiceC[0].innerHTML = question.c + '<br>';
  choiceD[0].innerHTML = question.d + '<br>';
  //condense this?
}

/*function that checks answers after clicking "check
answer". Add green font to correct and red to user's
answer if it wasn't correct*/
function checkAnswer(e) {
  e.preventDefault();
  //  selectedRadio = $("input:checked").next("label");
  selectedRadio = document.querySelector('input:checked') ? document.querySelector(`label[for="${document.querySelector('input:checked').id}"]`) : null;
  if (selectedRadio !== null) { 
    this.style.display = 'none';
    invalidInput.style.display = 'none';
    //checking if selected answer is correct answer
    if (currentQuestion.correct === document.querySelector('input:checked').id) {
      correctAnswer();
      correctCounter(state.totalCorrectCounter);
    }
    else {
      findCurrentCorrectAnswer();
      incorrectAnswer();
      incorrectCounter(state.totalIncorrectCounter);	
    }
    document.getElementsByClassName('next-question')[0].style.display = 'block';
  }
  else {
    invalidInput.style.display = 'block';
  }
}

function correctAnswer() {
  //add "display-correct" class
  selectedRadio.classList.add('display-correct');
}

function incorrectAnswer() {	
  //find correct, adds .display-correct
  selectedRadio.classList.add('display-incorrect');
}

function findCurrentCorrectAnswer() {
  var ca = document.querySelector(`label[for="${currentQuestion.correct}"]`);
  ca.classList.add('display-correct');
}

/*function that adds the amount of right answers*/
function correctCounter(number) {
  // number += 1;
  state.totalCorrectCounter +=1;
  return $(".correct-counter").text("Correct: " + state.totalCorrectCounter)
}

function incorrectCounter(number) {
  // number +=1;
  state.totalIncorrectCounter +=1;
  $(".incorrect-counter").text("Incorrect: " + state.totalIncorrectCounter);
}


/*function that hides current question and reveals 
next question after clicking "next"*/
function clickNextQuestion(e) {
  e.preventDefault();
  this.style.display = 'none';
  state.quizProgress += 1;
  currentQuestion = state.questions[state.quizProgress];
  //checks if there are still remaining questions
  if (currentQuestion !== undefined) {
    $('input:checked').prop('checked', false);
    buildQuestion(currentQuestion);
    checkAnswerButton.show();
  }
  //once there are no more questions
  else {
    showResultsClass();
  }
}

/*function to show results and hide counter*/
function showResultsClass() {
  form.hide();
  $('.counter').hide();
  returnResults(state.totalCorrectCounter);
  $(".results").show();
}

/*function to add the amount correct to "results"*/
function returnResults(number) {
  return $("#number-correct").text(number);
}

/*function that refreshes page at end to start 
again*/
function refreshPage(refresh) {
  refresh.click(function() {
    location.reload();
  });
}

//variable which takes an object from the "questions" array
//based on "progress" counter
var currentQuestion = state.questions[state.quizProgress];
//variable for HTML element for form label and each indvidual radio input
var questionHTML = $('label[for="question"]');
var choiceA = $('label[for="a"]');
var choiceB = $('label[for="b"]');
var choiceC = $('label[for="c"]');
var choiceD = $('label[for="d"]');

var begin = document.getElementsByClassName('begin');
var nextQuestionButton = document.getElementsByClassName('next-question');
var checkAnswerButton = $(".check-answer");
var refresh = $('.refresh');
var invalidInput = document.getElementsByClassName('invalid-input')[0];
var selectedRadio;
// var otherRadios;
var form = $('form');

function eventHandlers() {
  begin[0].onclick = beginQuiz;
  nextQuestionButton[0].onclick = clickNextQuestion;
  checkAnswerButton[0].onclick = checkAnswer;
}

$(function() {
  //call functions
  eventHandlers();
  refreshPage(refresh);
});


