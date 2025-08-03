import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const PrerequisitesWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [verificationResults, setVerificationResults] = useState({});

  const steps = [
    {
      id: 'voyage',
      title: 'Voyage AI API Key',
      description: 'Set up your multimodal embedding service',
      icon: '🚀',
      color: '#6366f1',
      completed: false
    },
    {
      id: 'gemini',
      title: 'Google Gemini API Key',
      description: 'Configure your LLM with function calling',
      icon: '🤖',
      color: '#10b981',
      completed: false
    },
    {
      id: 'atlas',
      title: 'MongoDB Atlas Cluster',
      description: 'Deploy your vector database',
      icon: '🍃',
      color: '#059669',
      completed: false
    }
  ];

  const markStepComplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);
  };

  const markStepIncomplete = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.delete(stepIndex);
    setCompletedSteps(newCompleted);
  };

  const allStepsComplete = completedSteps.size === steps.length;
  const progress = (completedSteps.size / steps.length) * 100;

  return (
    <div className={styles.wizardContainer}>
      {/* Progress Header */}
      <div className={styles.progressHeader}>
        <h2>🛠️ Workshop Prerequisites Setup</h2>
        <p>Set up the three essential services needed for building your multimodal AI agent</p>
        
        {/* Progress Bar */}
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBarTrack}>
            <div 
              className={styles.progressBarFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {completedSteps.size} of {steps.length} complete ({Math.round(progress)}%)
          </span>
        </div>
      </div>

      {/* Step Navigation */}
      <div className={styles.stepNavigation}>
        {steps.map((step, index) => (
          <button
            key={step.id}
            className={`${styles.stepButton} ${
              currentStep === index ? styles.active : ''
            } ${
              completedSteps.has(index) ? styles.completed : ''
            }`}
            onClick={() => setCurrentStep(index)}
            style={{ '--step-color': step.color }}
          >
            <div className={styles.stepIcon}>
              {completedSteps.has(index) ? '✅' : step.icon}
            </div>
            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>{step.title}</div>
              <div className={styles.stepDescription}>{step.description}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={`${styles.stepConnector} ${
                completedSteps.has(index) ? styles.connectorComplete : ''
              }`} />
            )}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className={styles.stepContent}>
        {currentStep === 0 && (
          <VoyageAIStep 
            onComplete={() => markStepComplete(0)}
            onIncomplete={() => markStepIncomplete(0)}
            isCompleted={completedSteps.has(0)}
          />
        )}
        {currentStep === 1 && (
          <GeminiStep 
            onComplete={() => markStepComplete(1)}
            onIncomplete={() => markStepIncomplete(1)}
            isCompleted={completedSteps.has(1)}
          />
        )}
        {currentStep === 2 && (
          <AtlasStep 
            onComplete={() => markStepComplete(2)}
            onIncomplete={() => markStepIncomplete(2)}
            isCompleted={completedSteps.has(2)}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className={styles.navigationButtons}>
        <button
          className={styles.navButton}
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          ← Previous
        </button>
        
        <button
          className={styles.navButton}
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
        >
          Next →
        </button>
      </div>

      {/* Completion Status */}
      {allStepsComplete && (
        <div className={styles.completionBanner}>
          <h3>🎉 All Prerequisites Complete!</h3>
          <p>You're ready to start building your multimodal AI agent!</p>
          <a href="/docs/python-exercise-1" className={styles.startButton}>
            Start Workshop →
          </a>
        </div>
      )}
    </div>
  );
};

// Individual Step Components
const VoyageAIStep = ({ onComplete, onIncomplete, isCompleted }) => {
  const [hasApiKey, setHasApiKey] = useState(false);

  return (
    <div className={styles.stepPanel}>
      <div className={styles.stepHeader}>
        <h3>🚀 Voyage AI API Key Setup</h3>
        <p>Get your API key for state-of-the-art multimodal embeddings</p>
      </div>

      <div className={styles.stepInstructions}>
        <div className={styles.instructionGroup}>
          <h4>Why you need this:</h4>
          <ul>
            <li>Generate high-quality multimodal embeddings for text and images</li>
            <li>Access production-ready embedding models</li>
            <li>Use the official Python client for seamless integration</li>
          </ul>
        </div>

        <div className={styles.instructionGroup}>
          <h4>Quick setup:</h4>
          <ol>
            <li>Visit <a href="https://dashboard.voyageai.com" target="_blank" rel="noopener noreferrer">Voyage AI Dashboard</a></li>
            <li>Sign up or sign in to your account</li>
            <li>Navigate to <strong>Organization → API keys</strong></li>
            <li>Click <strong>"Create new secret key"</strong></li>
            <li>Name it "workshop-multimodal-agent"</li>
            <li>Copy your API key and save it securely</li>
          </ol>
        </div>

        <div className={styles.warningBox}>
          ⚠️ <strong>Important:</strong> You can only view your API key once after creation. Make sure to save it immediately!
        </div>

        <div className={styles.verificationSection}>
          <h4>Verification:</h4>
          <p>Add your API key to your <code>.env</code> file:</p>
          <pre className={styles.codeBlock}>
            VOYAGE_API_KEY="voy_your_api_key_here"
          </pre>
        </div>
      </div>

      <div className={styles.stepActions}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={hasApiKey}
            onChange={(e) => {
              setHasApiKey(e.target.checked);
              if (e.target.checked) {
                onComplete();
              } else {
                onIncomplete();
              }
            }}
          />
          I have my Voyage AI API key and added it to my .env file
        </label>
        
        <a 
          href="/docs/voyage-ai-setup" 
          className={styles.detailsLink}
          target="_blank"
        >
          View detailed instructions →
        </a>
      </div>
    </div>
  );
};

const GeminiStep = ({ onComplete, onIncomplete, isCompleted }) => {
  const [hasApiKey, setHasApiKey] = useState(false);

  return (
    <div className={styles.stepPanel}>
      <div className={styles.stepHeader}>
        <h3>🤖 Google Gemini API Key Setup</h3>
        <p>Configure your LLM with advanced function calling capabilities</p>
      </div>

      <div className={styles.stepInstructions}>
        <div className={styles.instructionGroup}>
          <h4>Why you need this:</h4>
          <ul>
            <li>Advanced function calling for tool use</li>
            <li>Multimodal understanding (text and images)</li>
            <li>Fast response times for interactive agents</li>
            <li>Generous free tier for development</li>
          </ul>
        </div>

        <div className={styles.instructionGroup}>
          <h4>Quick setup:</h4>
          <ol>
            <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a></li>
            <li>Sign in with your Google account</li>
            <li>Click <strong>"Create API Key"</strong></li>
            <li>Select your Google Cloud project (or create new)</li>
            <li>Copy your API key immediately</li>
          </ol>
        </div>

        <div className={styles.verificationSection}>
          <h4>Verification:</h4>
          <p>Add your API key to your <code>.env</code> file:</p>
          <pre className={styles.codeBlock}>
            GOOGLE_API_KEY="your_gemini_api_key_here"
          </pre>
        </div>
      </div>

      <div className={styles.stepActions}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={hasApiKey}
            onChange={(e) => {
              setHasApiKey(e.target.checked);
              if (e.target.checked) {
                onComplete();
              } else {
                onIncomplete();
              }
            }}
          />
          I have my Google Gemini API key and added it to my .env file
        </label>
        
        <a 
          href="/docs/gemini-setup" 
          className={styles.detailsLink}
          target="_blank"
        >
          View detailed instructions →
        </a>
      </div>
    </div>
  );
};

const AtlasStep = ({ onComplete, onIncomplete, isCompleted }) => {
  const [hasCluster, setHasCluster] = useState(false);

  return (
    <div className={styles.stepPanel}>
      <div className={styles.stepHeader}>
        <h3>🍃 MongoDB Atlas Cluster Setup</h3>
        <p>Deploy your vector database for storing and searching embeddings</p>
      </div>

      <div className={styles.stepInstructions}>
        <div className={styles.instructionGroup}>
          <h4>Why you need this:</h4>
          <ul>
            <li>Native vector search with HNSW algorithms</li>
            <li>Flexible document storage for mixed data types</li>
            <li>Free tier perfect for development</li>
            <li>Built-in vector indexing capabilities</li>
          </ul>
        </div>

        <div className={styles.instructionGroup}>
          <h4>Quick setup:</h4>
          <ol>
            <li>Visit <a href="https://www.mongodb.com/cloud/atlas/register" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a></li>
            <li>Create free account and verify email</li>
            <li>Deploy <strong>M0 Free tier</strong> cluster</li>
            <li>Create database user (username: <code>workshop</code>)</li>
            <li>Configure network access (allow anywhere for workshop)</li>
            <li>Copy your connection string</li>
          </ol>
        </div>

        <div className={styles.verificationSection}>
          <h4>Verification:</h4>
          <p>Add your connection string to your <code>.env</code> file:</p>
          <pre className={styles.codeBlock}>
            MONGODB_URI="mongodb+srv://workshop:password@cluster0.xxxxx.mongodb.net/"
          </pre>
        </div>
      </div>

      <div className={styles.stepActions}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={hasCluster}
            onChange={(e) => {
              setHasCluster(e.target.checked);
              if (e.target.checked) {
                onComplete();
              } else {
                onIncomplete();
              }
            }}
          />
          I have my MongoDB Atlas cluster deployed and connection string saved
        </label>
        
        <a 
          href="/docs/atlas-setup" 
          className={styles.detailsLink}
          target="_blank"
        >
          View detailed instructions →
        </a>
      </div>
    </div>
  );
};

export default PrerequisitesWizard;