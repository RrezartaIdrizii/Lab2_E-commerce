import { WebSocketServer } from 'ws';

const predefinedResponses = {
  "What are your opening hours?": "Our service is available online from 9 AM to 5 PM, Monday to Friday.",
  "What services do you offer?": "We provide a variety of tech products, including laptops, desktops, smartphones, and accessories to meet your needs.",
  "How can I contact support?": "You can reach support via the contact service located in the header.",
};

export const initWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server }); 

  wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
      console.log(`Received: ${message}`);
      let response = "I'm not sure how to respond to that.";
      if (predefinedResponses[message]) {
        response = predefinedResponses[message];
      }
      ws.send(response); 
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log('WebSocket server is running');
};
