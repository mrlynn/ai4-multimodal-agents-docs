import React, { useState } from 'react';
import styles from './styles.module.css';

export default function Quiz({ 
  title, 
  questions = [], 
  onComplete,
  passingScore = 70 
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionIndex, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
    
    // Save to localStorage
    localStorage.setItem(`quiz-${title}`, JSON.stringify({
      score: finalScore,
      passed: finalScore >= passingScore,
      answers,
      completedAt: new Date().toISOString()
    }));

    if (onComplete) {
      onComplete({ score: finalScore, passed: finalScore >= passingScore });
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    const passed = score >= passingScore;
    return (
      <div className={styles.quiz}>
        <div className={styles.results}>
          <div className={`${styles.scoreCard} ${passed ? styles.passed : styles.failed}`}>
            <div className={styles.scoreIcon}>
              {passed ? '🎉' : '📚'}
            </div>
            <h3>Quiz Results</h3>
            <div className={styles.scoreDisplay}>
              <span className={styles.scoreNumber}>{score}%</span>
              <span className={styles.scoreLabel}>
                {passed ? 'Passed!' : 'Needs Review'}
              </span>
            </div>
            
            {passed ? (
              <p>Excellent work! You've mastered this topic.</p>
            ) : (
              <p>Review the material and try again. You need {passingScore}% to pass.</p>
            )}
          </div>

          <div className={styles.answerReview}>
            <h4>Review Your Answers:</h4>
            {questions.map((question, qIndex) => (
              <div key={qIndex} className={styles.reviewQuestion}>
                <h5>Q{qIndex + 1}: {question.question}</h5>
                <div className={styles.reviewAnswers}>
                  {question.options.map((option, aIndex) => {
                    const isSelected = answers[qIndex] === aIndex;
                    const isCorrect = aIndex === question.correctAnswer;
                    
                    return (
                      <div 
                        key={aIndex}
                        className={`${styles.reviewAnswer} ${
                          isSelected ? styles.selected : ''
                        } ${
                          isCorrect ? styles.correct : ''
                        } ${
                          isSelected && !isCorrect ? styles.incorrect : ''
                        }`}
                      >
                        {option}
                        {isCorrect && <span className={styles.correctIcon}>✓</span>}
                        {isSelected && !isCorrect && <span className={styles.incorrectIcon}>✗</span>}
                      </div>
                    );
                  })}
                </div>
                {question.explanation && (
                  <div className={styles.explanation}>
                    <strong>Explanation:</strong> {question.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.resultActions}>
            <button className={styles.retryButton} onClick={resetQuiz}>
              Try Again
            </button>
            {passed && (
              <button className={styles.continueButton}>
                Continue to Next Section →
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={styles.quiz}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
      </div>

      <div className={styles.questionCard}>
        <h4 className={styles.questionText}>
          {currentQ?.question}
        </h4>

        <div className={styles.options}>
          {currentQ?.options.map((option, index) => (
            <button
              key={index}
              className={`${styles.option} ${
                answers[currentQuestion] === index ? styles.selected : ''
              }`}
              onClick={() => handleAnswer(currentQuestion, index)}
            >
              <span className={styles.optionLetter}>
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.navigation}>
        <button
          className={styles.navButton}
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>

        <div className={styles.questionDots}>
          {questions.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === currentQuestion ? styles.active : ''
              } ${
                answers[index] !== undefined ? styles.answered : ''
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestion < questions.length - 1 ? (
          <button
            className={styles.navButton}
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            Next →
          </button>
        ) : (
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export function QuickCheck({ question, options, correctAnswer, explanation }) {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    setSelected(index);
    setShowResult(true);
  };

  const isCorrect = selected === correctAnswer;

  return (
    <div className={styles.quickCheck}>
      <h4>🤔 Quick Check</h4>
      <p className={styles.quickQuestion}>{question}</p>
      
      <div className={styles.quickOptions}>
        {options.map((option, index) => (
          <button
            key={index}
            className={`${styles.quickOption} ${
              selected === index ? styles.selected : ''
            } ${
              showResult && index === correctAnswer ? styles.correct : ''
            } ${
              showResult && selected === index && index !== correctAnswer ? styles.incorrect : ''
            }`}
            onClick={() => handleAnswer(index)}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`${styles.quickResult} ${isCorrect ? styles.correct : styles.incorrect}`}>
          <div className={styles.resultIcon}>
            {isCorrect ? '✅' : '❌'}
          </div>
          <div className={styles.resultText}>
            {isCorrect ? 'Correct!' : 'Not quite right.'}
            {explanation && (
              <p className={styles.quickExplanation}>{explanation}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}