/*function that reveals first question of quiz after
clicking "begin"*/
$(".begin").click(function(e) {
	e.preventDefault();
	$(this).hide();
	$("#question-1").show();
	$(".counter").show();
});

/*Create object containing "total" values*/
	var totals = {
		correct: 0,
		incorrect: 0
	}

/*function that checks answers after clicking "check
answer". Add green font to correct and red to user's
answer if it wasn't correct*/
$(".check-answer").click(function(e) {
	e.preventDefault();
	var currentAnswer = $("div input:checked").closest("div");
	checkAnswer(currentAnswer);
	$(this).siblings($(".next-question")).show();
});

function checkAnswer(answer) {
	if (answer.hasClass("incorrect")) {
		answer.addClass("display-incorrect");
		answer.siblings(".correct").addClass("display-correct");
		totals.incorrect += 1;
		incorrectCounter(totals.incorrect);
	}
	else {
		answer.addClass("display-correct");
		totals.correct += 1;
		correctCounter(totals.correct);	
	}
}

/*function that adds the amount of right answers*/
function correctCounter(number) {
	return $(".correct-counter").text("Correct: " + number)
}

function incorrectCounter(number) {
	return $(".incorrect-counter").text("Incorrect: " + number)
}


/*function that hides current question and reveals 
next question after clicking "next"*/
$(".next-question").click(function(e) {
	e.preventDefault();
	$(this).parents("fieldset").hide();
	$(this).parents().next("fieldset").show();
})

/*function to add the amount correct to "results"*/
function returnResults(number) {
	return $("#number-correct").text(number);
}

/*function to show results and hide counter*/
$(".get-results").click(function(e){
	e.preventDefault();
	$(this).parents("fieldset").hide();
	$(".counter").hide();
	returnResults(totals.correct);
	$(".results").show();
})

/*function that refreshes page at end to start 
again*/
$(".refresh").click(function() {
	location.reload();
});