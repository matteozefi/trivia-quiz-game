//Initial Modal functionality for username input and validation
let startButton = document.getElementById("start-button");
let usernameInput = document.getElementById("username-input");
let errorMessage = document.getElementById("error-message");
let modalContainer = document.getElementById("modal-container");
let welcomeMessage = document.getElementById("welcome-message");

startButton.addEventListener("click", () => {
    let username = usernameInput.value.trim();
    let regex = /^[a-zA-Z\s]+$/; // Letters and spaces only
    if (username === "") {
        // show error by adding a class (avoids inline-style/color conflicts)
        errorMessage.style.display = 'block';
    } else if (!regex.test(username)) {
        //Make sure name contains only letters and spaces
        errorMessage.style.display = 'block';
    } else {
        // Proceed to start the quiz
        errorMessage.style.display = 'none';
        modalContainer.style.display = "none"; // keep this for hiding overlay/modal
        welcomeMessage.style.display = "inline-block"; // Show the welcome message
        welcomeMessage.textContent = `Welcome, ${username}! Make sure to answer all questions. Good luck!`;
    }
});

//Submit button functionality + Final Modal functionality
let submitButton = document.getElementById("submit-button");
let correctAnswers = {
    q1: "Astro Bot",
    q2: "Mario Kart 8 Deluxe",
    q3: "Gran Turismo",
    q4: "The Legend of Zelda: Ocarina of Time",
    q5: "PlayStation 2"
};

let finalModalContainer = document.getElementById("final-modal-container");
let finalMessage = document.getElementById("final-message");
let finalScore = document.getElementById("final-score");
let continueButton = document.getElementById("continue-button");

submitButton.addEventListener("click", () => {
    // Handle the quiz submission logic here

    let answeredCount = 0;
    let totalQuestions = 5;

    let q1Selected = document.querySelector("input[name='answer-one']:checked"); //checked state of radio buttons
    if (q1Selected !== null) answeredCount++;
    let q2Selected = document.querySelector("input[name='answer-two']:checked");
    if (q2Selected !== null) answeredCount++;
    let q3Selected = document.querySelector("input[name='answer-three']:checked");
    if (q3Selected !== null) answeredCount++;
    let q4Selected = document.querySelector("input[name='answer-four']:checked");
    if (q4Selected !== null) answeredCount++;
    let q5Selected = document.querySelector("input[name='answer-five']:checked");
    if (q5Selected !== null) answeredCount++;

    if (answeredCount < totalQuestions) {
        let confirmSubmit = confirm(`You've only answered ${answeredCount} out of ${totalQuestions} questions. Submit anyway?`); // Confirmation dialog
        if (!confirmSubmit) {
            return; // Don't submit if user cancels
        }
    }


    let score = 0;
    let q1Answers = document.querySelectorAll("input[name='answer-one']");
    q1Answers.forEach((answer) => {
        if (answer.checked && answer.value === correctAnswers.q1) {
            score++;
        }
    });
    let q2Answers = document.querySelectorAll("input[name='answer-two']");
    q2Answers.forEach((answer) => {
        if (answer.checked && answer.value === correctAnswers.q2) {
            score++;
        }
    });
    let q3Answers = document.querySelectorAll("input[name='answer-three']");
    q3Answers.forEach((answer) => {
        if (answer.checked && answer.value === correctAnswers.q3) {
            score++;
        }
    });
    let q4Answers = document.querySelectorAll("input[name='answer-four']");
    q4Answers.forEach((answer) => {
        if (answer.checked && answer.value === correctAnswers.q4) {
            score++;
        }
    });
    let q5Answers = document.querySelectorAll("input[name='answer-five']");
    q5Answers.forEach((answer) => {
        if (answer.checked && answer.value === correctAnswers.q5) {
            score++;
        }
    });

    let username = usernameInput.value.trim();
    if (score === 5) {
        // Show perfect score modal
        finalMessage.textContent = `Congratulations, ${username}!`
        finalScore.textContent = `You scored a perfect 5 out of 5!`;
        finalModalContainer.style.display = "flex"; // Show the final modal
    } else if (score >= 3 && score < 5) {
        // Show good score modal
        finalMessage.textContent = `Well done, ${username}!`
        finalScore.textContent = `You scored ${score} out of 5!`;
        finalModalContainer.style.display = "flex"; // Show the final modal
    } else {
        // Show low score modal
        finalMessage.textContent = `Keep trying, ${username}!`
        finalScore.textContent = `You scored ${score} out of 5. Better luck next time!`;
        finalModalContainer.style.display = "flex"; // Show the final modal
    }

});

//Continue button functionality
continueButton.addEventListener("click", () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    location.reload(); // Reload the page to reset the quiz
});
