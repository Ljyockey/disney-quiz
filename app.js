'use strict';

const state = {
  //array of objects - each object is question for quiz
  questions: [
    {
      question: '1 of 10: Which of these was NOT one of the original lands?',
      a: 'a) Adventureland', 
      b: 'b) New Orleans Square',
      c: 'c) Tomorrowland',
      d: 'd) Main Street USA',
      correct: 'b',
      details: 'New Orleans Square opened in 1966.'
    },
    {
      question: '2 of 10: Which ride was moved to a different land after its original opening?',
      a: 'a) Matterhorn',
      b: 'b) Big Thunder Mountain',
      c: 'c) Splash Mountain',
      d: 'd) Space Mountain',
      correct: 'a',
      details: 'The Matterhorn was part of Tomorrowland when it first opened. It was later changed to Fantasyland.'
    },
    {
      question: '3 of 10: Which ride was the last project personally supervised by Walt Disney before his death?',
      a: 'a) It’s a Small World',
      b: 'b) Peter Pan’s Flight',
      c: 'c) Pirates of the Caribbean',
      d: 'd) Matterhorn',
      correct: 'c',
      details: 'This was the last project where Walt directly participated in the design, though it didn\'t debut until approximately 3 months after his death.'
    },
    {
      question: '4 of 10: What year did Disneyland open?',
      a: 'a) 1950',
      b: 'b) 1955',
      c: 'c) 1960',
      d: 'd) 1965',
      correct: 'b',
      details: 'Disneyland\'s official opening date was July 17, 1955'
    },
    {
      question: '5 of 10: Sleeping Beauty Castle contains a functioning drawbridge. How many times has it been raised?',
      a: 'a) 1',
      b: 'b) 2',
      c: 'c) 3',
      d: 'd) 4',
      correct: 'b',
      details: 'It was raised in 1955 for the grand opening of Disneyland and again in 1983 for the grand re-opening of Fantasyland.'
    },
    {
      question: '6 of 10: Which of these was NOT one of the original Fantasyland dark rides?',
      a: 'a) Snow White',
      b: 'b) Peter Pan',
      c: 'c) Pinocchio',
      d: 'd) Alice in Wonderland',
      correct: 'd',
      details: 'Alice and Wonderland did not open until 1958 due to budgetary restrictions.'
    },
    {
      question: '7 of 10: Where is alcohol served in Disneyland Park?',
      a: 'a) Nowhere',
      b: 'b) Blue Bayou Restaurant',
      c: 'c) Club 33',
      d: 'd) It\'s a Small World queue',
      correct: 'c',
      details: 'While there are many locations where alcohol is served in Downtown Disney and Disney California Adventure, the only place to purchase alcohol within Disneyland Park is at this exclusive, members-only dining club.'
    },
    {
      question: '8 of 10: The construction of which land was funded by the Box Office success of Mary Poppins?',
      a: 'a) Critter Country',
      b: 'b) Frontierland',
      c: 'c) Mickey\'s Toon Town',
      d: 'd) New Orleans Square',
      correct: 'd',
      details: 'This was the first major project which was not heavily funded by corporate sponsorship.'
    },
    {
      question: '9 of 10: Walt Disney had a private apartment in which Main Street building?',
      a: 'a) Fire Station',
      b: 'b) City Hall',
      c: 'c) Emporium',
      d: 'd) Disneyland Railroad Station',
      correct: 'a',
      details: 'The next time you walk by, you\'ll notice that the light has been kept on for Walt.'
    },
    {
      question: '10 of 10: What is the maximum speed of Space Mountain?',
      a: 'a) 25-35mph',
      b: 'b) 35-45mph',
      c: 'c) 45-55mph',
      d: 'd) 55-65mph',
      correct: 'a',
      details: 'Space Mountain feels much faster due to riding in the dark.'
    }],	
  //counters
  totalCorrectCounter: 0,
  totalIncorrectCounter: 0,
  //counter used to control which object in questions array
  //user is currently viewing
  quizProgress: 0
};

/*function that reveals first question of quiz after
clicking 'begin'*/

function beginQuiz(e) {
  e.preventDefault();
  resetQuiz();
  this.style.display = 'none';
  document.getElementsByClassName('description')[0].style.display = 'none';	
  buildQuestion(currentQuestion);
  document.getElementById('question').style.display = 'block';
  document.getElementsByClassName('counter')[0].style.display = 'block';
  formContainer.style.display = 'block';
}

function resetQuiz() {
  state.quizProgress = 0;
  state.totalCorrectCounter = 0;
  state.totalIncorrectCounter = 0;
  currentQuestion = 0;
  correctCounter.innerText = 0;
  document.getElementById('incorrect-counter').innerText = 0;
}

