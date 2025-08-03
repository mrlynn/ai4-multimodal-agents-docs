import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import styles from './assistant.module.css';

const SUGGESTED_QUESTIONS = [
  'How do I process PDFs in n8n?',
  'What is MongoDB Atlas used for in this workshop?',
  'How do vector embeddings work?',
  'What exercises are included in the workshop?',
  'How do I set up Voyage AI?',
  'What is a multimodal agent?',
];

export default function LabAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Hello! I\'m your workshop lab assistant. I can help you with questions about building multimodal PDF agents using n8n, MongoDB Atlas, and Voyage AI. What would you like to know?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('http://localhost:5678/webhook/lab-assistant');
  const [connectionStatus, setConnectionStatus] = useState('ready');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (question) => {
    if (!question.trim() || isLoading) return;

    const userMessage = { role: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setConnectionStatus('sending');

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          history: messages.slice(-10) // Send last 10 messages for context
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.answer || 'I apologize, but I encountered an error processing your question.',
        metadata: {
          model: data.model,
          sources: data.sources,
          contextDocs: data.context_docs_used
        }
      };

      setMessages(prev => [...prev, assistantMessage]);
      setConnectionStatus('ready');
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'error',
        content: `Error: ${error.message}. Make sure the n8n workflow is running and the webhook is active at ${webhookUrl}`
      }]);
      setConnectionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <Layout
      title="Lab Assistant"
      description="AI-powered workshop assistant using RAG">
      <div className={styles.container}>
        <div className={styles.chatContainer}>
          <div className={styles.header}>
            <h1>🤖 Workshop Lab Assistant</h1>
            <p>Ask questions about the multimodal PDF agent workshop</p>
          </div>

          <div className={styles.suggestionsBar}>
            <h3>Try asking:</h3>
            <div className={styles.suggestions}>
              {SUGGESTED_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  className={styles.suggestionChip}
                  onClick={() => sendMessage(question)}
                  disabled={isLoading}>
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div key={index} className={`${styles.message} ${styles[message.role]}`}>
                <div className={styles.messageContent}>
                  {message.content}
                  {message.metadata && (
                    <div className={styles.messageMetadata}>
                      <span>Model: {message.metadata.model}</span>
                      {message.metadata.contextDocs && (
                        <span> • Docs used: {message.metadata.contextDocs}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about the workshop..."
              disabled={isLoading}
              className={styles.input}
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className={styles.sendButton}>
              {isLoading ? 'Sending...' : 'Send'}
            </button>
          </div>

          <div className={styles.statusBar}>
            <div className={styles.statusInfo}>
              <span className={`${styles.statusIndicator} ${styles[connectionStatus]}`}></span>
              <span>Status: {connectionStatus === 'ready' ? 'Connected' : connectionStatus}</span>
            </div>
            <div className={styles.webhookInfo}>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className={styles.webhookInput}
                placeholder="Webhook URL"
              />
            </div>
          </div>
        </div>

        <div className={styles.infoPanel}>
          <h2>How it works</h2>
          <p>This lab assistant uses a RAG (Retrieval-Augmented Generation) system built with n8n workflows:</p>
          <ol>
            <li><strong>Document Indexing:</strong> The indexer workflow reads workshop documentation, chunks it, generates embeddings, and stores them in MongoDB Atlas.</li>
            <li><strong>Question Processing:</strong> When you ask a question, it's converted to an embedding using Voyage AI.</li>
            <li><strong>Vector Search:</strong> MongoDB Atlas Vector Search finds the most relevant documentation chunks.</li>
            <li><strong>Response Generation:</strong> An LLM uses the retrieved context to generate accurate, workshop-specific answers.</li>
          </ol>
          
          <h3>Setup Instructions</h3>
          <ol>
            <li>Import and run the indexer workflow: <code>/static/workflows/08-docs-indexer.json</code></li>
            <li>Import and activate the chat workflow: <code>/static/workflows/09-lab-assistant-chat.json</code></li>
            <li>Ensure MongoDB and n8n are running: <code>npm run workshop:start</code></li>
            <li>The webhook should be available at the URL shown in the status bar</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}