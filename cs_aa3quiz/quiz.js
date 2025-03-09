const quizData = [
    {
        question: "Which of the following is a common stereotype about women?",
        options: ["Women are bad at math", "Women are stronger than men", "Women never face discrimination", "Women don't work hard"],
        answer: "Women are bad at math"
    },
    {
        question: "What is one important way to support women's rights?",
        options: ["Ignore the issue", "Educate yourself and others", "Blame women for problems", "Say nothing"],
        answer: "Educate yourself and others"
    },
    {
        question: "Which day is celebrated as International Women's Day?",
        options: ["January 1", "March 8", "July 4", "December 25"],
        answer: "March 8"
    },
    {
        question: "What is one common challenge women face in workplaces?",
        options: ["Equal opportunities", "Gender bias and discrimination", "Higher salaries", "More promotions"],
        answer: "Gender bias and discrimination"
    },
    {
        question: "How can society help create a safer environment for women?",
        options: ["Blame victims", "Ignore the issue", "Educate people and enforce laws", "Let women solve it alone"],
        answer: "Educate people and enforce laws"
    }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");

function loadQuestion() {
    const questionData = quizData[currentQuestion];
    quizContainer.innerHTML = `<h2>${questionData.question}</h2>`;
    questionData.options.forEach(option => {
        quizContainer.innerHTML += `
            <label>
                <input type="radio" name="answer" value="${option}" onclick="checkAnswer(this)">
                ${option}
            </label><br>
        `;
    });
}

function getSelectedAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    return selectedOption ? selectedOption.value : null;
}

function checkAnswer(selected) {
    const selectedValue = selected.value;
    const correctAnswer = quizData[currentQuestion].answer;
    
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.parentElement.style.color = "black"; // Reset all colors
    });
    
    if (selectedValue === correctAnswer) {
        selected.parentElement.style.color = "green";
    } else {
        selected.parentElement.style.color = "red";
    }
}

nextButton.addEventListener("click", () => {
    const answer = getSelectedAnswer();
    if (!answer) {
        alert("Please select an answer before proceeding.");
        return;
    }
    if (answer === quizData[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    prevButton.disabled = currentQuestion === 0;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        quizContainer.style.display = "none";
        nextButton.style.display = "none";
        prevButton.style.display = "none";
        submitButton.style.display = "none";
        resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
    }
    if (currentQuestion === quizData.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline";
    }
});

prevButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        nextButton.style.display = "inline";
        submitButton.style.display = "none";
    }
    prevButton.disabled = currentQuestion === 0;
});

submitButton.addEventListener("click", () => {
    const answer = getSelectedAnswer();
    if (!answer) {
        alert("Please select an answer before submitting.");
        return;
    }
    if (answer === quizData[currentQuestion].answer) {
        score++;
    }
    quizContainer.style.display = "none";
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    submitButton.style.display = "none";
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
});

loadQuestion();
