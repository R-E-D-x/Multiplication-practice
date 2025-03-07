const body = document.querySelector('body');
const nextBtn = document.querySelector('.next')
const options = document.querySelectorAll('.option');
const questionText = document.querySelector('.question');
const scoreLabel = document.querySelector('.score');
const countDOM = document.querySelector('.count')
let countDown = 20
let count = countDown;
let interval;
let arr = [
    36,
    48,
    45,
    42,
    54,
    72,
    49,
    56,
    63,
    84,
    64,
    96,
    81,
    108,
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
function randAnswers() {
    let rand = Math.floor(Math.random() * arr.length)
    return arr[rand]
}
function displayOptions(num1, num2) {
    let setNums = new Set()
    setNums.add(num1 * num2);
    while (setNums.size < 4) {
        setNums.add(randAnswers())
    }
    let arr = [...setNums];
    arr.sort(() => Math.random() - 0.5)
    options.forEach((element, i) => {
        element.textContent = arr[i]
        if (arr[i] === num1 * num2) correctElement = element
    });
    correctAnswer = num1 * num2;
}
function nextQuestion() {
    let { num1, num2 } = random();

    questionText.textContent = `${num1} × ${num2}`;
    displayOptions(num1, num2)

    startCountdown();
}
function congrats() {
    document.querySelector('h1').textContent = '🎉🎉🎉عاش'
    options.forEach(element => element.textContent = '🎉')
}
function correct(btnCorrect) {
    resetCountdown();
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
    body.classList.add('correct')

    btnCorrect.disabled = true;
    setTimeout(() => {
        body.classList.remove('correct')

        setTimeout(() => {
            btnCorrect.classList.remove('correct');
            btnCorrect.disabled = false;
            nextQuestion()
        }, 500);
    }, 500);
}
function incorrect(btnCorrect, btnWrong) {
    resetCountdown();
    btnWrong.classList.add('wrong');
    btnCorrect.classList.add('correct');
    body.classList.add('wrong')

    score = 0;
    scoreLabel.textContent = score;
    btnCorrect.disabled = true;

    setTimeout(() => {
        body.classList.remove('wrong')
        nextBtn.classList.remove('hidden')
    }, 500);
}
nextBtn.addEventListener('click', () => {
    location.reload()
})
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
