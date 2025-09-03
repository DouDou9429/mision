import React, { useState } from "react";
import "../styles/Login.css";

const Login = ({ onLogin, isAuthenticated }) => {
  const [loginType, setLoginType] = useState("user");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // PSe puede acceder con cualquier dato al login de usuario o tecnico
    if (formData.username.trim() && formData.password.trim()) {
      onLogin(formData.username, formData.password, loginType);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(`Se ha enviado un enlace de recuperación a: ${forgotEmail}`);
    setShowForgotPassword(false);
    setForgotEmail("");
    setIsSubmitting(false);
  };

  if (isAuthenticated) {
    return (
      <div className="login-success">
        <div className="success-content">
          <div className="success-icon">✅</div>
          <h2>¡Inicio de Sesión Exitoso!</h2>
          <p>Bienvenido al sistema de gestión de reparaciones.</p>
          <p>Redirigiendo...</p>
        </div>
      </div>
    );
  }

  if (showForgotPassword) {
    return (
      <div className="login-container">
        <div className="login-card forgot-password">
          <div className="login-header">
            <h2>🔑 Recuperar Contraseña</h2>
            <p>
              Ingresa tu correo electrónico para recibir un enlace de
              recuperación
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="login-form">
            <div className="form-group">
              <label htmlFor="forgotEmail">Correo Electrónico</label>
              <input
                type="email"
                id="forgotEmail"
                name="forgotEmail"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="form-input"
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? "Enviando..." : "📧 Enviar Recuperación"}
              </button>
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="back-btn"
              >
                ← Volver al Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>🔐 Iniciar Sesión</h2>
          <p>Sistema de Gestión de Reparaciones</p>
        </div>

        <div className="user-type-selector">
          <button
            className={`type-btn ${loginType === "user" ? "active" : ""}`}
            onClick={() => setLoginType("user")}
          >
            👤 Usuario
          </button>
          <button
            className={`type-btn ${loginType === "technician" ? "active" : ""}`}
            onClick={() => setLoginType("technician")}
          >
            🔧 Técnico
          </button>
        </div>

        <div className="login-type-info">
          {loginType === "user" ? (
            <div className="type-info">
              <h4>👤 Acceso de Usuario</h4>
              <p>Para crear órdenes de reparación y hacer seguimiento</p>
            </div>
          ) : (
            <div className="type-info">
              <h4>🔧 Acceso de Técnico</h4>
              <p>Para gestionar reparaciones y actualizar estados</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">
              {loginType === "user" ? "Usuario" : "ID de Técnico"}
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-input"
              placeholder={
                loginType === "user" ? "Ingresa tu usuario" : "Ingresa tu ID"
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              🚀 Iniciar Sesión
            </button>
          </div>

          <div className="login-footer">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="forgot-password-btn"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <div className="login-note">
            <p>
              <strong>Nota:</strong> Puedes ingresar con cualquier usuario y
              contraseña para acceder al sistema.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
