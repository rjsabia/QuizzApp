
 // The space game, click the start button to play, then select the correct answer from the 
 // the radio selection. Game will output whether you got the right answer or not, track your score,
 // and output the correct answer if you got one wrong.
 // Built with JS and jQuery, enjoy
 // by Russell Sabia

 // array of objects holding questions, choices, and the correct answer
  var questions = [{
    question: "Earth's Moon is how many miles away?",
    choices: ['1 million miles', '500 miles', '2,380 miles', '238,900 miles'],
    correctAnswer: 3,
    correctAnswerText: "The correct answer is 238,000 miles",
  }, {
    question: "How long does it take for the light from the Sun to reach Earth?",
    choices: ['2 hours', '8.2 seconds', '8 minutes and 20 seconds', '1 week'],
    correctAnswer: 2,
    correctAnswerText: "The correct answer is 8 minutes and 20 seconds",
  }, {
    question: "How many Earth's could fit into Jupiter?",
    choices: ['100 Earths', '1,300 Earths', '380 Earths', '50 Earths'],
    correctAnswer: 1,
    correctAnswerText: "The correct answer is 1,300 Earth's",
  }, {
    question: "How many times would you have to multiply the weight of Earth, to equal the weight of the Sun?",
    choices: ['1,000 Times', '333 Times', '3,300 Times', '333,000 Times'],
    correctAnswer: 3,
    correctAnswerText: "The correct answer is 333,000 times the weight of Earth"
  }, {
    question: "At the speed of light, (670,616,629 mph), how long would it take to get to our neighbor galaxy Cannis Major? ",
    choices: ['25,000 years', '10 years', '25 years', '1,000 years'],
    correctAnswer: 0,
    correctAnswerText: "The correct is 25,000 years!",
  }];
// Below are global scope variables
  //current question
  var questionCounter = 0;  
  //Quiz div object
  var quiz = $('#quiz'); 
  
  var numCorrect = 0;

  var totalQuestions = 5;
  // Listen for start game button to be clicked
  $('#gameStartButton').click(function(){
	
	$('#startGame').fadeOut(100);
	
	$('#spaceGame').fadeIn(1000);

	// function call to display first question
  	displayNext();
});
  
  //handler for the 'next' button
  $('#quiz').submit(function(event){
    
    event.preventDefault();

    var userAnswer = $("input[name=answer]:checked").val();
    
    console.log(userAnswer);
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
    	
    	return false;
    }
    // Checks if user selected a question, alerts user to pick a question if none selected
    if (userAnswer == undefined) {
    	
    	alert('Please make a selection, come on you want to learn dont you!');
    } 

    else {
      	
      	if (userAnswer == questions[questionCounter].correctAnswer){
      		 
      		 numCorrect++;

      		 $('#output').html('Correct!' + "</br>" + numCorrect + " out of " + totalQuestions 
      		 + " questions correct");

      		 $('#submit').hide();
      		 
      		 $('#next').show();
		}
      	
      	else{
      		
      		$('#output').html(questions[questionCounter].correctAnswerText + "</br>" 
      		+ numCorrect + " out of " + totalQuestions + " questions correct");

      		$('#submit').hide();
      		
      		$('#next').show();
      	}
      	// increase question count by 1
      	questionCounter++;
      	
      	$('#next').click(function(){

      		displayNext();

      	})
      	// Calls up next question
      	
    }
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    
	    event.preventDefault();
	    // calls function to restart game
		newGame();

  });
  
// *********************************************************************
// Creates DOM element with question, and what question number you are on
  function createQuestionElement(index) {
    var questionDiv = $('<div>', {
    id: 'question'
    });
    
    var header = $('<h2> Space Question ' + (index + 1) + ':</h2>');
    questionDiv.append(header);
    
    var question = $('<p>').append(questions[index].question);
    questionDiv.append(question);
    
    var radioButtons = createRadios(index);
    questionDiv.append(radioButtons);
    
    return questionDiv;
  }
  // *******************************************************************
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
  	
  	var radioList = $('<ul>');
    
    var item;
    
    var input = '';
    
    for (var i = 0; i < questions[index].choices.length; i++) {
    	
    	item = $('<li>');
    	
    	input = '<input type="radio" name="answer" value=' + i + ' />';
    	
    	input += questions[index].choices[i];
    	
    	item.append(input);
    	
    	radioList.append(item);
    }
    
    return radioList;
  }
  // *******************************************************************
  // Displays next requested question when called, and controls display of buttons (next, prev)
  function displayNext() {
  	
  	quiz.fadeOut(function() {
    	// removes current question
    	$('#question').remove();
      // checks to assure current question count is less than total questions
      if(questionCounter < questions.length){
      	// variable calls function for question creation, based on index value of the question counter
      	var nextQuestion = createQuestionElement(questionCounter);
        // fades in the next question
        quiz.prepend(nextQuestion).fadeIn();
        // Hides next button, shows the Submit button
        $('#next').hide();
      		
      	$('#submit').show();
      	// Clears answer output
      	$('#output').html(numCorrect + " out of " + totalQuestions 
      	+ " questions correct");
		// Controls display of next button and displays final score
        if(questionCounter === 0){
        	
        	$('#submit').show();
        } 
      }
        else {
        	
        	var scoreElem = displayScore();
        	
        	quiz.append(scoreElem).fadeIn();
        	
        	$('#submit').hide();

        	$('#next').hide();
      }
    });
  }
  // **********************************************
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
  	
  	var score = $('<p>',{id: 'question'});

  	if (numCorrect > 3){
    
    	score.append('You got ' + numCorrect + ' questions out of ' +
        totalQuestions + ' right! Someone is ready to go to Space!');
	}

	else{

		score.append('You got ' + numCorrect + ' questions out of ' +
        totalQuestions + ' right. Maybe stay on the ground or try again.');
	}	
    return score;
  }
  // ************************************************************
  // New Game function to start game or start over
 function newGame(){

	 questionCounter = 0;

	 numCorrect = 0;

	 $('#output').html('Good Luck!');

	 $('#spaceGame').fadeOut(100);
	
	 $('#startGame').fadeIn(1000);
	 
	 displayNext();
	 
  }
 // **********************************************
 // End Of Program : )
