import React from "react";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="main-title">
          <span className="title-word title-word-1">Sistema</span>
          <span className="title-word title-word-2">de</span>
          <span className="title-word title-word-3">Mantenimiento</span>
          <span className="title-word title-word-4">Técnico</span>
        </h1>
        <p className="hero-subtitle">
          Gestiona reparaciones, técnicos y mantén el control total de tu taller
          de manera eficiente
        </p>
      </div>

      <div className="main-content">
        <div className="circuit-container">
          <div className="circuit-board">
            <div className="circuit-line line-1"></div>
            <div className="circuit-line line-2"></div>
            <div className="circuit-line line-3"></div>
            <div className="circuit-line line-4"></div>
            <div className="circuit-line line-5"></div>
            <div className="circuit-line line-6"></div>

            <div className="circuit-component component-1">
              <div className="component-inner"></div>
            </div>
            <div className="circuit-component component-2">
              <div className="component-inner"></div>
            </div>
            <div className="circuit-component component-3">
              <div className="component-inner"></div>
            </div>
            <div className="circuit-component component-4">
              <div className="component-inner"></div>
            </div>
            <div className="circuit-component component-5">
              <div className="component-inner"></div>
            </div>
            <div className="circuit-component component-6">
              <div className="component-inner"></div>
            </div>

            <div className="connection-point point-1"></div>
            <div className="connection-point point-2"></div>
            <div className="connection-point point-3"></div>
            <div className="connection-point point-4"></div>
            <div className="connection-point point-5"></div>
            <div className="connection-point point-6"></div>
            <div className="connection-point point-7"></div>
            <div className="connection-point point-8"></div>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>Gestión de Reparaciones</h3>
            <p>
              Registra y sigue el estado de todas las reparaciones en tiempo
              real
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👨‍🔧</div>
            <h3>Control de Técnicos</h3>
            <p>Administra tu equipo técnico y asigna trabajos eficientemente</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Reportes Detallados</h3>
            <p>Genera reportes profesionales de mantenimiento y reparación</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Interfaz Moderna</h3>
            <p>Diseño intuitivo y responsive para una experiencia óptima</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-number">100%</div>
          <div className="stat-label">Eficiencia</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Disponibilidad</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">0</div>
          <div className="stat-label">Errores</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
