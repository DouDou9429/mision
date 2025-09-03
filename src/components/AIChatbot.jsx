import React, { useState, useRef, useEffect } from "react";
import "../styles/AIChatbot.css";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente técnico virtual. ¿En qué puedo ayudarte con tu equipo?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = async (userMessage) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses = [
      "Basándome en tu descripción, parece ser un problema de hardware. Te recomiendo verificar las conexiones y reiniciar el equipo.",
      "Este tipo de falla suele estar relacionada con el software. Intenta actualizar los drivers o reinstalar el sistema operativo.",
      "Por lo que describes, podría ser un problema de sobrecalentamiento. Verifica que los ventiladores estén funcionando correctamente.",
      "Esta falla es común en equipos con mucha antigüedad. Considera hacer una limpieza interna o reemplazar componentes críticos.",
      "El problema parece estar en la fuente de alimentación. Verifica el voltaje y considera reemplazarla si es necesario.",
      "Esta es una falla típica de memoria RAM. Te sugiero hacer un test de memoria o cambiar los módulos de RAM.",
      "Por la descripción, parece un problema de disco duro. Haz un backup de tus datos y ejecuta chkdsk.",
      "Esta falla suele estar relacionada con la tarjeta gráfica. Verifica que esté bien conectada y actualiza los drivers.",
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    return {
      id: Date.now(),
      text: randomResponse,
      sender: "bot",
      timestamp: new Date(),
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    const aiResponse = await simulateAIResponse(inputText);
    setMessages((prev) => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={`chatbot-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleChat}
        title="Chat con IA"
      >
        {isOpen ? "✕" : "🤖"}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>🤖 Asistente Técnico IA</h3>
            <button onClick={toggleChat} className="close-btn">
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === "user" ? "user" : "bot"
                }`}
              >
                <div className="message-content">{message.text}</div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe el problema de tu equipo..."
              rows="2"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="send-btn"
            >
              {isLoading ? "⏳" : "📤"}
            </button>
          </div>

          <div className="chatbot-footer">
            <small>Conectado a IA • Responde en segundos</small>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
