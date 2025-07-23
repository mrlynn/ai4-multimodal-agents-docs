import React, { useState } from 'react';
import styles from './styles.module.css';

export default function InteractiveDemo({ 
  title, 
  description, 
  steps = [], 
  initialData = {},
  onComplete 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState(initialData);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      if (onComplete) onComplete(data);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const currentStepData = steps[currentStep] || {};

  return (
    <div className={styles.demoContainer}>
      <div className={styles.header}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className={styles.progressIndicator}>
        {steps.map((_, index) => (
          <div 
            key={index}
            className={`${styles.progressDot} ${
              index <= currentStep ? styles.active : ''
            } ${
              index < currentStep ? styles.completed : ''
            }`}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>

      {!isCompleted ? (
        <div className={styles.stepContent}>
          <div className={styles.stepHeader}>
            <h4>Step {currentStep + 1}: {currentStepData.title}</h4>
            {currentStepData.timeEstimate && (
              <span className={styles.timeEstimate}>⏱️ {currentStepData.timeEstimate}</span>
            )}
          </div>

          <div className={styles.stepBody}>
            {currentStepData.content}
            
            {currentStepData.interactive && (
              <div className={styles.interactive}>
                {currentStepData.interactive({ data, updateData })}
              </div>
            )}
          </div>

          <div className={styles.navigation}>
            <button 
              className={styles.navButton}
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              ← Previous
            </button>
            
            <span className={styles.stepCounter}>
              {currentStep + 1} of {steps.length}
            </span>
            
            <button 
              className={styles.navButton}
              onClick={handleNext}
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next →'}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.completion}>
          <div className={styles.completionIcon}>🎉</div>
          <h4>Demo Completed!</h4>
          <p>Great job! You've successfully completed the interactive demo.</p>
          <div className={styles.completionData}>
            <h5>Your Configuration:</h5>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
          <button 
            className={styles.resetButton}
            onClick={() => {
              setCurrentStep(0);
              setData(initialData);
              setIsCompleted(false);
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

export function ConfigBuilder({ title, config = {}, onChange }) {
  const [values, setValues] = useState(config);

  const handleChange = (key, value) => {
    const newValues = { ...values, [key]: value };
    setValues(newValues);
    if (onChange) onChange(newValues);
  };

  return (
    <div className={styles.configBuilder}>
      <h4>{title}</h4>
      <div className={styles.configForm}>
        {Object.entries(config).map(([key, defaultValue]) => (
          <div key={key} className={styles.configField}>
            <label className={styles.configLabel}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
            </label>
            <input
              type="text"
              value={values[key] || defaultValue}
              onChange={(e) => handleChange(key, e.target.value)}
              className={styles.configInput}
              placeholder={String(defaultValue)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServiceTester({ serviceName, testUrl, testData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const runTest = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(testUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.serviceTester}>
      <div className={styles.testerHeader}>
        <h4>🔧 Test {serviceName}</h4>
        <button 
          className={styles.testButton}
          onClick={runTest}
          disabled={isLoading}
        >
          {isLoading ? '⏳ Testing...' : '🚀 Run Test'}
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className={styles.success}>
          <strong>✅ Success!</strong>
          <pre className={styles.resultData}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <details className={styles.testDetails}>
        <summary>Test Configuration</summary>
        <div className={styles.testConfig}>
          <p><strong>URL:</strong> {testUrl}</p>
          <p><strong>Method:</strong> POST</p>
          <p><strong>Data:</strong></p>
          <pre>{JSON.stringify(testData, null, 2)}</pre>
        </div>
      </details>
    </div>
  );
}