function buildQuestion(question) {
  const correctAnswer = document.getElementsByClassName('display-correct');
  if (correctAnswer.length > 0) {
    correctAnswer[0].classList.remove('display-correct');
  }
  const i = document.getElementsByClassName('display-incorrect');
  if (i.length > 0) {
    i[0].classList.remove('display-incorrect');
  }
  formContainer.innerHTML = `<form id="question-form">
      <fieldset class="question" id="question">
        <legend>${question.question}</legend>
        <div class="choices">
          <label for="a">
            <input type="radio" name="choice" id="a" value="a" required>
            ${question.a}
          </label>
          <label for="b">
            <input type="radio" name="choice" id="b" value="b">
            ${question.b}
          </label>
          <label for="c">
            <input type="radio" name="choice" id="c" value="c">
            ${question.c}
          </label>
          <label for="d">
            <input type="radio" name="choice" id="d" value="d">
            ${question.d}
          </label>
        </div>
        <button class="check-answer" type="submit">Submit</button>
      </fieldset>
    </form>`;
  document.getElementsByClassName('question')[0].style.display = 'block';  
  detailsElement.innerHTML = `The correct answer is ${question.correct}. ${question.details}`;

  document.getElementById('question-form').addEventListener('submit', checkAnswer);
}

/*function that checks answers after clicking 'check
answer'. Add green font to correct and red to user's
answer if it wasn't correct*/
function checkAnswer(e) {
  e.preventDefault();
  selectedRadio = document.querySelector('input:checked');
  document.getElementsByClassName('check-answer')[0].style.display = 'none';
  detailsContainer.style.display = 'block';
  //checking if selected answer is correct answer
  if (currentQuestion.correct === selectedRadio.id) {
    correctAnswer(selectedRadio.id);
    incrementCorrectCounter(state.totalCorrectCounter);
  }
  else {
    findCurrentCorrectAnswer();
    incorrectAnswer(selectedRadio.id);
    incrementIncorrectCounter(state.totalIncorrectCounter);	
  }
  document.getElementsByClassName('next-question')[0].style.display = 'block';
  document.getElementById('question-form').removeEventListener('submit', checkAnswer);
}

function correctAnswer(selectedRadioId) {
  document.querySelector(`label[for='${selectedRadioId}']`).classList.add('display-correct');
  correctOrIncorrect.innerHTML = 'Correct!';
}

function incorrectAnswer(selectedRadioId) {
  document.querySelector(`label[for='${selectedRadioId}']`).classList.add('display-incorrect');
  correctOrIncorrect.innerHTML = 'Incorrect!';
}

function findCurrentCorrectAnswer() {
  const ca = document.querySelector(`label[for='${currentQuestion.correct}']`);
  ca.classList.add('display-correct');
}

/*function that adds the amount of right answers*/
function incrementCorrectCounter() {
  state.totalCorrectCounter++;
  correctCounter.innerText = state.totalCorrectCounter;
}

function incrementIncorrectCounter() {
  state.totalIncorrectCounter++;
  document.getElementById('incorrect-counter').innerText = state.totalIncorrectCounter;
}


/*function that hides current question and reveals 
next question after clicking 'next'*/
function clickNextQuestion(e) {
  e.preventDefault();
  detailsContainer.style.display = 'none';
  this.style.display = 'none';
  state.quizProgress++;
  currentQuestion = state.questions[state.quizProgress];
  //checks if there are still remaining questions
  if (currentQuestion !== undefined) {
    document.querySelector('input:checked').checked = false;
    buildQuestion(currentQuestion);
    document.getElementsByClassName('check-answer')[0].style.display = 'block';
  }
  //once there are no more questions
  else {
    renderResults();
  }
}

/*function to add the amount correct to 'results'*/
function renderResults() {
  document.getElementsByClassName('counter')[0].style.display = 'none';
  formContainer.innerHTML = `
    <h2>Results</h2>
    <p>You got ${state.totalCorrectCounter} out of ${state.questions.length} correct!</p>
    <p><a href="https://twitter.com/Ljyockey">Follow me on Twitter</a></p>
    <button type="submit" id="refresh" class="refresh">Start Over</button>`;
  addButtonClickListener(document.getElementById('refresh'), beginQuiz);
}

function addButtonClickListener(targetElement, callback) {
  targetElement.addEventListener('click', callback);
}

//variable which takes an object from the 'questions' array
//based on 'progress' counter
let currentQuestion = state.questions[state.quizProgress];
//constiable for HTML element for form label and each indvidual radio input
const formContainer = document.getElementsByClassName('form-container')[0];

let selectedRadio;
const detailsContainer = document.getElementsByClassName('details-container')[0];
const correctOrIncorrect = document.getElementById('correct-or-incorrect');
const detailsElement = document.getElementById('details');
const correctCounter = document.getElementById('correct-counter');

function initiateEventHandlers() {
  addButtonClickListener(document.getElementsByClassName('begin')[0], beginQuiz);
  addButtonClickListener(document.getElementsByClassName('next-question')[0], clickNextQuestion);
}

initiateEventHandlers();
