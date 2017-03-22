/*function that reveals first question of quiz after
clicking "begin"*/
$(".begin").click(function(e) {
	e.preventDefault();
	$("#question-1").show();
});

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
	answer.parents().find(".correct").addClass("display-correct");
	if (!answer.hasClass("correct")) {
		answer.addClass("display-incorrect");
	}
}

/*function that adds the amount of right answers*/

/*function that hides current question and reveals 
next question after clicking "next"*/
$(".next-question").click(function(e) {
	e.preventDefault();
	$(this).parents("fieldset").hide();
	$(this).parents().next("fieldset").show();
})

/*function to add the amount correct to "results"*/

/*function that refreshes page at end to start 
again*/