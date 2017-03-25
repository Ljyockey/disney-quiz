var state = {
	//array of objects - each object is question for quiz
	questions: [
		{
			question: "1 of 10: Which of these was NOT one of the original lands?",
			a: "a) Adventureland", 
			b: "b) New Orleans Square",
			c: "c) Tomorrowland",
			d: "d) Main Street USA",
			correct: "b"
		},
		{
			question: "2 of 10: Which ride was moved to a different land after its original opening?",
			a: "a) Matterhorn",
			b: "b) Big Thunder Mountain",
			c: "c) Splash Mountain",
			d: "d) Space Mountain",
			correct: "a"
		},
		{
			question: "3 of 10: Which ride was the last project personally supervised by Walt Disney before his death?",
			a: "a) It’s a Small World",
			b: "b) Peter Pan’s Flight",
			c: "c) Pirates of the Caribbean",
			d: "d) Matterhorn",
			correct: "c"
		},
		{
			question: "4 of 10: Sleeping Beauty Castle contains a functioning drawbridge. How many times has it been raised?",
			a: "a) 1",
			b: "b) 2",
			c: "c) 3",
			d: "d) 4",
			correct: "b"
		},
		{
			question: "5 of 10: What year did Disneyland open?",
			a: "a) 1950",
			b: "b) 1955",
			c: "c) 1960",
			d: "d) 1965",
			correct: "b"
		},
		{
			question: "6 of 10: Which of these was NOT one of the original Fantasyland dark rides?",
			a: "a) Snow White",
			b: "b) Peter Pan",
			c: "c) Pinocchio",
			d: "d) Alice in Wonderland",
			correct: "d"
		},
		{
			question: "7 of 10: Where is alcohol served in Disneyland Park?",
			a: "a) Nowhere",
			b: "b) Blue Bayou Restaurant",
			c: "c) Club 33",
			d: "d) It's a Small World queue",
			correct: "c"
		},
		{
			question: "8 of 10: The construction of which land was funded by the Box Office success of Mary Poppins?",
			a: "a) Critter Country",
			b: "b) Frontierland",
			c: "c) Mickey's Toon Town",
			d: "New Orleans Square",
			correct: "d"
		},
		{
			question: "9 of 10: Walt Disney had a private apartment in which Main Street building?",
			a: "a) Fire Stattion",
			b: "b) City Hall",
			c: "c) Emporium",
			d: "d) Disneyland Railroad Station",
			correct: "a"
		},
		{
			question: "10 of 10: What is the maximum speed of Space Mountain?",
			a: "a) 25-35mph",
			b: "b) 35-45mph",
			c: "c) 45-55mph",
			d: "d) 55-65mph",
			correct: "a"
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

function beginQuiz(button) {
	button.click(function(e) {
		e.preventDefault();
		button.hide();
		buildQuestion(currentQuestion);
		$('fieldset').show();
		$('.counter').show();
	});
}

function buildQuestion(question) {
	$('.choices').children().removeClass('display-correct');
	$('.choices').children().removeClass('display-incorrect');
	questionHTML.html(question.question + '<br>');
	choiceA.html(question.a + '<br>');
	choiceB.html(question.b + '<br>');
	choiceC.html(question.c + '<br>');
	choiceD.html(question.d + '<br>');
	//condense this?
}

/*function that checks answers after clicking "check
answer". Add green font to correct and red to user's
answer if it wasn't correct*/
function checkAnswer(question) {
	//use variable names + .on(click)
	$(".check-answer").click(function(e) {
		e.preventDefault();
		 selectedRadio = $("input:checked").next("label");
		if (selectedRadio.length !== 0) { 
			$(this).hide();
			invalidInput.hide();
			//checking if selected answer is correct answer
			if (question.correct === $("input:checked").val()) {
				correctAnswer(selectedRadio);
				correctCounter(state.totalCorrectCounter);
			}
			else {
				findCurrentCorrectAnswer();
				incorrectAnswer(selectedRadio);
				incorrectCounter(state.totalIncorrectCounter);	
			}
			$(".next-question").show();
			}
		else {
			invalidInput.show();
			}
		});
	}

function correctAnswer(answer) {
	//add "display-correct" class
	selectedRadio.addClass('display-correct');
}

function incorrectAnswer(answer) {	
	//find correct, adds .display-correct

	selectedRadio.addClass('display-incorrect');
}

function findCurrentCorrectAnswer() {
	$('input').each(function(){
		if ($(this).val() === currentQuestion.correct) {
			$(this).next('label').addClass('display-correct');
		}
	})
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
function clickNextQuestion(button) {
	button.click(function(e) {
	e.preventDefault();
	$(this).hide();
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

	});
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

var begin = $('.begin');
var nextQuestionButton = $(".next-question");
var checkAnswerButton = $(".check-answer");
var refresh = $('.refresh');
var invalidInput = $('.invalid-input');
var selectedRadio;
// var otherRadios;
var form = $('form');

$(function() {
	//call functions
	beginQuiz(begin);
	clickNextQuestion(nextQuestionButton);
	checkAnswer(currentQuestion);
	refreshPage(refresh);
})


