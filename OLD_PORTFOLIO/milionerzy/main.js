
function setChildText(element, childClass, newText) {
  for (var i = 0; i < element.childNodes.length; i++) {
    var child = element.childNodes[i];
    if (child.className == childClass) {
     child.innerHTML = newText;
    }        
  } 
}

function setButtonText(buttonElement, newText) {
  setChildText(buttonElement, "buttonText", newText);
}

function unlockButton(button) {
  button.style.backgroundColor = DEFAULT_COLOR;
  button.locked = null;
}

function lockButton(button) {
  button.style.backgroundColor = CLICKED_COLOR;
  button.locked = true;
}

function fillQuestion(text) {
  document.getElementById("questionText").innerHTML = text
}

function fillAnswer(button, answer) {
  setButtonText(button, answer.text);
  button.answerIndex=answer.index;
}

function prepareButtons(buttons, answers) {
  for (var i = 0; i < buttons.length; i++) {
    fillAnswer(buttons[i],answers[i]);
    unlockButton(buttons[i]);
  }
}

function generateAnswerSubset(answerList, subsetSize) {
   var listSize = answerList.length;
   console.assert(listSize >= subsetSize);

   var subsetFirstIndex = randomInt(0, listSize - subsetSize);
   var subsetLastIndex = subsetFirstIndex + subsetSize - 1;

   var answerSubset=[];
   for (var i = subsetFirstIndex; i <= subsetLastIndex; i++) {
     var answer = {index: i, text: answerList[i]};
     answerSubset.push(answer);
   }
   shuffle(answerSubset);
   console.assert(answerSubset.length == subsetSize);
   return answerSubset;
}

function getButtons() {
  return document.getElementsByClassName("button");
}

function showButtons()
{
  startTime=Date.now()
  var buttons = getButtons();
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.visibility="visible";
  }
}

function hideButtons()
{
  var buttons = getButtons();
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.visibility="hidden";
  }
}

function showButtonsWithDelay(delay) {
   setTimeout(showButtons,delay);
}

function startQuizRound() {
  if (typeof questions === 'undefined') {
    loadQuestions();
    console.log("Questions loaded!");
  }
  givenAnswers = [];
  console.assert(questions.length>0);
  var questionIndex = randomInt(0, questions.length-1);
  var question = questions[questionIndex];
  var questionText = question.q;
  var quizAnswers = generateAnswerSubset(question.a, 4);

  console.log(questionText);
  console.log(quizAnswers);
  var buttons = getButtons();
  console.assert(buttons.length==4);
  hideButtons();
  fillQuestion(questionText);
  prepareButtons(buttons, quizAnswers);
  showButtonsWithDelay(SHOW_DELAY);
}

function evaluateResults() {
   var endTime=Date.now();
   var isWin = inOrder(givenAnswers);
   hideButtons();
   duration = endTime-startTime
   showEndMessage(isWin, duration);
}

function buttonCallback() {
  console.log(this.answerIndex);
  if (!this.locked)
  {
    lockButton(this)
    givenAnswers.push(this.answerIndex);
    if (givenAnswers.length == 4) evaluateResults();
  }
}

function setButtonsCallbacks() {
  var buttons = getButtons();
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick=buttonCallback;
  }
}

function sheduleReload()
{
  setTimeout(function(){location.reload()},RELOAD_DELAY);
}

function showEndMessage(isWin, time) {
   var msgTextField = document.getElementById("messageText");
   var msgPopup = document.getElementById("messagePopup");
   if(isWin) {
     msgText = "Well done!";
     popupColor = WIN_COLOR;
   } else {
     msgText = "Try harder!";
     popupColor = FAIL_COLOR;
   }
   msgTextField.innerHTML=msgText+"<br>"+time+"ms";
   msgPopup.style.backgroundColor=popupColor;
   msgPopup.style.visibility="visible";
   sheduleReload();
}

