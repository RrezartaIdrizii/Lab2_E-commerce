import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import './ChatComponent.css'; 

const predefinedQuestions = [
  "What are your opening hours?",
  "What services do you offer?",
  "How can I contact support?",
];

const aiResponses = {
  "How are you?": "I'm just a bot, but thanks for asking! How can I assist you today?",
  "How are you": "I'm just a bot, but thanks for asking! How can I assist you today?",
  "how are you?": "I'm just a bot, but thanks for asking! How can I assist you today?",
  "How is your day?": "Every day is great for me! How can I help you?",
  "How is your day": "Every day is great for me! How can I help you?",
  "how is your day": "Every day is great for me! How can I help you?",
};

const ChatComponent = () => {
  const [ws, setWs] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false); 
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:5000'); 

    websocket.onopen = () => {
      console.log('WebSocket connected');
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, { text: newMessage, type: 'answer' }]);
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
      setWs(null);
    };

    return () => {
      websocket.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (ws && message) {
      const normalizedMessage = message.toLowerCase();
      
      const aiMessage = aiResponses[normalizedMessage];
      setMessages((prevMessages) => [...prevMessages, { text: message, type: 'user' }]);
      
      if (aiMessage) {
        setMessages((prevMessages) => [...prevMessages, { text: aiMessage, type: 'answer' }]);
      } else {
        ws.send(message);
      }
      
      setMessage('');
    }
  };

  const handleQuestionClick = (question) => {
    setMessage(question);
    sendMessage();
  };

  return (
    <div className={`chat-container ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="chat-header">
          <h4>Chat Support</h4>
          <button className="minimize-btn" onClick={() => setIsOpen(false)}>
            -
          </button>
        </div>
      )}
      {isOpen && (
        <div className="chat-body">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="predefined-questions">
            <h5>Predefined Questions:</h5>
            {predefinedQuestions.map((question, index) => (
              <button
                key={index}
                className="question-btn"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
      {!isOpen && (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon icon={faComments} />
        </button>
      )}
    </div>
  );
};

export default ChatComponent;
