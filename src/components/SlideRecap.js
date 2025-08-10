import React from 'react';
import styles from './SlideRecap.module.css';

const SlideRecap = ({ title, items, nextSection }) => {
  return (
    <div className={styles.slideRecap}>
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>
      <div className={styles.items}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            <span className={styles.icon}>{item.icon}</span>
            <div className={styles.content}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {nextSection && (
        <div className={styles.nextSection}>
          <span className={styles.nextIcon}>➡️</span>
          <span>{nextSection}</span>
        </div>
      )}
    </div>
  );
};

export default SlideRecap;