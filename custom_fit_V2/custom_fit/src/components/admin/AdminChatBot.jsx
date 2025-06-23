import React, { useState } from 'react';
import '../../scss/adminChatBot.scss';

const AdminChatBot = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text:
        'Hola, soy el asistente del administrador. ¿Cómo puedo ayudarte?\n\n' +
        '1. Reportar un problema\n' +
        '2. Contactar soporte\n' +
        '3. Ver preguntas frecuentes\n' +
        '4. Consultar estado del sistema\n' +
        '5. Enviar una sugerencia'
    }
  ]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState('main');

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { sender: 'admin', text: trimmed };
    const updatedMessages = [...messages, userMsg];

    let botReply = '';
    let newContext = 'main';

    if (context === 'main') {
      switch (trimmed) {
        case '1':
          botReply = 'Por favor describe el problema con más detalle y lo escalaremos al soporte.';
          newContext = 'awaiting-problem';
          break;
        case '2':
          botReply = 'Puedes contactar soporte técnico al correo: custom.fit.team@gmail.com';
          break;
        case '3':
          botReply = 'Consulta nuestras preguntas frecuentes en la sección de ayuda de la plataforma.';
          break;
        case '4':
          botReply = '✅ El sistema está funcionando correctamente. Última revisión: hace 3 minutos.';
          break;
        case '5':
          botReply = 'Por favor, escribe tu sugerencia y la registraré.';
          newContext = 'awaiting-suggestion';
          break;
        default:
          botReply = 'Opción no reconocida. Por favor responde con un número del 1 al 5.';
      }
    } else if (context === 'awaiting-problem') {
      botReply = 'Gracias por reportar el problema. Lo hemos escalado al equipo de soporte.';
    } else if (context === 'awaiting-suggestion') {
      botReply = 'Gracias por tu sugerencia. La hemos registrado correctamente.';
    }

    // Agrega mensaje del bot
    setMessages([...updatedMessages, { sender: 'bot', text: botReply }]);

    // Reinicia input y contexto si ya terminó el flujo
    setInput('');
    setContext(newContext === 'main' ? 'main' : context === 'main' ? newContext : 'main');
  };

  return (
    <div className="admin-chatbot">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default AdminChatBot;
