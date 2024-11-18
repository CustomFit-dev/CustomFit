import React, { useState, useRef, useEffect } from 'react';
import '../../scss/sec2_l.scss';


const Card = () => {
  const [messages, setMessages] = useState([
    {
      text: `¡Hola👋! Soy el asistente virtual de CustomFit🤖. ¿En qué puedo ayudarte hoy?
1. Registrarse como proveedor
2. Registrarse como domiciliario
3. Contactar con un administrador`, 
      sender: "bot"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatBodyRef = useRef(null);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Agregar el mensaje del usuario
      const newMessages = [
        ...messages,
        { text: inputValue, sender: "user" }
      ];
      setMessages(newMessages);
      setInputValue(''); // Limpiar el campo de entrada

      // Lógica para manejar la respuesta del bot según la opción seleccionada
      const lastMessage = inputValue.trim().toLowerCase();

      if (lastMessage === "1") {
        setMessages([
          ...newMessages,
          { text: "👋 Bienvenido a nuestra plataforma, donde tendrás la oportunidad de llegar a más clientes y aumentar tus ventas al ofrecer camisetas personalizables 👕🎨. Como proveedor, serás responsable de publicar las camisetas en nuestra tienda para que los usuarios puedan diseñarlas a su gusto ✨. A través de nuestra plataforma, los clientes podrán elegir el tipo de camiseta, color, talla y otros detalles personalizados 🖌️, mientras que tú podrás asegurarte de que tus productos estén disponibles para la venta 🛒. Esta es una gran oportunidad para mostrar tus productos a una audiencia más amplia y ofrecer una experiencia única de personalización 🌟.",
            
            sender: "bot" }
              
        ]);
      } else if (lastMessage === "2") {
        setMessages([
          ...newMessages,
          { text: "Has elegido registrarte como domiciliario. Te redirigiré al formulario de registro...", sender: "bot" }
        ]);
      } else if (lastMessage === "3") {
        setMessages([
          ...newMessages,
          { text: "Has elegido contactar con un administrador. Te pondremos en contacto lo antes posible...", sender: "bot" }
        ]);
      } else {
        setMessages([
          ...newMessages,
          { text: "Por favor, elige una opción válida: 1, 2 o 3.", sender: "bot" }
        ]);
      }
    }
  };

  useEffect(() => {
    // Desplazar el contenedor de los mensajes hacia abajo cada vez que se actualice la lista
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container1">
      {/* Div izquierdo */}
      <div className="left-box">
        <div className="card max-w-md mx-auto bg-black dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
          <div className="header px-4 py-3 border-b dark:border-zinc-700">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-zinc-800 text-white">Chatbot Assistant</h2>
              <div className="status bg-green-500 text-white text-xs px-2 py-1 rounded-full">Online</div>
            </div>
          </div>
          <div className="chat-body flex-1 p-3 overflow-y-auto flex flex-col space-y-2" ref={chatBodyRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.sender === 'user' ? 'self-end bg-blue-500' : 'self-start bg-zinc-500'} text-white max-w-xs rounded-lg px-3 py-1.5 text-sm`}
              >
                {message.text.split("\n").map((textLine, i) => (
                  <span key={i}>{textLine}<br /></span>
                ))}
              </div>
            ))}
          </div>
          <div className="footer px-3 py-2 border-t dark:border-zinc-700">
            <div className="flex gap-2">
              <input
                placeholder="Escribe tu mensaje..."
                className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 dark:text-white dark:border-zinc-600 text-sm"
                id="chatInput"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="send-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
                id="sendButton"
                onClick={handleSendMessage}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Div derecho */}
      <div className="right-box">
        <h2 className="title">Registro y Reportes con el Chatbot</h2>
        <p className="description">
        🤖 Nuestro chatbot está diseñado para facilitar el registro de domiciliarios y proveedores en la plataforma. A través de él, los usuarios pueden registrar sus datos de manera rápida y sencilla 📋. Además, el chatbot permite enviar reportes 📑 y consultas directamente al administrador, asegurando una comunicación eficiente y fluida. ¡Una herramienta práctica para mantener todo en orden y optimizar tus tareas!
        </p>
        <div className="action-box">
        <h2 className='title'>¡Nuestras Redes Sociales!</h2>
        <div className='botones'>
        
<button class="button">
  <svg
    viewBox="0 0 24 24"
    fill="none"
    height="24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    class="w-6 h-6 text-gray-800 dark:text-white"
  >
    <path
      clip-rule="evenodd"
      d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
      fill-rule="evenodd"
      fill="currentColor"
    ></path>
  </svg>
</button>
<button class="button">
  <svg
    viewBox="0 0 24 24"
    fill="none"
    height="24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    class="w-6 h-6 text-gray-800 dark:text-white"
  >
    <path
      clip-rule="evenodd"
      d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
      fill-rule="evenodd"
      fill="currentColor"
    ></path>
    <path
      d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
      fill="currentColor"
    ></path>
  </svg>
</button>



<button class="button">
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    class="w-6 h-6 text-gray-800 dark:text-white"
  >
    <path
      clip-rule="evenodd"
      d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
      fill-rule="evenodd"
    ></path>
  </svg>
</button>
</div>


        </div>
      </div>
    </div>
  );
};

export default Card;
