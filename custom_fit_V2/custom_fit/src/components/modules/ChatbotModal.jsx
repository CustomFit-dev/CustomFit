import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../scss/ChatbotModal.scss';

const ChatbotModal = ({ open, handleClose, handleMenuClick }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text:
        'Hola, ¿en qué puedo ayudarte?\n' +
        '1. Quiero contactarlos\n' +
        '2. Quiero ser proveedor\n' +
        '3. Quiero diseñar una camiseta\n' +
        '4. Ver catálogo',
    },
  ]);

  const resetChat = () => {
    setMessages([{
      sender: 'bot',
      text:
        'Hola, ¿en qué puedo ayudarte?\n' +
        '1. Quiero contactarlos\n' +
        '2. Quiero ser proveedor\n' +
        '3. Quiero diseñar una camiseta\n' +
        '4. Ver catálogo',
    }]);
  };

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const userMsg = { sender: 'user', text: trimmed };
    const newMessages = [...messages, userMsg];
    let botReply = '';

    switch (trimmed) {
      case '1':
        botReply = 'Redirigiéndote a nuestro WhatsApp...';
        setTimeout(() => {
          window.open('https://wa.me/573118251570?text=Hola%2C%20quiero%20más%20información%20sobre%20Camishub', '_blank');
          resetChat();
          handleClose();
        }, 1500);
        break;
      case '2':
        botReply = 'Perfecto. Abriendo formulario de proveedores...';
        setTimeout(() => {
          handleMenuClick('Proveedores');
          resetChat();
          handleClose();
        }, 1500);
        break;
      default:
        botReply = 'Por favor responde con un número del 1 al 4.';
    }

    setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    setMessage('');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="chatbot-box">
        <div className="chatbot-header">
          <Typography variant="h6" component="h2" className="chatbot-title">🤖 Chatbot</Typography>
          <IconButton onClick={handleClose} className="close-button"><CloseIcon /></IconButton>
        </div>
        <div className="chatbot-body">
          {messages.map((msg, idx) => (
            <Typography key={idx} className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
              {msg.text.split('\n').map((line, i) => <div key={i}>{line}</div>)}
            </Typography>
          ))}
        </div>
        <div className="chatbot-footer">
          <TextField
            size="small"
            variant="outlined"
            placeholder="Escribe número de opción..."
            className="chatbot-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button variant="contained" className="send-button" onClick={handleSend}>Enviar</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ChatbotModal;
