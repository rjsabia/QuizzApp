
 // array of objects holding questions, choices, and the correct answer
  var questions = [{
    question: "Earth's Moon is how many miles away?",
    choices: ['1 million miles', '500 miles', '2,380 miles', '238,900 miles'],
    correctAnswer: 3,
  }, {
    question: "How long does it take for the light from the Sun to reach Earth?",
    choices: ['2 hours', '8.2 seconds', '8 minutes and 20 seconds', '1 week'],
    correctAnswer: 2,
  }, {
    question: "How many Earth's could fit into Jupiter?",
    choices: ['100 Earths', '1,300 Earths', '380 Earths', '50 Earths'],
    correctAnswer: 1,
  }, {
    question: "How many times would you have to multiply the weight of Earth, to equal the weight of the Sun?",
    choices: ['1,000 Times', '333 Times', '3,300 Times', '333,000 Times'],
    correctAnswer: 3,
  }, {
    question: "At the speed of light, (670,616,629 mph), how long would it take to get to our neighbor galaxy Cannis Major? ",
    choices: ['25,000 years', '10 years', '25 years', '1,000 years'],
    correctAnswer: 0,
  }];
// Below are global scope variables
  //current question
  var questionCounter = 0;  
  //Quiz div object
  var quiz = $('#quiz'); 
  
  var numCorrect = 0;

  var totalQuestions = 5;

  // function call to display first question
  displayNext();
  
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
      		 
      		 $('#output').html('Correct!');

      		 numCorrect++;

      	}
      	else{
      		$('#output').html('Incorrect!');
      	}
      	questionCounter++;
      	// Calls up next question
      	displayNext();
    }
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    
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

         // Controls display of 'prev' button
        if(questionCounter === 1){
        	
        	$('#prev').show(); 
        } 
        else if(questionCounter === 0){
          
        	$('#prev').hide();
        	
        	$('#next').show();
        }
      }
        else {
        	
        	var scoreElem = displayScore();
        	
        	quiz.append(scoreElem).fadeIn();
        	
        	$('#next').hide();
        	
        	$('#start').show();
      }
    });
  }
  // **********************************************
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
  	
  	var score = $('<p>',{id: 'question'});
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 totalQuestions + ' right!!!');
    return score;
  }
  // ************************************************************
  // New Game function to start game or start over
 function newGame(){

	 questionCounter = 0;
	 
	 selections = [];
	 
	 displayNext();
	 
	 $('#start').hide();
  }
 // **********************************************
 // End Of Program : )
