import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function ProgressTracker({ steps = [], currentStep = 0 }) {
  const [completedSteps, setCompletedSteps] = useState(new Set());

  useEffect(() => {
    // Load completed steps from localStorage
    const saved = localStorage.getItem('workshop-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedSteps(new Set(parsed));
      } catch (e) {
        console.warn('Could not parse saved progress');
      }
    }
  }, []);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem('workshop-progress', JSON.stringify([...completedSteps]));
  }, [completedSteps]);

  const toggleStep = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  const completionPercentage = (completedSteps.size / steps.length) * 100;

  return (
    <div className={styles.progressContainer}>
      <div className={styles.header}>
        <h3>🎓 Workshop Progress</h3>
        <div className={styles.stats}>
          <span className={styles.percentage}>{Math.round(completionPercentage)}% Complete</span>
          <span className={styles.count}>{completedSteps.size} / {steps.length}</span>
        </div>
      </div>
      
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <div className={styles.stepsList}>
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`${styles.step} ${
              completedSteps.has(index) ? styles.completed : ''
            } ${
              index === currentStep ? styles.current : ''
            }`}
          >
            <div className={styles.stepIndicator}>
              <div className={styles.stepNumber}>
                {completedSteps.has(index) ? '✅' : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`${styles.connector} ${
                  completedSteps.has(index) ? styles.connectorCompleted : ''
                }`} />
              )}
            </div>
            
            <div className={styles.stepContent}>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <p className={styles.stepDescription}>{step.description}</p>
              <div className={styles.stepMeta}>
                {step.timeEstimate && (
                  <span className={styles.timeEstimate}>⏱️ {step.timeEstimate}</span>
                )}
                {step.difficulty && (
                  <span className={`${styles.difficulty} ${styles[step.difficulty]}`}>
                    {step.difficulty}
                  </span>
                )}
              </div>
              
              <button
                className={styles.toggleButton}
                onClick={() => toggleStep(index)}
              >
                {completedSteps.has(index) ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {completionPercentage === 100 && (
        <div className={styles.celebration}>
          🎉 Congratulations! You've completed the entire workshop! 🎉
        </div>
      )}
    </div>
  );
}

export function StepIndicator({ current, total, titles = [], compact = false }) {
  return (
    <div className={styles.stepIndicator}>
      <div className={`${styles.breadcrumb} ${compact ? styles.compact : ''}`}>
        {Array.from({ length: total }, (_, i) => (
          <React.Fragment key={i}>
            <div className={`${styles.breadcrumbStep} ${
              i < current ? styles.completed : ''
            } ${
              i === current ? styles.active : ''
            } ${compact ? styles.compactStep : ''}`}>
              <span className={styles.breadcrumbNumber}>
                {i < current ? '✓' : i + 1}
              </span>
              {titles[i] && !compact && (
                <span className={styles.breadcrumbTitle}>{titles[i]}</span>
              )}
            </div>
            {i < total - 1 && (
              <div className={`${styles.breadcrumbConnector} ${
                i < current ? styles.connectorCompleted : ''
              } ${compact ? styles.compactConnector : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      {compact && titles.length > 0 && (
        <div className={styles.compactTitle}>
          Step {current + 1}: {titles[current]}
        </div>
      )}
    </div>
  );
}