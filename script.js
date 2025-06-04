class GitHubCopilotQuiz {
    constructor() {
        this.questions = [
            {
                question: "What is the primary purpose of GitHub Copilot Chat in 2025?",
                options: [
                    "Only generating code snippets",
                    "Interactive coding assistance, explanations, and debugging help",
                    "Managing GitHub repositories",
                    "Running automated tests"
                ],
                correct: 1,
                explanation: "GitHub Copilot Chat provides interactive coding assistance, explanations, debugging help, code reviews, and can answer technical questions in natural language."
            },
            {
                question: "Which of these is a key feature of GitHub Copilot Enterprise as of 2025?",
                options: [
                    "Only works with JavaScript",
                    "Limited to 10 suggestions per day",
                    "Custom models trained on your organization's codebase",
                    "Only available for individual developers"
                ],
                correct: 2,
                explanation: "GitHub Copilot Enterprise offers custom models that can be trained on your organization's private codebase, providing more relevant and context-aware suggestions."
            },
            {
                question: "What programming languages does GitHub Copilot support as of 2025?",
                options: [
                    "Only JavaScript, Python, and Java",
                    "Only web development languages",
                    "Over 30 programming languages including Python, JavaScript, TypeScript, Java, C#, Go, Rust, and more",
                    "Only languages owned by Microsoft"
                ],
                correct: 2,
                explanation: "GitHub Copilot supports a wide range of programming languages, with particularly strong support for popular languages like Python, JavaScript, TypeScript, Java, C#, Go, Ruby, and many others."
            },
            {
                question: "Which IDE integrations are available for GitHub Copilot in 2025?",
                options: [
                    "Only Visual Studio Code",
                    "Visual Studio Code, Visual Studio, JetBrains IDEs, Neovim, and Xcode",
                    "Only Microsoft products",
                    "Only browser-based editors"
                ],
                correct: 1,
                explanation: "GitHub Copilot is available across multiple IDEs including VS Code, Visual Studio, JetBrains IDEs (IntelliJ, PyCharm, etc.), Neovim, and Xcode, providing flexibility for developers."
            },
            {
                question: "What is GitHub Copilot's approach to code suggestions in 2025?",
                options: [
                    "Always suggests the same code for similar problems",
                    "Uses context from your current file, related files, and coding patterns to provide relevant suggestions",
                    "Only suggests code from Stack Overflow",
                    "Requires manual configuration for each project"
                ],
                correct: 1,
                explanation: "GitHub Copilot uses advanced AI models that consider the context of your current file, related files in your project, and your coding patterns to provide contextually relevant suggestions."
            },
            {
                question: "Which of these is a security feature of GitHub Copilot in 2025?",
                options: [
                    "Stores all your code permanently",
                    "Code vulnerability scanning and security-focused suggestions",
                    "Shares your code with other users",
                    "Requires internet connection for all suggestions"
                ],
                correct: 1,
                explanation: "GitHub Copilot includes security features like vulnerability scanning, security-focused code suggestions, and helps identify potential security issues in your code."
            },
            {
                question: "What is GitHub Copilot X (now integrated into standard Copilot) known for?",
                options: [
                    "Only code completion",
                    "Chat interface, pull request assistance, and CLI integration",
                    "Email management",
                    "Project management tools"
                ],
                correct: 1,
                explanation: "GitHub Copilot X introduced chat interfaces, pull request assistance, CLI integration, and enhanced conversational AI capabilities that are now part of the standard Copilot experience."
            },
            {
                question: "How does GitHub Copilot handle code documentation in 2025?",
                options: [
                    "Never generates documentation",
                    "Only generates comments in English",
                    "Can generate comprehensive documentation, comments, and explain existing code",
                    "Requires separate documentation tools"
                ],
                correct: 2,
                explanation: "GitHub Copilot can generate comprehensive documentation, write meaningful comments, explain existing code, and help maintain code documentation across different languages and formats."
            },
            {
                question: "What is a key benefit of GitHub Copilot's learning approach?",
                options: [
                    "It learns and stores your personal code permanently",
                    "It adapts to your coding style and project context without storing your code",
                    "It requires manual training on each project",
                    "It only works with public repositories"
                ],
                correct: 1,
                explanation: "GitHub Copilot adapts to your coding style and project context during your session without permanently storing your proprietary code, respecting privacy while providing personalized assistance."
            },
            {
                question: "Which of these best describes GitHub Copilot's role in software development as of 2025?",
                options: [
                    "A complete replacement for developers",
                    "Only useful for beginners",
                    "An AI pair programmer that enhances developer productivity and creativity",
                    "Limited to fixing syntax errors"
                ],
                correct: 2,
                explanation: "GitHub Copilot serves as an AI pair programmer, enhancing developer productivity by providing intelligent suggestions, explanations, and assistance while developers maintain control over their code and decisions."
            }
        ];
        
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        
        this.initializeElements();
        this.startQuiz();
    }
    
    initializeElements() {
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.currentQuestionSpan = document.getElementById('current-question');
        this.totalQuestionsSpan = document.getElementById('total-questions');
        this.scoreSpan = document.getElementById('score');
        this.totalScoreSpan = document.getElementById('total-score');
        this.feedbackDiv = document.getElementById('feedback');
        this.feedbackText = document.getElementById('feedback-text');
        this.explanationText = document.getElementById('explanation-text');
        this.nextBtn = document.getElementById('next-btn');
        this.finalResults = document.getElementById('final-results');
        this.finalScore = document.getElementById('final-score');
        this.performanceMessage = document.getElementById('performance-message');
        this.restartBtn = document.getElementById('restart-btn');
        
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
    }
    
    startQuiz() {
        this.totalQuestionsSpan.textContent = this.questions.length;
        this.totalScoreSpan.textContent = this.questions.length;
        this.displayQuestion();
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        
        this.currentQuestionSpan.textContent = this.currentQuestion + 1;
        this.questionText.textContent = question.question;
        
        this.optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.selectAnswer(index));
            this.optionsContainer.appendChild(optionElement);
        });
        
        this.feedbackDiv.classList.add('hidden');
    }
    
    selectAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.option');
        
        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Mark selected option
        options[selectedIndex].classList.add('selected');
        
        // Show correct/incorrect styling
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                option.classList.add('incorrect');
            }
        });
        
        // Update score
        const isCorrect = selectedIndex === question.correct;
        if (isCorrect) {
            this.score++;
            this.scoreSpan.textContent = this.score;
        }
        
        // Store user answer
        this.userAnswers.push({
            question: this.currentQuestion,
            selected: selectedIndex,
            correct: question.correct,
            isCorrect: isCorrect
        });
        
        // Show feedback
        this.showFeedback(isCorrect, question.explanation);
    }
    
    showFeedback(isCorrect, explanation) {
        this.feedbackText.textContent = isCorrect ? '✅ Correct!' : '❌ Incorrect!';
        this.feedbackText.className = isCorrect ? 'correct' : 'incorrect';
        this.explanationText.textContent = explanation;
        
        this.feedbackDiv.classList.remove('hidden');
        
        // Auto-scroll to feedback
        this.feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    nextQuestion() {
        this.currentQuestion++;
        
        if (this.currentQuestion < this.questions.length) {
            this.displayQuestion();
        } else {
            this.showFinalResults();
        }
    }
    
    showFinalResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        
        this.finalScore.textContent = `${this.score} out of ${this.questions.length} (${percentage}%)`;
        
        let message = '';
        if (percentage >= 90) {
            message = '🎉 Excellent! You\'re a GitHub Copilot expert!';
        } else if (percentage >= 70) {
            message = '👏 Great job! You have solid knowledge of GitHub Copilot.';
        } else if (percentage >= 50) {
            message = '👍 Good effort! Consider exploring more GitHub Copilot features.';
        } else {
            message = '📚 Keep learning! GitHub Copilot has many powerful features to discover.';
        }
        
        this.performanceMessage.textContent = message;
        
        document.getElementById('quiz-container').style.display = 'none';
        this.finalResults.classList.remove('hidden');
    }
    
    restartQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        
        this.scoreSpan.textContent = '0';
        this.finalResults.classList.add('hidden');
        document.getElementById('quiz-container').style.display = 'block';
        
        this.displayQuestion();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new GitHubCopilotQuiz();
});
