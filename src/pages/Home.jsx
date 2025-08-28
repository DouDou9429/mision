import React, { useState } from "react";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";
import StatisticsDashboard from "../components/StatisticsDashboard";
import AIChatbot from "../components/AIChatbot";

function Home() {
  const navigate = useNavigate();
  const [showStats, setShowStats] = useState(false);
  const [ordersData, setOrdersData] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  // Cargamos los  datos desde localStorage

  React.useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem("ordersData")) || [];
      const techs = JSON.parse(localStorage.getItem("technicians")) || [
        {
          name: "Juan El Vergas",
          specialty: "Reparación de Hardware",
          icon: "🔧",
          experience: "8 años",
        },
        {
          name: "Pedro Picapiedra",
          specialty: "Mantenimiento Preventivo",
          icon: "⚒️",
          experience: "5 años",
        },
        {
          name: "El Profe Wellington",
          specialty: "Diagnóstico Avanzado",
          icon: "👨‍🏫",
          experience: "12 años",
        },
      ];
      setOrdersData(orders);
      setTechnicians(techs);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, []);

  if (showStats) {
    return (
      <div>
        <button
          onClick={() => setShowStats(false)}
          style={{
            position: "fixed",
            top: "100px",
            left: "20px",
            zIndex: 1000,
            padding: "10px 20px",
            background: "linear-gradient(90deg, #00e5ff, #7c4dff)",
            border: "none",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ← Volver al Inicio
        </button>
        <StatisticsDashboard
          ordersData={ordersData}
          technicians={technicians}
        />
      </div>
    );
  }

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
          <div
            className="feature-card"
            onClick={() => navigate("/orders")}
            style={{ cursor: "pointer" }}
          >
            <div className="feature-icon">🔧</div>
            <h3>Gestión de Reparaciones</h3>
            <p>
              Registra y sigue el estado de todas las reparaciones en tiempo
              real
            </p>
          </div>

          <div
            className="feature-card"
            onClick={() => navigate("/technicians")}
            style={{ cursor: "pointer" }}
          >
            <div className="feature-icon">👨‍🔧</div>
            <h3>Control de Técnicos</h3>
            <p>Administra tu equipo técnico y asigna trabajos eficientemente</p>
          </div>

          <div
            className="feature-card"
            onClick={() => setShowStats(true)}
            style={{ cursor: "pointer" }}
          >
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

      <div className="maps-section">
        <div className="maps-container">
          <h2>📍 Nuestra Ubicación</h2>
          <p>Encuéntranos en Villa del Rosario, Norte de Santander</p>

          <div className="location-maps-container">
            <div className="location-info">
              <div className="location-item">
                <span className="location-icon">🏢</span>
                <div>
                  <strong>Dirección:</strong>
                  <p>
                    Avenida 1 # 123 siempre viva, Villa del Rosario, Norte de
                    Santander
                  </p>
                </div>
              </div>
              <div className="location-item">
                <span className="location-icon">🕒</span>
                <div>
                  <strong>Horarios de Atención:</strong>
                  <p>
                    Lunes a Viernes: 8:00 AM - 6:00 PM
                    <br />
                    Sábados: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="map-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.1234567890123!2d-72.4678!3d8.3254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMTknMzEuNCJOIDcywrAyOCcwNC4wIlc!5e0!3m2!1ses!2sco!4v1234567890123"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de la empresa"
              ></iframe>
            </div>
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

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Síguenos en redes sociales</h3>
            <div className="social-links">
              <a href="#" className="social-link instagram">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
              <a href="#" className="social-link facebook">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
              <a href="#" className="social-link twitter">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
                X (Twitter)
              </a>
              <a href="#" className="social-link whatsapp">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                WhatsApp
              </a>
              <a href="#" className="social-link tiktok">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
                TikTok
              </a>
              <a href="#" className="social-link linkedin">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Suscríbete a nuestro boletín</h3>
            <p>Recibe las últimas noticias y ofertas especiales</p>
            <div className="subscription-form">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="email-input"
              />
              <button className="subscribe-btn">Suscribirse</button>
            </div>
            <p className="subscriber-count">
              🎉 Más de 3000 personas nos siguen
            </p>
          </div>

          <div className="footer-section">
            <h3>Información de Contacto</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div className="contact-details">
                  <strong>Dirección:</strong>
                  <br />
                  Avenida 1 # 123 Siempre Viva
                  <br />
                  Villa del Rosario, Norte de Santander
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div className="contact-details">
                  <strong>Teléfonos:</strong>
                  <br />
                  <a href="tel:+573152144878">+57 315 214 4878</a>
                  <br />
                  <a href="tel:+573015987990">+57 301 598 7990</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div className="contact-details">
                  <strong>Email:</strong>
                  <br />
                  <a href="mailto:info@mantenimiento.com">
                    info@mantenimiento.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2024 Sistema de Mantenimiento Técnico. Todos los derechos
            reservados.
          </p>
        </div>

        <AIChatbot />
      </footer>
    </div>
  );
}

export default Home;
