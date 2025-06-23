import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Typography, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../scss/ChatbotModal.scss';

const ChatbotModal = ({ open, handleClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text:
        'Hola,¿en qué puedo ayudarte?\n' +
        '1.Quiero contactarlos\n' +
        '2.Quiero ser proveedor\n' +
        '3.Quiero diseñar una camiseta\n' +
        '4.Ver catálogo',
    },
  ]);
  const [context, setContext] = useState('main');

  const navigate = useNavigate();

  const resetChat = () => {
    setMessages([
      {
        sender: 'bot',
        text:
          'Hola,¿en qué puedo ayudarte?\n' +
          '1.Quiero contactarlos\n' +
          '2.Quiero ser proveedor\n' +
          '3.Quiero diseñar una camiseta\n' +
          '4.Ver catálogo',
      },
    ]);
    setContext('main');
  };

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const userMsg = { sender: 'user', text: trimmed };
    const newMessages = [...messages, userMsg];
    let botReply = '';
    let nextContext = 'main';

    if (context === 'main') {
      switch (trimmed) {
        case '1':
          botReply = 'Redirigiéndote a nuestro WhatsApp...';
          setTimeout(() => {
            window.open(
              'https://wa.me/573118251570?text=Hola%2C%20quiero%20más%20información%20sobre%20Camishub',
              '_blank'
            );
            resetChat();
            handleClose();
          }, 1500);
          break;
        case '2':
          botReply = '¡Gracias por tu interés. Por favor llena el formulario...';
          setTimeout(() => {
            navigate('/proveedorForm');
            resetChat();
            handleClose();
          }, 1500);
          break;
        case '3':
        case '4':
          botReply = 'Perfecto. Sin embargo, primero necesitas iniciar sesión para continuar. Redirigiéndote al login...';
          setTimeout(() => {
            navigate('/iniciar');
            resetChat();
            handleClose();
          }, 2500);
          break;
        default:
          botReply = 'No entendí esa opción. Por favor responde con un número del 1 al 4.';
      }
    } else if (context === 'design-options') {
      switch (trimmed) {
        case '1':
          botReply = '¡Perfecto! Redirigiéndote al diseñador para subir tu diseño...';
          setTimeout(() => {
            navigate('/Personalizar');
            resetChat();
            handleClose();
          }, 1500);
          break;
        case '2':
          botReply = 'Mostrando plantillas disponibles...';
          setTimeout(() => {
            navigate('/Personalizar?plantillas=true');
            resetChat();
            handleClose();
          }, 1500);
          break;
        case '3':
          botReply = 'Mostrando ejemplos de camisetas...';
          setTimeout(() => {
            navigate('/ejemplos');
            resetChat();
            handleClose();
          }, 1500);
          break;
        default:
          botReply = 'Por favor responde con una opción válida: 1, 2 o 3.';
          nextContext = 'design-options';
      }
    }

    setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    setMessage('');
    setContext(nextContext);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="chatbot-modal">
      <Box className="chatbot-box">
        <div className="chatbot-header">
          <Typography variant="h6" component="h2" className="chatbot-title">
            🤖 Chatbot
          </Typography>
          <IconButton onClick={handleClose} className="close-button">
            <CloseIcon />
          </IconButton>
        </div>
        <div className="chatbot-body">
          {messages.map((msg, idx) => (
            <Typography
              key={idx}
              className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}
              component="div"
            >
              {msg.text.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </Typography>
          ))}
        </div>
        <div className="chatbot-footer">
          <TextField
            size="small"
            variant="outlined"
            placeholder="Escribe el número de la opción..."
            className="chatbot-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <Button variant="contained" className="send-button" onClick={handleSend}>
            Enviar
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ChatbotModal;
