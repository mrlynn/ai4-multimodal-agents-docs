import React, { useState } from 'react';
import styles from './styles.module.css';

export default function WorkshopFeedback({ 
  workshopTitle = "Multimodal PDF Agent Workshop",
  instructorEmail = "instructor@example.com",
  githubRepo = "mongodb-developer/multimodal-pdf-agent-n8n"
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [feedback, setFeedback] = useState({
    rating: 0,
    difficulty: '',
    mostValuable: '',
    improvements: '',
    recommend: '',
    additionalComments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create email subject and body
    const subject = encodeURIComponent(`Workshop Feedback: ${workshopTitle}`);
    const body = encodeURIComponent(`
Workshop Feedback

Overall Rating: ${feedback.rating}/5 stars
Difficulty Level: ${feedback.difficulty}

Most Valuable Part:
${feedback.mostValuable}

Suggested Improvements:
${feedback.improvements}

Would Recommend: ${feedback.recommend}

Additional Comments:
${feedback.additionalComments}

---
Submitted: ${new Date().toISOString()}
    `.trim());

    // Open email client
    window.open(`mailto:${instructorEmail}?subject=${subject}&body=${body}`);
  };

  const handleGitHubIssue = () => {
    const title = encodeURIComponent(`Workshop Feedback: ${new Date().toLocaleDateString()}`);
    const body = encodeURIComponent(`
## Workshop Feedback

**Overall Rating:** ${feedback.rating}/5 ⭐

**Difficulty Level:** ${feedback.difficulty}

**Most Valuable Part:**
${feedback.mostValuable}

**Suggested Improvements:**
${feedback.improvements}

**Would Recommend:** ${feedback.recommend}

**Additional Comments:**
${feedback.additionalComments}

---
*Submitted via workshop documentation feedback form*
    `.trim());

    window.open(`https://github.com/${githubRepo}/issues/new?title=${title}&body=${body}&labels=feedback`);
  };

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackHeader} onClick={() => setIsExpanded(!isExpanded)}>
        <h3>📝 Workshop Feedback</h3>
        <span className={styles.expandIcon}>{isExpanded ? '−' : '+'}</span>
      </div>
      
      {isExpanded && (
        <div className={styles.feedbackForm}>
          <p>Help us improve this workshop! Your feedback is valuable for future attendees.</p>
          
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Overall Rating</label>
              <div className={styles.starRating}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star} 
                    type="button"
                    className={`${styles.star} ${feedback.rating >= star ? styles.starFilled : ''}`}
                    onClick={() => setFeedback({...feedback, rating: star})}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Difficulty Level</label>
              <select 
                value={feedback.difficulty} 
                onChange={(e) => setFeedback({...feedback, difficulty: e.target.value})}
              >
                <option value="">Select difficulty</option>
                <option value="Too Easy">Too Easy</option>
                <option value="Just Right">Just Right</option>
                <option value="Too Hard">Too Hard</option>
                <option value="Mixed Levels">Mixed Levels</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Most Valuable Part</label>
              <textarea
                value={feedback.mostValuable}
                onChange={(e) => setFeedback({...feedback, mostValuable: e.target.value})}
                placeholder="What did you find most useful or interesting?"
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Suggested Improvements</label>
              <textarea
                value={feedback.improvements}
                onChange={(e) => setFeedback({...feedback, improvements: e.target.value})}
                placeholder="What could we improve or add?"
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Would you recommend this workshop?</label>
              <div className={styles.radioGroup}>
                {['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not'].map(option => (
                  <label key={option} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="recommend"
                      value={option}
                      checked={feedback.recommend === option}
                      onChange={(e) => setFeedback({...feedback, recommend: e.target.value})}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Additional Comments</label>
              <textarea
                value={feedback.additionalComments}
                onChange={(e) => setFeedback({...feedback, additionalComments: e.target.value})}
                placeholder="Anything else you'd like to share?"
                rows={4}
              />
            </div>

            <div className={styles.submitButtons}>
              <button type="submit" className={styles.emailButton}>
                📧 Send via Email
              </button>
              <button type="button" onClick={handleGitHubIssue} className={styles.githubButton}>
                🐙 Submit as GitHub Issue
              </button>
            </div>
          </form>

          <div className={styles.feedbackNote}>
            <p><strong>Privacy Note:</strong> This form doesn't store data. It opens your email client or GitHub to submit feedback.</p>
          </div>
        </div>
      )}
    </div>
  );
}