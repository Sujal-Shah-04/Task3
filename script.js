class Question {
    constructor(question, options, correctAnswer) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.userAnswer = null;
    }

    checkAnswer() {
        return this.userAnswer === this.correctAnswer;
    }
}

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentIndex = 0;
        this.score = 0;
        this.progress = Array(questions.length).fill("Not Completed");
    }

    getCurrentQuestion() {
        return this.questions[this.currentIndex];
    }

    selectAnswer(option) {
        let currentQuestion = this.getCurrentQuestion();
        if (currentQuestion.userAnswer !== null) return;

        currentQuestion.userAnswer = option;
        let buttons = document.querySelectorAll("#options-container button");
        buttons.forEach(btn => btn.disabled = true);
    }

    checkAnswer() {
        let currentQuestion = this.getCurrentQuestion();
        if (currentQuestion.userAnswer === null) {
            alert("Please select an answer first!");
            return;
        }

        if (currentQuestion.checkAnswer()) {
            document.getElementById("feedback").textContent = "✔ Correct!";
            document.getElementById("feedback").style.color = "green";
            this.score++;
            this.progress[this.currentIndex] = "Correct";
        } else {
            document.getElementById("feedback").textContent = "✖ Incorrect!";
            document.getElementById("feedback").style.color = "red";
            this.progress[this.currentIndex] = "Incorrect";
        }

        document.getElementById("check-btn").disabled = true;
    }

    moveToNextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.currentIndex++;
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }

    moveToPreviousQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.loadQuestion();
        }
    }

    loadQuestion() {
        let currentQuestion = this.getCurrentQuestion();
        document.getElementById("question-text").textContent = currentQuestion.question;
        document.getElementById("options-container").innerHTML = "";

        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => this.selectAnswer(option));
            document.getElementById("options-container").appendChild(button);
        });

        document.getElementById("feedback").textContent = "";
        document.getElementById("check-btn").disabled = false;
    }

    showResults() {
        document.getElementById("quiz-box").classList.add("hidden");
        document.getElementById("result-box").classList.remove("hidden");
        document.getElementById("score").textContent = `Your Score: ${this.score} / ${this.questions.length}`;
    }

    restartQuiz() {
        this.currentIndex = 0;
        this.score = 0;
        this.questions.forEach(q => q.userAnswer = null);
        document.getElementById("quiz-box").classList.remove("hidden");
        document.getElementById("result-box").classList.add("hidden");
        this.loadQuestion();
    }
}

const questions = [
    new Question("Capital of France?", ["Berlin", "Madrid", "Paris", "Rome"], "Paris"),
    new Question("Which is the largest planet?", ["Earth", "Mars", "Jupiter", "Venus"], "Jupiter"),
    new Question("Who developed the theory of relativity?", ["Newton", "Einstein", "Tesla", "Darwin"], "Einstein"),
    new Question("What is the chemical symbol for water?", ["H2O", "O2", "CO2", "HCl"], "H2O"),
    new Question("Which animal is known as the 'King of the Jungle'?", ["Tiger", "Elephant", "Lion", "Cheetah"], "Lion")

];

const quiz = new Quiz(questions);

document.getElementById("next-btn").addEventListener("click", () => quiz.moveToNextQuestion());
document.getElementById("prev-btn").addEventListener("click", () => quiz.moveToPreviousQuestion());
document.getElementById("check-btn").addEventListener("click", () => quiz.checkAnswer());
document.getElementById("restart-btn").addEventListener("click", () => quiz.restartQuiz());

quiz.loadQuestion();
