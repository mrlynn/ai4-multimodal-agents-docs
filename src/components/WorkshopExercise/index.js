import React, { useState } from 'react';
import styles from './styles.module.css';

export default function WorkshopExercise({ 
  title, 
  difficulty = "beginner", 
  timeEstimate, 
  children, 
  objectives = [],
  onComplete 
}) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleComplete = () => {
    setIsCompleted(true);
    if (onComplete) {
      onComplete();
    }
    // Store completion in localStorage
    localStorage.setItem(`workshop-exercise-${title}`, 'completed');
  };

  // Check if previously completed
  React.useEffect(() => {
    const wasCompleted = localStorage.getItem(`workshop-exercise-${title}`);
    if (wasCompleted === 'completed') {
      setIsCompleted(true);
    }
  }, [title]);

  const difficultyColors = {
    beginner: '#28a745',
    intermediate: '#ffc107', 
    advanced: '#dc3545'
  };

  return (
    <div className={`${styles.exercise} ${isCompleted ? styles.completed : ''}`}>
      <div className={styles.header} onClick={() => setIsExpanded(!isExpanded)}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>
            {isCompleted && <span className={styles.checkmark}>✅</span>}
            {title}
          </h3>
          <div className={styles.metadata}>
            <span 
              className={styles.difficulty}
              style={{ backgroundColor: difficultyColors[difficulty] }}
            >
              {difficulty}
            </span>
            {timeEstimate && (
              <span className={styles.time}>⏱️ {timeEstimate}</span>
            )}
          </div>
        </div>
        <button className={styles.expandButton}>
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>
      
      {isExpanded && (
        <div className={styles.content}>
          {objectives.length > 0 && (
            <div className={styles.objectives}>
              <h4>📋 Learning Objectives:</h4>
              <ul>
                {objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className={styles.instructions}>
            {children}
          </div>
          
          {!isCompleted && (
            <button 
              className={styles.completeButton}
              onClick={handleComplete}
            >
              Mark as Complete ✅
            </button>
          )}
          
          {isCompleted && (
            <div className={styles.completedMessage}>
              🎉 Exercise completed! Great work!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Sub-components for structured exercises
export function ExerciseStep({ stepNumber, title, children }) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className={styles.step}>
      <div className={styles.stepHeader}>
        <span className={`${styles.stepNumber} ${isCompleted ? styles.stepCompleted : ''}`}>
          {isCompleted ? '✅' : stepNumber}
        </span>
        <h4 className={styles.stepTitle}>{title}</h4>
      </div>
      <div className={styles.stepContent}>
        {children}
      </div>
      <button 
        className={styles.stepCompleteButton}
        onClick={() => setIsCompleted(!isCompleted)}
      >
        {isCompleted ? 'Unmark' : 'Complete Step'}
      </button>
    </div>
  );
}

export function ExerciseValidation({ title, checks = [], onValidate }) {
  const [validationResults, setValidationResults] = useState({});
  
  const handleCheck = (checkId, passed) => {
    setValidationResults(prev => ({
      ...prev,
      [checkId]: passed
    }));
  };

  const allPassed = checks.every(check => validationResults[check.id] === true);

  return (
    <div className={styles.validation}>
      <h4>🔍 {title}</h4>
      <div className={styles.checks}>
        {checks.map((check) => (
          <div key={check.id} className={styles.check}>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                checked={validationResults[check.id] || false}
                onChange={(e) => handleCheck(check.id, e.target.checked)}
              />
              {check.description}
            </label>
            {check.hint && !validationResults[check.id] && (
              <div className={styles.hint}>💡 {check.hint}</div>
            )}
          </div>
        ))}
      </div>
      
      {allPassed && (
        <div className={styles.validationSuccess}>
          ✅ All validations passed! You're ready to continue.
        </div>
      )}
    </div>
  );
}