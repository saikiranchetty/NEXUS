let score = 0;
let currentQuestionData = null;
let selectedCategory = '';

function startQuiz(category) {
    selectedCategory = category;
    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    nextQuestion();
}

function nextQuestion() {
    let apiUrl = '';

    // Set API URL based on the selected category
    if (selectedCategory === 'indian-history') {
        apiUrl = 'https://opentdb.com/api.php?amount=1&category=23&type=multiple'; // History
    } else if (selectedCategory === 'indian-general-knowledge') {
        apiUrl = 'https://opentdb.com/api.php?amount=1&category=9&type=multiple'; // General Knowledge
    } else if (selectedCategory === 'mathematical-logical') {
        apiUrl = 'https://opentdb.com/api.php?amount=1&category=19&type=multiple'; // Mathematics
    } else {
        alert("Invalid category selected.");
        return;
    }

    // Fetch questions from the selected API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                currentQuestionData = data.results[0];
                displayQuestion({
                    question: currentQuestionData.question,
                    options: [...currentQuestionData.incorrect_answers, currentQuestionData.correct_answer],
                    correct: currentQuestionData.correct_answer
                });
            } else {
                alert('No questions found.');
            }
        })
        .catch(error => {
            console.error("Error fetching the quiz data:", error);
        });
}

function displayQuestion(questionData) {
    const questionElement = document.getElementById('question');
    const optionsDiv = document.getElementById('options');
    const nextBtn = document.getElementById('next-btn');
    const endQuizBtn = document.getElementById('end-quiz');

    // Display the question
    questionElement.innerHTML = questionData.question;

    // Shuffle and display options
    const allOptions = questionData.options;
    shuffleArray(allOptions);

    optionsDiv.innerHTML = '';
    allOptions.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option, questionData.correct);
        optionsDiv.appendChild(btn);
    });

    document.getElementById('feedback').textContent = '';
    nextBtn.style.display = 'none';
    endQuizBtn.style.display = 'none';
}

function checkAnswer(selectedAnswer, correctAnswer) {
    const feedback = document.getElementById('feedback');

    if (selectedAnswer.trim() === correctAnswer.trim()) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        score++;
        document.getElementById('score').textContent = score;
    } else {
        feedback.textContent = `Wrong! The correct answer was: ${correctAnswer}`;
        feedback.style.color = "red";
    }
    document.getElementById('next-btn').style.display = 'inline-block';
    document.getElementById('end-quiz').style.display = 'inline-block';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function endQuiz() {
    alert(`Quiz Ended! Your final score is: ${score}`);
    location.reload();
}
