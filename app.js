'use-strict';
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Using taxonomy, what family are chickens a part of?',
      answers: [
        'Phasianidae',
        'Phaclimae',
        'Silentiarum',
        'Fortuitus'
      ],
      correctAnswer: 'Phasianidae',
      correct: false
    },
    {
      question: 'Approximately how many chickens are there on Planet Earth at any given moment?',
      answers: [
        '250 Million',
        '25 Billion',
        '5.5 Billion',
        '700 Million'
      ],
      correctAnswer: '25 Billion',
      correct: false
    },
    {
      question: 'How high can chickens Fly?',
      answers: [
        'Chickens can\'t fly!',
        '250 feet',
        '20 feet',
        '10 feet'
      ],
      correctAnswer: '10 feet',
      correctAnswerDisplay: 'The longest recorded flight by a chicken lasted for 13 seconds at a total distance of 301 feet.',
      correct: false
    },
    {
      question: 'Chickens discover their world through what sense?',
      answers: [
        'Touch',
        'Taste',
        'Smell',
        'Vision'
      ],
      correctAnswer: 'Touch',
      correctAnswerDisplay: 'Chickens primarily discover their world through touch using their beak, which happens to be their most sensitive part of their anatomy. Similar to human babies putting everything in their mouth when they are young, chickens use their beak in a similar manner.',
      correct: false
    },
    {
      question: 'Chickens are closely related to what creature?',
      answers: [
        'Bat',
        'Fish',
        'T-Rex',
        'Cat'
      ],
      correctAnswer: 'T-Rex',
      correctAnswerDisplay: 'In 2004, chickens were the first bird to have their genome sequence; which determined that chickens are the closest living relative to the Tyrannosaurus Rex.',
      correct: false
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  gotRight: 0,
  submittedAnswer: false,
  finishQuiz: false
};
/*
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
// PAGE VIEWS
function generateStartingPageView() {
  // html code for start page
  return `
    <section class="startPage">
      <div class="align">
        <div class="main">
            <form id="js-startForm">
              <label for="startQuiz">Ready to talk chicken?</label>
              <br>
              <div>
                  <button id="startQuiz" type="submit" value="startQuiz" required>Start Quiz</button>
              </div>
            </form>
        </div>
      </div>
    </section>
  `;
}

// QUIZ FORM

function generateQuizAnswerElement(answer, answerIndex, template) { // this function may be deleted
  return `
    <input id="answer${answerIndex}" type="radio" name="answer" value="${answer}" required>
    <label for="answer${answerIndex}">${answer}</label><br>
  `;
}

function generateQuizPageString() {
  // this function will be resonsible for generating the questions 
  const question = store.questions[store.questionNumber];
  const answers = question.answers.map((answer, index) =>
    generateQuizAnswerElement(answer, index));
  return `
    <div class="align quizChoicesForm">
      <form id="js-quizChoicesForm">
        <h2>${question.question}</h2>
        <div class="js-questions questions">
          ${answers.join('')}
        </div>
        <div>
          <button type="submit" value="submitAnswer">Submit</button>
        </div>
      </form>
    </div>
  `; 
}

// SCORE HEADER
function generateScoreView() {
  // this function will handle how user will see their current score
  const currentScore = store.score;
  return `
    <div class="score">
      <h3>Current Score ${currentScore}:5</h3>
    </div>
  `;
}

// Question number HEADER
function generateQuestionView() {
  // this function will handle how the user will see their current Question Number
  const questionStatus = store.questionNumber;
  return `
    <div class="questionNumber">
      <h3>Current Question Number: ${questionStatus + 1}</h3>
    </div>
  `;
}

function generateStatusViewString() {
  // this function will be resonsible for generating a status display string  
  const scoreView = generateScoreView();
  const questionView = generateQuestionView();
  return `
    <div class="header">
      <div class="topDisplay">
        ${questionView}
        ${scoreView}
      </div>
    </div>
  `;
}

// FEEDBACK PAGE 
function feedbackCorrectAnswerPageString() {
  const correctAnswer = store.questions[store.questionNumber].correctAnswer;
  const correctTextDisplay = store.questions[store.questionNumber].correctAnswerDisplay;
  if(correctTextDisplay) {
    return `
        <h3>Looks like you got that question right!</h3>
        <p>You answered: "${correctAnswer}"</p>
        <p>${correctTextDisplay}</p>
        <div class="correct">
          <h6>Plus one point!</h6>
        </div> 
    `;
  }
  else {
    return `
        <h3>Looks like you got that question right!</h3>
        <p>You answered: "${correctAnswer}"</p>
        <div class="correct">
          <h6>Plus one point!</h6>
        </div>
    `;
  }
}

function feedbackIncorrectAnswerPageString(answerSubmitted) {
  const correctAnswer = store.questions[store.questionNumber].correctAnswer;
  const correctTextDisplay = store.questions[store.questionNumber].correctAnswerDisplay;
  if(correctTextDisplay) {
    return `
        <h3>Looks like you got that question wrong!</h3>
        <p>You answered: ${answerSubmitted}</p>
        <p>The correct answer was: <em>${correctAnswer}</em></p>
        <p>${correctTextDisplay}</p>
        <div class="incorrect">
          <h6>Minus one point!</h6>
        </div>
    `;
  }
  else {
    return `
        <h3>Looks like you got that question wrong!</h3>
        <p>You answered: "${answerSubmitted}"</p>
        <p>The correct answer was: <em>${correctAnswer}</em></p>
        <div class="incorrect">
          <h6>Minus one point!</h6>
        </div>
    `;
  }
}
function generateFeedbackString(answerSubmitted) {
  // this function will be responsible for generating the feedback page based on correct 
  // or incorrect answer feedback
  let stringOutput = '';
  const answer = store.questions[store.questionNumber].correct;
  if(answer === true) {
    stringOutput = feedbackCorrectAnswerPageString();
  }
  else if(answer === false) {
    stringOutput = feedbackIncorrectAnswerPageString(answerSubmitted);
  }
  return stringOutput;
}

function generateFeedbackPageView() {
  // this function will be responsible for render the FINAL feedback page
  const correctState = store.questions[store.questionNumber].correct;
  const answerSubmitted = $('input[name="answer"]:checked').val();
  const feedbackView = generateFeedbackString(answerSubmitted);
  return `
    <div class="align feedbackText">
      ${feedbackView}
      <div>
        <form id="next">
          <button type="submit" value="nextQuestion">Next Question</button>
        </form>
      </div>
    </div>`;
}

function generateResultsButton() {
  // this function will generate the results button
  return `
    <form id="results">
      <button type="submit" value="seeResults">See Results</button>
    </form>
  `;
}

function generateFinalPageView() {
  // this function will be responsible for rendering the final page
  const score = store.score;
  const gotRight = store.gotRight;
  const questions = store.questions.length;
  return `
    <div class="align">
      <h2>Here are your Results for the Chicken Quiz</h2>
      <h3>Out of the ${questions}, you got ${gotRight} right!</h3>
      <h4>You scored ${score} out of ${questions} points possible. Wanna give this another shot?</h4>
        <div>
          <form id="doOver">
            <button type="submit" value="nextQuestion">Redo Quiz</button>
          </form>
        </div>
    </div>
  `;
}
/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
function renderPage() {
  const app = $('.js-page');
  const status = $('.topDisplay');
  const startPage = generateStartingPageView(store);
  const quizPage = generateQuizPageString(store);
  const feedbackPage = generateFeedbackPageView(store);
  const viewStatus = generateStatusViewString(store);
  const finalPage = generateFinalPageView(store);

  switch(store.quizStarted) {
    case false:
      app.html(startPage);
      break;
    case true:
      switch(store.questionNumber) {
        case 0: case 1: case 2: case 3: case 4:
          app.html(quizPage);
          status.html(viewStatus);
          switch(store.submittedAnswer) {
            case true:
              app.html(feedbackPage);
              store.submittedAnswer = false;
              if(store.questionNumber === 4) {
                app.html(feedbackPage);
                $('#next').hide();
                $('.align.feedbackText').append(generateResultsButton());
                store.submittedAnswer = false;
              }
          } 
      }
      switch(store.finishQuiz) {
        case true:
          $('div.topDisplay').hide();
          app.html(finalPage);
      }
  }
}
/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function handleStartQuiz() {
  // function will be responsible for when user clicks on the start quiz button
  $('.js-page').on('submit', '#js-startForm', event => {
    event.preventDefault();
    store.quizStarted = true;
    renderPage();
  });

}

function changeCorrectState(answer) {
  const answerSubmitted = $('input[name="answer"]:checked').val();
    const correctAnswer = answer.correctAnswer;
    const checkedAnswer = answer;
    if(answerSubmitted === correctAnswer) {
      checkedAnswer.correct = true;
      store.score++;
      store.gotRight++;
    }
    else if (answerSubmitted !== correctAnswer){
      checkedAnswer.correct = false;
      if(store.score > 0) {
        store.score--;
      }
    } 
}

function handleAnswerSubmit() {
  // this function will be responsible for when user submits an answer
  // this function will be resonsible for checking if submitted answers are correct
  $('.js-page').on('submit', '#js-quizChoicesForm', event => {
    event.preventDefault();
    store.submittedAnswer = true;
    const answer = store.questions[store.questionNumber];
    changeCorrectState(answer);
    renderPage();
  });
}

function handleNextQuestionClicked() {
  // this this function will be responsible for when user clicks on the next question
  $('.js-page').on('submit', '#next', event => {
    event.preventDefault();
    store.questionNumber++;
    renderPage();
  });
}

function handleSeeResultsClicked() {
  // this this function will be responsible for when user clicks on the next question
  $('.js-page').on('submit', '#results', event => {
    event.preventDefault();
    store.finishQuiz = true;
    renderPage();
  });
}
/********** CALLBACKS **********/
function handleQuiz() {
  generateStartingPageView();
  handleStartQuiz();
  renderPage();
  handleAnswerSubmit();
  generateFeedbackPageView();
  handleNextQuestionClicked();
  handleSeeResultsClicked();
  generateFinalPageView();
}
$(handleQuiz);