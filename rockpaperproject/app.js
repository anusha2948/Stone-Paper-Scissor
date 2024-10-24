
let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let compScore = parseInt(localStorage.getItem('compScore')) || 0;
const userScoreSpan = document.getElementById('user-score');
const compScoreSpan = document.getElementById('comp-score');
const resultMessage = document.getElementById('result-message');
const choices = document.querySelectorAll('.choice');
const rulesPopup = document.getElementById('rules-popup');
const rulesBtn = document.getElementById('rules-btn');
const closePopup = document.getElementById('close-popup');

function updateScores() {
    userScoreSpan.innerText = userScore;
    compScoreSpan.innerText = compScore;
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('compScore', compScore);
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    console.log("randomIndex",randomIndex)
    return choices[randomIndex];
}

function getResult(userChoice, compChoice) {
    console.log('userChoice',userChoice)
    if (userChoice === compChoice) return 'draw';
    if (
        (userChoice === 'rock' && compChoice === 'scissors') ||
        (userChoice === 'scissors' && compChoice === 'paper') ||
        (userChoice === 'paper' && compChoice === 'rock')
    ) {
        return 'win';
    }
    return 'lose';
}

function showResult(userChoice, compChoice, result) {
    switch(result) {
        case 'win':
            userScore++;
            resultMessage.innerText = `You picked ${userChoice}, Computer picked ${compChoice}. You win!`;
            break;
        case 'lose':
            compScore++;
            resultMessage.innerText = `You picked ${userChoice}, Computer picked ${compChoice}. You lose!`;
            break;
        case 'draw':
            resultMessage.innerText = `You picked ${userChoice}, Computer picked ${compChoice}. It's a tie!`;
            break;
    }
    updateScores();
    
    if (userScore >= 11) {
        resultMessage.innerHTML = '<img src="images/hurray.jpeg" alt="Hurray" width="100"/><h3> Hurray!! you won the game <h3>';
        userScore = 0;
        compScore = 0;
        updateScores();
    } else if (compScore >= 11) {
        resultMessage.innerText = 'You lost against PC!';
        userScore = 0;
        compScore = 0;
        updateScores();
    }
}

function playGame(userChoice) {
    const compChoice = getComputerChoice();
    const result = getResult(userChoice, compChoice);
    showResult(userChoice, compChoice, result);
}

choices.forEach(choice => {
    choice.addEventListener('click', (event) => {
        console.log('event',event)
        playGame(event.target.id);
    });
});

rulesBtn.addEventListener('click', () => {
    rulesPopup.classList.add('show');
});

closePopup.addEventListener('click', () => {
    rulesPopup.classList.remove('show');
});

updateScores();
