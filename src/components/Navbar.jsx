import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useState } from "react";

function Navbar({ onLogout, isAuthenticated, userType }) {
  const navigate = useNavigate();
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();

      // Mapeo de términos de búsqueda a rutas
      const searchMappings = {
        // Inicio
        inicio: "/",
        home: "/",
        principal: "/",
        "página principal": "/",
        "pagina principal": "/",

        // Creación de órdenes
        creacion: "/orderRegistration",
        crear: "/orderRegistration",
        orden: "/orderRegistration",
        ordenes: "/orderRegistration",
        órdenes: "/orderRegistration",
        registro: "/orderRegistration",
        "nueva orden": "/orderRegistration",
        "nueva órden": "/orderRegistration",
        "crear orden": "/orderRegistration",
        "crear órden": "/orderRegistration",

        // Gestión de órdenes
        gestion: "/orders",
        gestión: "/orders",
        administrar: "/orders",
        administración: "/orders",
        administracion: "/orders",
        "ver ordenes": "/orders",
        "ver órdenes": "/orders",
        "lista ordenes": "/orders",
        "lista órdenes": "/orders",
        "estado ordenes": "/orders",
        "estado órdenes": "/orders",

        // Técnicos
        tecnico: "/technicians",
        técnico: "/technicians",
        tecnicos: "/technicians",
        técnicos: "/technicians",
        personal: "/technicians",
        equipo: "/technicians",
        especialistas: "/technicians",

        // Pago
        pago: "/",
        pagar: "/",
        online: "/",
        transferencia: "/",
        banco: "/",
        bancolombia: "/",
        davivienda: "/",
        bancolombia: "/",

        // Contacto
        contacto: "/contact",
        contact: "/contact",
        información: "/contact",
        informacion: "/contact",
        datos: "/contact",
        dirección: "/contact",
        direccion: "/contact",
        teléfono: "/contact",
        telefono: "/contact",

        // PQRS
        pqrs: "/pqrs",
        reclamo: "/pqrs",
        reclamos: "/pqrs",
        sugerencia: "/pqrs",
        sugerencias: "/pqrs",
        queja: "/pqrs",
        quejas: "/pqrs",
        peticion: "/pqrs",
        petición: "/pqrs",
        peticiones: "/pqrs",
        "peticiones quejas reclamos sugerencias": "/pqrs",
      };

      let targetRoute = null;
      let bestMatch = null;
      let bestScore = 0;

      if (searchMappings[query]) {
        targetRoute = searchMappings[query];
      } else {
        for (const [key, route] of Object.entries(searchMappings)) {
          let score = 0;

          if (key.includes(query) || query.includes(key)) {
            score += 10;
          }

          const queryWords = query.split(" ");
          const keyWords = key.split(" ");

          for (const qWord of queryWords) {
            for (const kWord of keyWords) {
              if (kWord.includes(qWord) || qWord.includes(kWord)) {
                score += 5;
              }
            }
          }

          const commonChars = [...query].filter((char) =>
            key.includes(char)
          ).length;
          score += commonChars;

          if (score > bestScore) {
            bestScore = score;
            bestMatch = route;
          }
        }

        if (bestScore >= 3) {
          targetRoute = bestMatch;
        }
      }

      if (targetRoute) {
        if (targetRoute === "/orderRegistration" && userType !== "technician") {
          alert("Solo los técnicos pueden acceder a la creación de órdenes.");
          setSearchQuery("");
          return;
        }

        navigate(targetRoute);
        setSearchQuery("");
      } else {
        alert(
          `No se encontraron resultados para "${searchQuery}".\n\nTérminos sugeridos:\n• Inicio, Home, Principal\n• Gestión, Administrar, Ver órdenes\n• Técnicos, Personal, Equipo\n• Contacto, Información\n• PQRS, Reclamos, Sugerencias`
        );
      }
    }
  };

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (!isNaN(amount) && amount > 0) {
      const bankName = selectedBank || "No seleccionado";
      const message = `Hola, soy cliente de Gestión de Reparaciones y necesito realizar un pago de $${amount.toLocaleString(
        "es-CO"
      )} COP.

📋 Información del pago:
💰 Monto: $${amount.toLocaleString("es-CO")} COP
🏦 Banco seleccionado: ${bankName}
📱 Número de contacto: [Su número]

¿Podrían proporcionarme los datos bancarios para realizar la transferencia? Una vez realizado el pago, enviaré el comprobante.

Gracias.`;

      const whatsappUrl = `https://wa.me/573153123277?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
      setShowPaymentModal(false);
      setPaymentAmount("");
      setSelectedBank("");
    }
  };

  const handleBankSelection = (bankName) => {
    setSelectedBank(bankName);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Gestión de Reparaciones</h1>

      <div className="nav-links">
        <Link to="/">Inicio</Link>
        {userType === "technician" && (
          <Link to="/orderRegistration">Creación de órdenes</Link>
        )}
        <Link to="/orders">Gestión de órdenes</Link>
        <Link to="/technicians">Técnicos</Link>

        <button
          className="nav-button payment-btn"
          onClick={() => setShowPaymentModal(true)}
        >
          💳 PAGO ONLINE
        </button>

        <div className="contact-dropdown">
          <button
            className="nav-button contact-btn"
            onMouseEnter={() => setShowContactDropdown(true)}
            onMouseLeave={() => setShowContactDropdown(false)}
          >
            📞 Contacto
          </button>
          {showContactDropdown && (
            <div
              className="contact-dropdown-content"
              onMouseEnter={() => setShowContactDropdown(true)}
              onMouseLeave={() => setShowContactDropdown(false)}
            >
              <Link to="/pqrs" className="dropdown-item">
                📝 PQRS
              </Link>
              <Link to="/contact" className="dropdown-item">
                📧 Información de Contacto
              </Link>
            </div>
          )}
        </div>

        {isAuthenticated && (
          <div className="user-type-indicator">
            <span
              className={`user-badge ${
                userType === "technician" ? "technician" : "user"
              }`}
            >
              {userType === "technician" ? "🔧 Técnico" : "👤 Usuario"}
            </span>
          </div>
        )}

        <form onSubmit={handleSearch} className="search-container">
          <input
            type="text"
            placeholder="🔍 Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>

        {!isAuthenticated ? (
          <Link to="/login">Ingresar</Link>
        ) : (
          <button
            className="logout-btn"
            onClick={() => {
              onLogout && onLogout();
              navigate("/login");
            }}
          >
            Cerrar sesión
          </button>
        )}
      </div>

      {showPaymentModal && (
        <div
          className="payment-modal-overlay"
          onClick={() => setShowPaymentModal(false)}
        >
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <div className="payment-modal-header">
              <h3>💳 Pago Online</h3>
              <button
                className="close-modal-btn"
                onClick={() => setShowPaymentModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="payment-content">
              <div className="bank-selection">
                <h4>Selecciona tu banco:</h4>
                <div className="banks-grid">
                  <button
                    className={`bank-option bancolombia ${
                      selectedBank === "Bancolombia" ? "selected" : ""
                    }`}
                    onClick={() => handleBankSelection("Bancolombia")}
                  >
                    <div className="bank-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <span>Bancolombia</span>
                  </button>
                  <button
                    className={`bank-option banco-bogota ${
                      selectedBank === "Banco de Bogotá" ? "selected" : ""
                    }`}
                    onClick={() => handleBankSelection("Banco de Bogotá")}
                  >
                    <div className="bank-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                      </svg>
                    </div>
                    <span>Banco de Bogotá</span>
                  </button>
                  <button
                    className={`bank-option davivienda ${
                      selectedBank === "Davivienda" ? "selected" : ""
                    }`}
                    onClick={() => handleBankSelection("Davivienda")}
                  >
                    <div className="bank-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
                      </svg>
                    </div>
                    <span>Davivienda</span>
                  </button>
                  <button
                    className={`bank-option av-villas ${
                      selectedBank === "AV Villas" ? "selected" : ""
                    }`}
                    onClick={() => handleBankSelection("AV Villas")}
                  >
                    <div className="bank-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
                        <path d="M12 10c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2z" />
                      </svg>
                    </div>
                    <span>AV Villas</span>
                  </button>
                </div>
                {selectedBank && (
                  <div className="selected-bank-info">
                    <span>
                      🏦 Banco seleccionado: <strong>{selectedBank}</strong>
                    </span>
                  </div>
                )}
              </div>

              <div className="amount-input">
                <h4>Monto a pagar:</h4>
                <div className="amount-field">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="amount-input-field"
                    min="0"
                    step="0.01"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                  />
                  <span className="currency">COP</span>
                </div>
              </div>

              <div className="payment-actions">
                <button
                  className="pay-btn"
                  onClick={handlePayment}
                  disabled={!paymentAmount || paymentAmount <= 0}
                >
                  💳 Pagar Ahora
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
