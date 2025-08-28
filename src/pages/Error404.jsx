import React from "react";
import { Link } from "react-router-dom";
import "../styles/Error404.css";

const Error404 = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-animation">
          <div className="error-number">404</div>
          <div className="error-icon">🚫</div>
        </div>

        <h1 className="error-title">¡Página No Encontrada!</h1>

        <p className="error-description">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="error-suggestions">
          <h3>¿Qué puedes hacer?</h3>
          <ul>
            <li>✅ Verificar que la URL esté escrita correctamente</li>
            <li>✅ Usar el menú de navegación para encontrar la página</li>
            <li>✅ Volver a la página principal</li>
            <li>✅ Contactar al administrador si el problema persiste</li>
          </ul>
        </div>

        <div className="error-actions">
          <Link to="/" className="home-button">
            🏠 Volver al Inicio
          </Link>

          <button onClick={() => window.history.back()} className="back-button">
            ⬅️ Página Anterior
          </button>
        </div>

        <div className="error-footer">
          <p>Si crees que esto es un error, contacta al soporte técnico.</p>
          <div className="error-code">Error Code: 404 - Page Not Found</div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
