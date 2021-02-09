/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

//show the start screen
function displayStartTemplate(){ 
  return `<div class="welcome-page">    
            <p>Welcome to my quiz on baby sleep. Find out how much you know about how babies sleep.</p>
            <button class="button" type="button" id="start">Start Quiz</button> 
          </div>`
}

//show users which question they're on and their current score
function displayProgressTemplate() { 
  return `<ul class="progress-bar">
            <li class="question-number">Question ${store.questionNumber + 1} of ${store.questions.length}.</li>
            <li class="score">Answered ${store.score} correct out of ${store.questions.length}.</li>
          </ul>`
}

//display the answers as list items with radio buttons
function displayAnswersTemplate(){
  const answers = store.questions[store.questionNumber].answers
  let answersDisplay = ''
  for (let i=0;i<answers.length;i++){
     answersDisplay += 
       `<li class="index${i}"><input type="radio" name="answers" id="answer${i+1}" value= "${answers[i]}" required> 
          <label for="answer${i+1}">${answers[i]}</label>
        </li>`            
  }  //console.log(answersDisplay)
  return answersDisplay  
}

//display the question and answer choices
function displayQuestionTemplate(){
  const currentQuestion = store.questions[store.questionNumber]
  return `<form id="quiz-question">
            <p class="question">${currentQuestion.question}</p>
            <ol type="a" class="quiz-answers">${displayAnswersTemplate()}</ol>
            <button class="button" type="submit" id="submit">Submit</button>           
          </form>`
}

//tells user if they were correct or if they were incorrect/correct answer
function displayFeedbackTemplate(answer) {
  let correctAnswer = store.questions[store.questionNumber].correctAnswer
  let feedback = ''

  if (answer === 'correct') {
    feedback = `<p class="correct">You are correct!</p>`
  }
  else if (answer === 'incorrect') {
    feedback = `<p class="incorrect">That is incorrect, the answer is ${correctAnswer}.</p>`
  } 
  return `${feedback}<button class="button" type="button" id="next">Next</button>`  
}

//show users their overall score at the end of the quiz
function displayResultsTemplate() { 
  return `<div class="results-page">  
            <h2>Results</h2>
            <p class="results-text">Your final score was ${store.score} correct out of ${store.questions.length}.</p><p>Thanks for taking my quiz. If you would like to try again, please click the button below:</p>
            <button class="button" type="button" id="restart">Start Over</button>  
          </div>`
}

/********** RENDER FUNCTION **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function renderQuiz(){
  let html = '';

  if (store.quizStarted === false) {
    $('main').html(displayStartTemplate());
    return;
  }
  else if (store.questionNumber >= 0 && store.questionNumber < store.questions.length) {
    html = displayProgressTemplate();
    html += displayQuestionTemplate();
    $('main').html(html);
  }
  else {
    $('main').html(displayResultsTemplate());
  }
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

//handles users clicking button to start the quiz.
function handleStartClick() {
  $('main').on('click', '#start', function(event){
    store.quizStarted = true  
    renderQuiz()
  })
}

//handles users submitting their answer and checks if it is correct
function handleSubmitClicked(){
  $('body').on('submit', '#quiz-question', function(event){
    event.preventDefault()
    //variable for current question
    const currentQuestion = store.questions[store.questionNumber]
    //variable for selection
    let selection = $('input[name=answers]:checked').val()
    //check if selection is equal to current question's correct answer
    //if yes, increment score and render feedback page with correct text
    if (selection === currentQuestion.correctAnswer){
      store.score++
      $('#quiz-question').append(displayFeedbackTemplate('correct'))
    }
    //if no, render feedback page with incorrect text
    else {
      $('#quiz-question').append(displayFeedbackTemplate('incorrect'))
    }
    //increment store.questionNumber
    store.questionNumber++
    //hide the submit button
    $('#submit').hide()
    //disable inputs
    $('input[type=radio]').each(function(event){
      $('input[type=radio]').attr('disabled',true)
    })
  })
}

//handles users clicking next button
function handleNextClicked(){
  $('body').on('click', '#next', function(event){
    renderQuiz()
  })
}

//handles users clicking button to start a new quiz
function handleRestartClicked(){
  $('main').on('click','#restart', function(event){
    store.quizStarted = false
    store.questionNumber = 0
    store.score = 0
    renderQuiz()
  })
}

//call all functions from a jQuery initializing function.
function handleQuizApp(){
  renderQuiz()
  handleStartClick()
  handleSubmitClicked()
  handleNextClicked()
  handleRestartClicked()
}

$(handleQuizApp)
