import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function WorkshopTransition({ 
  slideTopics = [],
  handsOnUrl,
  welcomeMessage = "Welcome to the Hands-On Workshop!",
  instructor = "Instructor"
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.transition}>
      <div className={styles.header}>
        <div className={styles.welcome}>
          <h2>{welcomeMessage}</h2>
          <div className={styles.instructor}>with {instructor}</div>
          <div className={styles.time}>
            {currentTime.toLocaleTimeString()} | Let's Build Together! 🚀
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h3>📋 What We Covered in Slides</h3>
          <div className={styles.slideRecap}>
            {slideTopics.map((topic, index) => (
              <div key={index} className={styles.recapItem}>
                <span className={styles.checkmark}>✅</span>
                <span>{topic}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3>🎯 Now: Hands-On Building</h3>
          <div className={styles.handsOnInfo}>
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>💻</div>
              <div className={styles.cardContent}>
                <h4>Interactive Learning</h4>
                <p>Follow along with step-by-step exercises, interactive components, and real-time testing.</p>
              </div>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>🔧</div>
              <div className={styles.cardContent}>
                <h4>Build As You Learn</h4>
                <p>Create your multimodal PDF agent with guided validation at each step.</p>
              </div>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.cardIcon}>📱</div>
              <div className={styles.cardContent}>
                <h4>Always Available</h4>
                <p>Bookmark this page - return anytime for reference and continued learning.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actionSection}>
          <div className={styles.actionCard}>
            <div className={styles.actionHeader}>
              <h3>🚀 Ready to Start Building?</h3>
              <p>Let's transform those concepts into working code!</p>
            </div>
            
            <div className={styles.actionButtons}>
              <button 
                className={styles.primaryButton}
                onClick={() => window.location.href = '/docs/intro'}
              >
                Start Workshop →
              </button>
              
              <button 
                className={styles.secondaryButton}
                onClick={() => window.open('/docs/', '_blank')}
              >
                Open in New Tab
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SlideRecap({ title, items = [], nextSection }) {
  return (
    <div className={styles.slideRecap}>
      <div className={styles.recapHeader}>
        <h4>📖 {title}</h4>
        <div className={styles.recapSubtitle}>Key points from our presentation</div>
      </div>
      
      <div className={styles.recapItems}>
        {items.map((item, index) => (
          <div key={index} className={styles.recapItem}>
            <div className={styles.recapIcon}>
              {item.icon || '•'}
            </div>
            <div className={styles.recapContent}>
              <strong>{item.title}</strong>
              {item.description && <p>{item.description}</p>}
            </div>
          </div>
        ))}
      </div>

      {nextSection && (
        <div className={styles.recapNext}>
          <strong>Next:</strong> {nextSection}
        </div>
      )}
    </div>
  );
}

export function InstructorNotes({ notes = [], timing, tips = [] }) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className={styles.instructorNotes}>
      <button 
        className={styles.notesToggle}
        onClick={() => setShowNotes(!showNotes)}
        title="Toggle instructor notes (visible to instructors only)"
      >
        👨‍🏫 Instructor Notes {showNotes ? '▼' : '▶'}
      </button>
      
      {showNotes && (
        <div className={styles.notesContent}>
          {timing && (
            <div className={styles.timing}>
              <strong>⏱️ Timing:</strong> {timing}
            </div>
          )}
          
          {notes.length > 0 && (
            <div className={styles.notesList}>
              <strong>📝 Notes:</strong>
              <ul>
                {notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
          
          {tips.length > 0 && (
            <div className={styles.tipsList}>
              <strong>💡 Tips:</strong>
              <ul>
                {tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function QRCodeAccess({ url, title = "Access Workshop Materials" }) {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  
  return (
    <div className={styles.qrAccess}>
      <div className={styles.qrHeader}>
        <h4>📱 {title}</h4>
        <p>Scan to access on mobile device</p>
      </div>
      
      <div className={styles.qrContent}>
        <img 
          src={qrCodeUrl} 
          alt="QR Code for workshop access"
          className={styles.qrCode}
        />
        <div className={styles.qrUrl}>
          <strong>URL:</strong> <code>{url}</code>
        </div>
      </div>
    </div>
  );
}