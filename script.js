const body = document.querySelector('body');
const options = document.querySelectorAll('.option');
const questionText = document.querySelector('.question');
const scoreLabel = document.querySelector('.score');
const countDOM = document.querySelector('.count')
let countDown = 20
let count = countDown;
let interval;
let arr = [
    36,
    40,
    44,
    48,
    45,
    50,
    55,
    60,
    42,
    54,
    66,
    72,
    49,
    56,
    63,
    70,
    77,
    84,
    64,
    80,
    88,
    96,
    81,
    90,
    99,
    108,
    100,
    110,
    120,
    121,
    132,
    144
];
let score = 0;
let correctAnswer = 0;
let correctElement;
let timeOut;
function random() {
    let rand1 = Math.floor(Math.random() * 10) + 3
    let rand2 = Math.floor(Math.random() * 10) + 3
    if (rand1 < 6 || rand2 < 6 || rand1 === rand2 || rand1 === 11 || rand2 === 11 || rand1 === 10 || rand2 === 10) {
        return random()
    }
    console.log(rand1, rand2)
    return { num1: rand1, num2: rand2 }
}
function displayOptions(num1, num2) {
    let correct = Math.floor(Math.random() * 4)
    correctElement = options[correct]
    options.forEach((element, i) => {
        if (i === correct)
            element.innerHTML = num1 * num2
        else
            element.innerHTML = Math.floor(Math.random() * arr.length) + 1 // task : elemenate dublicates
    });
    correctAnswer = num1 * num2;
}
function nextQuestion() {
    let { num1, num2 } = random();

    questionText.textContent = `${num1} × ${num2}`;
    displayOptions(num1, num2)
    resetCountdown();
    startCountdown();
}
function congrats() {
    document.querySelector('h1').textContent = '🎉🎉🎉عاش'
    options.forEach(element => element.textContent = '🎉')
}
function correct(btnCorrect) {
    btnCorrect.classList.add('correct');
    scoreLabel.textContent = ++score;
    if (score >= 25) {
        congrats()
        resetCountdown()
        return
    }
    if (score >= 10) {
        countDown = 15
    }
    if (score >= 15) {
        countDown = 10
    }
    btnCorrect.disabled = true;
    setTimeout(() => {
        btnCorrect.classList.remove('correct');
        btnCorrect.disabled = false;
        nextQuestion()
    }, 1000);
}
function incorrect(btnCorrect, btnWrong) {

    btnWrong.classList.add('wrong');
    btnCorrect.classList.add('correct');
    score = 0;
    scoreLabel.textContent = score;
    btnCorrect.disabled = true;
    setTimeout(() => {
        btnWrong.classList.remove('wrong');
        btnCorrect.classList.remove('correct');
        btnCorrect.disabled = false;
        nextQuestion();
    }, 3000);

}
scoreLabel.textContent = score;
nextQuestion();
options.forEach(option => {
    option.addEventListener('click', (event) => {
        const answer = Number(event.target.innerHTML);
        if (answer == correctAnswer)
            correct(event.target);
        else
            incorrect(correctElement, event.target);
    })
});


function startCountdown() {
    if (interval) return; // Prevent multiple intervals
    interval = setInterval(() => {
        if (count >= 0) {
            countDOM.textContent = count
            count--;
            countDown.textContent = count;
        } else {
            clearInterval(interval);
            interval = null;
            nextQuestion()
        }
    }, 1000);
}

function resetCountdown() {
    clearInterval(interval);
    interval = null;
    count = countDown;
    countDOM.textContent = count;
}
