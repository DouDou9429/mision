import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // UN envio ficticio
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      });
    }, 3000);
  };

  if (submitSuccess) {
    return (
      <div className="contact-success">
        <div className="success-content">
          <div className="success-icon">✅</div>
          <h2>¡Mensaje Enviado Exitosamente!</h2>
          <p>
            Gracias por contactarnos. Te responderemos en las próximas 24 horas.
          </p>
          <p>
            Te enviaremos una respuesta al correo:{" "}
            <strong>{formData.email}</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>📞 Información de Contacto</h1>
        <p>
          Estamos aquí para ayudarte. Contáctanos de la manera que prefieras.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <h3>📍 Ubicación</h3>
          <div className="contact-card">
            <div className="contact-icon">🏢</div>
            <div className="contact-details">
              <h4>Dirección Principal</h4>
              <p>Avenida 1 # 123 Siempre Viva</p>
              <p>Villa del Rosario, Norte de Santander</p>
              <p>Colombia</p>
            </div>
          </div>

          <h3>📞 Teléfonos</h3>
          <div className="contact-cards-grid">
            <div className="contact-card phone">
              <div className="contact-icon">📱</div>
              <div className="contact-details">
                <h4>Móvil Principal</h4>
                <a href="tel:+573152144878">+57 315 214 4878</a>
                <p>Línea directa 24/7</p>
              </div>
            </div>
            <div className="contact-card phone">
              <div className="contact-icon">☎️</div>
              <div className="contact-details">
                <h4>Teléfono Fijo</h4>
                <a href="tel:+573015987990">+57 301 598 7990</a>
                <p>Horario: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          <h3>✉️ Correo Electrónico</h3>
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <div className="contact-details">
              <h4>Email Principal</h4>
              <a href="mailto:info@mantenimiento.com">info@mantenimiento.com</a>
              <p>Respuesta en 24 horas</p>
            </div>
          </div>

          <h3>🕒 Horarios de Atención</h3>
          <div className="contact-card">
            <div className="contact-icon">⏰</div>
            <div className="contact-details">
              <h4>Horarios</h4>
              <p>
                <strong>Lunes a Viernes:</strong> 8:00 AM - 6:00 PM
              </p>
              <p>
                <strong>Sábados:</strong> 8:00 AM - 2:00 PM
              </p>
              <p>
                <strong>Domingos:</strong> Cerrado
              </p>
              <p>
                <strong>Emergencias:</strong> 24/7
              </p>
            </div>
          </div>

          <h3>🚗 Cómo Llegar</h3>
          <div className="contact-card">
            <div className="contact-icon">🗺️</div>
            <div className="contact-details">
              <h4>Instrucciones</h4>
              <p>Desde el centro de Villa del Rosario:</p>
              <p>1. Tomar la Avenida Principal hacia el norte</p>
              <p>2. Girar a la derecha en la calle 123</p>
              <p>3. Continuar 2 cuadras hasta encontrar nuestro local</p>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h3>📝 Envíanos un Mensaje</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Tu nombre completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="form-input"
                placeholder="+57 300 123 4567"
              />
            </div>

            <div className="form-group">
              <label htmlFor="asunto">Asunto *</label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                className="form-textarea"
                rows="6"
                placeholder="Describe tu consulta o solicitud..."
              ></textarea>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Enviando...
                  </>
                ) : (
                  "📤 Enviar Mensaje"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
