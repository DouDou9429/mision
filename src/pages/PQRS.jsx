import React, { useState } from "react";
import "../styles/PQRS.css";

const PQRS = () => {
  const [formData, setFormData] = useState({
    tipo: "",
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    descripcion: "",
    adjuntos: [],
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      adjuntos: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulamos el envio del PQRS
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        tipo: "",
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        descripcion: "",
        adjuntos: [],
      });
    }, 3000);
  };

  if (submitSuccess) {
    return (
      <div className="pqrs-success">
        <div className="success-content">
          <div className="success-icon">✅</div>
          <h2>¡PQRS Enviado Exitosamente!</h2>
          <p>
            Tu solicitud ha sido recibida y será procesada en las próximas 24-48
            horas.
          </p>
          <p>
            Te enviaremos una respuesta al correo:{" "}
            <strong>{formData.email}</strong>
          </p>
          <div className="success-details">
            <p>
              <strong>Número de Radicado:</strong> PQRS-{Date.now()}
            </p>
            <p>
              <strong>Fecha:</strong> {new Date().toLocaleDateString("es-ES")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pqrs-container">
      <div className="pqrs-header">
        <h1>📝 Sistema PQRS</h1>
        <p>Peticiones, Quejas, Reclamos y Sugerencias</p>
      </div>

      <div className="pqrs-content">
        <div className="pqrs-info">
          <h3>¿Qué es PQRS?</h3>
          <div className="pqrs-types">
            <div className="pqrs-type">
              <span className="type-icon">📝</span>
              <div>
                <h4>Petición</h4>
                <p>Solicitud de información, documentos o servicios</p>
              </div>
            </div>
            <div className="pqrs-type">
              <span className="type-icon">😤</span>
              <div>
                <h4>Queja</h4>
                <p>Manifestación de inconformidad por servicios</p>
              </div>
            </div>
            <div className="pqrs-type">
              <span className="type-icon">⚠️</span>
              <div>
                <h4>Reclamo</h4>
                <p>Solicitud de indemnización o compensación</p>
              </div>
            </div>
            <div className="pqrs-type">
              <span className="type-icon">💡</span>
              <div>
                <h4>Sugerencia</h4>
                <p>Propuesta para mejorar nuestros servicios</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="pqrs-form">
          <h3>Formulario PQRS</h3>

          <div className="form-group">
            <label htmlFor="tipo">Tipo de PQRS *</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Selecciona el tipo</option>
              <option value="peticion">📝 Petición</option>
              <option value="queja">😤 Queja</option>
              <option value="reclamo">⚠️ Reclamo</option>
              <option value="sugerencia">💡 Sugerencia</option>
            </select>
          </div>

          <div className="form-row">
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
              placeholder="Resumen breve de tu PQRS"
            />
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción Detallada *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              className="form-textarea"
              rows="6"
              placeholder="Describe detalladamente tu petición, queja, reclamo o sugerencia..."
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="adjuntos">Adjuntar Archivos (Opcional)</label>
            <input
              type="file"
              id="adjuntos"
              name="adjuntos"
              onChange={handleFileChange}
              multiple
              className="form-file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <small>
              Formatos permitidos: PDF, DOC, DOCX, JPG, PNG. Máximo 5 archivos.
            </small>
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
                "📤 Enviar PQRS"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PQRS;
